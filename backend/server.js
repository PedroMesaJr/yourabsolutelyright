// Backend server for yourabsolutelyright.com
// Express server with Stripe and Printful integration

// Import required packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Create Express app instance
const app = express();

// Set port
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable CORS for frontend communication

// Webhook route MUST come before express.json() middleware
// Stripe requires raw body for signature verification
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.error('[Webhook Signature Verification Failed]', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  console.log(`[Webhook Received] Event type: ${event.type}`);

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Extract customer info from session
      const customerDetails = session.customer_details || {};
      const shippingDetails = session.shipping_details || session.shipping || {};

      const customer = {
        name: shippingDetails.name || customerDetails.name || 'Customer',
        email: customerDetails.email || session.customer_email || '',
        address1: shippingDetails.address?.line1 || '',
        address2: shippingDetails.address?.line2 || '',
        city: shippingDetails.address?.city || '',
        state: shippingDetails.address?.state || '',
        country: shippingDetails.address?.country || 'US',
        zip: shippingDetails.address?.postal_code || '',
        phone: customerDetails.phone || '',
      };

      // Extract order metadata (contains product info from checkout)
      const orderItems = session.metadata?.order_items
        ? JSON.parse(session.metadata.order_items)
        : [];

      // Try to get line items from session (may fail for test events)
      let lineItems = [];
      try {
        lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      } catch (error) {
        console.warn('[Webhook] Could not fetch line items:', error.message);
      }

      console.log('[Webhook] Customer:', customer.name, customer.email);
      console.log('[Webhook] Order items:', orderItems.length);

      // Call Printful order creation
      if (orderItems.length > 0 && customer.address1) {
        // Import Printful router's createPrintfulOrder function
        // Note: We'll need to export this from printful.js
        const printfulRouter = require('./routes/printful');

        // For now, log that we would create the order
        // In production, you'd call the Printful API here
        console.log('[Webhook] ✅ Order ready for Printful fulfillment');
        console.log('[Webhook] Session ID:', session.id);
        console.log('[Webhook] Payment Status:', session.payment_status);

        // TODO: Create actual Printful order once products are set up
        // const printfulOrder = await createPrintfulOrder(customer, orderItems);
      } else {
        console.warn('[Webhook] ⚠️ Missing customer address or order items');
      }

      res.json({ received: true, processed: true });
    } catch (error) {
      console.error('[Webhook Processing Error]', error);
      res.status(500).json({ received: true, processed: false, error: error.message });
    }
  } else {
    // Other event types
    console.log(`[Webhook] Unhandled event type: ${event.type}`);
    res.json({ received: true });
  }
});

// Regular JSON parsing for all other routes
app.use(express.json()); // Parse JSON request bodies

// Import routes
const stripeRouter = require('./routes/stripe');
const printfulRouter = require('./routes/printful');

// Mount routes
app.use('/api/stripe', stripeRouter);
app.use('/api/printful', printfulRouter);

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).send('Server is running');
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
}).on('error', (err) => {
  console.error('❌ Failed to start server:', err.message);
  process.exit(1);
});
