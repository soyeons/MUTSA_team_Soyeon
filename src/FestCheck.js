import React, { useState } from 'react';
import Navbar from './Nav';
import './FestCheck.css';
import { Chomoji, Qlist } from "./styledComponent";

function FestCheck() {
	const [tab1, setTab1] = useState('');
	const [tab2, setTab2] = useState('');
	const [tab3, setTab3] = useState('');
	const [tab4, setTab4] = useState('');
	const [tab5, setTab5] = useState('');

	return (
		<div class='festCheck'>
			<nav>
				<Navbar />
			</nav>
			<div className='festCheckBody'>
				<div className='YellowSquareCheck'>
					<div className='PostListCheck'>
						<div className='placeQ'>
							<div>
								<Chomoji>🎪</Chomoji>
								<Qlist>해당 페스티벌의 분위기는 어떤가요?</Qlist>
							</div>
							<div className='checkBtn'>
								<button className={`checkBtns ${tab1 === 'first' ? 'active' : ''}`} onClick={() => setTab1('first')}>
									스트레스를 날려버리는 / 신나는
								</button>
								<button className={`checkBtns ${tab1 === 'second' ? 'active' : ''}`} onClick={() => setTab1('second')}>
									감성적인 / 힐링이 되는
								</button>
								<button className={`checkBtns ${tab1 === 'third' ? 'active' : ''}`} onClick={() => setTab1('third')}>
									스트레스를 날려버리는 / 신나는 <br />/ 감성적인 / 힐링이 되는
								</button>
							</div>
						</div>
						<div className='placeQ none'>
							<Chomoji>🎸</Chomoji>
							<Qlist>해당 페스티벌의 뮤직 스타일은 어떤가요?</Qlist>
							<div className='checkBtn'>
								<button className={`checkBtns ${tab2 === 'first' ? 'active' : ''}`} onClick={() => setTab2('first')}>
									힙합 / 알앤비 / 락
								</button>
								<button className={`checkBtns ${tab2 === 'second' ? 'active' : ''}`} onClick={() => setTab2('second')}>
									인디 어쿠스틱 / 인디 밴드
								</button>
								<button className={`checkBtns ${tab2 === 'third' ? 'active' : ''}`} onClick={() => setTab2('third')}>
									앞에 장르들 짬뽕
								</button>
							</div>
						</div>
						<div className='placeQ'>
							<Chomoji>🥽</Chomoji>
							<Qlist>물을 맞는 페스티벌인가요?</Qlist>
							<div className='checkBtn'>
								<button className={`checkBtns ${tab3 === 'first' ? 'active' : ''}`} onClick={() => setTab3('first')}>
									안 맞아요
								</button>
								<button className={`checkBtns ${tab3 === 'second' ? 'active' : ''}`} onClick={() => setTab3('second')}>
									잘 모르겠어요
								</button>
								<button className={`checkBtns ${tab3 === 'third' ? 'active' : ''}`} onClick={() => setTab3('third')}>
									워터밤
								</button>
							</div>
						</div>
						<div className='placeQ'>
							<Chomoji>🍔</Chomoji>
							<Qlist>푸드 섹션이 있나요?</Qlist>
							<div className='checkBtn'>
								<button className={`checkBtns ${tab4 === 'first' ? 'active' : ''}`} onClick={() => setTab4('first')}>
									푸드 섹션은 없어요
								</button>
								<button className={`checkBtns ${tab4 === 'second' ? 'active' : ''}`} onClick={() => setTab4('second')}>
									잘 모르겠어요
								</button>
								<button className={`checkBtns ${tab4 === 'third' ? 'active' : ''}`} onClick={() => setTab4('third')}>
									푸드 섹션이 있어요
								</button>
							</div>
						</div>
						<div className='placeQ'>
							<Chomoji>📸</Chomoji>
							<Qlist>포토존으로 여겨질만한 공간이 있나요?</Qlist>
							<div className='checkBtn'>
								<button className={`checkBtns ${tab5 === 'first' ? 'active' : ''}`} onClick={() => setTab5('first')}>
									우리 사진 말고, 공연만 즐기는걸로 해요
								</button>
								<button className={`checkBtns ${tab5 === 'second' ? 'active' : ''}`} onClick={() => setTab5('second')}>
									잘 모르겠어요
								</button>
								<button className={`checkBtns ${tab5 === 'third' ? 'active' : ''}`} onClick={() => setTab5('third')}>
									인생샷 건짐
								</button>
							</div>
						</div>
						<div className='registBtnCheck'>
							<button className='BtnCheck'>작성 완료</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

    const [checks1, setCheck1] = useState(0);
    const [checks2, setCheck2] = useState(0);
    const [checks3, setCheck3] = useState(0);
    const [checks4, setCheck4] = useState(0);
    const [checks5, setCheck5] = useState(0);
    const [checks6, setCheck6] = useState(0);


    const consoleZZik = (x, id) => {
        console.log(x);
    }

    return(
        <div id="center">
            <nav>
                <Navbar/>
            </nav>
            <div className="pd">
                <div className="YellowSquareCheck">
                    <div className="PostListCheck">
                        <div className="placeQ">
                            <Chomoji>🎪</Chomoji>
                            <Qlist>해당 페스티벌의 분위기는 어떤가요?</Qlist>   
                            <div className="checkBtn">
                                <button type="hidden" value="1" className={`checkBtns ${tab1 === 1 ? 'active' : ''}`}
                                    onClick={(event)=>{setTab1(1); consoleZZik(event.target.value,1);}}>스트레스를 날려버리는 / 신나는</button>
                                <button className={`checkBtns ${tab1 === 2 ? 'active' : ''}`}
                                    onClick={()=>setTab1(2)}>감성적인 / 힐링이 되는</button>
                                <button className={`checkBtns ${tab1 === 3 ? 'active' : ''}`}
                                    onClick={()=>setTab1(3)}>스트레스를 날려버리는 / 신나는 / 감성적인 / 힐링이 되는</button>
                            </div>                       
                        </div>
                        <div className="placeQ">
                            <Chomoji>🎸</Chomoji>
                            <Qlist>해당 페스티벌의 뮤직 스타일은 어떤가요?</Qlist>                           
                            <div className="checkBtn">
                                <button className={`checkBtns ${tab2 === 0 ? 'active' : ''}`}
                                    onClick={()=>setTab2(0)}>힙합 / 알앤비 / 락</button>
                                <button className={`checkBtns ${tab2 === 1 ? 'active' : ''}`}
                                    onClick={()=>setTab2(1)}>인디 어쿠스틱 / 인디 밴드</button>
                                <button className={`checkBtns ${tab2 === 2 ? 'active' : ''}`}
                                    onClick={()=>setTab2(2)}>워터밤 ....?</button>
                            </div> 
                        </div>
                        <div className="placeQ">
                            <Chomoji>🎫</Chomoji>
                            <Qlist>티켓팅은 어때요?</Qlist>  
                            <div className="checkBtn">
                                <button className={`checkBtns ${tab3 === 0 ? 'active' : ''}`}
                                    onClick={()=>setTab3(0)}>티켓팅 치열해요</button>
                                <button className={`checkBtns ${tab3 === 1 ? 'active' : ''}`}
                                    onClick={()=>setTab3(1)}>그냥 그래요</button>
                                <button className={`checkBtns ${tab3 === 2 ? 'active' : ''}`}
                                    onClick={()=>setTab3(2)}>티켓팅 식은 죽 먹기</button>
                            </div>                          
                        </div>
                        <div className="placeQ">
                            <Chomoji>🍔</Chomoji>
                            <Qlist>푸드 섹션이 있나요?</Qlist>   
                            <div className="checkBtn">
                                <button className={`checkBtns ${tab4 === 0 ? 'active' : ''}`}
                                    onClick={()=>setTab4(0)}>푸드 섹션은 없어요</button>
                                <button className={`checkBtns ${tab4 === 1 ? 'active' : ''}`}
                                    onClick={()=>setTab4(1)}>잘 모르겠어요</button>
                                <button className={`checkBtns ${tab4 === 2 ? 'active' : ''}`}
                                    onClick={()=>setTab4(2)}>푸드 섹션이 있어요</button>
                            </div>                          
                        </div>                        
                        <div className="placeQ">
                            <Chomoji>📸</Chomoji>
                            <Qlist>포토존으로 여겨질만한 공간이 있나요?</Qlist>
                            <div className="checkBtn">
                                <button className={`checkBtns ${tab5 === 0 ? 'active' : ''}`}
                                    onClick={()=>setTab5(0)}>우리 사진 말고, 공연만 즐기는걸로 해요</button>
                                <button className={`checkBtns ${tab5 === 1 ? 'active' : ''}`}
                                    onClick={()=>setTab5(1)}>잘 모르겠어요</button>
                                <button className={`checkBtns ${tab5 === 2 ? 'active' : ''}`}
                                    onClick={()=>setTab5(2) }>인생샷 건짐</button>
                            </div>                          
                        </div>                           
