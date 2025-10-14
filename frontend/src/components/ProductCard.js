import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import ReactDOM from 'react-dom';
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
  const [showColorSelector, setShowColorSelector] = useState(false);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [prefetchedSession, setPrefetchedSession] = useState(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);

  // Check if product has size variants
  const hasVariants = product.printfulVariants && product.printfulVariants.length > 1;

  // Check if product has color variants
  const hasColorVariants = product.printfulVariants && product.printfulVariants.some(v => v.color);

  // Get unique colors from variants (memoized for performance)
  const availableColors = useMemo(() => {
    return hasColorVariants
      ? [...new Set(product.printfulVariants.map(v => v.color).filter(Boolean))]
      : [];
  }, [hasColorVariants, product.printfulVariants]);

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

  // ZERO-LATENCY: Prefetch checkout session on hover for instant redirect
  const handleBuyNowHover = async () => {
    // Only prefetch for simple products (no variants) to avoid waste
    if (hasColorVariants || hasVariants) return;
    if (prefetchedSession) return; // Already prefetched

    try {
      console.log('[Performance] 🚀 Prefetching checkout session on hover...');
      const sessionUrl = await createCheckoutSession(product, null, '');
      setPrefetchedSession(sessionUrl);
      console.log('[Performance] ✅ Checkout session prefetched - instant redirect ready');
    } catch (error) {
      // Fail silently, will create on click if prefetch fails
      console.warn('[Performance] Prefetch failed, will create on click');
    }
  };

  const handleBuyNow = async () => {
    // If product has color variants, show color selector first
    if (hasColorVariants) {
      setShowColorSelector(true);
      return;
    }

    // If product has size variants (but no colors), show size selector
    if (hasVariants) {
      setShowSizeSelector(true);
      return;
    }

    // ZERO-LATENCY: Use prefetched session if available for instant redirect
    if (prefetchedSession) {
      console.log('[Performance] ⚡ Using prefetched session - instant redirect!');
      window.location.href = prefetchedSession;
      return;
    }

    // Otherwise, show coupon modal
    setShowCouponModal(true);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColorSelector(false);
    setShowSizeSelector(true);
  };

  const proceedToCheckout = async (variant = null, coupon = '') => {
    try {
      // Reset error state
      setError(null);

      // Set loading state
      setLoading(true);

      console.log('[ProductCard] Buy Now clicked:', product.name);
      if (variant) {
        console.log('[ProductCard] Selected variant:', variant);
      }
      if (coupon) {
        console.log('[ProductCard] Coupon code:', coupon);
      }

      // Create checkout session with selected variant and coupon code
      const checkoutUrl = await createCheckoutSession(product, variant, coupon);

      // Redirect to Stripe Checkout
      console.log('[ProductCard] Redirecting to checkout:', checkoutUrl);
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('[ProductCard] Checkout error:', err.message);
      setError(err.message || 'Failed to start checkout. Please try again.');
      setLoading(false);
      setShowSizeSelector(false);
      setShowCouponModal(false);
    }
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setShowSizeSelector(false);
    setShowCouponModal(true);
  };

  // Get filtered variants based on selected color (memoized for performance)
  const filteredVariants = useMemo(() => {
    return selectedColor
      ? product.printfulVariants.filter(v => v.color === selectedColor)
      : product.printfulVariants;
  }, [selectedColor, product.printfulVariants]);

  const handleCouponSkip = () => {
    setShowCouponModal(false);
    proceedToCheckout(selectedVariant, '');
  };

  const handleCouponApply = () => {
    setShowCouponModal(false);
    proceedToCheckout(selectedVariant, couponCode);
  };

  return (
    <>
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
              // Don't hide the image - just log the error
            }}
            onLoad={() => {
              setImageLoaded(true);
            }}
            loading="lazy"
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

        {showColorSelector && (
        <div className="size-modal" onClick={() => setShowColorSelector(false)}>
          <div className="size-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="size-modal-close" onClick={() => setShowColorSelector(false)}>×</button>
            <h3 className="size-modal-title">Select Color</h3>
            <p className="size-modal-product">{product.name}</p>
            <div className="size-options">
              {availableColors.map((color) => (
                <button
                  key={color}
                  className="size-option color-option"
                  onClick={() => handleColorSelect(color)}
                  disabled={loading}
                >
                  <span className="size-name">{color}</span>
                  <span className="size-price">›</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        )}

        {showSizeSelector && (
        <div className="size-modal" onClick={() => setShowSizeSelector(false)}>
          <div className="size-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="size-modal-close" onClick={() => setShowSizeSelector(false)}>×</button>
            <h3 className="size-modal-title">Select Size</h3>
            <p className="size-modal-product">{product.name}{selectedColor ? ` - ${selectedColor}` : ''}</p>
            <div className="size-options">
              {filteredVariants.map((variant) => (
                <button
                  key={variant.variantId}
                  className="size-option"
                  onClick={() => handleVariantSelect(variant)}
                  disabled={loading}
                >
                  <span className="size-name">{variant.size}</span>
                  <span className="size-price">${variant.retailPrice}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        )}

        {showCouponModal && (
        <div className="size-modal" onClick={() => setShowCouponModal(false)}>
          <div className="size-modal-content coupon-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="size-modal-close" onClick={() => setShowCouponModal(false)}>×</button>
            <h3 className="size-modal-title">Have a Coupon Code?</h3>
            <p className="size-modal-product">Enter your code below or skip to continue</p>
            <div className="coupon-input-wrapper">
              <input
                type="text"
                className="coupon-input-modal"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={loading}
                autoFocus
              />
            </div>
            <div className="coupon-actions">
              <button
                className="coupon-skip-btn"
                onClick={handleCouponSkip}
                disabled={loading}
              >
                Skip
              </button>
              <button
                className="coupon-apply-btn"
                onClick={handleCouponApply}
                disabled={loading || !couponCode.trim()}
              >
                {loading ? 'Processing...' : 'Apply & Continue'}
              </button>
            </div>
          </div>
        </div>
        )}

        <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.shortDescription || product.description}</p>
        {product.shortDescription && (
          <button
            className="view-more-btn"
            onClick={() => setShowDescriptionModal(true)}
          >
            View More
          </button>
        )}
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
            onMouseEnter={handleBuyNowHover}
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

      {/* Description modal */}
      {showDescriptionModal && (
        <div className="size-modal description-modal" onClick={() => setShowDescriptionModal(false)}>
          <div className="size-modal-content description-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="size-modal-close" onClick={() => setShowDescriptionModal(false)}>×</button>
            <h3 className="size-modal-title">{product.name}</h3>
            <div className="description-scroll-container">
              <p className="description-full-text">{product.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Zoom modal rendered outside the card using React Portal */}
      {showZoom && ReactDOM.createPortal(
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
        </div>,
        document.body
      )}
    </>
  );
}

// Memoize component to prevent unnecessary re-renders (zero-latency optimization)
export default memo(ProductCard, (prevProps, nextProps) => {
  // Only re-render if product ID changes
  return prevProps.product.id === nextProps.product.id;
});
