import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import axios from 'axios'
import Pagination from '@mui/material/Pagination'
import Navbar from './Navbar'
import { useParams } from 'react-router'

const {REACT_APP_SERVER_IP, REACT_APP_PORT} = process.env

const Search = () => {

  let { searchStr } = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [itemsData, setItemsData] = useState({totalPages: 0, totalItems: 0, items: []})

  let result = ""

  useEffect(async() => {
    setLoading(true)
    const fetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + '/search'
    const res = await axios.get(fetchUrl, {
      params: {
        searchStr: searchStr,
        pgno: currentPage
      }
    })
    setItemsData(res.data)
    setLoading(false)

    if(itemsData.totalItems == 0) result = "No matching results!"
    else{
      const maxItemPerPage = Math.ceil(itemsData.totalItems/itemsData.totalPages)
      const i = 1 + (currentPage-1)*maxItemPerPage
      const j = Math.min((currentPage)*maxItemPerPage, itemsData.totalItems)
      result = `Showing ${i} - ${j} items out of ${itemsData.totalItems} search results`
    }

  }, [currentPage])
  

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
  <>
    <Navbar />

    <br />
    <br />
    <div className="ms-5 mt-5 mb-4 h4">{result}</div>              

    <div className="container">
      <div className="row justify-content-md-center">
        <div className={"col-md-auto "+(itemsData.totalPages==0?"d-none":"")}>
          <Pagination count={itemsData.totalPages} page={currentPage} onChange={handleChange}/>
        </div>
      </div>
    </div>

    <div className="container mt-5">
      { loading && (<h4>Loading...</h4>) }
      { !loading && (
        <div className="row">
          {itemsData.items.map(item => {
            return (
              <div className="col-4 mb-5 d-flex justify-content-center">
                <Link to={`/item/${item._id}`} className="text-decoration-none">
                  <Card
                    key = {item._id}
                    name = {item.name}
                    time = {new Date(item.endTime) - Date.now()}
                    currBid = {item.highestBid ? item.highestBid : "No bids yet"}
                    newImage = {item.photo}
                  />
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>

    <div className="container">
      <div className="row justify-content-md-center">
        <div className={"col-md-auto "+(itemsData.totalPages==0?"d-none":"")}>
          <Pagination count={itemsData.totalPages} page={currentPage} onChange={handleChange}/>
        </div>
      </div>
    </div>
    <br />
  </>
  )
}

export default Search