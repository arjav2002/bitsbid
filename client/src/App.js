import React, { Component } from "react";
import Login from "./components/Login";
import Sell from "./components/Sell";
import Home from "./components/Home";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

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
