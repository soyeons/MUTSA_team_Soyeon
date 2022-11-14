import React from 'react';
import style from '../PopUp.css';
import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';
import { festivals } from '../atom';
import styled from 'styled-components';

const cx = classNames.bind(style);

const PopUp = ({ x, y, id }) => {
	const festivallist = useRecoilValue(festivals);
	const festival = festivallist.filter((festival) => festival.id === parseInt(id))[0];
	const dayNameKor = ['일', '월', '화', '수', '목', '금', '토'];

	const startDate = new Date(Number(festival.time_start.substring(0, 4)), Number(festival.time_start.substring(5, 7) - 1), Number(festival.time_start.substring(8, 10)));
	const endDate = new Date(Number(festival.time_end.substring(0, 4)), Number(festival.time_end.substring(5, 7) - 1), Number(festival.time_end.substring(8, 10)));
	const reserveDate = new Date(Number(festival.ticket_open.substring(0, 4)), Number(festival.ticket_open.substring(5, 7) - 1), Number(festival.ticket_open.substring(8, 10)));

	let dateString = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}.${dayNameKor[startDate.getDay()]} ~ ${endDate.getFullYear()}.${
		endDate.getMonth() + 1
	}.${endDate.getDate()}.${dayNameKor[endDate.getDay()]}`;
	const subDate = endDate.getDate() - startDate.getDate();
	if (subDate === 0) {
		dateString = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}.${dayNameKor[startDate.getDay()]}`;
	}

	const splitLineup = (lineup) => {
		const lineupArr = [];
		const lineupStr = lineup.split('\n');
		for (let i = 0; i < lineupStr.length; i++) {
			lineupArr.push(<li>{lineupStr[i]}</li>);
		}
		return lineupArr;
	};

	return (
		<div>
			<div className={cx({ popup: true }, { popupRight: x >= 800 }, { popupHigh: y >= 710 })}>
				<img id='popupPoster' src={festival.Poster} alt='' />
				<div className='popupDesc'>
					<div className='popupTitleContainer'>
						<div className='popupTitle'>
							<p>{festival.title}</p>
						</div>
						<div className='popupPerformanceDate'>
							<p>{dateString}</p>
						</div>
						<div className='popupPlace'>
							<p>{festival.place}</p>
						</div>
					</div>
					<div className='popupLineUp'>
						<ul>{splitLineup(festival.lineup)}</ul>
					</div>
					<div className='popupOpenDate'>
						<p>
							티켓 오픈 {reserveDate.getFullYear()}.{reserveDate.getMonth() + 1}.{reserveDate.getDate()}.{dayNameKor[reserveDate.getDay()]}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopUp;
