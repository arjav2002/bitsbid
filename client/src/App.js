import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Sell from "./components/Sell";
import Home from "./components/Home_page"
import Item from "./components/Item_page";
import MyItems from "./components/MyItems_page"
import Watchlist from './components/watchlist'
import Search from "./components/Search";
import "./App.css";

function App() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/item/:id' element={<Item />} />
          <Route exact path='/sell' element={<Sell />} />
          <Route exact path='/my-items' element={<MyItems />} />
          <Route exact path='/my-watchlist' element={<Watchlist />} />
          <Route exact path='/search/:searchString' element={<Search />} />
        </Routes>
      </Router>
    );
}

export default App;