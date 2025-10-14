import React, { useState } from 'react';
import { createCheckoutSession } from '../utils/stripe';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuyNow = async () => {
    try {
      // Reset error state
      setError(null);

      // Set loading state
      setLoading(true);

      console.log('[ProductCard] Buy Now clicked:', product.name);

      // Create checkout session
      const checkoutUrl = await createCheckoutSession(product);

      // Redirect to Stripe Checkout
      console.log('[ProductCard] Redirecting to checkout:', checkoutUrl);
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('[ProductCard] Checkout error:', err.message);
      setError(err.message || 'Failed to start checkout. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        {error && (
          <div className="product-error" style={{
            color: '#8B0000',
            fontSize: '0.875rem',
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#FFE4E1',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button
            className="btn-buy-now"
            onClick={handleBuyNow}
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Loading...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
