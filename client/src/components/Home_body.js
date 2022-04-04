import React from 'react'
import Card from './Card'
import Carousel from './Carousel'

const Body = () => {
  return (
    <>
        <Carousel />

        <div className="container mt-5 mb-5" >
            <h3>Items</h3>

            {/* pagination bar */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1"> &lt; </a>
                    </li>
                    <li className="page-item"><a class="page-link" href="#">1</a></li>
                    <li className="page-item"><a class="page-link" href="#">2</a></li>
                    <li className="page-item"><a class="page-link" href="#">3</a></li>
                    <li className="page-item-end">
                    <a className="page-link" href="#"> &gt;</a>
                    </li>
                </ul>
            </nav>

            {/* Card-grid */}
            <div className="mb-3">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                </div>    
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                </div>    
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                </div>
            </div> 

            {/* pagination bar  */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1"> &lt; </a>
                    </li>
                    <li className="page-item"><a class="page-link" href="#">1</a></li>
                    <li className="page-item"><a class="page-link" href="#">2</a></li>
                    <li className="page-item"><a class="page-link" href="#">3</a></li>
                    <li className="page-item-end">
                    <a className="page-link" href="#"> &gt;</a>
                    </li>
                </ul>
            </nav>  
        </div>

    </>
  )
}

export default Body