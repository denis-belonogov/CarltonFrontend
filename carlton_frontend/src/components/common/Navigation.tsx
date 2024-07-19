import { Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"; // Assuming React Router is used

export default function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Col className="d-none d-lg-block">
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img
            src="/on_hotels_logo.svg"
            alt="Carlton Tools Logo"
            className="d-inline-block img-logo"
            width="100"
            height="100"
          />{" "}
          Carlton Tools
        </Navbar.Brand>
      </Col>

      <Col className="d-lg-none">
        <Navbar.Brand as={Link} to="/" className="navbar-brand-sm">
          <img
            src="/on_hotels_logo.svg"
            alt="Carlton Tools Logo"
            className="d-inline-block img-logo"
            width="100"
            height="100"
          />{" "}
        </Navbar.Brand>
      </Col>

      <Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end navbar-a">
          <Nav className="m-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
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
      </Col>
      <Col className="d-none d-lg-block"></Col>
    </Navbar>
  );
}
