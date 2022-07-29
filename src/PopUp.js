import React, { useState } from 'react';
import style from './PopUp.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const initialPostList = [
  {
    festival_id: 1,
    startDate: '20220703',
    endDate: '20220704',
    title: '페스티벌1',
    place: '인천 송도 달빛 축제 공원',
    imgUrl: 'http://placekitten.com/300/400',
    reservation_date: '20220624',
    lineUp: ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']
  },
  {
    festival_id: 2,
    startDate: '20220710',
    endDate: '20220710',
    title: '페스티벌2',
    place: '인천 송도 달빛 축제 공원',
    imgUrl: 'http://placekitten.com/300/400',
    reservation_date: '20220625',
    lineUp: [
      'aaa',
      'bbb',
      'ccc',
      'ddd',
      'eee',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      '00000000',
      'aaa',
      'bbb',
      'ccc',
      'ddd',
      'eee',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      'fff',
      '00000000'
    ]
  },
  {
    festival_id: 3,
    startDate: '20220717',
    endDate: '20220719',
    title: '페스티벌3',
    place: '인천 송도 달빛 축제 공원',
    imgUrl: 'http://placekitten.com/300/400',
    reservation_date: '20220626',
    lineUp: ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']
  },
  {
    festival_id: 4,
    startDate: '20220724',
    endDate: '20220724',
    title: '페스티벌4',
    place: '인천 송도 달빛 축제 공원',
    imgUrl: 'http://placekitten.com/300/400',
    reservation_date: '20220627',
    lineUp: ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']
  },
  {
    festival_id: 5,
    startDate: '20220731',
    endDate: '20220731',
    title: '페스티벌5',
    place: '인천 송도 달빛 축제 공원',
    imgUrl: 'http://placekitten.com/300/400',
    reservation_date: '20220628',
    lineUp: ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']
  }
];

const PopUp = (props) => {
  const idx = props.idx;
  const y = props.y;
  const [postList] = useState(initialPostList);
  const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

  const startDate = new Date(Number(postList[idx].startDate.substring(0, 4)), Number(postList[idx].startDate.substring(4, 6) - 1), Number(postList[idx].startDate.substring(6, 8)));
  const endDate = new Date(Number(postList[idx].endDate.substring(0, 4)), Number(postList[idx].endDate.substring(4, 6) - 1), Number(postList[idx].endDate.substring(6, 8)));
  const reserveDate = new Date(
    Number(postList[idx].reservation_date.substring(0, 4)),
    Number(postList[idx].reservation_date.substring(4, 6) - 1),
    Number(postList[idx].reservation_date.substring(6, 8))
  );

  let dateString = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}.${dayArr[startDate.getDay()]} ~ ${endDate.getFullYear()}.${
    endDate.getMonth() + 1
  }.${endDate.getDate()}.${dayArr[endDate.getDay()]}`;
  const subDate = endDate.getDate() - startDate.getDate();
  if (subDate === 0) {
    dateString = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}.${dayArr[startDate.getDay()]}`;
  }

  const addTags = (lineUp) => {
    let lineUpArr = [];
    for (let i = 0; i < lineUp.length; i++) {
      lineUpArr.push(<li>{lineUp[i]}</li>);
    }
    return lineUpArr;
  };

  return (
    <div>
      <div className={cx({ popup: true }, { popupHigh: y < 600 }, { popupLow: y >= 600 })}>
        <img id='popupPoster' src={postList[idx].imgUrl} alt='' />
        <div className='popupDesc'>
          <div className='popupTitleContainer'>
            <div className='popupTitle'>
              <p>{postList[idx].title}</p>
            </div>
            <div className='popupPerformanceDate'>
              <p>{dateString}</p>
            </div>
            <div className='popupPlace'>
              <p>{postList[idx].place}</p>
            </div>
          </div>
          <div className='popupLineUp'>
            <ul>{addTags(postList[idx].lineUp)}</ul>
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
