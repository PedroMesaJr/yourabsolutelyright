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
                We're not creeps. We collect minimal data, store nothing unnecessary,
                and don't sell your info. You're absolutely right to care about privacy.
              </p>

              <div className="privacy-section">
                <h2 className="privacy-heading">What We Collect</h2>
                <p className="privacy-text">
                  <strong>Email:</strong> For order confirmations and shipping updates. That's it.
                  We don't spam you with marketing emails unless you explicitly opt in.
                </p>
                <p className="privacy-text">
                  <strong>Shipping Address:</strong> Obviously needed to ship your order.
                  Printful handles fulfillment, so they get this too. They're trustworthy.
                </p>
                <p className="privacy-text">
                  <strong>Payment Info:</strong> We never see your credit card. Stripe handles
                  all payment processing. Your data is encrypted and secure.
                </p>
                <p className="privacy-text">
                  <strong>Basic Analytics:</strong> We use standard web analytics to see how many
                  people visit, which pages they view, and how long they stay. No personal identification.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">What We Don't Do</h2>
                <p className="privacy-text">
                  ❌ We don't sell your data to third parties.<br/>
                  ❌ We don't track you across other websites.<br/>
                  ❌ We don't spam your inbox with promotions.<br/>
                  ❌ We don't store your credit card information.<br/>
                  ❌ We don't care about your browsing history.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Third-Party Services</h2>
                <p className="privacy-text">
                  <strong>Stripe:</strong> Handles all payment processing. They're PCI compliant
                  and know what they're doing. Read their privacy policy if you're curious.
                </p>
                <p className="privacy-text">
                  <strong>Printful:</strong> Produces and ships your orders. They need your shipping
                  address to deliver products. They don't use it for anything else.
                </p>
                <p className="privacy-text">
                  <strong>Web Analytics:</strong> We use basic analytics to improve the site.
                  No personally identifiable information is collected.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Cookies</h2>
                <p className="privacy-text">
                  We use essential cookies to keep your shopping cart working and remember
                  your session. No tracking cookies. No advertising cookies. No nonsense.
                </p>
                <p className="privacy-text">
                  If you disable cookies, the site might not work properly. But you're
                  absolutely right to have control over your browser settings.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Data Security</h2>
                <p className="privacy-text">
                  All data transmitted to our site is encrypted via HTTPS. We use industry-standard
                  security practices. However, no method of transmission over the internet is 100%
                  secure. Use common sense.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Your Rights</h2>
                <p className="privacy-text">
                  You have the right to:<br/>
                  • Request a copy of your data<br/>
                  • Request deletion of your data<br/>
                  • Opt out of marketing emails (if you ever opted in)<br/>
                  • Update your information
                </p>
                <p className="privacy-text">
                  Email us if you want to exercise these rights. We'll respond within a
                  reasonable timeframe. Probably faster than most companies because we're
                  not dealing with millions of users.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Children's Privacy</h2>
                <p className="privacy-text">
                  This site is not intended for children under 13. We don't knowingly collect
                  data from kids. If you're a parent and think your child gave us information,
                  contact us and we'll delete it.
                </p>
              </div>

              <div className="privacy-section">
                <h2 className="privacy-heading">Changes to This Policy</h2>
                <p className="privacy-text">
                  We might update this policy occasionally. Check back if you care.
                  We won't make any shady changes. Promise.
                </p>
              </div>

              <div className="privacy-footer">
                <p className="privacy-summary">
                  <strong>TL;DR:</strong> We collect your email and shipping address to fulfill
                  orders. Stripe handles payments. Printful ships products. We don't sell your data.
                  We're not evil.
                </p>
                <p className="privacy-tagline">
                  You're absolutely right to read privacy policies. 🔒
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
