// Database initialization
// Creates tables and sets up the database schema

const { getDatabase } = require('../utils/db');

/**
 * Initialize database schema
 * Creates the orders table if it doesn't exist
 * Safe to run multiple times (uses IF NOT EXISTS)
 */
function initializeDatabase() {
  console.log('[Database Init] Starting database initialization...');

  const db = getDatabase();

  // Create orders table
  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      -- Stripe information
      stripe_session_id TEXT UNIQUE NOT NULL,
      stripe_payment_status TEXT,
      stripe_amount_total REAL,

      -- Customer information (saved from webhook)
      customer_email TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT,

      -- Shipping address (stored as JSON)
      shipping_address TEXT NOT NULL,

      -- Order items (stored as JSON array)
      order_items TEXT NOT NULL,

      -- Printful tracking
      printful_order_id TEXT,
      printful_status TEXT DEFAULT 'pending',
      printful_error TEXT,
      printful_tracking_number TEXT,

      -- Retry mechanism
      retry_count INTEGER DEFAULT 0,
      last_retry_at DATETIME,
      next_retry_at DATETIME,

      -- Timestamps
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      -- Indexes for common queries
      CONSTRAINT valid_status CHECK (printful_status IN ('pending', 'processing', 'created', 'failed', 'shipped', 'cancelled'))
    )
  `;

  db.exec(createOrdersTable);
  console.log('[Database Init] ✅ Orders table created/verified');

  // Create indexes for performance
  const createIndexes = `
    CREATE INDEX IF NOT EXISTS idx_orders_stripe_session
      ON orders(stripe_session_id);

    CREATE INDEX IF NOT EXISTS idx_orders_customer_email
      ON orders(customer_email);

    CREATE INDEX IF NOT EXISTS idx_orders_printful_status
      ON orders(printful_status);

    CREATE INDEX IF NOT EXISTS idx_orders_created_at
      ON orders(created_at DESC);

    CREATE INDEX IF NOT EXISTS idx_orders_next_retry
      ON orders(next_retry_at)
      WHERE printful_status = 'failed' AND retry_count < 5;
  `;

  db.exec(createIndexes);
  console.log('[Database Init] ✅ Indexes created/verified');

  // Create trigger to update updated_at timestamp
  const createTrigger = `
    CREATE TRIGGER IF NOT EXISTS update_orders_timestamp
    AFTER UPDATE ON orders
    BEGIN
      UPDATE orders SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
  `;

  db.exec(createTrigger);
  console.log('[Database Init] ✅ Triggers created/verified');

  // Get table info for verification
  const tableInfo = db.prepare("SELECT COUNT(*) as count FROM orders").get();
  console.log(`[Database Init] ✅ Database ready. Current orders count: ${tableInfo.count}`);

  console.log('[Database Init] 🎉 Database initialization complete!');
}

module.exports = {
  initializeDatabase
};
