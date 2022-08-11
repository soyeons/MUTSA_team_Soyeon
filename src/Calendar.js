import React, { useState, useEffect } from 'react';
import style from './Calendar.css';
import classNames from 'classnames/bind';
import PopUp from './PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faUmbrella } from '@fortawesome/free-solid-svg-icons';
import festivallist from './list.json';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

const initialPostList = festivallist['festivallist'];

const Calendar = () => {
	const [date, setDate] = useState(new Date());
	const [selectedYear, setSelectedYear] = useState(date.getFullYear());
	const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
	const monthName = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const [isHover, setIsHover] = useState(-1);
	const [isClick, setIsClick] = useState(-1);

	const [y, setY] = useState();

	const update = (e) => {
		setY(e.screenY);
	};

	const navigate = useNavigate();
	const goDetail = (idx) => {
		console.log('this is', idx);
		navigate(`${'/detail/' + idx}`);
	};

	useEffect(() => {
		window.addEventListener('mousemove', update);
	}, []);

	const goPrev = () => {
		if (selectedMonth === 0) {
			setSelectedYear(selectedYear - 1);
			setSelectedMonth(11);
		} else {
			setSelectedMonth(selectedMonth - 1);
		}
	};

	const goNext = () => {
		if (selectedMonth === 11) {
			setSelectedYear(selectedYear + 1);
			setSelectedMonth(0);
		} else {
			setSelectedMonth(selectedMonth + 1);
		}
	};

	const isFest = (i) => {
		let festArr = [];
		for (let j = 0; j < initialPostList.length; j++) {
			let start = new Date(Number(initialPostList[j].time_start.substring(0, 4)), Number(initialPostList[j].time_start.substring(5, 7)) - 1, Number(initialPostList[j].time_start.substring(8, 10)));
			let end = new Date(Number(initialPostList[j].time_end.substring(0, 4)), Number(initialPostList[j].time_end.substring(5, 7)) - 1, Number(initialPostList[j].time_end.substring(8, 10)));
			if (start.getFullYear() === selectedYear && start.getMonth() === selectedMonth && start.getDate() === i + 1) {
				let sub = end.getDate() - start.getDate();
				const styles = { width: `${(sub + 1) * 6.8}rem`, cursor: 'pointer' };
				const forP = { color: 'white', margin: 0 };
				festArr.push(
					<div className='calendarOnFest' style={styles} onClick={() => setIsClick(j)} onMouseOver={() => setIsHover(j)} onMouseOut={() => setIsHover(-1)}>
						<p style={forP}>{initialPostList[j].title}</p>
						{isHover === j ? <PopUp y={y} idx={j}></PopUp> : ''}
						{isClick === j ? goDetail(j) : ''}
					</div>
				);
			}
		}
		return festArr;
	};

	const getDate = () => {
		let dateArr = [];
		let dateCnt = new Date(selectedYear, selectedMonth + 1, 0).getDate(); // 이번달의 마지막 날짜
		if (new Date(selectedYear, selectedMonth, 0).getDay() !== 0) {
			for (let i = 0; i < new Date(selectedYear, selectedMonth, 0).getDay(); i++) {
				dateArr.push(<div className='calendarDate'></div>);
			}
		}
		for (let i = 0; i < dateCnt; i++) {
			dateArr.push(
				<div className={cx({ calendarDate: true }, { calendarToday: date.getFullYear() === selectedYear && date.getMonth() === selectedMonth && date.getDate() === i + 1 })}>
					<span>{i + 1}</span>
					{isFest(i)}
				</div>
			);
		}
		return dateArr;
	};

	const iconStyle = {
		fontSize: '1.5rem'
	};
	return (
		<div className='calendar'>
			<nav>nav바 구간</nav>
			<div className='calendarBody'>
				<div className='calendarWeatherInfo'>
					<p>
						<FontAwesomeIcon style={iconStyle} icon={faSun} />
						<p>&nbsp;맑음</p>
					</p>
					<p>
						<FontAwesomeIcon style={iconStyle} icon={faCloud} />
						<p>&nbsp;흐림</p>
					</p>
					<p>
						<FontAwesomeIcon style={iconStyle} icon={faUmbrella} />
						<p>&nbsp;비옴</p>
					</p>
				</div>
				<div className='calendarBackContainer'>
					<div className='calendarCalendar'>
						<div className='calendarHeader'>
							<div class='calendarYearMonth'>
								{monthName[selectedMonth]} &nbsp;&nbsp;{selectedYear}
							</div>
							<div class='calendarNav'>
								<button class='calendarPrevBtn' onClick={() => goPrev()}>
									<span>&lt;</span>
								</button>
								<button class='calendarNextBtn' onClick={() => goNext()}>
									<span>&gt;</span>
								</button>
							</div>
						</div>
						<div className='calendarMain'>
							<div class='calendarWeek'>
								<div class='calendarWeekday'>MON</div>
								<div class='calendarWeekday'>TUE</div>
								<div class='calendarWeekday'>WED</div>
								<div class='calendarWeekday'>THU</div>
								<div class='calendarWeekday'>FRI</div>
								<div class='calendarWeekday'>SAT</div>
								<div class='calendarWeekday'>SUN</div>
							</div>
							<div className='calendarDates'>{getDate()}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
