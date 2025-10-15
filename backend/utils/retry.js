// Retry utility for failed Printful orders
// Implements automatic retry with exponential backoff

const Order = require('../models/Order');
const { createPrintfulOrder } = require('../routes/printful');

/**
 * Process all orders pending retry
 * Should be called periodically (e.g., via cron job or setInterval)
 * @returns {Object} Retry statistics
 */
async function processRetries() {
  console.log('[Retry] Starting retry process...');

  const pendingOrders = Order.getPendingRetries();
  console.log(`[Retry] Found ${pendingOrders.length} orders pending retry`);

  const stats = {
    total: pendingOrders.length,
    successful: 0,
    failed: 0,
    skipped: 0
  };

  for (const order of pendingOrders) {
    try {
      console.log(`[Retry] Attempting to retry order ${order.id} (attempt ${order.retry_count + 1}/5)`);

      // Prepare customer info for Printful
      const customer = {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone,
        ...order.shipping_address
      };

      // Attempt to create Printful order
      const printfulOrder = await createPrintfulOrder(customer, order.order_items);

      if (printfulOrder.success) {
        // Success! Update database
        Order.updatePrintfulInfo(order.id, {
          orderId: printfulOrder.orderId,
          status: 'created'
        });
        console.log(`[Retry] ✅ Order ${order.id} retry successful! Printful ID: ${printfulOrder.orderId}`);
        stats.successful++;
      } else {
        // Failed again, mark for next retry
        Order.markAsFailed(order.id, printfulOrder.error);
        console.log(`[Retry] ❌ Order ${order.id} retry failed: ${printfulOrder.error}`);
        stats.failed++;
      }

      // Add delay between retries to avoid rate limiting (1 second)
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`[Retry] Error processing order ${order.id}:`, error.message);
      Order.markAsFailed(order.id, error.message);
      stats.failed++;
    }
  }

  console.log(`[Retry] Retry process complete. Success: ${stats.successful}, Failed: ${stats.failed}, Total: ${stats.total}`);
  return stats;
}

/**
 * Start automatic retry scheduler
 * Checks for failed orders every 5 minutes
 * @param {number} intervalMinutes - How often to check (default: 5 minutes)
 */
function startRetryScheduler(intervalMinutes = 5) {
  const intervalMs = intervalMinutes * 60 * 1000;

  console.log(`[Retry Scheduler] Starting... Will check every ${intervalMinutes} minutes`);

  // Run immediately on startup
  processRetries().catch(error => {
    console.error('[Retry Scheduler] Initial retry failed:', error);
  });

  // Then run on interval
  const intervalId = setInterval(async () => {
    try {
      await processRetries();
    } catch (error) {
      console.error('[Retry Scheduler] Scheduled retry failed:', error);
    }
  }, intervalMs);

  // Return interval ID so it can be cleared if needed
  return intervalId;
}

/**
 * Manually retry a specific order by ID
 * @param {number} orderId - Order ID to retry
 * @returns {Object} Retry result
 */
async function retryOrder(orderId) {
  console.log(`[Retry] Manual retry requested for order ${orderId}`);

  const order = Order.findById(orderId);

  if (!order) {
    throw new Error(`Order ${orderId} not found`);
  }

  if (order.printful_status === 'created' || order.printful_status === 'shipped') {
    throw new Error(`Order ${orderId} is already ${order.printful_status}`);
  }

  // Prepare customer info
  const customer = {
    name: order.customer_name,
    email: order.customer_email,
    phone: order.customer_phone,
    ...order.shipping_address
  };

  // Attempt to create Printful order
  const printfulOrder = await createPrintfulOrder(customer, order.order_items);

  if (printfulOrder.success) {
    Order.updatePrintfulInfo(order.id, {
      orderId: printfulOrder.orderId,
      status: 'created'
    });
    console.log(`[Retry] ✅ Manual retry successful for order ${orderId}`);
    return { success: true, orderId: printfulOrder.orderId };
  } else {
    Order.markAsFailed(order.id, printfulOrder.error);
    console.log(`[Retry] ❌ Manual retry failed for order ${orderId}: ${printfulOrder.error}`);
    return { success: false, error: printfulOrder.error };
  }
}

module.exports = {
  processRetries,
  startRetryScheduler,
  retryOrder
};
