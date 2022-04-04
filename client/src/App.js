import React, { Component } from "react";
import Login from "./components/Login";
import Sell from "./components/Sell";
import Home from "./components/Home";
// import Sell from "./components/Sell";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from './pages'
import HomePage from './pages/home'
import SellForm from './pages/sellform'
function App() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/home/:id' element={<Home />} />
          <Route exact path='/sell/:id' element={<Sell />} />
        </Routes>
      </Router>
    );
}

export default App;
