import React, { Component } from "react";
import Login from "./components/Login";
import "./App.css";
import Sell from "./components/Sell";

class App extends Component {
  render() {
    
    return (
      <>
        <div>
         <Sell />
         {/* <Login /> */}
        </div>
      </>
    );
  }
}

export default App;
