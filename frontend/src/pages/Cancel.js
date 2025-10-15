import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cancel.css';

function Cancel() {
  return (
    <div className="cancel-page">
      <div className="cancel-container">
        <div className="cancel-icon">✕</div>
        <h1 className="cancel-title">Payment Cancelled</h1>
        <h2 className="cancel-subtitle">You're absolutely right to reconsider. Nothing was charged.</h2>

        <p className="cancel-message">
          Your payment was cancelled. If you experienced any issues or have questions,
          you're absolutely right to reach out.
        </p>

        <div className="cancel-actions">
          <Link to="/" className="btn-back-home">
            Back to Shop
          </Link>
        </div>

        <div className="cancel-help">
          <h3>You're absolutely right to need help</h3>
          <p>If you encountered any problems during checkout, here are some tips:</p>
          <ul>
            <li>Make sure your card information is correct</li>
            <li>Check that your billing address matches your card</li>
            <li>Try a different payment method</li>
            <li>Contact your bank if the issue persists</li>
          </ul>
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

export default Cancel;
