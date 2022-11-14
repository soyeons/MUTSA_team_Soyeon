import React, { useState } from 'react';
import '../FestList.css';
import Navbar from '../Nav';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { festivals } from '../atom';
import Festival from '../components/Festival';

const FestList = () => {
	const [Content, setContent] = useState();
	const [festivalList, setfestivalList] = useRecoilState(festivals);

	const onChangeHanlder = (e) => {
		setContent(e.currentTarget.value);
		const sortValue = e.currentTarget.value;
		let festivals = festivalList;
		if (sortValue === 'register') {
			festivals = [...festivals].sort((a, b) => {
				return a.id - b.id;
			});
		} else if (sortValue === 'fast') {
			festivals = [...festivals].sort((a, b) => {
				let aStartdate = new Date(Number(a.time_start.substring(0, 4)), Number(a.time_start.substring(5, 7)) - 1, Number(a.time_start.substring(8, 10)));
				let bStartdate = new Date(Number(b.time_start.substring(0, 4)), Number(b.time_start.substring(5, 7)) - 1, Number(b.time_start.substring(8, 10)));
				return aStartdate - bStartdate;
			});
		} else if (sortValue === 'popular') {
			festivals = [...festivals].sort((a, b) => {
				return b.hits - a.hits;
			});
		}
		setfestivalList(festivals);
	};
	const Options = [
		{ key: 'register', value: '등록순' },
		{ key: 'fast', value: '빠른 일정순' }
	];

	return (
		<div className='list'>
			<nav>
				<Navbar />
			</nav>
			<div className='listBody'>
				<div className='listHeader'>
					<select id='listSelect' onChange={onChangeHanlder} value={Content}>
						<option key='popular' value='popular'>
							인기순
						</option>
						{Options.map((item) => (
							<option key={item.key} value={item.key}>
								{item.value}
							</option>
						))}
					</select>
				</div>
				<div className='listMain'>
					{festivalList.map((festival) => (
						<Festival festivalId={festival.id} key={festival.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default FestList;
