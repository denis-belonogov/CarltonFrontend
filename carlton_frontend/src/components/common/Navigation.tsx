import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"; // Assuming React Router is used

export default function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className="container-navbar">
        <Navbar.Brand as={Link} to="/">
          <img
            src="/on_hotels_logo.svg"
            alt="Carlton Tools Logo"
            className="d-inline-block"
            width="250px"
            height="75px"
          />
          Carlton Tools
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Offers
            </Nav.Link>
            <Nav.Link as={Link} to="/keys">
              Keys
            </Nav.Link>
            <Nav.Link as={Link} to="/rooms">
              Rooms
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
