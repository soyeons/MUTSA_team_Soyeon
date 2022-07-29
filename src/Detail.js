import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as rHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as sHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Detail.css';

const perform = {
  festival_id: 1,
  startDate: '20220805',
  endDate: '20220807',
  title: '인천 펜타포트 락 페스티벌',
  place: '인천 송도 달빛 축제 공원',
  imgUrl: 'http://placekitten.com/300/400',
  reservation_date: '20220624',
  reservation_site: '티켓링크'
};

const tags = ['사운드가 빵빵해요', '스트레스를 싹 날려버려요', '인생샷을 건질 수 있어요', '록'];

const reviewLink = '';

const Detail = () => {
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];

  const start = new Date(Number(perform.startDate.substring(0, 4)), Number(perform.startDate.substring(4, 6)) - 1, Number(perform.startDate.substring(6, 8)));
  const end = new Date(Number(perform.endDate.substring(0, 4)), Number(perform.endDate.substring(4, 6)) - 1, Number(perform.endDate.substring(6, 8)));
  const performYear = [start.getFullYear(), end.getFullYear()];
  const performMonth = [start.getMonth() + 1, end.getMonth() + 1];
  const performDate = [start.getDate(), end.getDate()];
  const performDay = [dayList[start.getDay()], dayList[end.getDay()]];

  const reservation = new Date(Number(perform.reservation_date.substring(0, 4)), Number(perform.reservation_date.substring(4, 6)) - 1, Number(perform.reservation_date.substring(6, 8)));
  const reservationDay = dayList[reservation.getDay()];
  const [isHovering, setIsHovering] = useState(0);
  const addTags = (tags) => {
    let tagArr = [];
    for (let i = 0; i < tags.length; i++) {
      tagArr.push(<p>{tags[i]}</p>);
    }
    return tagArr;
  };

  return (
    <div className='detail'>
      <nav>
        {/* <p>logo</p>
        <form>
          <p>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type='text'></input>
          </p>
        </form>
        <p>홈</p>
        <p>페스티벌 캘린더</p>
        <p>페스티벌 정보</p>
        <p>추천 페스티벌 테마</p>
        <p>커뮤니티</p> */}
      </nav>
      <div className='detailBody'>
        <div className='detailBackContainer'>
          <div className='detailContainer'>
            <div className='detailHeader'>
              <button type='button' className='detailZzimBtn' onMouseOver={() => setIsHovering(1)} onMouseOut={() => setIsHovering(0)}>
                <FontAwesomeIcon icon={isHovering ? sHeart : rHeart} />
                <p>좋아요</p>
              </button>
            </div>
            <div className='detailMain'>
              <img id='detailPoster' src={perform.imgUrl} alt={perform.title} />
              <div className='detailContent'>
                <div className='detailDesc'>
                  <div className='detailTitle'>{perform.title}</div>
                  <div className='detailPerformanceDate'>
                    <span>{performYear[0]}</span>년 <span>{performMonth[0]}</span>월 <span>{performDate[0]}</span>일({performDay[0]}) ~ <span>{performYear[1]}</span>년 <span>{performMonth[1]}</span>월{' '}
                    <span>{performDate[1]}</span>
                    일({performDay[1]})
                  </div>
                  <div className='detailPlace'>{perform.place}</div>
                  <div className='detailOpenDate'>
                    티켓오픈 : <span>{reservation.getFullYear()}</span>년 <span>{reservation.getMonth() + 1}</span>월 <span>{reservation.getDate()}</span>일({reservationDay})
                  </div>
                </div>
                <div className='detailMoreInfo'>
                  <p>더 자세한 정보는 아래의 링크를 통해 확인하세요!</p>
                  <p>(티켓 가격, 티켓 할인 정보, 예매/관람 가이드, 반입금지물품, 교통 안내 등)</p>
                  <a href={perform.reservation_site}>예매 사이트 바로가기</a>
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
