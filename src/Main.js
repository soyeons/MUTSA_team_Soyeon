import React from 'react';
import './Main.css';
import MainHome from './MainHome';
import MainTheme from './MainTheme';
import mainImg from './img/mainHome.png';

const Main = () => {
	return (
		<div className='main'>
			<nav>nav바 구간</nav>
			<div className='mainContent'>
				<MainHome></MainHome>
				<MainTheme></MainTheme>
			</div>
			<img className='mainImg' src={mainImg} alt='mainImg'></img>
		</div>
	);
};

export default Main;
