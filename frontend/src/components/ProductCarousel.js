import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import products from '../data/products';
import '../styles/ProductCarousel.css';

function ProductCarousel() {
  const containerRef = useRef(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const animationRef = useRef(null);
  const lastMouseMoveTime = useRef(Date.now());
  const mouseSpeedRef = useRef(0);
  const mouseDirectionRef = useRef(1); // 1 for right, -1 for left
  const targetSpeedRef = useRef(0);
  const currentSpeedRef = useRef(0.5);

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

      // Calculate target speed based on mouse interaction
      let targetSpeed = baseSpeed;
      let direction = 1; // Default right direction

      if (isMouseOver) {
        const timeSinceLastMove = Date.now() - lastMouseMoveTime.current;

        if (timeSinceLastMove < 150) {
          // Just moved - follow mouse speed and direction gently
          targetSpeed = mouseSpeedRef.current * 0.6;
          direction = mouseDirectionRef.current;
        } else if (timeSinceLastMove < 800) {
          // Recently moved - very slow, almost stopped
          targetSpeed = baseSpeed * 0.08;
          direction = 1; // Return to default direction
        } else {
          // Hovering but not moving - nearly stopped for easy clicking
          targetSpeed = baseSpeed * 0.12;
          direction = 1;
        }
      } else {
        // Not hovering - normal speed
        targetSpeed = baseSpeed;
        direction = 1;
      }

      targetSpeedRef.current = targetSpeed * direction;

      // Smooth interpolation for buttery smooth transitions
      const smoothingFactor = 0.08; // Lower = smoother but slower response
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * smoothingFactor;

      scrollPosition += currentSpeedRef.current;

      // Handle bidirectional looping
      const scrollWidth = container.scrollWidth / 2;

      if (scrollPosition >= scrollWidth) {
        scrollPosition = 0;
      } else if (scrollPosition < 0) {
        scrollPosition = scrollWidth - 1;
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

    if (timeDiff > 0 && e.movementX !== 0) {
      // Calculate mouse speed and direction with much gentler response
      const speed = Math.abs(e.movementX) / Math.max(timeDiff, 1) * 8;
      mouseSpeedRef.current = Math.min(speed, 1.5); // Much lower cap for smoother control

      // Set direction based on mouse movement
      mouseDirectionRef.current = e.movementX > 0 ? 1 : -1;
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
    mouseDirectionRef.current = 1;
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
