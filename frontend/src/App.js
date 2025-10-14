import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductCarousel';
import Footer from './components/Footer';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

// Home page component
function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <div style={{ marginTop: '-31.944rem' }}>
        <ProductCarousel />
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App" style={{backgroundColor: '#D06D4F', minHeight: '100vh'}}>
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
      </div>
    </Router>
  );
}

export default App;
