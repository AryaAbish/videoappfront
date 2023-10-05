import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getHistory } from '../service/allApis';
import { Link } from 'react-router-dom';

function History() {
  const [history, setHistory] = useState([])

  const getAllHistory = async () => {
    const { data } = await getHistory()
    // console.log(data);
    setHistory(data);
  }
  useEffect(() => {
    getAllHistory()
  }, [])
  // console.log(history);

  return (
    <div>
      <Container>
        <h1 className='text-center'>Watch History</h1>
        <div className='text-end m-2 '>
          <Link to={'/home'}>
            <button className='btn btn-primary'><i class="fa-solid fa-angles-left"></i> Back </button>

          </Link>
        </div>            
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className='text-primary'>#</th>
              <th className='text-primary'>Caption</th>
              <th className='text-primary'>URL</th>
              <th className='text-primary'>Date</th>
            </tr>
          </thead>
          <tbody>
            {
              history.length > 0 ? history.map((i, index) =>
                <tr>
                  <td>{index + 1}</td>
                  <td>{i.cardName}</td>
                  <td>{i.url}</td>
                  <td>{i.date}</td>
                </tr>
              ) : <h1 className='text-danger text-center'>Watch History is empty</h1>
            }
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default History