// Printful API routes
// Handles order creation and fulfillment through Printful
//
// This module provides endpoints for:
// - Creating draft orders in Printful (POST /create-order)
// - Retrieving order details from Printful (GET /order/:orderId)
// - Exporting createPrintfulOrder function for webhook usage
//
// All orders are created as drafts and must be manually confirmed in Printful dashboard
// or via additional API calls before they are sent to fulfillment.

const express = require('express');
const router = express.Router();

// Printful API configuration
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const PRINTFUL_API_URL = 'https://api.printful.com';

// Validate API key is configured
if (!PRINTFUL_API_KEY) {
  console.error('❌ PRINTFUL_API_KEY is not set in .env file');
  console.error('   Please add your Printful API key to continue');
  process.exit(1);
}

/**
 * Create a Printful order
 * @param {Object} customerInfo - Customer details (name, address, email, etc.)
 * @param {Array} items - Array of product items with variant IDs
 * @returns {Promise<Object>} Order confirmation from Printful
 */
async function createPrintfulOrder(customerInfo, items) {
  const fetch = (await import('node-fetch')).default;

  // Format order data for Printful API
  const orderData = {
    recipient: {
      name: customerInfo.name,
      address1: customerInfo.address1,
      address2: customerInfo.address2 || '',
      city: customerInfo.city,
      state_code: customerInfo.state,
      country_code: customerInfo.country,
      zip: customerInfo.zip,
      email: customerInfo.email,
      phone: customerInfo.phone || '',
    },
    items: items.map((item) => ({
      variant_id: item.variantId,
      quantity: item.quantity || 1,
      retail_price: item.retailPrice ? item.retailPrice.toString() : undefined,
    })),
    confirm: false, // Set to false to create as draft order
  };

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Printful API error');
    }

    return {
      success: true,
      orderId: data.result.id,
      status: data.result.status,
      data: data.result,
    };
  } catch (error) {
    console.error('[Printful Order Creation Error]', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// POST /create-order
// Creates a draft order in Printful
router.post('/create-order', async (req, res) => {
  try {
    const { customer, items } = req.body;

    // Validate request body structure
    if (!customer || typeof customer !== 'object') {
      console.warn('[Printful Validation] Missing or invalid customer object');
      return res.status(400).json({
        error: 'Invalid request body',
        details: 'Request must include a valid customer object',
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.warn('[Printful Validation] Missing or invalid items array');
      return res.status(400).json({
        error: 'Invalid request body',
        details: 'Request must include an items array with at least one product',
      });
    }

    // Validate customer required fields
    const requiredFields = ['name', 'address1', 'city', 'state', 'country', 'zip', 'email'];
    const missingFields = requiredFields.filter((field) => !customer[field]);

    if (missingFields.length > 0) {
      console.warn(`[Printful Validation] Missing customer fields: ${missingFields.join(', ')}`);
      return res.status(400).json({
        error: 'Missing required customer information',
        details: `Required fields: ${missingFields.join(', ')}`,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email)) {
      console.warn(`[Printful Validation] Invalid email format: ${customer.email}`);
      return res.status(400).json({
        error: 'Invalid customer email',
        details: 'Please provide a valid email address',
      });
    }

    // Validate each item has required fields
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.variantId || typeof item.variantId !== 'number') {
        console.warn(`[Printful Validation] Item ${i} missing variantId`);
        return res.status(400).json({
          error: 'Invalid item data',
          details: `Item at index ${i} missing required field: variantId`,
        });
      }
      if (item.quantity && (typeof item.quantity !== 'number' || item.quantity < 1)) {
        console.warn(`[Printful Validation] Item ${i} invalid quantity: ${item.quantity}`);
        return res.status(400).json({
          error: 'Invalid item data',
          details: `Item at index ${i} has invalid quantity`,
        });
      }
    }

    console.log(`[Printful Order] Creating order for ${customer.email} with ${items.length} item(s)`);

    // Create order in Printful
    const result = await createPrintfulOrder(customer, items);

    if (!result.success) {
      console.error('[Printful Order] Failed to create order:', result.error);
      return res.status(500).json({
        error: 'Failed to create Printful order',
        details: result.error || 'Unknown error occurred',
      });
    }

    console.log(`[Printful Order] Successfully created order ${result.orderId}`);

    res.json({
      success: true,
      orderId: result.orderId,
      status: result.status,
      message: 'Draft order created successfully in Printful',
    });
  } catch (error) {
    console.error('[Printful Route Error]', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      error: 'Internal server error',
      details: 'An unexpected error occurred while creating the order',
    });
  }
});

// GET /order/:orderId
// Retrieves order details from Printful
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validate order ID
    if (!orderId || typeof orderId !== 'string') {
      console.warn('[Printful Validation] Missing or invalid order ID');
      return res.status(400).json({
        error: 'Invalid order ID',
        details: 'Order ID is required',
      });
    }

    // Validate order ID is a number string
    if (!/^\d+$/.test(orderId)) {
      console.warn(`[Printful Validation] Invalid order ID format: ${orderId}`);
      return res.status(400).json({
        error: 'Invalid order ID format',
        details: 'Order ID must be numeric',
      });
    }

    console.log(`[Printful Order] Retrieving order: ${orderId}`);

    const fetch = (await import('node-fetch')).default;

    const response = await fetch(`${PRINTFUL_API_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || 'Failed to fetch order';
      console.error(`[Printful Get Order Error] ${response.status}: ${errorMessage}`);

      if (response.status === 404) {
        return res.status(404).json({
          error: 'Order not found',
          details: `Order ${orderId} does not exist in Printful`,
        });
      }

      if (response.status === 401 || response.status === 403) {
        return res.status(500).json({
          error: 'Printful authentication error',
          details: 'Unable to authenticate with Printful API',
        });
      }

      throw new Error(errorMessage);
    }

    console.log(`[Printful Order] Retrieved order ${orderId}, status: ${data.result.status}`);

    res.json({ order: data.result });
  } catch (error) {
    console.error('[Printful Get Order Error]', {
      message: error.message,
      orderId: req.params.orderId,
    });
    res.status(500).json({
      error: 'Failed to retrieve order',
      details: 'An unexpected error occurred while fetching order details',
    });
  }
});

module.exports = router;
// Export createPrintfulOrder for use in webhook handler
module.exports.createPrintfulOrder = createPrintfulOrder;
