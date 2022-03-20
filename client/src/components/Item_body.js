import React from 'react'
import logo from "../img/logo_fin.png" 

const Item_body = () => {
  return (
    <>
        <div className="parent-container d-flex m-5">
            <div className="container" style={{width:"auto"}}>
                <div className="row">
                    <div className="col mt-5">
                        <img src= {logo} />
                    </div>
                </div>
            </div>

            <div className="container ms-3">
                <div className="row mt-4 mb-4">
                    <div className="col">
                        <h2>Item Name</h2>
                    </div>
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col">
                        <p><i>
                            Lorem ipsum dolor sit amet. Et corrupti dolores non nobis excepturi id nesciunt quam est earum id culpa velit. Vel ducimus minima aut quos galisum et enim corrupti et deleniti illo aut inventore galisum et consequuntur eveniet qui veritatis veniam.
                        </i></p>
                    </div>
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col">
                        <h5>Current Bid: BID</h5>
                    </div>
                    <div className="col">
                        <h5>Time remaining: TIME</h5>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <input className="form-control me-2" placeholder="Enter bid amount" type="number" aria-label="Search"/>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger ms-2" type="submit">BID</button>
                    </div>
                    <div className="col">
                        <button className="btn rounded-pill btn-dark me-2 text-nowrap" type="submit">Add to Watchlist</button>
                    </div>
                </div>
            </div>
        </div>

        <hr style={{width:'85%', margin:'auto'}} />

        <div className="container mt-5 mb-5">
            <div className='row'>
                <div className='col'>
                    <h3>QnA</h3>
                </div>
                <div className='col' style={{flex:0}}>
                    <button className="btn btn-danger text-nowrap" type="submit">Ask a Question</button>
                </div>
            </div>
            <div className='row mt-3'>
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Question #1
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Question #2
                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Question #3
                        </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Item_body