import React, { useState } from 'react';
import './Search.css';
import Navbar from './Nav';
import festivallist from './list.json';

const initialPostList = festivallist['festivallist'];

const Search = () => {
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
							<div className='searchFestList'>
								<div className='searchFestEach'>
									<img className='seacrhFestPoster' src='img/festival128.jpg' alt='포스터'></img>
									<div className='searchFestDesc'>
										<p className='searchFestTitle'>
											<span>워터밤</span> 수원 2022
										</p>
										<div className='searchFestInfo'>
											<p className='searchFestDate'>날짜 들어가는 본문 자리</p>
											<p className='searchFestLoca'>장소 들어가는 본문 자리</p>
										</div>
									</div>
								</div>
								<div className='searchFestEach'>
									<img className='seacrhFestPoster' src='img/festival128.jpg' alt='포스터'></img>
									<div className='searchFestDesc'>
										<p className='searchFestTitle'>
											<span>워터밤</span> 수원 2022
										</p>
										<div className='searchFestInfo'>
											<p className='searchFestDate'>날짜 들어가는 본문 자리</p>
											<p className='searchFestLoca'>장소 들어가는 본문 자리</p>
										</div>
									</div>
								</div>
							</div>
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
