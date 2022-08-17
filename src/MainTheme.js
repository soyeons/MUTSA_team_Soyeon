import { useState, React } from 'react';
import './MainTheme.css';

const MainTheme = () => {
	let [isClick, setIsClick] = useState(0);

	const btnActivate = (idx) => {
		setIsClick(idx);
	};

	console.log(isClick);
	return (
		<div className='mainTheme'>
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
	);
};

export default MainTheme;
