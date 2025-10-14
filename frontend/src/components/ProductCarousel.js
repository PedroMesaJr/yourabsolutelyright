import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import products from '../data/products';
import '../styles/ProductCarousel.css';

function ProductCarousel() {
  const containerRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [copied, setCopied] = useState(false);
  const animationRef = useRef(null);
  const autoScrollEnabled = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wait for next tick to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      // Duplicate products for infinite scroll effect
      const originalChildren = Array.from(container.children);
      originalChildren.forEach(child => {
        const clone = child.cloneNode(true);
        container.appendChild(clone);
      });

      let scrollPosition = container.scrollLeft; // Start from current position
      const baseSpeed = 0.5; // Base scroll speed (pixels per frame)

      const animate = () => {
        if (!container) return;

        // Always auto-scroll at constant speed when enabled
        if (autoScrollEnabled.current) {
          scrollPosition += baseSpeed;

          // Handle infinite looping
          const scrollWidth = container.scrollWidth / 2;

          if (scrollPosition >= scrollWidth) {
            scrollPosition = 0;
          }

          container.scrollLeft = scrollPosition;
        } else {
          // Update scrollPosition to match manual scroll position
          scrollPosition = container.scrollLeft;
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setShowControls(true);
    autoScrollEnabled.current = false; // Pause auto-scroll
  };

  const handleMouseLeave = () => {
    setShowControls(false);
    autoScrollEnabled.current = true; // Resume auto-scroll
  };

  const scrollNext = () => {
    if (containerRef.current) {
      const cardWidth = 632; // Product card width (600px) + gap (32px)
      containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const cardWidth = 632; // Product card width (600px) + gap (32px)
      containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('CLAUDE20');
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
          {copied ? '✓ Copied!' : 'Use Code CLAUDE20 for 20% Off'}
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
        <div className="carousel-container" ref={containerRef}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCarousel;
