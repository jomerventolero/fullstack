import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/celina.png';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('localhost:5000/api/register', { username, password })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='bg-background1 bg-cover text-slate-800 flex flex-col w-screen h-screen font-poppins font-medium items-center  align-middle justify-center'>
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
        <button type="submit" onClick={handleSubmit} className="py-2 px-4 mx-auto border-2 rounded-full">Register</button>
        <p>
          Already have an account? <Link to="/login">Login here!</Link>
        </p>
      </form>

    </div>
    </div>
  );
}

export default RegisterPage;
