import logo from './logo.svg';
import './App.css';
import Detail from './Detail';
import PopUp from './PopUp';
import Calendar from './Calendar';
import FestList from './FestList';
import Login from './Login';
import Redirect from './Redirect';
import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import CMreview from './pages/CM_review';
import CMfriends from './pages/CM_friends';
import CMinf from './pages/CM_inf';
import CMticket from './pages/CM_ticket';
import WritePost from './pages/WritePost';
import RVShowPost from './pages/RVShowPost';
import FRShowPost from './pages/FRShowPost';
import TKShowPost from './pages/TKShowPost';
import InfShowPost from './pages/InfShowPost';
import { RightWrite } from './pages/right';


const API_URL = "https://reactapitest.pythonanywhere.com/api/"


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/redirect' element={<Redirect></Redirect>}></Route>
        <Route path='/review' element={<CMreview apiUrl={API_URL}/>} />
        <Route path='/friends' element={<CMfriends />} />
        <Route path='/ticket' element={<CMticket />} />
        <Route path='/inf' element={<CMinf />} />
        <Route path='/writepost' element={<WritePost />} />
        <Route path='/review/post/:postID' element={<RVShowPost apiUrl={API_URL}/>} />
        <Route path='/friends/post/:postID' element={<FRShowPost />} />
        <Route path='/ticket/post/:postID' element={<TKShowPost />} />
        <Route path='/inf/post/:postID' element={<InfShowPost />} />
        <Route path='/writepost' element={<WritePost apiUrl={API_URL}/>} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/festlist' element={<FestList />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
