import Loader from './components/Loader.jsx';

import { lazy } from 'react';
import { Suspense } from 'react';

const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Footer = lazy(() => import('./components/Footer'));


function App() {

  return (
    <Suspense fallback={<Loader />}>
      <div className="bg-cover w-full h-full max-h-full">
        <Navbar />
        <Hero />
        <About />
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
