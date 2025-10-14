// Keep-alive utility to prevent Render free tier from spinning down
// Pings backend health endpoint every 10 minutes

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

let pingIntervalId = null;

/**
 * Pings the backend health endpoint to keep server awake
 */
const pingBackend = async () => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      cache: 'no-cache',
    });

    if (response.ok) {
      console.log('[KeepAlive] ✅ Backend health check successful');
    } else {
      console.warn('[KeepAlive] ⚠️ Backend responded with status:', response.status);
    }
  } catch (error) {
    console.warn('[KeepAlive] ❌ Failed to ping backend:', error.message);
    // Don't throw - this runs in background, failures are OK
  }
};

/**
 * Starts the keep-alive interval
 * Call this once when app loads
 */
export const startKeepAlive = () => {
  // Don't start if already running
  if (pingIntervalId) {
    console.log('[KeepAlive] Already running');
    return;
  }

  // Only run in production (not localhost development)
  if (API_URL.includes('localhost')) {
    console.log('[KeepAlive] Skipping keep-alive on localhost');
    return;
  }

  console.log('[KeepAlive] 🚀 Starting keep-alive ping (every 10 minutes)');

  // Ping immediately on start
  pingBackend();

  // Then ping every 10 minutes
  pingIntervalId = setInterval(pingBackend, PING_INTERVAL);
};

/**
 * Stops the keep-alive interval
 * Call this on cleanup if needed
 */
export const stopKeepAlive = () => {
  if (pingIntervalId) {
    clearInterval(pingIntervalId);
    pingIntervalId = null;
    console.log('[KeepAlive] 🛑 Keep-alive stopped');
  }
};

// Export as default for convenience
const keepAlive = { startKeepAlive, stopKeepAlive };
export default keepAlive;
