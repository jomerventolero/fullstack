import { useState } from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/celina.png';
import { auth, app } from '../auth';
import { useEffect } from 'react';


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
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const user = app.auth().currentUser;
  
    if (user) {
      const userId = user.uid;
      const db = app.firestore();
  
      db.collection('users')
        .doc(userId)
        .get()
        .then(doc => {
          if (doc.exists) {
            const isAdministrator = doc.data().isAdmin;
            setIsAdmin(isAdministrator);
  
            if (isAdmin) {
              // Redirect to the admin dashboard
              window.location.href = '/dashboard-admin';
            }
            } else {
              setIsAdmin(false);
            }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setIsAdmin(false);
        });
    }
  }, []);
  

  const handleSignIn = async (e) => {
    e.preventDefault();    
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setError(null);
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
            className="p-2 border-2 rounded-full border-slate-400 hover:border-blue-600"
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
            className="p-2 border-2 rounded-full border-slate-400 hover:border-blue-600"
          />
        </div>
        <button type="submit" className="px-4 py-2 mx-auto text-white bg-blue-500 border-2 rounded-full hover:bg-blue-600">Login</button>
      </form>
      <p className="text-white drop-shadow-2xl">
        Don't have an account? <a className="" href="/register">Register here!</a>
      </p>
    </div>
  );
}

export default LoginPage;
