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
app.use(express.json()); // Parse JSON request bodies

// Import routes
const stripeRouter = require('./routes/stripe');

// Mount routes
app.use('/api/stripe', stripeRouter);

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
