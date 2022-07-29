import React, { useState, useEffect } from 'react';
import style from './Calendar.css';
import classNames from 'classnames/bind';
import PopUp from './PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faUmbrella } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

const initialPostList = [
  {
    festival_id: 1,
    startDate: '20220702',
    endDate: '20220703',
    title: '페스티벌1'
  },
  {
    festival_id: 2,
    startDate: '20220709',
    endDate: '20220709',
    title: '페스티벌2'
  },
  {
    festival_id: 3,
    startDate: '20220715',
    endDate: '20220717',
    title: '페스티벌3'
  },
  {
    festival_id: 4,
    startDate: '20220723',
    endDate: '20220723',
    title: '페스티벌4'
  },
  {
    festival_id: 5,
    startDate: '20220730',
    endDate: '20220731',
    title: '페스티벌5'
  }
];

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
  const monthName = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [isHover, setIsHover] = useState(-1);

  const [y, setY] = useState();

  const update = (e) => {
    setY(e.screenY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', update);
  }, []);

  const goPrev = () => {
    if (selectedMonth === 0) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(11);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const goNext = () => {
    if (selectedMonth === 11) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(0);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const isFest = (i) => {
    let festArr = [];
    for (let j = 0; j < initialPostList.length; j++) {
      let start = new Date(Number(initialPostList[j].startDate.substring(0, 4)), Number(initialPostList[j].startDate.substring(4, 6)) - 1, Number(initialPostList[j].startDate.substring(6, 8)));
      let end = new Date(Number(initialPostList[j].endDate.substring(0, 4)), Number(initialPostList[j].endDate.substring(4, 6)) - 1, Number(initialPostList[j].endDate.substring(6, 8)));
      if (start.getFullYear() === selectedYear && start.getMonth() === selectedMonth && start.getDate() === i + 1) {
        let sub = end.getDate() - start.getDate();
        const styles = { width: `${(sub + 1) * 6.8}rem` };
        const forP = { color: 'white', margin: 0 };
        festArr.push(
          <div className='calendarOnFest' style={styles} onMouseOver={() => setIsHover(j)} onMouseOut={() => setIsHover(-1)}>
            <p style={forP}>{initialPostList[j].title}</p>
            {isHover === j ? <PopUp y={y} idx={j}></PopUp> : ''}
          </div>
        );
      }
    }
    return festArr;
  };

  const getDate = () => {
    let dateArr = [];
    let dateCnt = new Date(selectedYear, selectedMonth + 1, 0).getDate(); // 이번달의 마지막 날짜
    if (new Date(selectedYear, selectedMonth, 0).getDay() !== 0) {
      for (let i = 0; i < new Date(selectedYear, selectedMonth, 0).getDay(); i++) {
        dateArr.push(<div className='calendarDate'></div>);
      }
    }
    for (let i = 0; i < dateCnt; i++) {
      dateArr.push(
        <div className={cx({ calendarDate: true }, { calendarToday: date.getFullYear() === selectedYear && date.getMonth() === selectedMonth && date.getDate() === i + 1 })}>
          <span>{i + 1}</span>
          {isFest(i)}
        </div>
      );
    }
    return dateArr;
  };

  const iconStyle = {
    fontSize: '1.5rem'
  };
  return (
    <div className='calendar'>
      <nav>nav바 구간</nav>
      <div className='calendarBody'>
        <div className='calendarWeatherInfo'>
          <p>
            <FontAwesomeIcon style={iconStyle} icon={faSun} />
            <p>&nbsp;맑음</p>
          </p>
          <p>
            <FontAwesomeIcon style={iconStyle} icon={faCloud} />
            <p>&nbsp;흐림</p>
          </p>
          <p>
            <FontAwesomeIcon style={iconStyle} icon={faUmbrella} />
            <p>&nbsp;비옴</p>
          </p>
        </div>
        <div className='calendarBackContainer'>
          <div className='calendarCalendar'>
            <div className='calendarHeader'>
              <div class='calendarYearMonth'>
                {monthName[selectedMonth]} {selectedYear}
              </div>
              <div class='calendarNav'>
                <button class='calendarPrevBtn' onClick={() => goPrev()}>
                  <span>&lt;</span>
                </button>
                <button class='calendarNextBtn' onClick={() => goNext()}>
                  <span>&gt;</span>
                </button>
              </div>
            </div>
            <div className='calendarMain'>
              <div class='calendarWeek'>
                <div class='calendarWeekday'>MON</div>
                <div class='calendarWeekday'>TUE</div>
                <div class='calendarWeekday'>WED</div>
                <div class='calendarWeekday'>THU</div>
                <div class='calendarWeekday'>FRI</div>
                <div class='calendarWeekday'>SAT</div>
                <div class='calendarWeekday'>SUN</div>
              </div>
              <div className='calendarDates'>{getDate()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
