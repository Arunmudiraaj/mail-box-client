import React from 'react'
import { Link } from 'react-router-dom';
import { authActions } from '../Store/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'
import { useRef } from 'react'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch()
  const loginHandler = async(e)=>{
    e.preventDefault()
    const enteredMail = emailRef.current.value.trim()
    const enteredPassword = passwordRef.current.value.trim()
    if(enteredMail.length===0 || enteredPassword.length===0){
        alert("Enter all fields")
        return
    }
    const user = {
        email : enteredMail,
        password : enteredPassword,
        returnSecureToken: true
    }
    try{
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0iwu5MM1xgit0Z4u6vflCChaBIUJup6M', user)
        const updated = response.data.email.replace('@','')
        const updatedMailReq = updated.replace('.','')
        // localStorage.setItem('email', updatedMailReq)
        // localStorage.setItem('loginId', response.data.idToken)
        dispatch(authActions.login({
            token : response.data.idToken,
            email : updatedMailReq
        }))
        console.log(updatedMailReq)
        console.log(response.data.idToken)
        navigate('/user')

    }
    catch(error){
        if(error.response&& error.response.data&&error.response.data.error){
            alert(error.response.data.error.message)
        }
        else{
            alert("Request failed")
        }
    }
}
  return (
    <div>

    <Card className=" p-2 mx-auto text-center col-md-6 col-lg-4  mt-5">
      <Card.Header>{'Log In'}</Card.Header>
      <Card.Body>
        <Card.Title>Your Email</Card.Title>
        <InputGroup variant={"password"} className="mb-3 w-75 mx-auto">
          <Form.Control
            type="text"
            ref={emailRef}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <Card.Title>Your Password</Card.Title>
        <InputGroup variant={"password"} className="mb-3 w-75 mx-auto">
          <Form.Control
            type="password"
            ref={passwordRef}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
          <Button onClick={loginHandler} variant="warning">
            {'Log In'}
          </Button>
       
      </Card.Body>
      <p className=' my-2 text-dark rounded-3'>Don't have an account? <span style={{'cursor': 'pointer'}} className='text-danger'><Link to={'/signup'}>Sign up</Link></span></p>
    </Card>
    </div>
  )
}

export default Login