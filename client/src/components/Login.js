// import React from "react";
import { connect } from "react-redux";
import GoogleLogin from 'react-google-login'
import axios from 'axios'
// require('dotenv').config()
const {SERVER_IP, PORT, REACT_APP_CLIENT_ID} = process.env

// import { setCurrentUser } from "../../actions/authActions";

// import React from 'react'

const Login = () => {

  const responseGoogle = (res) => {
    console.log(res);
    const server_url = SERVER_IP + ':' + PORT + '/login'
    axios.post(server_url, {token: res.tokenId})
      .then(res => window.location.assign(res.data.redirect))
  }

  return (
    <>
      <div className="login">
        <div className="dark-overlay login-inner text-light">
          <div className="container text-center" >
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">BitsBid</h1>
                <p className="lead">
                  Login to your google account and start bidding !
                </p>
                <hr />
                  {/* <div>
                    <br />
                    <h2 className="display-5 mb-4">Welcome, {user.name}</h2>
                  </div> */}
                  <GoogleLogin
                    clientId='760379513088-hujkecmfm49s07n90kmsc9r19nttsd61.apps.googleusercontent.com'
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                  {/* <div className="google-btn-container">
                    <a href="/auth/google">
                      <div className="google-btn">
                        <div className="google-icon-wrapper">
                          <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="signin"
                          />
                        </div>
                        <p className="btn-text">
                          <b>Log in with Google</b>
                        </p>
                      </div>
                    </a>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default Login

// export default connect(
//   mapStateToProps,
//   { setCurrentUser }
// )(Login);
