import { useEffect, useMemo, useState } from 'react'
import Card from './Card'
import Carousel from './Carousel'
import Navbar from './Navbar'
import axios from 'axios'
const {REACT_APP_SERVER_IP, REACT_APP_PORT, REACT_APP_CLIENT_ID} = process.env

const Body = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [itemsData, setItemsData] = useState({totalPages: 0, items: []})

    useEffect(async() => {
        setLoading(true)
        const fetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + `/itemspage?pgno=${currentPage}`
        const res = await axios.get(fetchUrl)
        setItemsData(res.data)
        setLoading(false)
    }, [currentPage])

    return (
    <>
        <Navbar />
        <Carousel />

        <div className="container mt-5 mb-5" >
            <h3>Items</h3>

            {
                loading && (<h3>Loading</h3>)
            }

            {
                !loading && (
                    <>
                    {
                    itemsData.items.map(item => (<>{item.name}</>))
                    }
                    </>
                )
            }              
        </div>

        {/* pagination bar */}
        <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1"> &lt; </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item-end">
                    <a className="page-link" href="#"> &gt;</a>
                    </li>
                </ul>
            </nav>

            {/* Card-grid */}
            <div className="mb-3">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                </div>    
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                </div>    
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Card />    
                    </div>
                </div>
            </div> 

            {/* pagination bar  */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1"> &lt; </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item-end">
                    <a className="page-link" href="#"> &gt;</a>
                    </li>
                </ul>
            </nav>  

    </>
    )
}

export default Body