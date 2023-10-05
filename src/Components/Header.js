import React from 'react'
import { Video } from 'react-feather'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {
  return (
   <div>
    <Link to={""} style={{textDecoration:'none'}}>
      <h1>
        <Navbar expand="lg" className="navbar nav bg-primary">
            <Navbar.Brand href="#"><h3 className='ms-3'><Video/> VideoApp</h3></Navbar.Brand>
        </Navbar>
      </h1>
    </Link>
   </div>

  )
}

export default Header