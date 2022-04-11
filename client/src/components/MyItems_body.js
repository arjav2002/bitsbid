import React from 'react'
import axios from 'axios'

import EditableItem from './EditableItem'

import { Link } from 'react-router-dom'

const {REACT_APP_SERVER_IP, REACT_APP_PORT} = process.env

class Body extends React.Component {

    constructor(props) {
        super(props)
        this.state = {items: [], loaded: false}

        this.setItems = this.setItems.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    setItems(itemsArray) {
        this.setState({items: itemsArray})
    }

    deleteItem(itemid) {
        this.setItems(this.state.items.filter(obj => {return obj._id !== itemid}))
    }

    componentDidMount() {
        const idsFetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + `/myitems`
        const itemFetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + `/item`
        axios.get(idsFetchUrl)
        .then(async(res) => {
            this.setItems(await Promise.all(res.data.map(
                async(itemid) => {
                    return (await axios.get(itemFetchUrl, {params: {id: itemid}})).data
                }
            )))
            this.setState({loaded: true})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="mb-3 mt-5 d-flex flex-column">
                <div className="ms-5 mt-5" >
                    <h1>My Items:</h1>
                </div>
                <div className="d-flex flex-column align-items-center">
                    {this.state.loaded && this.state.items.map(item => {
                        return (
                        <EditableItem onDelete={id => this.deleteItem(id)} category={item.category} itemid={item._id} photo={item.photo} minBid={item.minBid} name={item.name} description={item.description} endTime={item.endTime} highestBid={item.highestBid}/>                        )
                    })}
                    {!this.state.loaded && <div className="ms-5"><h1>Loading...</h1></div>}
                </div>
            </div>
        )
    }
}

export default Body