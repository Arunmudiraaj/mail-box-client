import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Mail Box ✉️</Navbar.Brand>
          <Nav className="ms-auto">
          <NavLink className={'mx-3 text-light'} to={'/signup'}>Sign Up</NavLink> 
             <NavLink className={'mx-3 text-light'} to={'/login'}>Log In</NavLink>
           
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
