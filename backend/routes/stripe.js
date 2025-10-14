// Stripe payment routes
// Handles checkout session creation for product purchases

const express = require('express');
const router = express.Router();

// Initialize Stripe with secret key from environment variables
// Note: Server will fail to start if STRIPE_SECRET_KEY is not set in .env
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

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
      return res.status(400).json({ error: 'Invalid items array' });
    }

    // Format line items for Stripe checkout
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || undefined,
          images: item.image ? [item.image] : undefined,
        },
        unit_amount: Math.round(item.price * 100), // Convert dollars to cents
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cancel`,
      metadata: {
        order_items: JSON.stringify(items),
      },
    });

    // Return session URL to frontend
    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('[Stripe Checkout Error]', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// GET /session/:sessionId
// Retrieves checkout session details (useful for success page)
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({ session });
  } catch (error) {
    console.error('[Stripe Session Retrieval Error]', error);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
});

module.exports = router;
