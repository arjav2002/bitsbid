import { React, useState } from 'react'
import logo from '../img/logo_fin.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {SERVER_URL} from './utils'
import { useNavigate } from 'react-router'

const Navbar = () => {

  const [searchStr, setSearchStr] = useState("")
  const handleSearch = e => setSearchStr(e.target.value)

  const navigate = useNavigate()

  function handleSignOut (){
    axios.get(SERVER_URL + '/signout')
    .then(res => {
      navigate('/')
    })
    .catch(err => console.log(err))
  }

  return (
    <>
    <nav className={"navbar navbar-light fixed-top bg-light"} >
      <div className="container-fluid">
        <Link to={'/home'}>
          <a className="navbar-brand"><img src={logo} width='120' height='50' alt="logo here"/></a>
        </Link>
        
        <form className="d-flex">

          <input className="form-control me-3" type="search" value={searchStr} onChange={handleSearch} placeholder="Search" aria-label="Search" />
          <Link to={`/search/${searchStr}`}>
            <button className="btn rounded-pill btn-danger ms-3 me-5">Search</button>
          </Link>

          <Link to={'/sell'}>
            <button className="btn rounded-pill btn-success ms-5" type="submit">SELL</button>
          </Link>
        </form>
        
        <div className="me-3">
        <div className="dropdown">
          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </button>
          <ul style={{minWidth:'0px'}} className="dropdown-menu dropdown-menu-dark dropdown-menu-end"  aria-labelledby="dropdownMenuButton1">
              <li><Link to="/my-items" style={{color: 'inherit', textDecoration: 'inherit' }} className="dropdown-item">My Items</Link></li>
              <li><Link to="/my-watchlist" style={{color: 'inherit', textDecoration: 'inherit' }} className="dropdown-item">Watchlist</Link></li>
              <li><Link to='#' onClick={handleSignOut} style={{color: 'inherit', textDecoration: 'inherit' }} className="dropdown-item">Sign out</Link></li>
          </ul>
        </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar