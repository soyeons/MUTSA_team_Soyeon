import React, { useState, useRef } from 'react';
import './Main.css';
import './MainHome.css';
import './MainTheme.css';
import mainImg from './img/mainHome.png';
import image1 from './img/fireCraker/image1.png';
import image2 from './img/fireCraker/image2.png';
import image3 from './img/fireCraker/image3.png';
import image4 from './img/fireCraker/image4.png';
import image5 from './img/fireCraker/image5.png';
import image6 from './img/fireCraker/image6.png';
import image7 from './img/fireCraker/image7.png';
import Navbar from './Nav';

const Main = () => {
	let [isClick, setIsClick] = useState(0);

	const btnActivate = (idx) => {
		setIsClick(idx);
	};

	const mainThemeRef = useRef(null);

	const scrollToElement = () => mainThemeRef.current.scrollIntoView({ behavior: 'smooth' });

	return (
		<div className='main'>
			<nav className='mainnav'><Navbar/></nav>
			<div className='mainContent'>
				<div className='mainHome'>
					<div className='mainHomeBody'>
						<div className='mainHomeContent'>
							<h1 className='mainHomeText'>
								당신의 취향을 <span>저격</span>할 페스티벌은?
							</h1>
							<p className='mainHomeDesc'>아래로 이동해 테마 구현하기</p>
							<button className='scrollBtn' onClick={scrollToElement}>
								<svg width='68' height='76' viewBox='0 0 68 76' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<g filter='url(#filter0_d_66_109)'>
										<path d='M58 33.4546V20.3636L34 34.9091L10 20.3636V33.4546L34 48L58 33.4546Z' fill='white' />
										<path d='M58 13.0909V0L34 14.5455L10 0V13.0909L34 27.6364L58 13.0909Z' fill='white' />
									</g>
									<defs>
										<filter id='filter0_d_66_109' x='0' y='0' width='68' height='76' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'>
											<feFlood flood-opacity='0' result='BackgroundImageFix' />
											<feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
											<feOffset dy='18' />
											<feGaussianBlur stdDeviation='5' />
											<feComposite in2='hardAlpha' operator='out' />
											<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0' />
											<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_66_109' />
											<feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_66_109' result='shape' />
										</filter>
									</defs>
								</svg>
							</button>
						</div>
						<img className='fireCraker1' src={image1} alt='fire1'></img>
						<img className='fireCraker2' src={image2} alt='fire2'></img>
						<img className='fireCraker3' src={image3} alt='fire3'></img>
						<img className='fireCraker4' src={image4} alt='fire4'></img>
						<img className='fireCraker5' src={image5} alt='fire5'></img>
						<img className='fireCraker6' src={image6} alt='fire6'></img>
						<img className='fireCraker7' src={image7} alt='fire7'></img>
					</div>
				</div>
				<div className='mainTheme' ref={mainThemeRef}>
					<div className='mainThemeBody'>
						<div className='mainThemeContent'>
							<h1 className='mainThemeText'>궁금한 테마를 선택한 후 검색 버튼을 눌러보세요!</h1>
							<form className='tagSearchForm'>
								<button className={'submitBtn' + (isClick !== 0 ? ' active' : '')} type='submit'>
									검색
								</button>
								<div className='tagContainer'>
									<button type='button' onClick={() => btnActivate(1)}>
										<p className='emogi'>🔥 🤬 🤛</p>
										<div className={'mainThemetext' + (isClick === 1 ? ' active' : '')}>
											<h1>
												스트레스는
												<br />
												날려버려
											</h1>
										</div>
									</button>
									<button type='button' onClick={() => btnActivate(2)}>
										<p className='emogi'>💚 😌 🏝</p>
										<div className={'mainThemetext' + (isClick === 2 ? ' active' : '')}>
											<h1>
												잔잔하고
												<br />
												힐링이 되는
											</h1>
										</div>
									</button>
									<button type='button' onClick={() => btnActivate(3)}>
										<p className='emogi'>🎶 🌈 🫶</p>
										<div className={'mainThemetext' + (isClick === 3 ? ' active' : '')}>
											<h1>
												이게 바로
												<br />
												청춘인가
											</h1>
										</div>
									</button>
									<button type='button' onClick={() => btnActivate(4)}>
										<p className='emogi'>✨ 🎸 💃</p>
										<div className={'mainThemetext' + (isClick === 4 ? ' active' : '')}>
											<h1>
												그루브 타며
												<br />
												비트에 온 몸을 맡겨
											</h1>
										</div>
									</button>
									<button type='button' onClick={() => btnActivate(5)}>
										<p className='emogi'>🎈 🎧 🌆</p>
										<div className={'mainThemetext' + (isClick === 5 ? ' active' : '')}>
											<h1>
												내 감성을 책임질
												<br />
												인디 음악
											</h1>
										</div>
									</button>
									<button type='button' onClick={() => btnActivate(6)}>
										<p className='emogi'>💙 🫧 🥽</p>
										<div className={'mainThemetext' + (isClick === 6 ? ' active' : '')}>
											<h1>
												음악에 흠뻑
												<br />
												물에도 흠뻑
											</h1>
										</div>
									</button>
									<button type='button' onClick={() => btnActivate(7)}>
										<p className='emogi'>💻 🎟 🎫</p>
										<div className={'mainThemetext' + (isClick === 7 ? ' active' : '')}>
											<h1>
												야 너두
												<br />
												티켓팅 할 수 있어
											</h1>
										</div>
									</button>
									<button type='button' onClick={() => btnActivate(8)}>
										<p className='emogi'>🍔 🍕 🍺</p>
										<div className={'mainThemetext' + (isClick === 8 ? ' active' : '')}>
											<h1>
												페스티벌도
												<br />
												식후경
											</h1>
										</div>
									</button>
									<button type='button' onClick={() => btnActivate(9)}>
										<p className='emogi'>🤳 📸 👍</p>
										<div className={'mainThemetext' + (isClick === 9 ? ' active' : '')}>
											<h1>
												난 노래도 좋지만
												<br />
												사진도 건지고 싶어
											</h1>
										</div>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<img className='mainImg' src={mainImg} alt='mainImg'></img>
		</div>
	);
};

export default Main;
