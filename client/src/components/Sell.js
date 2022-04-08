import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Sell.css"
const {REACT_APP_SERVER_IP, REACT_APP_PORT} = process.env

const Sell = () => {

  const navigate = useNavigate()
  
  let today = new Date()
  let d = today.getDate()
  let m = today.getMonth() + 1
  let y = today.getFullYear()

  if(d < 10) d = '0' + d
  if(m < 10) m = '0' + m;
  
  today = y + '-' + m + '-' + d;

  const [title, setTitle] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [minBid, setMinBid] = useState("")
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState("")

  const handleTitle = e => setTitle(e.target.value)
  const handleEndDate = e => setEndDate(e.target.value)
  const handleEndTime = e => setEndTime(e.target.value)
  const handleMinBid = e => setMinBid(e.target.value)
  const handleDesc = e => setDesc(e.target.value)
  const handleImage = e => setImage(e.target.value)

  const handleSubmit = (e) => {

    e.preventDefault()

    const date = new Date();
    const d = parseInt(endDate.substring(8))
    const m = parseInt(endDate.substring(5, 7))
    const y = parseInt(endDate.substring(0, 4))
    const h = parseInt(endTime.substring(0, 2))
    const s = parseInt(endTime.substring(3))
    date.setFullYear(y, m-1, d)
    date.setHours(h)
    date.setMinutes(s)

    const server_url = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + '/item';
    axios.post(server_url, {
      name: title,
      endTime: date,
      minBid: parseInt(minBid),
      description: desc,
      photo: image
    })
    .then(res => navigate(-1))
    .catch(err => {
      console.log(err)
      navigate(-1)
    })
  }

  return (
    <div className="bg-image">
      <div className="dark-overlay text-light">
      {/* <Navbar/> */}
      <div className="container">
      <div className="row">
        <div className="col-md-12 text-center mt-5 h2">
          Post Your Item !
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="row justify-content-md-center align-items-center mt-5">
        <div className="col-md-2 text-center">Title</div>
          <div className="col-md-4 text-center">
            <div className="form-group">
              <input type="text" className="form-control" required={true} placeholder="Enter title" value={title} onChange={handleTitle}/>
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-2 text-center">End Date</div>
          <div className="col-md-4 text-center">
            <div className="form-group">
              <input type="date" className="form-control" required={true} min={today} value={endDate} onChange={handleEndDate}/>
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-2 text-center">End Time</div>
          <div className="col-md-4 text-center">
            <div className="form-group">
              <input type="time" className="form-control" required={true}  value={endTime} onChange={handleEndTime}/>
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-2 text-center">Minimum Bid</div>
          <div className="col-md-4 text-center">
            <div className="form-group">
              <input 
                type="number" min="0" required={true} 
                className="form-control" placeholder="Enter amount in Rs." 
                value={minBid} onChange={handleMinBid}
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-2 text-center">Description</div>
          <div className="col-md-4 text-center">
            <div className="form-group">
              <textarea className="form-control" rows="3" placeholder="Enter description" value={desc} onChange={handleDesc} />
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-2 text-center">Image</div>
          <div className="col-md-4 text-start">
            <div className="form-group">
              <input type="file" className="form-control-file" accept=".png, .jpg, .jpeg" value={image} onChange={handleImage}/>
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
          <div className="col-md-4 text-center mt-5">
          <button type="submit" className="btn btn-danger">Submit</button>
          </div>
        </div>

        </form>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Sell