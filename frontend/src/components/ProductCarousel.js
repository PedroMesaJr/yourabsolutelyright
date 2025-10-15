import React, { useEffect, useRef, useState, useCallback } from 'react';
import ProductCard from './ProductCard';
import products from '../data/products';
import '../styles/ProductCarousel.css';

function ProductCarousel() {
  const containerRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [copied, setCopied] = useState(false);
  const animationRef = useRef(null);
  const autoScrollEnabled = useRef(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // ZERO-LATENCY: Preload ALL product images on mount for instant switching
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = products.flatMap(product => {
        const images = product.images || [product.image];
        return images.map(src => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Resolve anyway to prevent blocking
            img.src = src;
          });
        });
      });

      await Promise.all(imagePromises);
      console.log('[Performance] ✅ All product images preloaded - zero-latency achieved');
    };

    preloadImages();
  }, []);

  // Smooth auto-scroll effect with RAF
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const baseSpeed = 0.5; // Slower, smoother scroll
    let lastTimestamp = 0;

    const animate = (timestamp) => {
      if (!container) return;

      // Calculate delta time for consistent speed across devices
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Auto-scroll when enabled and not being interacted with
      if (autoScrollEnabled.current && !isDragging.current) {
        scrollPosition += baseSpeed * (deltaTime / 16); // Normalize to 60fps

        // Infinite loop - reset when reaching end
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }

        container.scrollLeft = scrollPosition;
      } else {
        // Sync scrollPosition when user is controlling
        scrollPosition = container.scrollLeft;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowControls(true);
    autoScrollEnabled.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowControls(false);
    autoScrollEnabled.current = true;
  }, []);

  // Mouse drag to scroll
  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('.product-card')) return; // Don't drag if clicking on card
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    autoScrollEnabled.current = false;
    containerRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Multiply for faster scroll
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    containerRef.current.style.cursor = 'grab';
  }, []);

  // Touch support for mobile
  const handleTouchStart = useCallback((e) => {
    if (e.target.closest('.product-card')) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    autoScrollEnabled.current = false;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    setTimeout(() => {
      if (!containerRef.current?.matches(':hover')) {
        autoScrollEnabled.current = true;
      }
    }, 100);
  }, []);

  const scrollNext = useCallback(() => {
    if (containerRef.current) {
      const cardWidth = 632;
      containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }, []);

  const scrollPrev = useCallback(() => {
    if (containerRef.current) {
      const cardWidth = 632;
      containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('CLAUDE30');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <section className="product-carousel">
      <div className="scroll-hint">
        <span
          className={`hint-discount ${copied ? 'copied' : ''}`}
          onClick={handleCopyCode}
          title="Click to copy code"
        >
          {copied ? '✓ Copied!' : 'Use Code CLAUDE30 for 30% Off'}
        </span>
      </div>
      <div
        className="carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showControls && (
          <>
            <button
              className="carousel-control carousel-control-prev"
              onClick={scrollPrev}
              aria-label="Previous product"
            >
              ‹
            </button>
            <button
              className="carousel-control carousel-control-next"
              onClick={scrollNext}
              aria-label="Next product"
            >
              ›
            </button>
          </>
        )}
        <div
          className="carousel-container"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCarousel;
