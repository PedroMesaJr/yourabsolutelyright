import React from 'react';
import ProductCard from './ProductCard';
import products from '../data/products';
import '../styles/ProductCarousel.css';

function ProductCarousel() {
  return (
    <section className="product-carousel">
      <div className="scroll-hint">
        <span>Scroll for more</span>
        <span className="arrow">→</span>
      </div>
      <div className="carousel-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductCarousel;
