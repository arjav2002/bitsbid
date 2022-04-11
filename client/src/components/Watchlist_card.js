import { React, useState } from 'react'
import logo from '../img/showcase.jpg'
import { TimeCounter } from './utils'

import axios from 'axios'

const { REACT_APP_SERVER_IP, REACT_APP_PORT } = process.env

const Watchlist_cards = ({ id, name, endTime, currentBid, image, minimumBid }) => {

  const [bidAmount, setBidAmount] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  const submitBid = () => {
    const minReqBid = parseInt(currentBid ? currentBid : minimumBid)
		if (bidAmount < minReqBid) {
			setErrorMessage("Submitted bid cannot be lesser than minimum bid.")
			return
		}

		if (bidAmount == minReqBid) {
			setErrorMessage("Submitted bid cannot be equal to minimum bid.")
			return
		}

		const postBidUrl = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + '/bidItem'
		axios.post(postBidUrl, null, {
			params: {
				id: id,
				bid: bidAmount
			}
		})
    .then(res => {
      console.log(`bid ${bidAmount} posted.`)
    })
    .catch(err => console.log(err))
  }

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
                        {currentBid?
                        <h5>Current Bid: {currentBid}</h5>
                        :
                        <h5>Minimum Bid: {minimumBid}</h5>}
                        
                    </div>
                    <div className="col">
                        <h5>Time remaining: <TimeCounter timeLeft={new Date(endTime) - Date.now()} /></h5>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" onInput={e => setBidAmount(parseInt(e.target.value))} placeholder="Enter bid amount" type="number" aria-label="Search"/>
                    </div>
                    <div className="col">
                        <button onClick={submitBid} className="btn btn-danger ms-2">BID</button>
                        <div style={{color: 'red'}}>{errorMessage}</div>
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