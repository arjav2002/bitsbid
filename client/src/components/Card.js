import React, { useEffect, useState } from 'react'
import logo from '../img/showcase.jpg'
import { TimeCounter } from './utils'

class Card extends React.Component{

    constructor(props){
        super(props)
    }

    render() {
    return (
        <div className="card bg-light" style={{width:"20rem"}}>
            <img id="imageContainer" style={{height: "50%", width: "100%"}} src={this.props.newImage ? this.props.newImage: logo} className="card-img-top" alt="..." />
            <div className="card-body text-center card-title h5">
                <div className="h3 text-danger mb-3">{this.props.name}</div>
                <div className="row">
                    <div className="col h6 text-black">Current Bid : {this.props.currBid}</div>
                </div>
                <div className="row">
                    <div className="h6 text-black">Time left: <TimeCounter timeLeft={this.props.time} />
                </div>
                </div>
            </div>
        </div>
    )
    }
}

export default Card