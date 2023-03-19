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

const User = () => {


  const [compose, setCompose] = useState(false)
  
  const toggleCompose = ()=>{
    setCompose(pre=>!pre)
  }

  useEffect(()=>{loadInbox()},[])
  const dispatch = useDispatch()
  const email = useSelector(state=> state.authentication.email)
  // const inbox = useSelector(state=> state.mails.inbox)
  const [inbox,setInbox] = useState({})

  const toMailId = useRef()
  

  // const config = {
  //   buttons : ['bold','italic']
  // }
  const editorRef = useRef()


  const loadInbox = async()=>{
    const mailEndPoint = email.replace('@','').replace('.','')
    const inboxResponse = await axios.get(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${mailEndPoint}/inbox.json`)
    const sentResponse = await axios.get(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${mailEndPoint}/sent.json`)
    console.log(inboxResponse.data)
    console.log(sentResponse.data)
    setInbox(inboxResponse.data)

    dispatch(mailsActions.initializeMails({
      sent : sentResponse.data
    }))
  }

  const editorChangeHandler = (textHtml)=>{
   
    console.log(editorRef.current.value)
  
  }
  const sendMailHandler = async()=>{
    const to = toMailId.current.value
    const body = editorRef.current.value

    const composedMail = {
      from : email,
      body : body
    }
    const toMail = to.replace('@','').replace('.','')
    
    try {
      axios.post(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${toMail}/inbox.json`,composedMail)
      console.log("Sent")
      
    }
    catch(err){
      console.log(err)
      alert("Something went wrong")
      return
    }
    try{
      const fromMailId = email.replace('@','').replace('.','')
      axios.post(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${fromMailId}/sent.json`,{to : to, body : body})
      dispatch(mailsActions.mailSent({to : to, body : body}))
      console.log(composedMail)
    }
    catch(err){
      console.log(err)
      alert("something went wrong")
    }
    


    console.log(`${email} is sending the mail ${editorRef.current.value} to the person ${toMailId.current.value}`)
   
  }
  return (
    <div>
      <div style={{'fontSize': '2rem'}} className='m-2 p-2 px-5 font-monospace'>Welcome To Mail Box</div>
      <div onClick={toggleCompose} className='text-center'> {compose? <Button variant='danger'>Close</Button> :<Button>Compose Mail</Button>} </div>

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
          {Object.keys(inbox).length>0 && <span className='text-success my-auto'>{`(${Object.keys(inbox).length} mails)`}</span>}
          
        </Col>
      </Row>

      <Row>
        
      {inbox.length===0 && <div className='text-center mt-4 text-danger'>--Your Inbox is Empty--</div>}
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
        <div>From :  <strong>{inbox[key].from}</strong></div>
        <div className='mt-2 ms-2'>{inbox[key].body}</div>
      </Row>
            )
        }
        
    </Container>

    </div>
    
  )
}

export default User