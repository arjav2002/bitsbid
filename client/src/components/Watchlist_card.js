import React from 'react'
import logo from '../img/showcase.jpg'
import { TimeCounter } from './utils'

const Watchlist_cards = ({ name, endTime, currentBid, image }) => {

  return (
    <>
      <div className="card m-5">
        <div className="row g-0">
          <div className="col-md-4">
            <img id="imageContainer" src={image ? image : logo} className="card-img-top" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
    
              <div className="container ms-3">
                <div className="row mt-4 mb-4">
                    <div className="col">
                        <h2>{name}</h2>
                    </div>
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col">
                        <h5>Current Bid: {currentBid?currentBid:"No bids yet."}</h5>
                    </div>
                    <div className="col">
                        <h5>Time remaining: <TimeCounter timeLeft={new Date(endTime) - Date.now()} /></h5>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" placeholder="Enter bid amount" type="number" aria-label="Search"/>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger ms-2">BID</button>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Watchlist_cards