import React from 'react'
import logo from "../img/logo_fin.png"
import caro from "../img/carousel_img.jpg"

const Carousel = () => {
  return (
    <div id="carouselExampleControls" className="carousel slide bg-dark mt-5 me-5 ms-5" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src={logo} className="d-block w-50" alt="..." style={{margin:'auto'}}/>
            </div>
            <div className="carousel-item">
            <img src={caro} className="d-block w-50" alt="..." style={{margin:'auto'}}/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
  )
}

export default Carousel