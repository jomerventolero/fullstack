import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/celina.png';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [fullname, setFullname] = useState(''); 
  const [address, setAddress] = useState('');
  const isAdmin = false;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/signup', { email, password, fullname, address, isAdmin })
      .then(response => {
        console.log(response.data);
        window.location.href = '/login';
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen font-medium align-middle bg-cover bg-background1 text-slate-800 font-poppins'>
    <Navbar />
    <div className="justify-center">      
      <form onSubmit={handleSubmit} 
        className="flex flex-col justify-center items-center gap-4 p-8 pt-[100px] rounded-2xl bg-white drop-shadow-2xl"
        >
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
            htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="p-1 border-2 rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label 
            className="p-2"
            htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
        <div className="flex flex-col justify-center gap-1">
          <label 
            className="p-2"
            htmlFor="password1">Re-type Password</label>
          <input
            type="password"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            className="p-1 border-2 rounded-full"
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="px-4 py-2 mx-auto border-2 rounded-full">Register</button>
        <p>
          Already have an account? <Link to="/login">Login here!</Link>
        </p>
      </form>

    </div>
    </div>
  );
}

export default RegisterPage;
