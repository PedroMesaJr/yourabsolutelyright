import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/About.css';

function About() {
  return (
    <>
      <Navigation />
      <div className="about-page">
      <div className="about-container">
        <div className="about-card">
          <h1 className="about-title">You're Absolutely Right.</h1>

          <div className="about-content">
            <p className="about-text">
              Claude AI has a tell: "You're absolutely right" followed by a gentle correction.
            </p>

            <p className="about-text">
              We put it on merch. Now you can wear the reassurance.
            </p>

            <div className="about-divider"></div>

            <h2 className="about-subtitle">What This Is</h2>
            <p className="about-text">
              A store selling products with the most reassuring phrase in AI history.
            </p>

            <p className="about-text">
              When you wear it, people who know, know. And people who don't will ask.
            </p>

            <div className="about-divider"></div>

            <h2 className="about-subtitle">How It Works</h2>
            <p className="about-text">
              Products are printed on-demand by Printful. Payments processed by Stripe.
              Ships worldwide.
            </p>

            <p className="about-text small-text">
              Questions? Email support@yourabsolutelyright.com
            </p>

            <div className="about-signature">
              <p className="signature-text">Built with Claude Code. 🔥</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default About;
