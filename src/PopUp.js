import React, { useState } from 'react';
import style from './PopUp.css';
import classNames from 'classnames/bind';
import festivallist from './list.json';

const cx = classNames.bind(style);

const initialPostList = festivallist['festivallist'];
initialPostList.sort((a, b) => {
	return b.hits - a.hits;
});

const PopUp = (props) => {
	const idx = props.idx;
	const y = props.y;
	const [postList] = useState(initialPostList);
	const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

	const startDate = new Date(Number(postList[idx].time_start.substring(0, 4)), Number(postList[idx].time_start.substring(5, 7) - 1), Number(postList[idx].time_start.substring(8, 10)));
	const endDate = new Date(Number(postList[idx].time_end.substring(0, 4)), Number(postList[idx].time_end.substring(5, 7) - 1), Number(postList[idx].time_end.substring(8, 10)));
	const reserveDate = new Date(Number(postList[idx].ticket_open.substring(0, 4)), Number(postList[idx].ticket_open.substring(5, 7) - 1), Number(postList[idx].ticket_open.substring(8, 10)));

	let dateString = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}.${dayArr[startDate.getDay()]} ~ ${endDate.getFullYear()}.${
		endDate.getMonth() + 1
	}.${endDate.getDate()}.${dayArr[endDate.getDay()]}`;
	const subDate = endDate.getDate() - startDate.getDate();
	if (subDate === 0) {
		dateString = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}.${dayArr[startDate.getDay()]}`;
	}

	const splitLineup = (lineup) => {
		let lineupArr = [];
		const lineupStr = lineup.split('\n');
		for (let i = 0; i < lineupStr.length; i++) {
			lineupArr.push(<li>{lineupStr[i]}</li>);
		}
		return lineupArr;
	};

	return (
		<div>
			<div className={cx({ popup: true }, { popupHigh: y < 710 }, { popupLow: y >= 710 })}>
				<img id='popupPoster' src={initialPostList[idx].Poster} alt='' />
				<div className='popupDesc'>
					<div className='popupTitleContainer'>
						<div className='popupTitle'>
							<p>{initialPostList[idx].title}</p>
						</div>
						<div className='popupPerformanceDate'>
							<p>{dateString}</p>
						</div>
						<div className='popupPlace'>
							<p>{initialPostList[idx].place}</p>
						</div>
					</div>
					<div className='popupLineUp'>
						<ul>{splitLineup(initialPostList[idx].lineup)}</ul>
					</div>
					<div className='popupOpenDate'>
						<p>
							티켓 오픈 {reserveDate.getFullYear()}.{reserveDate.getMonth() + 1}.{reserveDate.getDate()}.{dayArr[reserveDate.getDay()]}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopUp;
