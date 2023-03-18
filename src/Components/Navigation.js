import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><Link className={'mx-3 text-light'} style={{'textDecoration': 'none'}} to={'/'}>Mail Box ✉️</Link> </Navbar.Brand>
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
