import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductCarousel';
import Footer from './components/Footer';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

// Home page component
function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <div style={{ marginTop: '-26.4rem' }}>
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
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
