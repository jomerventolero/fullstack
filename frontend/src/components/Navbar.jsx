import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from  '../assets/celina.png'
import { useState, useEffect } from 'react';
import { auth, app } from '../auth'

function NavBar() {

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
  
      if (user) {
        const userId = user.uid;
  
        if (userId === 'N8zh0HbrPVdw3nipsN7KsbeUdFy2') {
          setIsAdmin(true);
          window.location.href = '/dashboard-admin';
        } else {
          setIsAdmin(false);
          window.location.href = '/dashboard-user';
        }
      } else {
        setIsAdmin(false);
      }
    });
  
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  
  


  return (
    <Navbar className="fixed top-0 z-50 w-full drop-shadow-2xl" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><img src={logo} className="w-[64px]"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="font-semibold text-black me-auto font-poppins">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#about">About</Nav.Link>
            <Nav.Link href="/contact">Contact us</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              isAdmin ? (
              <Nav.Link href="/dashboard-admin" className="font-semibold text-blue-700 font-poppins">Admin Dashboard</Nav.Link> ) : (
              <Nav.Link href="/dashboard-user" className="font-semibold text-blue-700 font-poppins">User Dashboard</Nav.Link> 
              )
            ) : (
              <Nav.Link href="/login" className="font-semibold text-blue-700 font-poppins">Login</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link href="/newsfeed" className="font-semibold text-blue-700 font-poppins">News Feed</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;