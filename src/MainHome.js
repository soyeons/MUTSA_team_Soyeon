import React from 'react';
import './MainHome.css';
import mainHome from './img/mainHome.png';
import image1 from './img/fireCraker/image1.png';
import image2 from './img/fireCraker/image2.png';
import image3 from './img/fireCraker/image3.png';
import image4 from './img/fireCraker/image4.png';
import image5 from './img/fireCraker/image5.png';
import image6 from './img/fireCraker/image6.png';
import image7 from './img/fireCraker/image7.png';

const MainHome = () => {
	return (
		<div className='mainHome'>
			<div className='mainHomeBody'>
				<div className='mainHomeContent'>
					<h1 className='mainHomeText'>
						당신의 취향을 <span>저격</span>할 페스티벌은?
					</h1>
					<p className='mainHomeDesc'>아래로 이동해 테마 구현하기</p>
					<a href=''>
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
					</a>
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
	);
};

export default MainHome;
