// Stripe payment routes
// Handles checkout session creation for product purchases
//
// This module provides endpoints for:
// - Creating Stripe Checkout sessions (POST /create-checkout-session)
// - Retrieving checkout session details (GET /session/:sessionId)
//
// Security features:
// - Rate limiting applied at server level
// - Input validation for all parameters
// - Stripe-specific error handling
// - Session ID format validation

const express = require('express');
const router = express.Router();

// Initialize Stripe with secret key from environment variables
// Note: Server will fail to start if STRIPE_SECRET_KEY is not set in .env
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Validate API key is configured
if (!stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY is not set in .env file');
  console.error('   Please add your Stripe secret key to continue');
  process.exit(1);
}

const stripe = require('stripe')(stripeSecretKey);

// POST /create-checkout-session
// Creates a Stripe checkout session for the items in the cart
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    // Validate request body
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.warn('[Stripe Validation] Invalid items array received');
      return res.status(400).json({
        error: 'Invalid items array',
        details: 'Request must include an items array with at least one product'
      });
    }

    // Validate each item has required fields
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.name || typeof item.name !== 'string') {
        return res.status(400).json({
          error: 'Invalid item data',
          details: `Item at index ${i} missing required field: name`
        });
      }
      if (!item.price || typeof item.price !== 'number' || item.price <= 0) {
        return res.status(400).json({
          error: 'Invalid item data',
          details: `Item at index ${i} has invalid price: ${item.price}`
        });
      }
      if (item.quantity && (typeof item.quantity !== 'number' || item.quantity < 1)) {
        return res.status(400).json({
          error: 'Invalid item data',
          details: `Item at index ${i} has invalid quantity: ${item.quantity}`
        });
      }
    }

    console.log(`[Stripe Checkout] Creating session for ${items.length} item(s)`);

    // Format line items for Stripe checkout
    const lineItems = items.map((item) => {
      // Stripe requires absolute URLs for images
      // If image is a relative path, convert it to absolute URL
      // If no image or invalid URL, omit the images field
      let imageUrl = undefined;
      if (item.image && typeof item.image === 'string') {
        try {
          // Check if it's already an absolute URL
          if (item.image.startsWith('http://') || item.image.startsWith('https://')) {
            imageUrl = item.image;
          } else if (item.image.startsWith('/')) {
            // Relative path - convert to absolute URL using frontend URL
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            imageUrl = `${frontendUrl}${item.image}`;
          }
        } catch (error) {
          console.warn(`[Stripe] Invalid image URL for ${item.name}:`, item.image);
        }
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description || undefined,
            images: imageUrl ? [imageUrl] : undefined,
          },
          unit_amount: Math.round(item.price * 100), // Convert dollars to cents
        },
        quantity: item.quantity || 1,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL'],
      },
      metadata: {
        order_items: JSON.stringify(items),
      },
    });

    console.log(`[Stripe Checkout] Session created: ${session.id}`);

    // Return session URL to frontend
    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('[Stripe Checkout Error]', {
      message: error.message,
      type: error.type || 'unknown',
      code: error.code || 'none',
    });

    // Provide more specific error messages based on error type
    if (error.type === 'StripeCardError') {
      return res.status(400).json({
        error: 'Payment card error',
        details: error.message
      });
    } else if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        error: 'Invalid payment request',
        details: 'Please check your payment information and try again'
      });
    } else if (error.type === 'StripeAPIError') {
      return res.status(502).json({
        error: 'Payment service temporarily unavailable',
        details: 'Please try again in a few moments'
      });
    }

    res.status(500).json({
      error: 'Failed to create checkout session',
      details: 'An unexpected error occurred. Please try again.'
    });
  }
});

// GET /session/:sessionId
// Retrieves checkout session details (useful for success page)
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Validate session ID format (Stripe session IDs start with cs_)
    if (!sessionId || typeof sessionId !== 'string') {
      console.warn('[Stripe Validation] Missing or invalid session ID');
      return res.status(400).json({
        error: 'Session ID required',
        details: 'Valid Stripe session ID must be provided'
      });
    }

    if (!sessionId.startsWith('cs_')) {
      console.warn(`[Stripe Validation] Invalid session ID format: ${sessionId}`);
      return res.status(400).json({
        error: 'Invalid session ID format',
        details: 'Session ID must start with cs_'
      });
    }

    console.log(`[Stripe Session] Retrieving session: ${sessionId}`);

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log(`[Stripe Session] Retrieved session: ${sessionId}, status: ${session.payment_status}`);

    res.json({ session });
  } catch (error) {
    console.error('[Stripe Session Retrieval Error]', {
      message: error.message,
      sessionId: req.params.sessionId,
      type: error.type || 'unknown',
    });

    // Handle specific Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(404).json({
        error: 'Session not found',
        details: 'The requested checkout session does not exist'
      });
    }

    res.status(500).json({
      error: 'Failed to retrieve session',
      details: 'An unexpected error occurred while fetching session details'
    });
  }
});

module.exports = router;
