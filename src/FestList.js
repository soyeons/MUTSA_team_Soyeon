import React, { useState } from 'react';
import './FestList.css';
import festivallist from './list.json';

const initialPostList = festivallist['festivallist'];

const FestList = () => {
	const [Content, setContent] = useState();

	const onChangeHanlder = (e) => {
		setContent(e.currentTarget.value);
		let state = e.currentTarget.value;
		if (state === 'register') {
			initialPostList.sort((a, b) => {
				return a.id - b.id;
			});
			// } else if (state === 'popular') {
			// 	initialPostList.sort((a, b) => {
			// 		return b. - a.popular;
			// 	});
		} else if (state === 'fast') {
			initialPostList.sort((a, b) => {
				let aStartdate = new Date(Number(a.time_start.substring(0, 4)), Number(a.time_start.substring(5, 7)) - 1, Number(a.time_start.substring(8, 10)));
				let bStartdate = new Date(Number(b.time_start.substring(0, 4)), Number(b.time_start.substring(5, 7)) - 1, Number(b.time_start.substring(8, 10)));
				return aStartdate - bStartdate;
			});
		}
	};
	const Options = [
		{ key: 'register', value: '등록순' },
		{ key: 'popular', value: '인기순' },
		{ key: 'fast', value: '빠른 일정순' }
	];

	const getList = () => {
		let festArr = [];
		let dateList = [];
		const perform = initialPostList;
		for (let i = 0; i < perform.length; i++) {
			let start = new Date(Number(perform[i].time_start.substring(0, 4)), Number(perform[i].time_start.substring(5, 7)) - 1, Number(perform[i].time_start.substring(8, 10)));
			let end = new Date(Number(perform[i].time_end.substring(0, 4)), Number(perform[i].time_end.substring(5, 7)) - 1, Number(perform[i].time_end.substring(8, 10)));
			let startYear = start.getFullYear();
			let endYear = end.getFullYear();
			let startMonth = start.getMonth() + 1;
			let endMonth = end.getMonth() + 1;
			let startDate = start.getDate();
			let endDate = end.getDate();

			const subDate = endDate - startDate;
			if (subDate === 0) {
				dateList.push(`${startYear}.${startMonth}.${startDate}`);
			} else {
				dateList.push(`${startYear}.${startMonth}.${startDate} ~ ${endYear}.${endMonth}.${endDate}`);
			}
		}
		for (let i = 0; i < perform.length; i++) {
			festArr.push(
				<div className='listBack'>
					<div className='listContent'>
						<img src={perform[i].Poster} alt='poster' />
						<div className='listDesc'>
							<div className='listTitle'>{perform[i].title}</div>
							<div className='listCal'>{dateList[i]}</div>
						</div>
					</div>
				</div>
			);
		}
		return festArr;
	};

	return (
		<div className='list'>
			<nav>nav바 구간</nav>
			<div className='listBody'>
				<div className='listHeader'>
					<select id='listSelect' onChange={onChangeHanlder} value={Content}>
						<option>리스트 필터</option>
						{Options.map((item, index) => (
							<option key={item.key} value={item.key}>
								{item.value}
							</option>
						))}
					</select>
				</div>
				<div className='listMain'>{getList()}</div>
			</div>
		</div>
	);
};

export default FestList;
