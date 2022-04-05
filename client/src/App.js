import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Sell from "./components/Sell";
import Home from "./components/Home_body";
import "./App.css";

function App() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/sell' element={<Sell />} />
        </Routes>
      </Router>
    );
}

export default App;