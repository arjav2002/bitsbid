import React, { useEffect, useState } from 'react'
import logo from '../img/showcase.jpg'
import axios from 'axios'
import { TimeCounter } from './utils'

const { REACT_APP_SERVER_IP, REACT_APP_PORT } = process.env

const Item_body = ({ itemid }) => {

	const [loaded, setLoaded] = useState(false)
	const [itemObj, setItemObj] = useState(null)
	const [timeLeft, setTimeLeft] = useState(0)
	const [bidAmount, setBidAmount] = useState(0)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		const fetchUrl = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + `/item?id=${itemid}`
		axios.get(fetchUrl)
			.then(res => {
				setItemObj(res.data)
				setTimeLeft(new Date(res.data.endTime) - Date.now())
				setLoaded(true)
			})
			.catch(err => console.log(err))
	}, [])

	function submitBid() {
		const minReqBid = parseInt(itemObj.highestBid ? itemObj.highestBid : itemObj.minBid)
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
				id: itemid,
				bid: bidAmount
			}
		})
			.then(res => {
				window.location.reload();
			})
			.catch(err => console.log(err))
	}

	function addToWatchlist() {
		const postItemUrl = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + '/watchlist'
		axios.post(postItemUrl, null, { params: { id: itemid } })
			.then(
				setErrorMessage("Item added to watchlist.")
			)
			.catch(err => console.log(err))
	}

	return (
		<div>
			{!loaded && <div className="m-5"><br /><br /><h1>Loading...</h1></div>}
			{loaded &&
				<>
					<div className="parent-container d-flex m-5">
						<div className="container" style={{ width: "auto" }}>
							<div className="row">
								<div className="col mt-5">
									<img id="imageContainer" src={itemObj.photo ? itemObj.photo : logo} className="card-img-top" alt="..." />
								</div>
							</div>
						</div>

						<div className="container ms-3">
							<div className="row mt-4 mb-4">
								<div className="col">
									<h2>{itemObj.name}</h2>
								</div>
							</div>
							<div className="row mt-4 mb-4">
								<div className="col">
									<p><i>
										{itemObj.description}
									</i></p>
								</div>
								<div className="col">
									Minimum Bid: {itemObj.minBid}
								</div>
							</div>
							<div className="row mt-4 mb-4">
								<div className="col">
									<h5>Current Bid: {itemObj.highestBid ? itemObj.highestBid : "No bids yet."}</h5>
								</div>
								<div className="col">
									<h5>Time remaining: <TimeCounter timeLeft={timeLeft} /></h5>
								</div>
							</div>
							<div className="row mt-4">
								<div className="col-3">
									<input className="form-control me-2" onInput={e => setBidAmount(parseInt(e.target.value))} placeholder="Enter bid amount" type="number" aria-label="Search" />
								</div>
								<div className="col">
									<button className="btn btn-danger ms-2" onClick={submitBid}>BID</button>
								</div>
								<div className="col">
									<button className="btn rounded-pill btn-dark me-2 text-nowrap" onClick={addToWatchlist}>Add to Watchlist</button>
								</div>
							</div>
							<div className="row mt-1">
								<div style={{ color: 'red' }} className="col">{errorMessage}</div>
							</div>
						</div>
					</div>

					{/* <hr style={{ width: '85%', margin: 'auto' }} /> */}

					{/* <div className="container mt-5 mb-5">
						<div className='row'>
							<div className='col h3'>QnA</div>
							<div className='col' style={{ flex: 0 }}>
								<button className="btn btn-danger text-nowrap" type="submit">Ask a Question</button>
							</div>
						</div>
				</div> */}
				</>
			}
			</div>
  )
}

			export default Item_body