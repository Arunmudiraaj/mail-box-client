import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { mailsActions } from '../Store/mails'

const Mail = () => {
  const email = useSelector(state=> state.authentication.email)
    const dispatch = useDispatch()
    const myParams = useParams()
    const id = myParams.mailId
    const [mail, setMail] = useState({from : '...', body: '...'})
    
    const mailRead = async()=>{
      const emailEndPoint = email.replace('@','').replace('.','')
      const res = await  axios.get(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${emailEndPoint}/inbox/${id}.json`)
      setMail(res.data)
      dispatch(mailsActions.mailRead({id : id, mail : res.data}))
      const readRes = await  axios.put(`https://mail-box-client-4b607-default-rtdb.firebaseio.com/${emailEndPoint}/inbox/${id}.json`, {...res.data, read : true})

     
    }
    

    useEffect(()=>{mailRead()},[])
  return (
    <Container className='col-lg-8 h-75 mx-auto my-3 bg-opacity-10 bg-black p-3 px-4'>
        <h3>Mail From {mail.from}</h3>
        <br/>
        <div dangerouslySetInnerHTML={{ __html: mail.body }} />
    </Container>


  )
}

export default Mail