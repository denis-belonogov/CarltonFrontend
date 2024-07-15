import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

export default function Navigation() {
  /*
        return (
    <nav>
      <img src="/on_hotels_logo.svg" width="250px" height="75px" />
      <div>
        <Link to="/">Offer</Link>
        <Link to="/keys">Keys</Link>
      </div>
    </nav>
  );
  */
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className="container-navbar">
        <Navbar.Brand>
          <img src="/on_hotels_logo.svg" className="d-inline-block" width="250px" height="75px" />
          Carlton Tools
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Offers</Nav.Link>
            {false && <Nav.Link href="/keys">Keys</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
