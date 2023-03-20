import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
const Sent = (props) => {

    const clicked = (e)=>{
        if(e.target.id==='backdrop'){
            props.closeBox()
        }
    }
    const sent = useSelector(state=> state.mails.sent)
  return (
    <div id='backdrop' style={{'zIndex': '10'}} onClick={clicked} className='top-0 bottom-0 start-0 end-0 position-fixed bg-dark bg-opacity-50'>

<Container className='overflow-auto h-75  col-lg-8 mt-4 mx-auto my-3 bg-white p-3 px-4'>
      <Row>
        <Col className='text-center'>
          <span style={{'fontSize': '2rem'}} className='text-center mx-1'>Your Sent Mails </span> 
        </Col>
        <Col className='col-1 my-auto'><Button onClick={()=>{props.closeBox()}} variant='danger'>X</Button> </Col>
      </Row>

      <Row>
      {Object.keys(sent).length===0 && <div className='text-center mt-4 text-danger'>--Your haven't sent any mails yet--</div>}
      </Row>

        {
         Object.keys(sent).map(key=>
            <Row key={key} className='border border-1 p-2 border-dark my-1'>
              <Col className='col-11'>
                  <Link key={key} to={`/sent/${key}`} style={{'textDecoration': 'none', 'color': 'black'}}>
                  <div>to :  <strong>{sent[key].to}</strong></div>
                  <div className='mt-2 ms-2'><div dangerouslySetInnerHTML={{ __html: sent[key].body }} /></div>
                  </Link>
              </Col>
              {/* <Col className='m-auto'><AiFillDelete style={{'cursor': 'pointer'}} onClick={()=>{deleteMail(key)}}/></Col> */}
            </Row>
          
            )
        }
        
    </Container>

    </div>
  )
}

export default Sent