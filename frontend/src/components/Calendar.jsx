import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    const firstDay = getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      days.push(
        <div key={i} className={`day ${isToday ? 'current-day' : ''}`}>{i}</div>
      );
    }
    return days;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => changeMonth(-1)} className="btn">Prev</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <button onClick={() => changeMonth(1)} className="btn">Next</button>
      </div>
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
