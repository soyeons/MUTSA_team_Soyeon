import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as rHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as sHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import './Detail.css';
import festivallist from './list.json';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialPostList = festivallist['festivallist'];
initialPostList.sort((a, b) => {
	return b.hits - a.hits;
});

const tags = ['사운드가 빵빵해요', '스트레스를 싹 날려버려요', '인생샷을 건질 수 있어요', '록'];

const reviewLink = '';

const Detail = () => {
	const idx = useParams();
	console.log('idx', idx.id);
	const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

	const perform = initialPostList[idx.id];

	const startDate = new Date(Number(perform.time_start.substring(0, 4)), Number(perform.time_start.substring(5, 7)) - 1, Number(perform.time_start.substring(8, 10)));
	const endDate = new Date(Number(perform.time_end.substring(0, 4)), Number(perform.time_end.substring(5, 7)) - 1, Number(perform.time_end.substring(8, 10)));

	let dateString = `<span>${startDate.getFullYear()}</span>년 <span>${startDate.getMonth() + 1}</span>월 <span>${startDate.getDate()}</span>일(${
		dayArr[startDate.getDay()]
	}) ~ <span>${endDate.getFullYear()}</span>년 <span>${endDate.getMonth() + 1}</span>월 <span>${endDate.getDate()}</span>일(${dayArr[endDate.getDay()]})`;
	const subDate = endDate.getDate() - startDate.getDate();
	if (subDate === 0) {
		dateString = `<span>${startDate.getFullYear()}</span>년 <span>${startDate.getMonth() + 1}</span>월 <span>${startDate.getDate()}</span>일(${dayArr[startDate.getDay()]})`;
	}

	const reserveDate = new Date(Number(perform.ticket_open.substring(0, 4)), Number(perform.ticket_open.substring(5, 7)) - 1, Number(perform.ticket_open.substring(8, 10)));

	const [isHovering, setIsHovering] = useState(0);
	const addTags = (tags) => {
		let tagArr = [];
		for (let i = 0; i < tags.length; i++) {
			tagArr.push(<p>{tags[i]}</p>);
		}
		return tagArr;
	};

	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	const addLike = () => {
		axios({
			method: 'post',
			url: '/user/:user_id/like',
			data: {
				user_id: 12,
				festival_id: 145
			}
		});
	};

	const addDelete = () => {
		axios({
			method: 'delete',
			url: '/user/:user_id/like/:like_id',
			data: {
				like_id: 132
			}
		});
	};

	return (
		<div className='detail'>
			<nav></nav>
			<div className='detailBody'>
				<div className='detailBackContainer'>
					<div className='detailContainer'>
						<div className='detailHeader'>
							<button onClick={(openModal, addLike)} type='button' className='detailZzimBtn' onMouseOver={() => setIsHovering(1)} onMouseOut={() => setIsHovering(0)}>
								<FontAwesomeIcon icon={isHovering ? sHeart : rHeart} />
								<p>좋아요</p>
							</button>
							<Modal open={modalOpen} close={closeModal} header='찜한 페스티벌에 추가되었습니다.'>
								찜한 페스티벌의 경우 카카오톡으로 티켓팅 알림을 받게 됩니다. <br />
								‘마이페이지 > 찜한 페스티벌 목록’ 에서 관리할 수 있습니다.
							</Modal>
						</div>
						<div className='detailMain'>
							<img id='detailPoster' src={'/' + perform.Poster} alt={perform.title} />
							<div className='detailContent'>
								<div className='detailDesc'>
									<div className='detailTitle'>{perform.title}</div>
									<div className='detailPerformanceDate' dangerouslySetInnerHTML={{ __html: dateString }}></div>
									<div className='detailPlace'>{perform.place}</div>
									<div className='detailOpendDateate'>
										티켓오픈 : <span>{reserveDate.getFullYear()}</span>년 <span>{reserveDate.getMonth() + 1}</span>월 <span>{reserveDate.getDate()}</span>일({dayArr[reserveDate.getDay()]})
									</div>
								</div>
								<div className='detailMoreInfo'>
									<p>더 자세한 정보는 아래의 링크를 통해 확인하세요!</p>
									<p>(티켓 가격, 티켓 할인 정보, 예매/관람 가이드, 반입금지물품, 교통 안내 등)</p>
									<a href={perform.ticket_link}>예매 사이트 바로가기</a>
								</div>
								<div className='detailTagContainer'>{addTags(tags)}</div>
							</div>
						</div>
						<div className='detailReview'>
							<a href={reviewLink} className='detailReviewBtn'>
								<p>
									이전에 해당 페스티벌을 즐긴 경험이 있다면 ?<br />
									후기 작성하러가기!
									<br />
								</p>
								<p>(다른 사람들을 위해 소중한 후기를 공유해주세요!)</p>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Detail;
