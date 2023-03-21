import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { authActions } from "../Store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const email = useSelector(state=>state.authentication.email)
  const logoutHandler = ()=>{
     dispatch(authActions.logout()) 
     navigate('/')
  }
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><Link className={'mx-3 text-light'} style={{'textDecoration': 'none'}} to={'/'}>Mail Box ✉️</Link> </Navbar.Brand>
          <Nav className="ms-auto">
          <NavLink style={{"textDecoration": "none"}} className={'mx-3 bg-warning px-2 py-1 rounded-2 text-black'} to={'/signup'}>Sign Up</NavLink> 
             {!email&&<NavLink style={{"textDecoration": "none"}} className={'mx-3 bg-warning px-2 py-1 rounded-2 text-black'} to={'/login'}>Log In</NavLink>}
             
             {email&&<Button variant="danger" size="sm" onClick={logoutHandler}>Logout</Button>}
           
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
