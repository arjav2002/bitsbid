import { useEffect, useState } from 'react'
import axios from 'axios'

import EditableItem from './EditableItem'

const {REACT_APP_SERVER_IP, REACT_APP_PORT} = process.env

const Body = () => {

    const [items, setItems] = useState([])

    function deleteItem(itemid) {
        setItems(items.filter(obj => {return obj._id !== itemid}))
    }

    useEffect(async() => {
        const idsFetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + `/myitems`
        const itemFetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + `/item`
        axios.get(idsFetchUrl)
        .then(async(res) => {
            setItems(await Promise.all(res.data.map(
                async(itemid) => {
                    return (await axios.get(itemFetchUrl, {params: {id: itemid}})).data
                }
            )))
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="mb-3 d-flex flex-row justify-content-center">
            <div style={{flexGrow: 0.5}}>
                <h1>My Items:</h1>
                {items.map(item => {
                    return (<EditableItem onDelete={id => deleteItem(id)} itemid={item._id} photo={item.photo} minBid={item.minBid} name={item.name} description={item.description} endTime={item.endTime} highestBid={item.highestBid}/>)}
                )}
            </div>
        </div>
    )
}

export default Body