import React from 'react'
import logo from '../img/logo_fin.png'

const Card = () => {
  return (
    <div className="card mt-3 mb-3 bg-light" style={{width:"18rem"}}>
        <img src={logo} className="card-img-top" alt="..." />
        <hr/>
        <div className="card-body">
            <h5 className="text-center card-title">Card title</h5>
        </div>
    </div>
    )
}

export default Card