import './App.css';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductCarousel';

function App() {
  return (
    <div className="App" style={{backgroundColor: '#D06D4F', minHeight: '100vh'}}>
      <Hero />
      <div style={{
        marginTop: '-24rem'
      }}>
        <ProductCarousel />
      </div>
    </div>
  );
}

export default App;
