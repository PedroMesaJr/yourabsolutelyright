import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductCarousel';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { startKeepAlive } from './utils/keepAlive';
import { Analytics } from '@vercel/analytics/react';

// ZERO-LATENCY: Lazy load routes for faster initial page load
const Success = lazy(() => import('./pages/Success'));
const Cancel = lazy(() => import('./pages/Cancel'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));

// Home page component
function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <ProductCarousel />
      <Footer />
    </>
  );
}

function App() {
  // Start keep-alive ping when app loads to prevent Render backend from sleeping
  useEffect(() => {
    startKeepAlive();
  }, []);

  return (
    <Router>
      <div className="App" style={{backgroundColor: '#D06D4F', minHeight: '100vh'}}>
        <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}><LoadingSpinner /></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </Suspense>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
