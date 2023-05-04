import { useState } from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/celina.png';
import { auth } from '../auth';



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setError(null);
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen font-medium align-middle bg-cover bg-background1 text-slate-800 font-poppins">
      <Navbar />
      <form onSubmit={handleSignIn} className="flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl drop-shadow-2xl">
        <div className="flex">
          <img src={logo} alt="logo" className="w-[96px] mx-auto"/> 
          <h1 className="text-[64px] drop-shadow-2xl">Celina Plains</h1>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label 
            className="p-2"
            htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-1 border-2 rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label 
            className="p-2"
            htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-1 border-2 rounded-full"
          />
        </div>
        <button type="submit" className="px-4 py-2 mx-auto border-2 rounded-full">Login</button>
      </form>
      <p className="text-white drop-shadow-2xl">
        Don't have an account? <a className="" href="/register">Register here!</a>
      </p>
    </div>
  );
}

export default LoginPage;
