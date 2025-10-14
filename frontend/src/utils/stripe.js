// Stripe utility functions
// Handles communication with backend Stripe API

// Backend API URL - defaults to localhost for development
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

/**
 * Creates a Stripe checkout session via backend API
 * @param {Object} product - Product data (id, name, description, price, image)
 * @param {Object} variant - Optional variant data (size, variantId, retailPrice)
 * @param {string} couponCode - Optional coupon code
 * @returns {Promise<string>} Stripe checkout URL
 */
export const createCheckoutSession = async (product, variant = null, couponCode = '') => {
  try {
    // Validate product data
    if (!product || !product.name || !product.price) {
      throw new Error('Invalid product data');
    }

    // Use variant price if variant is selected, otherwise use base product price
    const price = variant ? variant.retailPrice : product.price;
    const productName = variant ? `${product.name} (${variant.size})` : product.name;

    // Format product data for backend
    const items = [
      {
        name: productName,
        description: product.shortDescription || product.description || '',
        price: price,
        quantity: 1,
        image: product.image || '',
        printfulId: variant ? variant.variantId : product.printfulId,
        size: variant ? variant.size : null,
      },
    ];

    console.log('[Stripe] Creating checkout session for:', productName);
    if (variant) {
      console.log('[Stripe] Selected variant:', variant);
    }
    if (couponCode) {
      console.log('[Stripe] Applying coupon code:', couponCode);
    }

    // Call backend API to create checkout session
    // Note: Render free tier can take 30-60s to wake up on first request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout

    const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items, couponCode }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.details || errorData.error || 'Failed to create checkout session');
    }

    // Parse response
    const data = await response.json();

    if (!data.url) {
      throw new Error('No checkout URL returned from server');
    }

    console.log('[Stripe] Checkout session created:', data.sessionId);

    return data.url;
  } catch (error) {
    console.error('[Stripe Error]', error.message);

    // Provide user-friendly error messages
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. The server may be waking up. Please try again in a moment.');
    }

    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check your internet connection.');
    }

    throw error;
  }
};

const stripeUtils = { createCheckoutSession };
export default stripeUtils;
