import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/Success.css';

function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch session details if session_id is present
    if (sessionId) {
      fetchSessionDetails(sessionId);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const fetchSessionDetails = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/stripe/session/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch session details');
      }

      const data = await response.json();
      setSessionData(data.session);
    } catch (err) {
      console.error('[Success] Error fetching session:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1 className="success-title">You're absolutely right!</h1>
        <h2 className="success-subtitle">Your order is confirmed. Good choice.</h2>

        {loading && (
          <p className="success-message">Loading order details...</p>
        )}

        {error && (
          <p className="success-message">
            Your payment was successful. A confirmation email will be sent to you shortly.
          </p>
        )}

        {!loading && !error && sessionData && (
          <div className="order-details">
            <p className="success-message">
              You're absolutely right — that purchase was worth it. We've received your order and will send you
              a confirmation email shortly.
            </p>
            {sessionData.customer_details?.email && (
              <p className="customer-email">
                Confirmation sent to: <strong>{sessionData.customer_details.email}</strong>
              </p>
            )}
            {sessionId && (
              <p className="order-id">
                Order ID: <span>{sessionId}</span>
              </p>
            )}
          </div>
        )}

        {!loading && !sessionData && !sessionId && (
          <p className="success-message">
            Your order has been placed successfully. You'll receive a confirmation email soon.
          </p>
        )}

        <div className="success-actions">
          <Link to="/" className="btn-continue">
            Continue Shopping
          </Link>
        </div>

        <div className="success-note">
          <p>You're absolutely right to expect quality. Your order will be processed and shipped through Printful.</p>
          <p>Typical delivery time: 5-7 business days</p>
          <div className="security-badge-checkout">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="currentColor" opacity="0.2"/>
              <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Payment secured by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
