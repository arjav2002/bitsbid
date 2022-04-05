import React from 'react'
import logo from '../img/logo_fin.png'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

const Navbar = () => {

  const { id } = useParams()
  
  return (
    <nav className="navbar navbar-light bg-light">
    <div className="container-fluid">
        <Link to={'/home/'+id}>
          <a className="navbar-brand"><img src={logo} width='120' height='50' alt="logo here"/></a>
        </Link>
        
        <form className="d-flex">
          <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
          <Link to={'/sell/'+id}>
            <button className="btn rounded-pill btn-danger ms-3 me-3" type="submit">SELL</button>
          </Link>
          <button className="btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </button>
        </form>
    </div>
    </nav>
  )
}

export default Navbar