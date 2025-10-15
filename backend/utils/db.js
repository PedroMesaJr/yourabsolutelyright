// Database connection singleton
// Provides a single shared connection to the SQLite database
// Using better-sqlite3 for synchronous, faster operations

const Database = require('better-sqlite3');
const path = require('path');

let db = null;

/**
 * Get database connection (singleton pattern)
 * Creates connection on first call, returns existing connection on subsequent calls
 * @returns {Database} SQLite database connection
 */
function getDatabase() {
  if (!db) {
    const dbPath = path.join(__dirname, '..', 'database', 'orders.db');
    console.log('[Database] Connecting to database:', dbPath);

    db = new Database(dbPath, {
      verbose: process.env.NODE_ENV === 'development' ? console.log : null
    });

    // Enable foreign keys
    db.pragma('foreign_keys = ON');

    // Set WAL mode for better concurrency
    db.pragma('journal_mode = WAL');

    console.log('[Database] ✅ Connected successfully');
  }

  return db;
}

/**
 * Close database connection
 * Should be called on server shutdown
 */
function closeDatabase() {
  if (db) {
    console.log('[Database] Closing connection...');
    db.close();
    db = null;
    console.log('[Database] ✅ Connection closed');
  }
}

module.exports = {
  getDatabase,
  closeDatabase
};
