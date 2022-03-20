import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import LoginPage from './pages'
import HomePage from './pages/home'
import SellForm from './pages/sellform'
function App() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<LoginPage />}/>
          <Route path='/home' element={<HomePage />} />
          <Route path='/sell' element={<SellForm />} />
        </Routes>
      </Router>
    );
}

export default App;
