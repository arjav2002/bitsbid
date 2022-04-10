import React from 'react'
import logo from '../img/showcase.jpg'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

import { get24hrTime, TimeCounter, categories } from './utils'

const {REACT_APP_SERVER_IP, REACT_APP_PORT} = process.env

class EditableItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {timeLeft: new Date(this.props.endTime) - Date.now(), editing: false, endTime: new Date(this.props.endTime)}
        this.updateItem = this.updateItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.startEditing = this.startEditing.bind(this)
        this.setTimeOfDay = this.setTimeOfDay.bind(this)
        this.setDay = this.setDay.bind(this)
    }

    deleteItem() {
        const deleteUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + `/item?id=` + this.props.itemid
        axios.delete(deleteUrl)
        this.props.onDelete(this.props.itemid)
    }

    updateItem() {
        const updateUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + `/item`
        axios.post(updateUrl, {
            name: this.state.name,
            description: this.state.description,
            endTime: this.state.endTime,
            category: this.state.category,
            photo: this.props.photo,
            minBid: this.state.minBid
        },
        {params: {
            id: this.props.itemid
        }})

        this.props.name = this.state.name
        this.props.description = this.state.description
        this.props.endTime = this.state.endTime.toString()
        this.props.minBid = this.state.minBid
        this.props.category = this.state.category
        this.setState({editing: false, timeLeft: this.state.endTime - Date.now()})
    }

    startEditing() {
        this.setState({
            name: this.props.name,
            description: this.props.description,
            minBid: this.props.minBid,
            category: this.props.category,
            endTime: new Date(this.props.endTime),
            editing: true
        })
    }

    setTimeOfDay(e) {
        const d = this.state.endTime
        d.setHours(parseInt(e.target.value.substring(0, 2)))
        d.setMinutes(parseInt(e.target.value.substring(3)))
        this.setState({
            endTime: d
        })
    }

    setDay(e) {
        let d = this.state.endTime.toISOString().substring(0, 10)
        const y = parseInt(e.target.value.substring(0, 4))
        const m = parseInt(e.target.value.substring(5, 7))
        const dom = parseInt(e.target.value.substring(8))
        d = this.state.endTime
        d.setFullYear(y, m-1, dom)
        this.setState({
            endTime: d
        })
    }

    render() {
        return (
            <div style={{width: '80%', padding:0}} className="card parent-container d-flex flex-row justify-content-center m-5">
                <div style={{width: '20%'}}>
                    <div className="row">
                        <div className="col mt-5">
                            <img id="imageContainer" src={this.props.photo ? this.props.photo : logo} className="card-img-top" alt="..." />
                        </div>
                    </div>
                </div>
                <div className="card-body" style={{padding:0}}>
                {!this.state.editing && (
                    <div className="d-flex flex-row" style={{width: '100%'}}>
                    <Link className="d-flex flex-row justify-content-center" to={`/item/${this.props.itemid}`} style={{ width: '90%', color: 'inherit', textDecoration: 'inherit' }}>
                    <div className="ms-3 d-flex flex-column">
                        <div className="row mt-4 mb-4">
                            <div className="col">
                                <h2>{this.props.name}</h2>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4 d-flex flex-row justify-content-between">
                            <div className="col">
                                <h5>Current Bid: {
                                    this.props.highestBid?
                                    this.props.highestBid
                                :
                                    <p style={{color: 'gray'}}>No bids yet.</p>
                                }</h5>
                            </div>
                            <div className= "col ms-5">
                                <h5 style={{whiteSpace: 'nowrap'}}>Minimum Bid: {this.props.minBid}</h5>
                            </div>
                            <div className= "col ms-5 me-5">
                                <h5 style={{whiteSpace: 'nowrap'}}>Category: {this.props.category}</h5>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4 d-flex flex-row justify-content-between">
                            <div className="col">
                                <h5>Description:</h5>
                                {
                                this.props.description?
                                    <p><i>
                                        {this.props.description}    
                                    </i></p>
                                :
                                    <p style={{color: 'gray'}}>No description provided.</p>}                                
                            </div>
                            <div className= "col ms-5 me-5">
                                <h5 style={{whiteSpace: 'nowrap'}}>Time remaining:</h5>
                                <h5 style={{whiteSpace: 'nowrap'}}><TimeCounter timeLeft={this.state.timeLeft}/></h5>
                            </div>
                        </div>
                    </div>
                    </Link>
                    <div className="ms-3 row flex-grow-1" style={{width: "10%"}}>
                        <button style={{backgroundColor: '#80ced6'}} onClick={this.startEditing}><FontAwesomeIcon icon={faPenToSquare} size="3x"/></button>
                        <button style={{backgroundColor: '#ED1C16'}} onClick={this.deleteItem}><FontAwesomeIcon icon={faTrashCan} size="3x"/></button>
                    </div>
                    </div>
                )}
                {this.state.editing && (
                    <div className="ms-5 d-flex flex-row" style={{width: '100%'}}>
                    <div className="ms-5 d-flex flex-column" style={{width: '90%'}}>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                                <input type="text" required={true} placeholder="Enter name" value={this.state.name} onInput={e => {this.setState({name: e.target.value})}}/>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4 d-flex flex-row justify-content-between">
                            <div className="col">
                                <h5>Current Bid: {
                                    this.props.highestBid?
                                    this.props.highestBid
                                :
                                    <p style={{color: 'gray'}}>No bids yet.</p>
                                }</h5>
                            </div>
                            <div className= "col ms-5">
                                <h5 style={{whiteSpace: 'nowrap'}}>Minimum Bid:</h5>
                                <input type="number"
                                min={this.props.highestBid?this.props.highestBid:0}
                                required={true} placeholder="Enter amount in Rs." value={this.state.minBid} onChange={e => {this.setState({minBid: e.target.value})}}/>  
                            </div>
                            <div className= "col ms-5 me-5">
                                <h5 style={{whiteSpace: 'nowrap'}}>Category:</h5>
                                <select value={this.state.category} onChange={e => {this.setState({category: e.target.value})}} >
                                {
                                    categories.map(category => <option value={category}>{category}</option>)
                                }
                                </select> 
                            </div>
                        </div>
                        <div className="row mt-4 mb-4 d-flex flex-row justify-content-between">
                            <div className="col">
                                <h5>Description:</h5>
                                <textarea placeholder="Enter description" value={this.state.description} onChange={e => {this.setState({description: e.target.value})}} />                            
                            </div>
                            <div className= "col ms-5 me-5">
                                <h5 style={{whiteSpace: 'nowrap'}}>End Time:</h5>
                                <input type="time" required={true} value={get24hrTime(this.state.endTime)} onInput={this.setTimeOfDay}/>
                                <input type="date" required={true}  value={this.state.endTime.toISOString().substring(0, 10)} onInput={this.setDay}/>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '10%'}} className="ms-3 row">
                        <button style={{backgroundColor: '#80ced6'}} onClick={this.updateItem}><FontAwesomeIcon icon={faFloppyDisk} size="3x"/></button>
                        <button style={{backgroundColor: '#ED1C16'}} onClick={this.deleteItem}><FontAwesomeIcon icon={faTrashCan} size="3x"/></button>
                    </div>
                    </div>
                )}
                </div>
            </div>
        )
    }
}

export default EditableItem