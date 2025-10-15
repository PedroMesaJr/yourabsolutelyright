import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/Privacy.css';

function Privacy() {
  return (
    <>
      <Navigation />
      <div className="privacy-page">
        <div className="privacy-container">
          <div className="privacy-card">
            <h1 className="privacy-title">Privacy Policy</h1>

            <div className="privacy-content">
              <p className="privacy-intro">
                We collect minimal data and don't sell your information.
              </p>

              <div className="privacy-section">
                <h2 className="privacy-heading">What We Collect</h2>
                <p className="privacy-text">
                  <strong>Email:</strong> Order confirmations and shipping updates only.
                </p>
                <p className="privacy-text">
                  <strong>Shipping Address:</strong> Required for delivery. Shared with Printful for fulfillment.
                </p>
                <p className="privacy-text">
                  <strong>Payment Information:</strong> Processed by Stripe. We never see your credit card details.
                </p>
                <p className="privacy-text">
                  <strong>Analytics:</strong> Basic visitor data (page views, duration). No personal identification.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">What We Don't Do</h2>
                <p className="privacy-text">
                  We don't sell your data.<br/>
                  We don't track you across other sites.<br/>
                  We don't send unsolicited marketing.<br/>
                  We don't store payment information.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Third-Party Services</h2>
                <p className="privacy-text">
                  <strong>Stripe:</strong> Payment processing. PCI compliant and secure.
                </p>
                <p className="privacy-text">
                  <strong>Printful:</strong> Production and fulfillment. Requires shipping address for delivery.
                </p>
                <p className="privacy-text">
                  <strong>Analytics:</strong> Anonymous visitor metrics for site improvement.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Cookies</h2>
                <p className="privacy-text">
                  Essential cookies maintain shopping cart and session functionality.
                  No tracking or advertising cookies.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Data Security</h2>
                <p className="privacy-text">
                  All data transmitted via encrypted HTTPS. Industry-standard security practices.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Your Rights</h2>
                <p className="privacy-text">
                  • Request a copy of your data<br/>
                  • Request data deletion<br/>
                  • Opt out of marketing emails<br/>
                  • Update your information
                </p>
                <p className="privacy-text">
                  Email support@yourabsolutelyright.com to exercise these rights.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Children's Privacy</h2>
                <p className="privacy-text">
                  Not intended for users under 13. We don't knowingly collect data from children.
                  Contact us if we need to delete a child's information.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Policy Updates</h2>
                <p className="privacy-text">
                  This policy may be updated. Continued use constitutes acceptance of changes.
                </p>
              </div>

              <div className="privacy-footer">
                <p className="privacy-summary">
                  <strong>Summary:</strong> We collect email and shipping address for order fulfillment.
                  Stripe processes payments. Printful ships products. We don't sell your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
