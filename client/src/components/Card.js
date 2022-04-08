import React from 'react'
import logo from '../img/showcase.jpg'

const Card = ({name, image}) => {
  return (
    <div className="card bg-light" style={{width:"20rem"}}>
        <img src={logo} className="card-img-top" alt="..." />
        {/* <hr/> */}
        <div className="card-body text-center card-title h5">
            <div className="display-7 text-success">{name}</div>
        </div>
    </div>
    )
}

export default Card