import Navbar from '../src/components/Navbar.jsx';
import Hero from '../src/components/Hero.jsx';
import About from '../src/components/About.jsx';

function App() {

  return (
    <div className="bg-cover w-screen h-screen">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}

export default App;
