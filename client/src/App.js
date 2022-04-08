import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Sell from "./components/Sell";
import Home from "./components/Home_body";
import MyItems from './components/MyItems_page'
import "./App.css";

function App() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/sell' element={<Sell />} />
          <Route exact path='/my-items' element={<MyItems />} />
        </Routes>
      </Router>
    );
}

export default App;