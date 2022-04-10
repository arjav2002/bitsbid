// import React from 'react'
// import Temp from './temp'

// const QuesCard = () => {

// 	const qna = [
// 		{ques: "mst question", ans: "mst answer"},
// 		{ques: "mst question", ans: "mst answer"},
// 		{ques: "mst question", ans: "mst answer"},
// 		{ques: "mst question", ans: "mst answer"},
// 		{ques: "mst question", ans: "mst answer"},
// 		{ques: "mst question", ans: "mst answer"},
// 		{ques: "mst question", ans: "mst answer"},
// 		{ques: "mst question", ans: "mst answer"}
// 	]

// 	return (
// 		// <>
// 		// 	<div className="container mt-5 mb-5">
// 		// 		<div className='row mt-3'>
// 		// 			<div className="accordion" id="accordionExample">
// 		// 					<div className="accordion-item">
// 		// 					<h2 className="accordion-header" id="headingOne">
// 		// 						<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
// 		// 							Question #1
// 		// 						</button>
// 		// 					</h2>
// 		// 					<div id="collapseOne" className="accordion-collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
// 		// 						<div className="accordion-body">
// 		// 							Answer
// 		// 						</div>
// 		// 					</div>
// 		// 				</div>
										
// 		// 			</div>
// 		// 		</div>
// 		// 	</div>
// 		// </>


// 		<>
// 					<div className="parent-container d-flex m-5">
// 						<div className="container" style={{ width: "auto" }}>
// 							<div className="row">
// 								<div className="col mt-5">
// 									<img id="imageContainer" className="card-img-top" alt="mast photu" />
// 								</div>
// 							</div>
// 						</div>

// 						<div className="container ms-3">
// 							<div className="row mt-4 mb-4">
// 								<div className="col">
// 									<h2>Badiya naam</h2>
// 								</div>
// 							</div>
// 							<div className="row mt-4 mb-4">
// 								<div className="col">
// 									<p><i>
// 										Badiya description
// 									</i></p>
// 								</div>
// 								<div className="col">
// 									Minimum Bid: 2500
// 								</div>
// 							</div>
// 							<div className="row mt-4 mb-4">
// 								<div className="col">
// 									<h5>Current Bid: 2500</h5>
// 								</div>
// 								<div className="col">
// 									<h5>Time remaining: Bahut time he /></h5>
// 								</div>
// 							</div>
// 							<div className="row mt-4">
// 								<div className="col-3">
// 									<input className="form-control me-2" placeholder="Enter bid amount" type="number" aria-label="Search" />
// 								</div>
// 								<div className="col">
// 									<button className="btn btn-danger ms-2">BID</button>
// 								</div>
// 								<div className="col">
// 									<button className="btn rounded-pill btn-dark me-2 text-nowrap">Add to Watchlist</button>
// 								</div>
// 							</div>
// 							<div className="row mt-1">
// 								<div style={{ color: 'red' }} className="col">Gadbad he kuch to</div>
// 							</div>
// 						</div>
// 					</div>

// 					<hr style={{ width: '85%', margin: 'auto' }} />

// 					<div className="container mt-5 mb-5">
// 						<div className='row'>
// 							<div className='col h3'>QnA</div>
// 							<div className='col' style={{ flex: 0 }}>
// 								<button className="btn btn-danger text-nowrap" type="submit">Ask a Question</button>
// 							</div>
// 						</div>
// 					</div>

// 					<div>
// 						{qna.map(x => {
// 							<Temp
// 								ques = {x.ques}
// 								ans = {x.ans}
// 							/>
// 						})}
// 					</div>
// 				</>
// 	)
// }

// export default QuesCard