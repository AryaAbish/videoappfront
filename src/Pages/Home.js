import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Add from '../Components/Add';
import View from '../Components/View';
import Category from '../Components/Category';
import { Link } from 'react-router-dom';

function Home() {
  const [addUpdate, setAddUpdate] = useState({})
  return (
    <>
      <h1 className='ms-4 text-center'>All Video Cards</h1>
      <Link to={"/watch-history"} style={{ textDecoration: 'none' }}>
        <h5 className='ms-4 fs-6 text-primary'>Watch History <i class="fa-solid fa-clock fa-spin"></i></h5>
      </Link>
      <hr />
      <Container>
        <Row>
          <Col lg={1}><Add updateData={setAddUpdate}></Add></Col>
          <Col lg={8}><View data={addUpdate}></View></Col>
          <Col lg={3}><Category></Category></Col>
        </Row>
      </Container>
    </>
  )
}

export default Home