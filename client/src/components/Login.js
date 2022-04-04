import GoogleLogin from 'react-google-login'
import axios from 'axios'
import './Login.css'
import logo from '../img/logo_fin.png'
import Home from './Home'
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useParams,
} from "react-router-dom";
import { useNavigate } from 'react-router'

// require('dotenv').config()
const {REACT_APP_SERVER_IP, REACT_APP_PORT, REACT_APP_CLIENT_ID} = process.env

const Login = () => {

  const navigate = useNavigate()

  const responseGoogle = (res) => {
    const server_url = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + '/login';
    axios.post(server_url, {token: res.tokenId})
      .then(res => navigate('/home/'+res.data.id))
      .catch(err => {
        console.log(err)
        navigate('/')
      })
  }

  return (
    <>
      <div className="login">
        <div className="dark-overlay text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <img src={logo} className="img-fluid" alt="Responsive image"/>
                <div className="text-muted">An online auctioning platform</div>
                <p className="lead mt-5">Login to your google account and start bidding !</p>
                <hr/>
                  <GoogleLogin
                    clientId='760379513088-hujkecmfm49s07n90kmsc9r19nttsd61.apps.googleusercontent.com'
                    buttonText="Login by Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login