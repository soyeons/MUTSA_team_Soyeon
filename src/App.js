import logo from './logo.svg';
import './App.css';
import Detail from './Detail';
import PopUp from './PopUp';
import Calendar from './Calendar';
import FestList from './FestList';
import Login from './Login';
import Redirect from './Redirect';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/redirect' element={<Redirect></Redirect>}></Route>
      </Routes>
    </>
  );
}

export default App;
