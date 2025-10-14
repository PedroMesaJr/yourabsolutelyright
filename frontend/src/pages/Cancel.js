import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cancel.css';

function Cancel() {
  return (
    <div className="cancel-page">
      <div className="cancel-container">
        <div className="cancel-icon">✕</div>
        <h1 className="cancel-title">Payment Cancelled</h1>
        <h2 className="cancel-subtitle">No worries, nothing was charged</h2>

        <p className="cancel-message">
          Your payment was cancelled. If you experienced any issues or have questions,
          please don't hesitate to reach out.
        </p>

        <div className="cancel-actions">
          <Link to="/" className="btn-back-home">
            Back to Shop
          </Link>
        </div>

        <div className="cancel-help">
          <h3>Need help?</h3>
          <p>If you encountered any problems during checkout, here are some tips:</p>
          <ul>
            <li>Make sure your card information is correct</li>
            <li>Check that your billing address matches your card</li>
            <li>Try a different payment method</li>
            <li>Contact your bank if the issue persists</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
