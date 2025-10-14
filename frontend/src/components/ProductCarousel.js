import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import products from '../data/products';
import '../styles/ProductCarousel.css';

function ProductCarousel() {
  const containerRef = useRef(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const animationRef = useRef(null);
  const lastMouseMoveTime = useRef(Date.now());
  const mouseSpeedRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Duplicate products for infinite scroll effect
    const originalChildren = Array.from(container.children);
    originalChildren.forEach(child => {
      const clone = child.cloneNode(true);
      container.appendChild(clone);
    });

    let scrollPosition = 0;
    const baseSpeed = 0.5; // Base scroll speed (pixels per frame)

    const animate = () => {
      if (!container) return;

      // Calculate current speed based on mouse interaction
      let currentSpeed = baseSpeed;

      if (isMouseOver) {
        // Slow down significantly when mouse is over
        const timeSinceLastMove = Date.now() - lastMouseMoveTime.current;

        if (timeSinceLastMove < 100) {
          // Just moved - follow mouse speed
          currentSpeed = mouseSpeedRef.current * 0.3;
        } else if (timeSinceLastMove < 500) {
          // Recently moved - very slow
          currentSpeed = baseSpeed * 0.2;
        } else {
          // Hovering but not moving - slow
          currentSpeed = baseSpeed * 0.4;
        }
      }

      scrollPosition += currentSpeed;

      // Reset position when halfway through (seamless loop)
      const scrollWidth = container.scrollWidth / 2;
      if (scrollPosition >= scrollWidth) {
        scrollPosition = 0;
      }

      container.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMouseOver]);

  const handleMouseMove = (e) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastMouseMoveTime.current;

    if (timeDiff > 0) {
      // Calculate mouse speed based on movement
      mouseSpeedRef.current = Math.abs(e.movementX) / timeDiff * 10;
    }

    lastMouseMoveTime.current = currentTime;
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    lastMouseMoveTime.current = Date.now();
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    mouseSpeedRef.current = 0;
  };

  return (
    <section className="product-carousel">
      <div className="scroll-hint">
        <span>Continuously Scrolling</span>
        <span className="arrow">∞</span>
      </div>
      <div
        className="carousel-container"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductCarousel;
