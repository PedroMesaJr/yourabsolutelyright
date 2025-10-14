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
                By using this site and buying our stuff, you agree to these terms.
                You're absolutely right to read them first.
              </p>

              <div className="terms-section">
                <h2 className="terms-heading">1. No Refunds</h2>
                <p className="terms-text">
                  All sales are final. No refunds. No returns. No exchanges.
                  You clicked "Buy Now" with your own free will.
                </p>
                <p className="terms-text">
                  Exception: Actual manufacturing defects. If your product arrives damaged
                  or misprinted, contact us with photos within 30 days. We'll work with
                  Printful to replace it. "I changed my mind" doesn't count.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">2. Shipping</h2>
                <p className="terms-text">
                  Orders are produced and shipped by Printful. Production takes 2-7 business days.
                  Shipping takes 3-10 business days. International orders may take longer.
                  We're not responsible for customs delays or fees.
                </p>
                <p className="terms-text">
                  Track your order through the confirmation email. If it's been 30 days
                  and nothing arrived, contact us. Otherwise, patience is a virtue.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">3. Intellectual Property</h2>
                <p className="terms-text">
                  "You're absolutely right" is a phrase Claude AI says a lot. We didn't invent it.
                  Anthropic owns Claude. We're just making jokes about it.
                </p>
                <p className="terms-text">
                  This site is not affiliated with, endorsed by, or sponsored by Anthropic.
                  If they ask us to take it down, we probably will. Until then, we're vibing.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">4. Payment & Security</h2>
                <p className="terms-text">
                  All payments are processed securely by Stripe. We never see or store
                  your credit card information. Your data is encrypted and safe.
                </p>
                <p className="terms-text">
                  Prices are in USD. Discount codes can be applied at checkout.
                  Use code <strong>CLAUDE20</strong> for 20% off while it lasts.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">5. Liability</h2>
                <p className="terms-text">
                  We're not responsible for how you use these products. If wearing a
                  "You're absolutely right" hoodie causes an argument with your spouse,
                  that's on you. If your mug spills coffee on your laptop, that's on you too.
                </p>
                <p className="terms-text">
                  Maximum liability: The amount you paid for the product. That's it.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">6. Privacy</h2>
                <p className="terms-text">
                  We collect minimal data: Email for order confirmations, shipping address
                  for delivery. That's it. We don't sell your data. We don't spam you.
                  We're too busy making memes to care about your browsing history.
                </p>
              </div>

              <div className="terms-section">
                <h2 className="terms-heading">7. Changes to Terms</h2>
                <p className="terms-text">
                  We can update these terms anytime. Check back occasionally.
                  Continued use of the site means you accept the updated terms.
                  You're absolutely right to stay informed.
                </p>
              </div>

              <div className="terms-footer">
                <p className="terms-summary">
                  <strong>TL;DR:</strong> No refunds. Printful handles production.
                  Stripe handles payments. We handle the vibes. Questions? Email us.
                </p>
                <p className="terms-tagline">
                  You're absolutely right to agree to all of this. ✨
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
