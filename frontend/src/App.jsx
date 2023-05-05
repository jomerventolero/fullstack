import Navbar from '../src/components/Navbar.jsx';
import Hero from '../src/components/Hero.jsx';
import About from '../src/components/About.jsx';
import Footer from './components/Footer.jsx';

function App() {

  return (
    <div className="bg-cover w-full h-full max-h-full">
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  );
}

export default App;
