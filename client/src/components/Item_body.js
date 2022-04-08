import React, { useEffect, useState } from 'react'
import logo from "../img/logo_fin.png" 
import axios from 'axios'
import { TimeCounter } from './utils'

const {REACT_APP_SERVER_IP, REACT_APP_PORT} = process.env

const Item_body = ({itemid}) => {

    const [ loaded, setLoaded ] = useState(false)
    const [ itemObj, setItemObj ] = useState(null)
    const [ timeLeft, setTimeLeft ] = useState(0)
    const [ bidAmount, setBidAmount ] = useState(0)
    const [ errorMessage, setErrorMessage ] = useState("")

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
        const minReqBid = itemObj.highestBid?itemObj.highestBid:itemObj.minBid
        if(bidAmount < minReqBid) {
            setErrorMessage("Submitted bid cannot be lesser than minimum bid.")
            return
        }

        if(bidAmount == minReqBid) {
            setErrorMessage("Submitted bid cannot be equal to minimum bid.")
            return
        }

        const postBidUrl = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + '/bidItem'
        axios.post(postBidUrl, null, {params: {
            id: itemid,
            bid: bidAmount
        }})
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
        {!loaded && <div className="m-5"><br/><br/><h1>Loading...</h1></div>}
        {loaded && 
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
                        <h5>Current Bid: {itemObj.highestBid?itemObj.highestBid:"No bids yet."}</h5>
                    </div>
                    <div className="col">
                        <h5>Time remaining: <TimeCounter timeLeft={timeLeft} /></h5>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-3">
                        <input className="form-control me-2" onInput={e => setBidAmount(e.target.value)} placeholder="Enter bid amount" type="number" aria-label="Search"/>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger ms-2" onClick={submitBid}>BID</button>
                    </div>
                    <div className="col">
                        <button className="btn rounded-pill btn-dark me-2 text-nowrap" type="submit">Add to Watchlist</button>
                    </div>
                </div>
                <div className="row mt-1">
                    <div style={{color: 'red'}} className="col">{errorMessage}</div>
                </div>
            </div>
        </div>

        <hr style={{width:'85%', margin:'auto'}} />

        {/*<div className="container mt-5 mb-5">
            <div className='row'>
                <div className='col'>
                    <h3>QnA</h3>
                </div>
                <div className='col' style={{flex:0}}>
                    <button className="btn btn-danger text-nowrap" type="submit">Ask a Question</button>
                </div>
            </div>
            <div className='row mt-3'>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Question #1
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Question #2
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Question #3
                        </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>*/}
        </>}
    </div>
  )
}

export default Item_body