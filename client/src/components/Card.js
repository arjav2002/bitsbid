import logo from '../img/showcase.jpg'
import { TimeCounter } from './utils'
import './Card.css'

const Card = ({name, time, currBid, image}) => {

    return (
        <div className="card bg-light" style={{width:"20rem"}}>
            <img id="imageContainer" src={image ? image : logo} className="card-img-top" alt="..." />
            <div className="card-body text-center card-title h5">
                <div className="h3 text-danger mb-3">{name}</div>
                <div className="row">
                    <div className="col h6 text-black">Current Bid : {currBid}</div>
                </div>
                <div className="row">
                    <div className="h6 text-black">Time left: <TimeCounter timeLeft={time} />
                </div>
                </div>
            </div>
        </div>
    )
}

export default Card