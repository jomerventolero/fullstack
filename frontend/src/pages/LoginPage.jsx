import { useState } from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/celina.png';
import { auth } from '../auth';


/* This is a functional component in JavaScript using React. It defines a login page with a form that
takes in an email and password, and a button to submit the form. It also includes error handling for
invalid login attempts. The component uses the useState hook to manage the state of the email,
password, and error variables. The handleSignIn function is called when the form is submitted and
attempts to sign in the user using the provided email and password. If the login is successful, the
user is redirected to the dashboard page. If there is an error, the error message is displayed to
the user. */
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
      alert("Invalid email or password");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen font-medium align-middle bg-cover bg-background1 text-slate-800 font-poppins">
      <Navbar />
      <form onSubmit={handleSignIn} className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-2xl drop-shadow-2xl">
        <div className="flex">
          <img src={logo} alt="logo" className="w-[96px] mx-auto"/> 
          <h1 className="text-[64px] drop-shadow-2xl">Celina Plains</h1>
        </div>
        <div className="flex flex-col justify-center w-1/2 gap-1">
          <label 
            className="p-2"
            htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded-full "
          />
        </div>
        <div className="flex flex-col justify-center w-1/2 gap-1">
          <label 
            className="p-2"
            htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 rounded-full"
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
