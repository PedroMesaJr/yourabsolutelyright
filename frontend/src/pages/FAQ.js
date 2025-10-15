import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/FAQ.css';

function FAQ() {
  return (
    <>
      <Navigation />
      <div className="faq-page">
        <div className="faq-container">
          <div className="faq-card">
            <h1 className="faq-title">Frequently Asked Questions</h1>

            <div className="faq-content">
              <div className="faq-item">
                <h2 className="faq-question">Do you ship internationally?</h2>
                <p className="faq-answer">
                  You're absolutely right, we do. Worldwide. Printful handles fulfillment globally.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">How long until it arrives?</h2>
                <p className="faq-answer">
                  You're absolutely right to ask. 2-7 days to print, 3-10 days to ship. Worth the wait.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">What if it arrives damaged?</h2>
                <p className="faq-answer">
                  You're absolutely right to be concerned. Send us photos. We'll replace it. Manufacturing defects only.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">Is this official Claude merch?</h2>
                <p className="faq-answer">
                  You're absolutely right to check. No. This is fan-made. Anthropic doesn't endorse this.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">Can I use a discount code?</h2>
                <p className="faq-answer highlight-answer">
                  Use code <strong>CLAUDE30</strong> for 30% off. 💰
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">What's your refund policy?</h2>
                <p className="faq-answer">
                  You're absolutely right to keep it. All sales final. No refunds, no returns.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">Still have questions?</h2>
                <p className="faq-answer">
                  Email us at support@yourabsolutelyright.com
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

export default FAQ;
