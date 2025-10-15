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
            <div className="contact-content">
              {submitted ? (
                <div className="contact-success">
                  <div className="success-icon">✅</div>
                  <h2 className="success-title">Message Sent</h2>
                  <p className="success-text">We'll respond within 24-48 hours.</p>
                  <button
                    className="btn-send-another"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-header">
                    <div className="header-left">
                      <h1 className="contact-title">Get in Touch</h1>
                      <p className="contact-subtitle">We typically respond within 24-48 hours</p>
                    </div>
                    <a href="mailto:support@yourabsolutelyright.com" className="contact-email-link">
                      <span className="email-icon">✉</span>
                      support@yourabsolutelyright.com
                    </a>
                  </div>

                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-input"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Name"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-input"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Email"
                        />
                      </div>

                      <div className="form-group">
                        <select
                          id="subject"
                          name="subject"
                          className="form-select"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Subject</option>
                          <option value="order-issue">Order Issue</option>
                          <option value="payment-problem">Payment Problem</option>
                          <option value="general-question">General Question</option>
                          <option value="product-suggestion">Product Suggestion</option>
                          <option value="legal">Legal Matter</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          id="orderNumber"
                          name="orderNumber"
                          className="form-input"
                          value={formData.orderNumber}
                          onChange={handleChange}
                          placeholder="Order # (optional)"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="3"
                        placeholder="Message"
                      />
                    </div>

                    {error && (
                      <div className="form-error">
                        {error}
                      </div>
                    )}

                    <div className="form-footer">
                      <div className="contact-info">
                        <div className="info-item">
                          <span className="info-label">Response Time</span>
                          <span className="info-value">24-48 hours</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Support</span>
                          <span className="info-value">Orders & General</span>
                        </div>
                      </div>
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
                          <>
                            <span>Send Message</span>
                            <span className="btn-arrow">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
