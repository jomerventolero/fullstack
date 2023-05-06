import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from  '../assets/celina.png'
import { useState, useEffect } from 'react';
import { auth } from '../auth'

function BasicExample() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);


  return (
    <Navbar className="fixed top-0 drop-shadow-2xl w-full z-50" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><img src={logo} className="w-[64px]"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto font-poppins font-semibold text-black">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#about">About</Nav.Link>
            <Nav.Link href="/contact">Contact us</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Nav.Link href="/dashboard" className="text-blue-700 font-semibold font-poppins">Dashboard</Nav.Link>
            ) : (
              <Nav.Link href="/login" className="text-blue-700 font-semibold font-poppins">Login</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link href="/newsfeed" className="text-blue-700 font-semibold font-poppins">News Feed</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;