import React from 'react'
import { Button, InputGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { mailsActions } from '../Store/mails';
import JoditEditor from 'jodit-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {AiFillDelete} from 'react-icons/ai'
import Sent from '../Components/Sent';

const User = () => {

  const [sendBox, setSendBox] = useState(false)
  const [compose, setCompose] = useState(false)
  const toggleSendBox = ()=>{
    setSendBox(pre=>!pre)
  }
  
  const toggleCompose = ()=>{
    setCompose(pre=>!pre)
  }

  useEffect(()=>{getData()},[])
  const dispatch = useDispatch()
  const email = useSelector(state=> state.authentication.email)
  const inbox = useSelector(state=> state.mails.inbox)


  const toMailId = useRef()
  

  // const config = {
  //   buttons : ['bold','italic']
  // }
  const editorRef = useRef()


  const getData = async()=>{
    const mailEndPoint = email.replace('@','').replace('.','')
    const inboxResponse = await axios.get(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${mailEndPoint}/inbox.json`)
    const sentResponse = await axios.get(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${mailEndPoint}/sent.json`)
    console.log(inboxResponse.data)
    console.log(sentResponse.data)

    // dispatch(mailsActions.initializeMails({
    //   sent : sentResponse.data,
    //   inbox : inboxResponse.data
    // }))
    if (inboxResponse.data){
      dispatch(mailsActions.initializeInbox(inboxResponse.data))
    }
    else{
      dispatch(mailsActions.initializeInbox({}))
    }
    if (sentResponse.data){
      dispatch(mailsActions.initializeSent(sentResponse.data))
    }
    else{
      dispatch(mailsActions.initializeSent({}))
    }
  
  }

  const editorChangeHandler = ()=>{
   
    console.log(editorRef.current.value)
  
  }
  const sendMailHandler = async()=>{
    const to = toMailId.current.value
    const body = editorRef.current.value

    const composedMail = {
      from : email,
      body : body,
      read : false
    }
    const toMail = to.replace('@','').replace('.','')
    
    try {
      axios.post(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${toMail}/inbox.json`,composedMail)
      console.log("Sent")
      
    }
    catch(err){
      console.log(err)
      alert("Something went wrong while sending message")
      return
    }
    try{
      const fromMailId = email.replace('@','').replace('.','')
      const res = await axios.post(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${fromMailId}/sent.json`,{to : to, body : body})
      console.log(res)
      dispatch(mailsActions.mailSent({id : res.data.name, mail :{to : to, body : body}}))
      console.log(composedMail)
    }
    catch(err){
      console.log(err)
      alert("something went wrong")
      return
    }
    


    console.log(`${email} is sending the mail ${editorRef.current.value} to the person ${toMailId.current.value}`)
   
  }

  
  const calculateUnRead = ()=>{
    let val = 0
    Object.keys(inbox).forEach(key =>{
      if (inbox[key].read===false){
        val++
      }
    })
    return val
  }
  const unread = calculateUnRead()

  const deleteMail = async(id)=>{
    console.log(id)
    dispatch(mailsActions.deleteFromInbox(id))
    try{
      const emailEndPoint = email.replace('@','').replace('.','')
      const res = await axios.delete(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${emailEndPoint}/inbox/${id}.json`)
      console.log(res)
    }
    catch(err){
        console.log(err)
        alert("Something went wrong")
    }
  }



  return (
    <div>
      <div style={{'fontSize': '2rem'}} className='m-2 p-2 px-5 font-monospace'>Welcome To Mail Box</div>
      
      <div className='text-center'><Button onClick={toggleSendBox} variant='success' className='mx-3'>Sent</Button> {compose? <Button onClick={toggleCompose} variant='danger'>Close</Button> :<Button onClick={toggleCompose}>Compose Mail</Button>} </div>

    {sendBox && <Sent closeBox={toggleSendBox}/>}
    {compose && <Container className='col-lg-8 h-75 mx-auto my-3 bg-opacity-10 bg-black p-3'>
      <Row>
        <Col>
        <InputGroup className="mb-1">
      <InputGroup.Text >To :</InputGroup.Text>
      <Form.Control ref={toMailId} aria-label="to" />
    </InputGroup>
          <div className='bg-light p-2'>
          <JoditEditor ref={editorRef} onChange={editorChangeHandler}/>
          </div>
          <div className='text-center'>
            <Button onClick={sendMailHandler} className='mt-3'>Send</Button>
          </div>

            
        </Col>
      </Row>
      {/* <div dangerouslySetInnerHTML={{ __html: editorText }} /> */}
    </Container>}

    <Container className='col-lg-8 h-75 mx-auto my-3 bg-opacity-10 bg-black p-3 px-4'>
      <Row>
        <Col className='text-center'>
          <span style={{'fontSize': '2rem'}} className='text-center mx-1'>Your Inbox </span> 
          {<span className='text-success my-auto'>{`(${unread} unread)`}</span>}
          
        </Col>
      </Row>

      <Row>
        
      {Object.keys(inbox).length===0 && <div className='text-center mt-4 text-danger'>--Your Inbox is Empty--</div>}
      </Row>

      {/* {inbox.map(item=>
        <Row className='border border-1 p-2 border-dark my-1'>
        <div>From :  <strong>{item.from}</strong></div>
        <div className='mt-2 ms-2'>{item.body}</div>
      </Row>
        )} */}
        {
         Object.keys(inbox).map(key=>
            <Row key={key} className='border border-1 p-2 border-dark my-1'>
              <Col className='col-11'>
                  <Link key={key} to={`/inbox/${key}`} style={{'textDecoration': 'none', 'color': 'black'}}>
                  <div>{!inbox[key].read && <span>🔵</span>} From :  <strong>{inbox[key].from}</strong></div>
                  <div className='mt-2 ms-2'><div dangerouslySetInnerHTML={{ __html: inbox[key].body }} /></div>
                  </Link>
              </Col>
              <Col className='m-auto'><AiFillDelete style={{'cursor': 'pointer'}} onClick={()=>{deleteMail(key)}}/></Col>
            </Row>
          
            )
        }
        
    </Container>

    </div>
    
  )
}

export default User