import React from 'react';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero" style={{backgroundColor: '#D06D4F', minHeight: '100vh'}}>
      <div className="hero-content">
        <img
          src="/images/hero-logo.png"
          alt="You're absolutely right"
          className="hero-logo"
        />
      </div>
    </section>
  );
}

export default Hero;
