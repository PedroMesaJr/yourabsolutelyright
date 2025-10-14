// Backend server for yourabsolutelyright.com
// Express server with Stripe and Printful integration

// Import required packages
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Create Express app instance
const app = express();

// Set port
const PORT = process.env.PORT || 5000;

// Rate limiting configuration
// Prevents abuse by limiting requests per IP address
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    details: 'Please try again later'
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  // Skip rate limiting for health check
  skip: (req) => req.path === '/health',
});

// Stricter rate limiting for payment endpoints
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit payment requests to 10 per 15 minutes
  message: {
    error: 'Too many payment requests',
    details: 'Please wait before trying again'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware setup
// CORS configuration - allows frontend to communicate with backend
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions)); // Enable CORS for frontend communication

// Apply rate limiting to all routes
app.use(limiter);

// Webhook route MUST come before express.json() middleware
// Stripe requires raw body for signature verification
//
// This endpoint handles Stripe webhook events, particularly:
// - checkout.session.completed: Triggered when payment is successful
//
// Security:
// - Webhook signature verification prevents unauthorized requests
// - Only processes events from Stripe's servers
// - Validates all customer data before processing
//
// Flow:
// 1. Verify webhook signature
// 2. Extract customer and order data from session
// 3. Prepare order for Printful fulfillment
// 4. (Future) Automatically create Printful order
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature - ensures request is from Stripe
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
        const { createPrintfulOrder } = require('./routes/printful');

        // Log order ready for fulfillment
        console.log('[Webhook] ✅ Order ready for Printful fulfillment');
        console.log('[Webhook] Session ID:', session.id);
        console.log('[Webhook] Payment Status:', session.payment_status);

        // TODO: Uncomment once Printful products are configured
        // This will automatically create orders in Printful when payments succeed
        // const printfulOrder = await createPrintfulOrder(customer, orderItems);
        // if (printfulOrder.success) {
        //   console.log('[Webhook] Printful order created:', printfulOrder.orderId);
        // } else {
        //   console.error('[Webhook] Printful order failed:', printfulOrder.error);
        // }
      } else {
        console.warn('[Webhook] ⚠️ Missing customer address or order items');
      }

      res.json({ received: true, processed: true });
    } catch (error) {
      console.error('[Webhook Processing Error]', {
        message: error.message,
        sessionId: session.id,
      });
      res.status(500).json({ received: true, processed: false, error: error.message });
    }
  } else {
    // Other event types (not currently handled)
    console.log(`[Webhook] Unhandled event type: ${event.type}`);
    res.json({ received: true });
  }
});

// Regular JSON parsing for all other routes
app.use(express.json()); // Parse JSON request bodies

// Import routes
const stripeRouter = require('./routes/stripe');
const printfulRouter = require('./routes/printful');
const contactRouter = require('./routes/contact');

// Mount routes with rate limiting
// Stripe routes get stricter rate limiting for payment security
app.use('/api/stripe', paymentLimiter, stripeRouter);
app.use('/api/printful', printfulRouter);
app.use('/api/contact', contactRouter);

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
