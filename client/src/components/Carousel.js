import React from 'react'
import logo from "../img/logo_fin.png"
import caro from "../img/carousel_img.jpg"

const Carousel = () => {
  return (
    <div id="carouselExampleControls" class="carousel slide bg-dark mt-3 me-5 ms-5" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src={logo} class="d-block w-50" alt="..." style={{margin:'auto'}}/>
            </div>
            <div class="carousel-item">
            <img src={caro} class="d-block w-50" alt="..." style={{margin:'auto'}}/>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
  )
}

export default Carousel