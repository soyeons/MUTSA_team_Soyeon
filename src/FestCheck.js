import React, { useState } from 'react';
import Navbar from './Nav';
import './FestCheck.css';
import { Chomoji, Qlist } from './styledComponent';

function FestCheck() {
	const [tab1, setTab1] = useState('');
	const [tab2, setTab2] = useState('');
	const [tab3, setTab3] = useState('');
	const [tab4, setTab4] = useState('');
	const [tab5, setTab5] = useState('');

	const [checks1, setCheck1] = useState(0);
	const [checks2, setCheck2] = useState(0);
	const [checks3, setCheck3] = useState(0);
	const [checks4, setCheck4] = useState(0);
	const [checks5, setCheck5] = useState(0);
	const [checks6, setCheck6] = useState(0);

	const consoleZZik = (x, id) => {
		console.log('id는 : ', id, ',x는 : ', x);
		if (id === 1) {
			setCheck1(x);
			// console.log(checks1);
		} else if (id === 2) {
			setCheck2(x);
		} else if (id === 3) {
			setCheck3(x);
		} else if (id === 4) {
			setCheck4(x);
		} else if (id === 5) {
			setCheck5(x);
		} else if (id === 6) {
			setCheck6(x);
		}
	};

	return (
		<div className='festCheck'>
			<nav>
				<Navbar />
			</nav>
			<div className='festCheckBody'>
				<div className='YellowSquareCheck'>
					<div className='PostListCheck'>
						<div className='placeQ'>
							<Chomoji>🎪</Chomoji>
							<Qlist>해당 페스티벌의 분위기는 어떤가요?</Qlist>
							<div className='checkBtn'>
								<button
									type='hidden'
									value='1'
									className={`checkBtns ${tab1 === 1 ? 'active' : ''}`}
									onClick={(event) => {
										setTab1(1);
										consoleZZik(event.target.value, 1);
									}}
								>
									스트레스를 날려버리는 / 신나는
								</button>
								<button
									type='hidden'
									value='2'
									className={`checkBtns ${tab1 === 2 ? 'active' : ''}`}
									onClick={(event) => {
										setTab1(2);
										consoleZZik(event.target.value, 1);
									}}
								>
									감성적인 / 힐링이 되는
								</button>
								<button
									type='hidden'
									value='3'
									className={`checkBtns ${tab1 === 3 ? 'active' : ''}`}
									onClick={(event) => {
										setTab1(3);
										consoleZZik(event.target.value, 1);
									}}
								>
									스트레스를 날려버리는 / 신나는 / 감성적인 / 힐링이 되는
								</button>
							</div>
						</div>
						<div className='placeQ'>
							<Chomoji>🎸</Chomoji>
							<Qlist>해당 페스티벌의 뮤직 스타일은 어떤가요?</Qlist>
							<div className='checkBtn'>
								<button
									type='hidden'
									value='1'
									className={`checkBtns ${tab2 === 1 ? 'active' : ''}`}
									onClick={(event) => {
										setTab2(1);
										consoleZZik(event.target.value, 2);
									}}
								>
									힙합 / 알앤비 / 락
								</button>
								<button
									type='hidden'
									value='2'
									className={`checkBtns ${tab2 === 2 ? 'active' : ''}`}
									onClick={(event) => {
										setTab2(2);
										consoleZZik(event.target.value, 2);
									}}
								>
									인디 어쿠스틱 / 인디 밴드
								</button>
								<button
									type='hidden'
									value='3'
									className={`checkBtns ${tab2 === 3 ? 'active' : ''}`}
									onClick={(event) => {
										setTab2(3);
										consoleZZik(event.target.value, 2);
									}}
								>
									앞의 장르들 짬뽕
								</button>
							</div>
						</div>
						<div className='placeQ'>
							<Chomoji>🥽</Chomoji>
							<Qlist>물을 맞는 페스티벌인가요?</Qlist>
							<div className='checkBtn'>
								<button
									type='hidden'
									value='1'
									className={`checkBtns ${tab3 === 1 ? 'active' : ''}`}
									onClick={(event) => {
										setTab3(1);
										consoleZZik(event.target.value, 3);
									}}
								>
									안 맞아요
								</button>
								<button
									type='hidden'
									value='2'
									className={`checkBtns ${tab3 === 2 ? 'active' : ''}`}
									onClick={(event) => {
										setTab3(2);
										consoleZZik(event.target.value, 3);
									}}
								>
									잘 모르겠어요
								</button>
								<button
									type='hidden'
									value='3'
									className={`checkBtns ${tab3 === 3 ? 'active' : ''}`}
									onClick={(event) => {
										setTab3(3);
										consoleZZik(event.target.value, 3);
									}}
								>
									워터밤
								</button>
							</div>
						</div>
						<div className='placeQ'>
							<Chomoji>🍔</Chomoji>
							<Qlist>푸드 섹션이 있나요?</Qlist>
							<div className='checkBtn'>
								<button
									type='hidden'
									value='1'
									className={`checkBtns ${tab4 === 1 ? 'active' : ''}`}
									onClick={(event) => {
										setTab4(1);
										consoleZZik(event.target.value, 4);
									}}
								>
									푸드 섹션은 없어요
								</button>
								<button
									type='hidden'
									value='2'
									className={`checkBtns ${tab4 === 2 ? 'active' : ''}`}
									onClick={(event) => {
										setTab4(2);
										consoleZZik(event.target.value, 4);
									}}
								>
									잘 모르겠어요
								</button>
								<button
									type='hidden'
									value='3'
									className={`checkBtns ${tab4 === 3 ? 'active' : ''}`}
									onClick={(event) => {
										setTab4(3);
										consoleZZik(event.target.value, 4);
									}}
								>
									푸드 섹션이 있어요
								</button>
							</div>
						</div>
						<div className='placeQ'>
							<Chomoji>📸</Chomoji>
							<Qlist>포토존으로 여겨질만한 공간이 있나요?</Qlist>
							<div className='checkBtn'>
								<button
									type='hidden'
									value='1'
									className={`checkBtns ${tab5 === 1 ? 'active' : ''}`}
									onClick={(event) => {
										setTab5(1);
										consoleZZik(event.target.value, 5);
									}}
								>
									우리 사진 말고, 공연만 즐기는걸로 해요
								</button>
								<button
									type='hidden'
									value='2'
									className={`checkBtns ${tab5 === 2 ? 'active' : ''}`}
									onClick={(event) => {
										setTab5(2);
										consoleZZik(event.target.value, 5);
									}}
								>
									잘 모르겠어요
								</button>
								<button
									type='hidden'
									value='3'
									className={`checkBtns ${tab5 === 3 ? 'active' : ''}`}
									onClick={(event) => {
										setTab5(3);
										consoleZZik(event.target.value, 5);
									}}
								>
									인생샷 건짐
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FestCheck;
