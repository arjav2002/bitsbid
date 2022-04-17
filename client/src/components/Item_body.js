import React, { useEffect, useState } from 'react'
import logo from '../img/showcase.jpg'
import axios from 'axios'
import { TimeCounter } from './utils'
import QnA from './QnA'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const { REACT_APP_SERVER_IP, REACT_APP_PORT } = process.env

const Item_body = ({ itemid }) => {

	const [loaded, setLoaded] = useState(false)
	const [itemObj, setItemObj] = useState(null)
	const [timeLeft, setTimeLeft] = useState(0)
	const [bidAmount, setBidAmount] = useState(0)
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState("");
	
	const handleClose = () => setShowMessage(false);
	
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

		if(itemObj.highestBid && bidAmount <= itemObj.highestBid){
			setMessage("Submitted bid should be greater than the current bid !")
			setShowMessage(true)
			return
		}

		else if(!itemObj.highestBid && bidAmount < itemObj.minBid){
			setMessage("Submitted bid should be greater than or equal to the minimum bid !")
			setShowMessage(true)
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
			.then(res => {
				setMessage("Item added to watchlist successfully!")
				setShowMessage(true)
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			{!loaded && <div className="m-5"><br /><br /><h1>Loading...</h1></div>}
			{loaded &&
				<>
					<div className="container-fluid">
						<div className="row mt-5 mb-5">

							<div className="col-5 mt-5">
								<div className="container" style={{ width: "auto" }}>
									<img id="imageContainer" src={itemObj.photo ? itemObj.photo : logo} className="card-img-top" alt="..." />
								</div>
							</div>

							<div className="col-7">

								<div className="row mt-4 mb-5">
									<div className="col-9 h2 pe-3">{itemObj.name}</div>
									<div className="col-3">
										<button className="btn rounded-pill btn-danger me-2 text-nowrap" onClick={addToWatchlist}>Add to Watchlist</button>
									</div>
								</div>

								<div className="row mt-4 mb-4">
									<div className="col pe-5"><p><i>{itemObj.description}</i></p></div>
									<div className="col ps-5">
										<div className="col text- mb-2"><strong className='text-danger'>Category : &nbsp;</strong>{itemObj.category}</div>
										<div className="col mb-2"><strong className='text-danger'>Minimum Bid : &nbsp;</strong>₹{itemObj.minBid}</div>
										<div className="col mb-2"><strong className='text-danger'>Time remaining : &nbsp;</strong><TimeCounter timeLeft={timeLeft} /></div>
										<div className="col mb-2"><strong className='text-danger'>Current Bid : &nbsp;</strong>₹{itemObj.highestBid?itemObj.highestBid:"No bids yet."}</div>

										<div className='mt-5 h4'>Place a bid!</div>
										<div className="me-5 mt-3">
											<input className="form-control" placeholder="Enter bid amount" type="number" onChange={(e) => setBidAmount(e.target.value)}/>
											<button className="col-3 btn btn-danger pull-right mt-3" onClick={submitBid}>BID</button>
										</div>
									</div>
								</div>

								<Modal show={showMessage} onHide={handleClose}>
									<Modal.Header closeButton>
										<Modal.Title>Message</Modal.Title>
									</Modal.Header>
									<Modal.Body>{message}</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleClose}>Close</Button>
									</Modal.Footer>
								</Modal>

							</div>

						</div>
							
						<br />
						<hr style={{ width: '85%', margin: 'auto' }} />
						
						<div className="container mt-4 mb-5">
							<div className='row'>
								<QnA itemid={itemid} sellerId={itemObj.sellerId} qna={itemObj.questions}/>
							</div>
						</div>
					
					</div>
					<br />
				</>
			}
		</>
  )
}

export default Item_body