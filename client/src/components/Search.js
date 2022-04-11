import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import axios from 'axios'
import Pagination from '@mui/material/Pagination'
import Navbar from './Navbar'
import { useParams } from 'react-router'
import qs from 'qs'

import { categories } from './utils'

const { REACT_APP_SERVER_IP, REACT_APP_PORT } = process.env

const Search = () => {

  let { searchString } = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [itemsData, setItemsData] = useState({totalPages: 0, totalItems: 0, items: []})
  const [categoryFilters, setCategoryFilters] = useState([])

  let result = ""

  useEffect(async() => {
    setLoading(true)
    console.log(categoryFilters)
    const fetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + '/search'
    const res = await axios.get(fetchUrl, {
      params: {
        categoryFilters: categoryFilters,
        searchString: searchString,
        pgno: currentPage,
      },
      paramsSerializer: function(params) {
        console.log(qs.stringify(params, {arrayFormat: 'repeat'}))
        return qs.stringify(params, {arrayFormat: 'repeat'})
     },
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

  }, [currentPage, categoryFilters])
  

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCategoryChange = (category) => {
    const newFilters = []
    let flag = false
    categoryFilters.forEach(c => {
      if(c == category) {
        flag = true
        return
      }
      newFilters.push(c)
    })
    if(!flag) newFilters.push(category)

    console.log("Categories: ", newFilters)
    setCategoryFilters(newFilters)
  }

  return (
  <>
    <Navbar />

    <br />
    <br />
                  
    <div className="ms-5 mt-5 mb-4 h4">{result}</div>
    <div className="d-flex flex-row justify-content-start">
      <div style={{flexGrow: 0.55, backgroundColor: '#fafafa', margin: '10px'}} className="d-flex flex-column justify-content-start">
        <div className="container ms-2 mt-3 mb-3 h5" >Apply filters</div>
        {
          categories.map(category =>
            category === 'None'?
              <></>:
              <div className="d-flex flex-row ms-4 mb-1">
                  <label for={category} className="me-2">{category}</label>
                  <input type="checkbox" onChange={() => handleCategoryChange(category)} id={category} value={category} />
              </div>
          )
        }
      </div>
      <div style={{flexGrow: 2}}>
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
                        image = {item.photo}
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
      </div>
    </div>
  </>
  )
}

export default Search