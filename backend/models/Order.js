// Order model
// Handles all database operations for orders

const { getDatabase } = require('../utils/db');

class Order {
  /**
   * Create a new order in the database
   * @param {Object} orderData - Order information from Stripe webhook
   * @returns {Object} Created order with ID
   */
  static create(orderData) {
    const db = getDatabase();

    const {
      stripeSessionId,
      stripePaymentStatus,
      stripeAmountTotal,
      customerEmail,
      customerName,
      customerPhone,
      shippingAddress,
      orderItems
    } = orderData;

    // Validate required fields
    if (!stripeSessionId || !customerEmail || !customerName || !shippingAddress || !orderItems) {
      throw new Error('Missing required order fields');
    }

    const stmt = db.prepare(`
      INSERT INTO orders (
        stripe_session_id,
        stripe_payment_status,
        stripe_amount_total,
        customer_email,
        customer_name,
        customer_phone,
        shipping_address,
        order_items,
        printful_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `);

    try {
      const info = stmt.run(
        stripeSessionId,
        stripePaymentStatus || 'unknown',
        stripeAmountTotal || 0,
        customerEmail,
        customerName,
        customerPhone || '',
        JSON.stringify(shippingAddress),
        JSON.stringify(orderItems)
      );

      console.log(`[Order Model] ✅ Order created with ID: ${info.lastInsertRowid}`);

      return this.findById(info.lastInsertRowid);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        console.warn(`[Order Model] ⚠️ Order already exists: ${stripeSessionId}`);
        return this.findByStripeSessionId(stripeSessionId);
      }
      throw error;
    }
  }

  /**
   * Find order by ID
   * @param {number} id - Order ID
   * @returns {Object|null} Order object or null
   */
  static findById(id) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM orders WHERE id = ?');
    const order = stmt.get(id);

    if (order) {
      // Parse JSON fields
      order.shipping_address = JSON.parse(order.shipping_address);
      order.order_items = JSON.parse(order.order_items);
    }

    return order;
  }

  /**
   * Find order by Stripe session ID
   * @param {string} stripeSessionId - Stripe checkout session ID
   * @returns {Object|null} Order object or null
   */
  static findByStripeSessionId(stripeSessionId) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM orders WHERE stripe_session_id = ?');
    const order = stmt.get(stripeSessionId);

    if (order) {
      order.shipping_address = JSON.parse(order.shipping_address);
      order.order_items = JSON.parse(order.order_items);
    }

    return order;
  }

  /**
   * Find orders by customer email
   * @param {string} email - Customer email address
   * @returns {Array} Array of orders
   */
  static findByCustomerEmail(email) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC');
    const orders = stmt.all(email);

    return orders.map(order => ({
      ...order,
      shipping_address: JSON.parse(order.shipping_address),
      order_items: JSON.parse(order.order_items)
    }));
  }

  /**
   * Update Printful order information
   * @param {number} id - Order ID
   * @param {Object} printfulData - Printful order data
   */
  static updatePrintfulInfo(id, printfulData) {
    const db = getDatabase();

    const {
      orderId,
      status,
      error,
      trackingNumber
    } = printfulData;

    const stmt = db.prepare(`
      UPDATE orders
      SET
        printful_order_id = ?,
        printful_status = ?,
        printful_error = ?,
        printful_tracking_number = ?
      WHERE id = ?
    `);

    stmt.run(
      orderId || null,
      status || 'pending',
      error || null,
      trackingNumber || null,
      id
    );

    console.log(`[Order Model] ✅ Updated Printful info for order ${id}`);
  }

  /**
   * Mark order as failed and schedule retry
   * @param {number} id - Order ID
   * @param {string} error - Error message
   */
  static markAsFailed(id, error) {
    const db = getDatabase();

    // Calculate next retry time with exponential backoff
    // Retry in: 1min, 5min, 15min, 1hour, 6hours
    const retryDelays = [1, 5, 15, 60, 360]; // minutes
    const currentOrder = this.findById(id);
    const retryCount = currentOrder ? currentOrder.retry_count : 0;
    const delayMinutes = retryDelays[retryCount] || 360; // Max 6 hours

    const nextRetryAt = new Date(Date.now() + delayMinutes * 60 * 1000).toISOString();

    const stmt = db.prepare(`
      UPDATE orders
      SET
        printful_status = 'failed',
        printful_error = ?,
        retry_count = retry_count + 1,
        last_retry_at = CURRENT_TIMESTAMP,
        next_retry_at = ?
      WHERE id = ?
    `);

    stmt.run(error, nextRetryAt, id);

    console.log(`[Order Model] ⚠️ Order ${id} marked as failed. Retry count: ${retryCount + 1}, Next retry: ${nextRetryAt}`);
  }

  /**
   * Get orders pending retry
   * @returns {Array} Orders that need to be retried
   */
  static getPendingRetries() {
    const db = getDatabase();

    const stmt = db.prepare(`
      SELECT * FROM orders
      WHERE printful_status = 'failed'
        AND retry_count < 5
        AND (next_retry_at IS NULL OR datetime(next_retry_at) <= datetime('now'))
      ORDER BY retry_count ASC, created_at ASC
      LIMIT 50
    `);

    const orders = stmt.all();

    return orders.map(order => ({
      ...order,
      shipping_address: JSON.parse(order.shipping_address),
      order_items: JSON.parse(order.order_items)
    }));
  }

  /**
   * Get all orders with optional filters
   * @param {Object} filters - Query filters
   * @param {number} limit - Maximum number of results
   * @param {number} offset - Pagination offset
   * @returns {Array} Array of orders
   */
  static findAll(filters = {}, limit = 100, offset = 0) {
    const db = getDatabase();

    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (filters.status) {
      query += ' AND printful_status = ?';
      params.push(filters.status);
    }

    if (filters.email) {
      query += ' AND customer_email = ?';
      params.push(filters.email);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const stmt = db.prepare(query);
    const orders = stmt.all(...params);

    return orders.map(order => ({
      ...order,
      shipping_address: JSON.parse(order.shipping_address),
      order_items: JSON.parse(order.order_items)
    }));
  }

  /**
   * Get order statistics
   * @returns {Object} Order stats
   */
  static getStats() {
    const db = getDatabase();

    const stats = {
      total: db.prepare('SELECT COUNT(*) as count FROM orders').get().count,
      pending: db.prepare('SELECT COUNT(*) as count FROM orders WHERE printful_status = "pending"').get().count,
      processing: db.prepare('SELECT COUNT(*) as count FROM orders WHERE printful_status = "processing"').get().count,
      created: db.prepare('SELECT COUNT(*) as count FROM orders WHERE printful_status = "created"').get().count,
      failed: db.prepare('SELECT COUNT(*) as count FROM orders WHERE printful_status = "failed"').get().count,
      shipped: db.prepare('SELECT COUNT(*) as count FROM orders WHERE printful_status = "shipped"').get().count,
      needingRetry: db.prepare('SELECT COUNT(*) as count FROM orders WHERE printful_status = "failed" AND retry_count < 5').get().count
    };

    return stats;
  }
}

module.exports = Order;
