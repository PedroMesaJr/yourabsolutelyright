import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductCarousel';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App" style={{backgroundColor: '#D06D4F', minHeight: '100vh'}}>
      <Navigation />
      <Hero />
      <div style={{
        marginTop: '-24rem'
      }}>
        <ProductCarousel />
      </div>
      <Footer />
    </div>
  );
}

export default App;
