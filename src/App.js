import React, { useState, useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import userContext from './context';
import Main from './Main';
import Detail from './Detail';
import PopUp from './PopUp';
import Calendar from './Calendar';
import FestList from './FestList';
import Login from './Login';
import Redirect from './Redirect';
import Profile from './Profile';
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
import EditPost from './pages/EditPost';
import Search from './Search';
import Theme from './Theme';

const API_URL = 'http://172.17.195.227:8000/festivalapp/';

function App() {
	const [user, setUser] = useState({ name: '', email: '', like: '', post: '', reply: '' });
	const context = useContext(userContext);

	const initializeUserInfo = async () => {
		if (localStorage.setItem.logined === true) {
			context.setUser({
				kakaoId: localStorage.getItem('kakaoId'),
				name: localStorage.getItem('name'),
				email: localStorage.getItem('email'),
				post: localStorage.getItem('post'),
				reply: localStorage.getItem('reply'),
				logined: localStorage.getItem('logined')
			});
		}
	};

	useEffect(() => {
		initializeUserInfo();
	});

	return (
		<>
			<userContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/calendar' element={<Calendar />} />
					<Route path='/login' element={<Login />} />
					<Route path='/redirect' element={<Redirect></Redirect>} />
					<Route path='/mypage' element={<Profile></Profile>}></Route>
					<Route path='/festlist' element={<FestList />} />
					{/* <Route path="/festlist/checking" element={<FestCheck/>}/> */}
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/review' element={<CMreview apiUrl={API_URL} />} />
					<Route path='/friends' element={<CMfriends apiUrl={API_URL} />} />
					<Route path='/ticket' element={<CMticket apiUrl={API_URL} />} />
					<Route path='/inf' element={<CMinf apiUrl={API_URL} />} />
					<Route path='/writepost' element={<WritePost apiUrl={API_URL} />} exact />
					<Route path='/writepost/modify/:postID' element={<WritePost apiUrl={API_URL} />} exact />
					<Route path='/review/post/:postID' element={<RVShowPost apiUrl={API_URL} />} />
					<Route path='/friends/post/:postID' element={<FRShowPost apiUrl={API_URL} />} />
					<Route path='/ticket/post/:postID' element={<TKShowPost apiUrl={API_URL} />} />
					<Route path='/inf/post/:postID' element={<InfShowPost apiUrl={API_URL} />} />
					<Route path='/writepost' element={<WritePost apiUrl={API_URL} />} />
					<Route path='/search' element={<Search></Search>} />
					<Route path='/theme' element={<Theme></Theme>} />
				</Routes>
			</userContext.Provider>
		</>
	);
}

export default App;
