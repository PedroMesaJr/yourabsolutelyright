import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createCheckoutSession } from '../utils/stripe';
import LoadingSpinner from './LoadingSpinner';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imageRef = useRef(null);
  const cardRef = useRef(null);

  // Check if product has multiple images (gallery)
  const hasGallery = product.images && product.images.length > 1;
  const displayImage = hasGallery ? product.images[currentImageIndex] : product.image;

  // Preload all gallery images for instant switching
  useEffect(() => {
    if (hasGallery) {
      product.images.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
      });
    }
  }, [hasGallery, product.images]);

  // Handle smooth image transitions
  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setIsTransitioning(false);
    };
    img.src = displayImage;
  }, [displayImage]);

  // Navigation functions with useCallback
  const nextImage = useCallback(() => {
    if (hasGallery && !isTransitioning && product.images) {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  }, [hasGallery, isTransitioning, product.images]);

  const prevImage = useCallback(() => {
    if (hasGallery && !isTransitioning && product.images) {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  }, [hasGallery, isTransitioning, product.images]);

  const goToImage = useCallback((index) => {
    if (!isTransitioning && index !== currentImageIndex) {
      setIsTransitioning(true);
      setCurrentImageIndex(index);
    }
  }, [isTransitioning, currentImageIndex]);

  // Keyboard navigation for gallery
  useEffect(() => {
    if (!hasGallery) return;

    const handleKeyPress = (e) => {
      if (showZoom) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevImage();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setShowZoom(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasGallery, showZoom, nextImage, prevImage]);

  // Prevent carousel scrolling when interacting with gallery
  const preventCarouselScroll = (e) => {
    e.stopPropagation();
    if (cardRef.current) {
      cardRef.current.style.pointerEvents = 'auto';
    }
  };

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
    <div className="product-card" ref={cardRef}>
      <div
        className="product-image-container"
        onMouseEnter={preventCarouselScroll}
        onMouseLeave={preventCarouselScroll}
      >
        <img
          ref={imageRef}
          src={displayImage}
          alt={product.name}
          className={`product-image ${imageLoaded ? 'loaded' : 'loading'} ${isTransitioning ? 'transitioning' : ''}`}
          onClick={(e) => { e.stopPropagation(); setShowZoom(true); }}
          onError={(e) => {
            console.error('[ProductCard] Image failed to load:', displayImage);
            e.target.style.display = 'none';
          }}
          onLoad={() => {
            console.log('[ProductCard] Image loaded:', displayImage);
            setImageLoaded(true);
          }}
          draggable={false}
        />
        {hasGallery && (
          <>
            <button
              className="gallery-nav gallery-prev"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              onMouseDown={preventCarouselScroll}
              disabled={isTransitioning}
            >
              ‹
            </button>
            <button
              className="gallery-nav gallery-next"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              onMouseDown={preventCarouselScroll}
              disabled={isTransitioning}
            >
              ›
            </button>
            <div className="gallery-dots" onMouseDown={preventCarouselScroll}>
              {product.images.map((_, index) => (
                <span
                  key={index}
                  className={`gallery-dot ${index === currentImageIndex ? 'active' : ''} ${isTransitioning ? 'disabled' : ''}`}
                  onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                />
              ))}
            </div>
          </>
        )}
        <div className="zoom-hint" onClick={(e) => { e.stopPropagation(); setShowZoom(true); }}>
          🔍 Click to zoom
        </div>
      </div>

      {showZoom && (
        <div className="zoom-modal" onClick={() => setShowZoom(false)}>
          <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="zoom-close" onClick={() => setShowZoom(false)}>×</button>
            <img
              src={displayImage}
              alt={product.name}
              className={`zoom-image ${imageLoaded ? 'loaded' : 'loading'}`}
              draggable={false}
            />
            {hasGallery && (
              <>
                <button
                  className="zoom-nav zoom-prev"
                  onClick={prevImage}
                  disabled={isTransitioning}
                >
                  ‹
                </button>
                <button
                  className="zoom-nav zoom-next"
                  onClick={nextImage}
                  disabled={isTransitioning}
                >
                  ›
                </button>
                <div className="zoom-counter">{currentImageIndex + 1} / {product.images.length}</div>
              </>
            )}
          </div>
        </div>
      )}
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
            className={`btn-buy-now ${loading ? 'btn-loading' : ''}`}
            onClick={handleBuyNow}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" color="white" />
                <span className="btn-loading-text">Processing...</span>
              </>
            ) : (
              'Buy Now'
            )}
          </button>
        </div>
        <div className="security-badge-product">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="currentColor" opacity="0.2"/>
            <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Secured by Stripe</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
