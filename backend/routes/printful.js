// Printful API routes
// Handles order creation and fulfillment through Printful

const express = require('express');
const router = express.Router();

// Printful API configuration
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const PRINTFUL_API_URL = 'https://api.printful.com';

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

    // Validate request body
    if (!customer || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Invalid request body. Required: customer object and items array',
      });
    }

    // Validate customer info
    const requiredFields = ['name', 'address1', 'city', 'state', 'country', 'zip', 'email'];
    const missingFields = requiredFields.filter((field) => !customer[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required customer fields: ${missingFields.join(', ')}`,
      });
    }

    // Create order in Printful
    const result = await createPrintfulOrder(customer, items);

    if (!result.success) {
      return res.status(500).json({
        error: 'Failed to create Printful order',
        details: result.error,
      });
    }

    res.json({
      success: true,
      orderId: result.orderId,
      status: result.status,
      message: 'Draft order created successfully in Printful',
    });
  } catch (error) {
    console.error('[Printful Route Error]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /order/:orderId
// Retrieves order details from Printful
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const fetch = (await import('node-fetch')).default;

    const response = await fetch(`${PRINTFUL_API_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch order');
    }

    res.json({ order: data.result });
  } catch (error) {
    console.error('[Printful Get Order Error]', error);
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
});

module.exports = router;
