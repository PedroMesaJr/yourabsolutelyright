import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/Terms.css';

function Terms() {
  return (
    <>
      <Navigation />
      <div className="terms-page">
        <div className="terms-container">
          <div className="terms-card">
            <h1 className="terms-title">Terms & Conditions</h1>

            <div className="terms-content">
              <p className="terms-intro">
                You're absolutely right to read these. By using this site and purchasing products, you agree to these terms.
              </p>

              <div className="terms-section">
                <h2 className="terms-heading">1. Returns & Refunds</h2>
                <p className="terms-text">
                  You're absolutely right to keep it. All sales are final. No refunds, returns, or exchanges.
                </p>
                <p className="terms-text">
                  Exception: Manufacturing defects. If your product arrives damaged or misprinted,
                  you're absolutely right to be upset. Contact us with photos within 30 days for replacement.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">2. Shipping</h2>
                <p className="terms-text">
                  Printful produces and ships all orders. Production: 2-7 business days.
                  Shipping: 3-10 business days. International orders may take longer.
                </p>
                <p className="terms-text">
                  Track your order via confirmation email. Contact us if nothing arrives after 30 days.
                  We're not responsible for customs delays or fees.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">3. Intellectual Property</h2>
                <p className="terms-text">
                  This site is not affiliated with, endorsed by, or sponsored by Anthropic.
                  Claude AI is a trademark of Anthropic. This is fan-made merchandise.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">4. Payment & Security</h2>
                <p className="terms-text">
                  Stripe processes all payments. We never see or store credit card information.
                  All transactions are encrypted and secure.
                </p>
                <p className="terms-text">
                  Prices in USD. Discount codes available at checkout.
                  Use code <strong>CLAUDE30</strong> for 30% off.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">5. Liability</h2>
                <p className="terms-text">
                  You're absolutely right to use these products however you want.
                  We're not responsible for how you use them.
                  Maximum liability: The amount you paid for the product.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">6. Privacy</h2>
                <p className="terms-text">
                  We collect email and shipping address for order fulfillment only.
                  We don't sell your data or send spam. See Privacy Policy for details.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">7. Changes to Terms</h2>
                <p className="terms-text">
                  These terms may be updated. Continued use of the site constitutes acceptance
                  of updated terms.
                </p>
              </div>

              <div className="terms-footer">
                <p className="terms-summary">
                  <strong>Summary:</strong> All sales final. Printful handles production and shipping.
                  Stripe processes payments. Questions? Email support@yourabsolutelyright.com
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

export default Terms;
