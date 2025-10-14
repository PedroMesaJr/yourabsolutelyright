// Stripe utility functions
// Handles communication with backend Stripe API

// Backend API URL - defaults to localhost for development
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

/**
 * Creates a Stripe checkout session via backend API
 * @param {Object} product - Product data (id, name, description, price, image)
 * @returns {Promise<string>} Stripe checkout URL
 */
export const createCheckoutSession = async (product) => {
  try {
    // Validate product data
    if (!product || !product.name || !product.price) {
      throw new Error('Invalid product data');
    }

    // Format product data for backend
    const items = [
      {
        name: product.name,
        description: product.description || '',
        price: product.price,
        quantity: 1,
        image: product.image || '',
      },
    ];

    console.log('[Stripe] Creating checkout session for:', product.name);

    // Call backend API to create checkout session
    const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

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
    throw error;
  }
};

const stripeUtils = { createCheckoutSession };
export default stripeUtils;
