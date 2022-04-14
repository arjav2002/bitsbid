import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import Carousel from './Carousel'
import axios from 'axios'
import Pagination from '@mui/material/Pagination'
import './Home_body.css'

const { REACT_APP_SERVER_IP, REACT_APP_PORT } = process.env

const Body = () => {

	const [currentPage, setCurrentPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const [itemsData, setItemsData] = useState({ totalPages: 0, items: [] })

	useEffect(async () => {
		setLoading(true)
		const fetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + `/itemspage?pgno=${currentPage}`
		const res = await axios.get(fetchUrl)
		setItemsData(res.data)
		setLoading(false)
	}, [currentPage])

	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	const items = [
		{ key: 1, name: "nayan", image: "" },
		{ key: 2, name: "arjav", image: "" },
		{ key: 3, name: "aayush", image: "" },
		{ key: 4, name: "pote", image: "" },
		{ key: 5, name: "yash", image: "" }
	]

	return (
		<div>
			<br />
			<Carousel />

			<div className="d-flex flex-column justify-content-center">
				<div className="container mt-5 mb-4 h3" >Items</div>
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-md-auto">
							<Pagination count={itemsData.totalPages} page={currentPage} onChange={handleChange} />
						</div>
					</div>
				</div>

				<div className="container mt-5">
					{loading && (<h3>Loading...</h3>)}
					{!loading && (
						<div className="row">
							{itemsData.items.map(item => {
								return (
									<div className="col-4 mb-5 d-flex justify-content-center">
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

				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-md-auto">
							<Pagination count={itemsData.totalPages} page={currentPage} onChange={handleChange} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Body