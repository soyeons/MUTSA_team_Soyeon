import React, { useState } from 'react';
import './Search.css';
import Navbar from './Nav';
import festivallist from './list.json';

const initialPostList = festivallist['festivallist'];

const Search = () => {
	const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
	const filteredFest = () => {
		let filterList = [];
		for (let i = 0; i < initialPostList.length; i++) {
			const startDate = new Date(
				Number(initialPostList[i].time_start.substring(0, 4)),
				Number(initialPostList[i].time_start.substring(5, 7)) - 1,
				Number(initialPostList[i].time_start.substring(8, 10))
			);
			const endDate = new Date(Number(initialPostList[i].time_end.substring(0, 4)), Number(initialPostList[i].time_end.substring(5, 7)) - 1, Number(initialPostList[i].time_end.substring(8, 10)));

			let dateString = `<span>${startDate.getFullYear()}</span>년 <span>${startDate.getMonth() + 1}</span>월 <span>${startDate.getDate()}</span>일(${
				dayArr[startDate.getDay()]
			}) ~ <span>${endDate.getFullYear()}</span>년 <span>${endDate.getMonth() + 1}</span>월 <span>${endDate.getDate()}</span>일(${dayArr[endDate.getDay()]})`;
			const subDate = endDate.getDate() - startDate.getDate();
			if (subDate === 0) {
				dateString = `<span>${startDate.getFullYear()}</span>년 <span>${startDate.getMonth() + 1}</span>월 <span>${startDate.getDate()}</span>일(${dayArr[startDate.getDay()]})`;
			}

			filterList.push(
				<div className='searchFestEach'>
					<img className='seacrhFestPoster' src={initialPostList[i].Poster} alt='포스터'></img>
					<div className='searchFestDesc'>
						<p className='searchFestTitle'>{initialPostList[i].title}</p>
						<div className='searchFestInfo'>
							<p className='searchFestDate' dangerouslySetInnerHTML={{ __html: dateString }}></p>
							<p className='searchFestLoca'>{initialPostList[i].place}</p>
						</div>
					</div>
				</div>
			);
		}
		return filterList;
	};
	return (
		<div className='search'>
			<nav>
				<Navbar />
			</nav>
			<div className='searchBody'>
				<div className='searchBackContainer'>
					<div className='searchContainer'>
						<div className='searchFest'>
							<div className='searchText'>
								<p>페스티벌 정보</p>
							</div>
							<div className='searchFestList'>{filteredFest()}</div>
						</div>
						<hr />
						<div className='searchComm'>
							<div className='searchText'>
								<p>커뮤니티</p>
							</div>
							<div className='searchCommList'>
								<div className='searchCommEach'>
									<p className='searchCommTitle'>
										<span>워터밤</span> 서울 함께 갈 사람 구해요
									</p>
									<div className='searchCommInfo'>
										<p>해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글</p>
									</div>
								</div>
								<div className='searchCommEach'>
									<p className='searchCommTitle'>
										<span>워터밤</span> 서울 함께 갈 사람 구해요
									</p>
									<div className='searchCommInfo'>
										<p>해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글</p>
									</div>
								</div>
								<div className='searchCommEach'>
									<p className='searchCommTitle'>
										<span>워터밤</span> 서울 함께 갈 사람 구해요
									</p>
									<div className='searchCommInfo'>
										<p>해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글</p>
									</div>
								</div>
								<div className='searchCommEach'>
									<p className='searchCommTitle'>
										<span>워터밤</span> 서울 함께 갈 사람 구해요
									</p>
									<div className='searchCommInfo'>
										<p>해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글 해당 커뮤니티 본문글</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
