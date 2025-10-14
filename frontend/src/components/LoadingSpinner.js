import React from 'react';
import '../styles/LoadingSpinner.css';

function LoadingSpinner({ size = 'medium', color = 'orange' }) {
  return (
    <div className={`loading-spinner loading-spinner-${size} loading-spinner-${color}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
  );
}

export default LoadingSpinner;
