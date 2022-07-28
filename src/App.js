import React from 'react';
import './App.css';
import Login from './Login';
import Redirect from './Redirect';

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Login></Login>}></Route>
        <Route path = '/redirect' element = {<Redirect></Redirect>}></Route>
      </Routes>
    </>
  )
}

export default App;
