import React, { Component } from "react";
// require('dotenv').config()
// import GoogleLogin from 'react-google-login'
// import axios from 'axios'
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Provider } from "react-redux";

import Login from "./components/Login";


import "./App.css";

class App extends Component {
  render() {
    
    return (
      <>
        <div>
         <Login />
        </div>
      </>
      // <Provider>
        // <Router>
        //   <div className="App">
        //     <Route exact path="/" component={Login} />
        //     {/* <div className="container">
        //       <Route exact path="/profile" component={Profile} />
        //       <Route exact path="/create" component={PostForm} />
        //       <Route exact path="/all-posts" component={Posts} />
        //     </div> */}
        //   </div>
        // </Router>
      // </Provider>
    );
  }
}

export default App;
