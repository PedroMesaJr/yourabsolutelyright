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
              Ever notice how Claude AI always says "You're absolutely right" before gently correcting you?
              Yeah, we did too. 🤖
            </p>

            <p className="about-text">
              So we made merch about it.
            </p>

            <div className="about-divider"></div>

            <h2 className="about-subtitle">The Story</h2>
            <p className="about-text">
              This started as a joke. Then it became a website. Now it's a real store selling
              real products with the most reassuring phrase in AI history.
            </p>

            <p className="about-text">
              Because sometimes you need a mug that validates you, even when you're wrong.
            </p>

            <div className="about-divider"></div>

            <h2 className="about-subtitle">Why Though?</h2>
            <p className="about-text">
              Look, we're not here to change the world. We're here to put "You're absolutely right"
              on things you can buy. That's it. That's the business model.
            </p>

            <p className="about-text highlight-text">
              You're absolutely right to be here. 💯
            </p>

            <div className="about-divider"></div>

            <h2 className="about-subtitle">The Fine Print</h2>
            <p className="about-text small-text">
              All products are printed on-demand by Printful (because we're not running a warehouse).
              Payments processed securely by Stripe (because we're not storing your credit card info).
              Orders ship worldwide (because geography is just a social construct).
            </p>

            <p className="about-text small-text">
              Questions? Comments? Want to tell us we're wrong about something so Claude can tell you
              "you're absolutely right"? We're listening.
            </p>

            <div className="about-signature">
              <p className="signature-text">Built with Claude Code,</p>
              <p className="signature-text">Because of course it was. 🔥</p>
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
