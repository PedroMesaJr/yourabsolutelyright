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
                <h2 className="faq-question">Can I return this?</h2>
                <p className="faq-answer">No. No refunds. You're absolutely right to keep it.</p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">When will it ship?</h2>
                <p className="faq-answer">
                  2-7 business days for production, then 3-10 days for shipping.
                  We're not Amazon. It's worth the wait.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">Do you ship internationally?</h2>
                <p className="faq-answer">
                  Yes. Printful ships worldwide. You're absolutely right no matter where you live.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">What if it's damaged?</h2>
                <p className="faq-answer">
                  Contact us with photos. We'll work with Printful to make it right.
                  Actual defects only. "I changed my mind" doesn't count.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">Is this official Claude merch?</h2>
                <p className="faq-answer">
                  Absolutely not. This is a joke that became a business.
                  Anthropic is probably laughing at us. Or suing us. TBD.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">Why is it so expensive?</h2>
                <p className="faq-answer">
                  Print-on-demand isn't cheap. We're not running a charity here.
                  Plus, you're paying for the vibe. The aesthetic. The meme.
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">Can I use the discount code?</h2>
                <p className="faq-answer highlight-answer">
                  YES. Use code <strong>CLAUDE20</strong> for 20% off.
                  You're absolutely right to save money. 💰
                </p>
              </div>

              <div className="faq-divider"></div>

              <div className="faq-item">
                <h2 className="faq-question">I have another question...</h2>
                <p className="faq-answer">
                  Email us. Or don't. Whatever you decide, you're absolutely right.
                </p>
              </div>

              <div className="faq-reminder">
                <p className="reminder-text">Remember: No refunds. All sales final.</p>
                <p className="reminder-text">You're absolutely right to agree to this. ✨</p>
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
