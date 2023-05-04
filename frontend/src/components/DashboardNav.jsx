import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from '../auth'

const DashboardNav = () => {
  const logout = () => {
    auth.signOut(auth)
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while logging out');
      });
  };
  return (
    <Navbar className="fixed w-full drop-shadow-2xl" bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Celina Plains</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/appointment">Book an Appointment</Nav.Link>
            </Nav>
            <Nav><Nav.Link href="/" onClick={logout}>Logout</Nav.Link></Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default DashboardNav
