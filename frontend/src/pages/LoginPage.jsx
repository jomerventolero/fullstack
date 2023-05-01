import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import logo from '../assets/celina.png';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error(error);
    }
};


  return (
    <div className="bg-background1 bg-cover text-slate-800 flex flex-col w-screen h-screen font-poppins font-medium items-center  align-middle justify-center">
      <Navbar />
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 p-8 rounded-2xl bg-white drop-shadow-2xl">
        <div className="flex">
          <img src={logo} alt="logo" className="w-[96px] mx-auto"/> 
          <h1 className="text-[64px] drop-shadow-2xl">Celina Plains</h1>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label 
            className="p-2"
            htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className="py-2 px-4 mx-auto border-2 rounded-full">Login</button>
      </form>
      <p className="text-white drop-shadow-2xl">
        Don't have an account? <a className="" href="/register">Register here!</a>
      </p>
    </div>
  );
}

export default LoginPage;
