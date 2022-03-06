// import React from "react";
import { connect } from "react-redux";
import GoogleLogin from 'react-google-login'
import axios from 'axios'

//require('dotenv').config()
const {REACT_APP_SERVER_IP, REACT_APP_PORT, REACT_APP_CLIENT_ID} = process.env

// import { setCurrentUser } from "../../actions/authActions";

// import React from 'react'

const Login = () => {

  const responseGoogle = (res) => {
    const server_url = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + '/login'
    console.log("response google: ", res)
    console.log("server url: ", server_url);
    axios.post(server_url, {token: res.tokenId})
      .then(res => {
        console.log("post request done");
      })
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
                    clientId={REACT_APP_CLIENT_ID}
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
