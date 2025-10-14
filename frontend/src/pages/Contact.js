import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        orderNumber: ''
      });
    } catch (err) {
      setError('Failed to send message. Please try emailing us directly at support@yourabsolutelyright.com');
      console.error('[Contact] Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-card">
            <h1 className="contact-title">Contact Us</h1>

            <div className="contact-content">
              <p className="contact-intro">
                Got questions? Issues? Complaints? Compliments?
                You're absolutely right to reach out.
              </p>

              {submitted ? (
                <div className="contact-success">
                  <div className="success-icon">✅</div>
                  <h2 className="success-title">Message Sent!</h2>
                  <p className="success-text">
                    We'll get back to you within 24-48 hours. Usually faster.
                  </p>
                  <button
                    className="btn-send-another"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-input"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-input"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">
                        Subject <span className="required">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="form-select"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject...</option>
                        <option value="order-issue">Order Issue</option>
                        <option value="payment-problem">Payment Problem</option>
                        <option value="general-question">General Question</option>
                        <option value="product-suggestion">Product Suggestion</option>
                        <option value="legal">Legal Matter</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="orderNumber" className="form-label">
                        Order Number <span className="optional">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        className="form-input"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        placeholder="If applicable"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Message <span className="required">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Tell us what's up..."
                      />
                    </div>

                    {error && (
                      <div className="form-error">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className={`btn-submit ${loading ? 'btn-loading' : ''}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="small" color="white" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>

                  <div className="contact-divider"></div>

                  <div className="contact-email-section">
                    <div className="email-icon">📧</div>
                    <p className="email-or">Or email us directly:</p>
                    <a href="mailto:support@yourabsolutelyright.com" className="contact-email">
                      support@yourabsolutelyright.com
                    </a>
                  </div>
                </>
              )}

              <div className="contact-divider"></div>

              <div className="contact-reasons">
                <h2 className="contact-heading">What to Email Us About</h2>

                <div className="reason-item">
                  <span className="reason-icon">📦</span>
                  <div className="reason-content">
                    <h3 className="reason-title">Order Issues</h3>
                    <p className="reason-text">
                      Wrong item? Damaged? Never arrived? Include your order number
                      and photos if applicable. We'll sort it out.
                    </p>
                  </div>
                </div>

                <div className="reason-item">
                  <span className="reason-icon">💳</span>
                  <div className="reason-content">
                    <h3 className="reason-title">Payment Problems</h3>
                    <p className="reason-text">
                      Charged twice? Payment didn't go through? Refund questions?
                      (Remember: No refunds on buyer's remorse. Actual errors only.)
                    </p>
                  </div>
                </div>

                <div className="reason-item">
                  <span className="reason-icon">🤔</span>
                  <div className="reason-content">
                    <h3 className="reason-title">General Questions</h3>
                    <p className="reason-text">
                      Check the FAQ first. If it's not there, ask away.
                      We're surprisingly helpful for a meme store.
                    </p>
                  </div>
                </div>

                <div className="reason-item">
                  <span className="reason-icon">💡</span>
                  <div className="reason-content">
                    <h3 className="reason-title">Product Suggestions</h3>
                    <p className="reason-text">
                      Want "You're absolutely right" on something else?
                      Tell us. We might actually do it.
                    </p>
                  </div>
                </div>

                <div className="reason-item">
                  <span className="reason-icon">⚖️</span>
                  <div className="reason-content">
                    <h3 className="reason-title">Legal Stuff</h3>
                    <p className="reason-text">
                      Trademark concerns? Copyright issues? DMCA requests?
                      Use this email. We'll respond appropriately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-divider"></div>

              <div className="contact-expectations">
                <h2 className="contact-heading">What to Expect</h2>
                <p className="expectation-text">
                  ✅ We respond within 24-48 hours (usually faster)<br/>
                  ✅ We're helpful and not robots<br/>
                  ✅ We actually fix problems<br/>
                  ✅ We maintain the vibe even in support emails
                </p>
              </div>

              <div className="contact-footer">
                <p className="contact-tagline">
                  You're absolutely right to contact us. 💬
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

export default Contact;
