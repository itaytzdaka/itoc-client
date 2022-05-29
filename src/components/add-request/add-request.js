import './add-request.css';
import React, { useState, useEffect } from 'react';
import Hebcal from 'hebcal';
import axios from '../../api/axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { errorHandling } from '../../services/auth';
import { dateToString, dateToSqlFormat, getHebrewDate } from '../../services/date';

import { SendButton } from "../styles/send-button.styled"
import { Input } from "../styles/input.styled"
import { H1 } from "../styles/h1.styled"
import { Table } from "../styles/table.styled"
import { Form } from "../styles/form.styled"

function AddRequest() {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const monthsNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

  const [calendar, setCalendar] = useState([]);
  const [monthSelected, setMonthFromUser] = useState(new Date().getMonth());
  const [yearSelected, setYearFromUser] = useState(new Date().getFullYear());
  const [userReq, setUserReq] = useState({ date: null, userName: cookies.get('user')?.userName, fullName: `${cookies.get('user')?.firstName} ${cookies.get('user')?.lastName}`, shift: "בוקר", comment: "", team: `${cookies.get('user')?.team}`, status: "ממתין לאישור" });

  const dateNow = new Date();
  const monthNow = new Date().getMonth(); //-1
  const yearNow = new Date().getFullYear();



  useEffect(() => {

    const hebDate = new Hebcal();
    const hebDay = new Hebcal.HDate();
    const hebDay2 = new Hebcal.HDate(new Date("2022-5-4"));
    // const hol= new Hebcal.holidays.Event(new Date());
    

    console.log(hebDate, "hebDate");
    console.log(hebDate.next(), "hebDate next");
    console.log(hebDate.getMonth(2), "getMonth(2)");
    console.log(hebDay, "hebDay");
    console.log(hebDay2.holidays(), "hebDay2");
    console.log(new Hebcal.holidays.Event(hebDay2),"Event");
    console.log(hebDate.find("pesach"),"pesach");
    console.log(hebDate.find("shavuot"),"shavuot");
    console.log(hebDate.find("today"),"today");
    console.log(getHebrewDate(hebDay.day,hebDay.month));

    const month = new Date(yearSelected, monthNow, 1, 7);
    month.setMonth(monthSelected);

    const dateOfFirstDayOfMonth = new Date(month);
    const weekFirstDayOfMonth = dateOfFirstDayOfMonth.getDay(); //-1

    const dateOfLastDayOfMonth = new Date(month);
    dateOfLastDayOfMonth.setMonth(dateOfLastDayOfMonth.getMonth() + 1);
    dateOfLastDayOfMonth.setDate(0);
    const lastDayOfMonth = dateOfLastDayOfMonth.getDate();

    const dateLastDayOfPrevMonth = new Date(month);
    dateLastDayOfPrevMonth.setDate(0);


    const datesArray = [];

    for (let i = 0; i < weekFirstDayOfMonth; i++) {
      const date = new Date(month);
      date.setDate(0);
      date.setDate(date.getDate() - i);
      datesArray.push(date);
    }

    datesArray.reverse();

    for (let i = 1; i <= lastDayOfMonth; i++) {
      const date = new Date(month);
      date.setDate(i);
      datesArray.push(date);
    }

    const daysLeft = 42 - datesArray.length;

    for (let i = 1; i <= daysLeft; i++) {
      const date = new Date(month);
      date.setMonth(date.getMonth() + 1);
      date.setDate(i);
      datesArray.push(date);
    }

    console.log(datesArray, "datesArray");

    defineCalendar(datesArray);

  }, [monthSelected, yearSelected]);


  const defineCalendar = (datesArray) => {

    const cal = [];

    for (let i = 0; i < 6; i++) {
      const array = [];
      for (let j = 0; j < 7; j++) {
        array.push({ date: datesArray[i * 7 + j], HDate: new Hebcal.HDate(new Date(datesArray[i * 7 + j]))});
      }
      cal.push(array);
    }

    console.log(cal, "cal");
    setCalendar(cal);
  };

  const setDate = (date) => {
    const req = { ...userReq };
    req.date = date;
    console.log(req);
    setUserReq(req);
  };
  const setShift = (shift) => {
    const req = { ...userReq };
    req.shift = shift;
    setUserReq(req);
  };

  const setComment = (comment) => {
    const req = { ...userReq };
    req.comment = comment;
    setUserReq(req);
  };

  const addReq = async (e) => {
    e.preventDefault();

    if (!userReq.date) {
      alert("לא בחרת תאריך");
      return;
    }

    try {
      const req = { ...userReq };
      req.date = dateToSqlFormat(req.date);
      console.log(req);
      await axios.post("/api/requests", req);
      alert("הבקשה נשלחה");
    } catch (error) {
      errorHandling(error, navigate);
    }
  }


  return (
    <div className="add-request">
      <H1>שליחת בקשה חדשה</H1>
      <div className='select-month'>
        <h3>בחר תאריך:</h3>
        <select name="month" id="month" value={monthSelected} onChange={(e) => {
          setMonthFromUser(e.target.value);
        }}>

          {monthsNames.map((monthName, index) => {
            if (monthName === monthsNames[monthSelected]) return <option value={index} key={monthName}>{monthName}</option>
            return <option value={index} key={monthName} >{monthName}</option>
          })}

        </select>
        <select name="year" id="year" onChange={(e) => {
          setYearFromUser(e.target.value);
        }}>
          <option value={yearNow}>{yearNow}</option>
          <option value={yearNow + 1}>{yearNow + 1}</option>
        </select>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ראשון</th>
            <th>שני</th>
            <th>שלישי</th>
            <th>רביעי</th>
            <th>חמישי</th>
            <th>שישי</th>
            <th>שבת</th>
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, index) => {
            return <tr key={"tr" + index}>{week.map((day, index) => {
              if (day.date.getMonth() < monthSelected && day.date > dateNow) return <td key={"td" + index} onClick={() => setDate(day.date)} className='prev-month'><div className='td-div'>{dateToString(day.date, "dd.mm")}</div></td>
              if (day.date.getMonth() < monthSelected && day.date < dateNow) return <td key={"td" + index} className='prev-month pass'><div className='td-div'>{dateToString(day.date, "dd.mm")}</div></td>
              if (day.date.getMonth() == monthSelected && day.date < dateNow) return <td key={"td" + index} className='this-month pass'>{dateToString(day.date, "dd.mm")}</td>
              if (day.date.getMonth() > monthSelected && day.date > dateNow) return <td key={"td" + index} onClick={() => setDate(day.date)} className={userReq.date?.getDate() == day.date.getDate() && userReq.date?.getMonth() == day.date.getMonth() && userReq.date?.getFullYear() == day.date.getFullYear() ? "next-month selected" : "next-month"}>{dateToString(day.date, "dd.mm")}</td>
              if (day.date.getMonth() > monthSelected && day.date < dateNow) return <td key={"td" + index} className='next-month pass'>{dateToString(day.date, "dd.mm")}</td>
              return <td key={"td" + index} onClick={() => setDate(day.date)} className={userReq.date?.getDate() == day.date.getDate() && userReq.date?.getMonth() == day.date.getMonth() && userReq.date?.getFullYear() == day.date.getFullYear() ? "this-month selected" : "this-month"}>{dateToString(day.date, "dd.mm")}</td>
            })}</tr>
          // {calendar.map((week, index) => {
          //   return <tr key={"tr" + index}>{week.map((day, index) => {
          //     if (day.date.getMonth() < monthSelected && day.date > dateNow) return <td key={"td" + index} onClick={() => setDate(day.date)} className='prev-month'><div className='td-div'>{getHebrewDate(day.HDate.day,day.HDate.month)} {dateToString(day.date, "dd.mm")}</div></td>
          //     if (day.date.getMonth() < monthSelected && day.date < dateNow) return <td key={"td" + index} className='prev-month pass'><div className='td-div'>{getHebrewDate(day.HDate.day,day.HDate.month)} {dateToString(day.date, "dd.mm")}</div></td>
          //     if (day.date.getMonth() == monthSelected && day.date < dateNow) return <td key={"td" + index} className='this-month pass'><div className='td-div'>{getHebrewDate(day.HDate.day,day.HDate.month)} {dateToString(day.date, "dd.mm")}</div></td>
          //     if (day.date.getMonth() > monthSelected && day.date > dateNow) return <td key={"td" + index} onClick={() => setDate(day.date)} className={userReq.date?.getDate() == day.date.getDate() && userReq.date?.getMonth() == day.date.getMonth() && userReq.date?.getFullYear() == day.date.getFullYear() ? "next-month selected" : "next-month"}><div className='td-div'>{getHebrewDate(day.HDate.day,day.HDate.month)} {dateToString(day.date, "dd.mm")}</div></td>
          //     if (day.date.getMonth() > monthSelected && day.date < dateNow) return <td key={"td" + index} className='next-month pass'><div className='td-div'>{getHebrewDate(day.HDate.day,day.HDate.month)} {dateToString(day.date, "dd.mm")}</div></td>
          //     return <td key={"td" + index} onClick={() => setDate(day.date)} className={userReq.date?.getDate() == day.date.getDate() && userReq.date?.getMonth() == day.date.getMonth() && userReq.date?.getFullYear() == day.date.getFullYear() ? "this-month selected" : "this-month"}><div className='td-div'>{getHebrewDate(day.HDate.day,day.HDate.month)} {dateToString(day.date, "dd.mm")}</div></td>
          //   })}</tr>
          })}
        </tbody>
      </Table>
      <Form action="">

        
          <div>
            <span>התאריך שנבחר:</span>
            <span>{dateToString(userReq.date, "hd dd.mm.yy") || "בחר תאריך"}</span>
          </div>
          <div>
            <label htmlFor="shift">משמרת: </label>
            <select name="shift" id="shift" defaultValue="בוקר" onChange={(e) => {
              setShift(e.target.value);
            }}>
              <option value="בוקר">בוקר</option>
              <option value="ביניים">ביניים</option>
              <option value="צהריים">צהריים</option>
              <option value="לילה">לילה</option>
              <option value="אחרי לילה">אחרי לילה</option>
              <option value="חופש">חופש</option>
            </select>
          </div>
          <div>
            <label htmlFor="comment">הערה: </label>
            <Input type="text" name="comment" id="comment" placeholder="אופציונלי" onChange={(e) => { setComment(e.target.value) }} />
          </div>
          <SendButton onClick={(e) => { addReq(e) }}>שלח בקשה</SendButton>
        
      </Form>
    </div>
  );
}

export default AddRequest;
