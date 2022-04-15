import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import axios from 'axios'
import Pagination from '@mui/material/Pagination'
import Navbar from './Navbar'
import { useParams } from 'react-router'
import qs from 'qs'
import { useNavigate } from "react-router-dom"
// import { sortBy } from './utils'

const { REACT_APP_SERVER_IP, REACT_APP_PORT } = process.env

const Search = () => {

  const navigate = useNavigate()
  const { searchString } = useParams()
  const sortBy = ["Title", "Current Bid", "Min Bid", "Time Left"]
  const initialCategories = [
    {key: "None", value: false},
    {key: "Book", value: false},
    {key: "Electronics", value: false},
    {key: "Stationery", value: false},
    {key: "Bathroom Supplies", value: false},
    {key: "Study Material", value: false},
    {key: "Poster", value: false},
    {key: "Sports", value: false}
  ]

  const [categories, setCategories] = useState(initialCategories)

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [itemsData, setItemsData] = useState({ totalPages: 0, totalItems: 0, items: [] })
  const [categoryFilters, setCategoryFilters] = useState([])
  const [sortValue, setSortValue] = useState("")

  let result = ""

  useEffect(async () => {
    setLoading(true)
    const fetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + '/search'
    const res = await axios.get(fetchUrl, {
      params: {
        categoryFilters: categoryFilters,
        searchString: searchString,
        pgno: currentPage,
        sortBy: sortValue
      },
    })

    setItemsData(res.data)

    setLoading(false)

  }, [currentPage, categoryFilters])

  if (itemsData.totalItems === 0) result = "No matching results!"
  else {
    const maxItemPerPage = Math.ceil(itemsData.totalItems / itemsData.totalPages)
    const i = 1 + (currentPage - 1) * maxItemPerPage
    const j = Math.min((currentPage) * maxItemPerPage, itemsData.totalItems)
    result = `Showing ${i} - ${j} items out of ${itemsData.totalItems} search results`
  }

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSubmitFilter = () => {
    setCategories(categories)
    const newFilters = []
    categories.forEach(c => {
      if(c.value == true) newFilters.push(c.key)
    })
    setCategoryFilters(newFilters)
  }

  const handleCategoryChange = (e, index) => categories[index].value = e.target.checked

  const handleClear = () => navigate(0)

  return (
    <div className="container-fluid">
      <Navbar />
      <br /> <br />

      <div className="col-md-2 px-1 bg-danger text-white position-fixed mt-5 ps-3 pe-3 p-2">
        <div className='mb-3'>
          <h4 className="pt-3 pb-2 mb-3 border-bottom">Categories</h4>
          {
            categories.map((category, index) =>
              category.key === 'None' ?
                <></> :
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" onChange={(e) => handleCategoryChange(e, index)} value={category.key}/>
                  <label className="form-check-label ms-2" >{category.key}</label>
                </div>
            )
          }
          
        </div>

        <div className='mb-5'>
          <h4 className="pt-3 pb-2 mb-3 border-bottom">Sort By</h4>
          {
            sortBy.map((property) =>
              property === "None" ?
                <></> :
                <div className="form-check">
                  <input className="form-check-input" name="flexRadioDefault" type="radio" onChange={() => setSortValue(property)} value={property} />
                  <label className="form-check-label ms-2" >{property}</label>
                </div>
            )
          }
        </div>

        <div className="mb-3 mt-5">
        <button type="button" className="btn btn-light me-3 ms-3" onClick={handleClear}>Clear</button>
        <button type="button" className="btn btn-warning ms-3" onClick={handleSubmitFilter}>Apply</button>
        </div>
      </div>

      <div className="row mt-5 mb-2 ms-5 justify-content-end">
        <div className="col-md-10">
          <div className="ms-5 mb-4 h4">{result}</div>

          <div className="container">
            <div className="row justify-content-md-center">
              <div className={"col-md-auto " + (itemsData.totalPages == 0 ? "d-none" : "")}>
                <Pagination count={itemsData.totalPages} page={currentPage} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="container mt-5">
            { loading && (<h4>Loading...</h4>) }
            {!loading && (
              <div className="row">
                {itemsData.items.map(item => {
                  return (
                    <div className="col-4 mb-5 ">
                      <Link to={`/item/${item._id}`} className="text-decoration-none">
                        <Card
                          key={item._id}
                          name={item.name}
                          time={new Date(item.endTime) - Date.now()}
                          currBid={item.highestBid ? item.highestBid : "No bids yet"}
                          image={item.photo}
                        />
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className="container mb-5">
            <div className="row justify-content-md-center">
              <div className={"col-md-auto " + (itemsData.totalPages == 0 ? "d-none" : "")}>
                <Pagination count={itemsData.totalPages} page={currentPage} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search