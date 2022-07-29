import React, { useState } from 'react';
import './FestList.css';

const initialPostList = [
  {
    id: 1,
    title: '페스티벌1',
    startDate: '20220727',
    endDate: '20220728',
    imgUrl: 'http://placekitten.com/300/400',
    popular: 20
  },
  {
    id: 2,
    title: '페스티벌2',
    startDate: '20220701',
    endDate: '20220702',
    imgUrl: 'http://placekitten.com/300/400',
    popular: 15
  },
  {
    id: 3,
    title: '페스티벌3',
    startDate: '20220731',
    endDate: '20220801',
    imgUrl: 'http://placekitten.com/300/400',
    popular: 100
  },
  {
    id: 4,
    title: '페스티벌4',
    startDate: '20220802',
    endDate: '20220803',
    imgUrl: 'http://placekitten.com/300/400',
    popular: 2
  }
];

const FestList = () => {
  const [Content, setContent] = useState();

  const onChangeHanlder = (e) => {
    setContent(e.currentTarget.value);
    let state = e.currentTarget.value;
    if (state === 'register') {
      initialPostList.sort((a, b) => {
        return a.id - b.id;
      });
    } else if (state === 'popular') {
      initialPostList.sort((a, b) => {
        return b.popular - a.popular;
      });
    } else if (state === 'fast') {
      initialPostList.sort((a, b) => {
        let aStartdate = new Date(Number(a.startDate.substring(0, 4)), Number(a.startDate.substring(4, 6)) - 1, Number(a.startDate.substring(6, 8)));
        let bStartdate = new Date(Number(b.startDate.substring(0, 4)), Number(b.startDate.substring(4, 6)) - 1, Number(b.startDate.substring(6, 8)));
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
    for (let i = 0; i < initialPostList.length; i++) {
      let start = new Date(Number(initialPostList[i].startDate.substring(0, 4)), Number(initialPostList[i].startDate.substring(4, 6)) - 1, Number(initialPostList[i].startDate.substring(6, 8)));
      let end = new Date(Number(initialPostList[i].endDate.substring(0, 4)), Number(initialPostList[i].endDate.substring(4, 6)) - 1, Number(initialPostList[i].endDate.substring(6, 8)));
      let startYear = start.getFullYear();
      let endYear = end.getFullYear();
      let startMonth = start.getMonth() + 1;
      let endMonth = end.getMonth() + 1;
      let startDate = start.getDate();
      let endDate = end.getDate();

      dateList.push([startYear, startMonth, startDate, endYear, endMonth, endDate]);
    }
    for (let i = 0; i < initialPostList.length; i++) {
      festArr.push(
        <div className='listBack'>
          <div className='listContent'>
            <img src={initialPostList[i].imgUrl} alt='poster' />
            <div className='listDesc'>
              <div className='listTitle'>{initialPostList[i].title}</div>
              <div className='listCal'>
                {dateList[i][0]}.{dateList[i][1]}.{dateList[i][2]} ~ {dateList[i][3]}.{dateList[i][4]}.{dateList[i][5]}
              </div>
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
