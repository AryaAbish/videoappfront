import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Video } from 'react-feather';
import { Link } from 'react-router-dom';


function Landingpage() {
  return (
    <div>
       <Container>
      <Row className='m-5 p-5'>
        <Col>
        <h1><Video></Video>VideoApp</h1>
        <p>Don't you wish you could upload streaming videos from the web so you can watch them whenever you want?
        You're in luck—even if a website doesn't technically allow upload, there are many free tools you can use to save videos from any website, including YouTube, just by providing the URL. 
        </p>
<Link to={'/home'}>
          <button className='btn btn-primary'>Click to view</button>
</Link>        </Col>
        <Col className='ms-3'>
        <img src="https://th.bing.com/th/id/OIP.pW9EDjMck_7MusFlYgIaHwHaFj?pid=ImgDet&rs=1" alt="" />
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Landingpage