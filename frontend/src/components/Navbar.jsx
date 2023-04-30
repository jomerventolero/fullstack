import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from  '../assets/celina.png'

function BasicExample() {
  return (
    <Navbar className="fixed top-0 drop-shadow-2xl w-full z-50" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><img src={logo} className="w-[64px]"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto font-poppins font-semibold text-black">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login" className="text-blue-700 font-semibold font-poppins">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;