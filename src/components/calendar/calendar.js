import './calendar.css';
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { errorHandling } from '../../services/auth';
import { dateToString } from '../../services/date';
import { H1 } from "../styles/h1.styled"
import { Table } from "../styles/table.styled"

function Calendar() {

  const navigate = useNavigate();

  const monthsNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  const shifts = ["בוקר", "ביניים", "צהריים", "לילה", "אחרי לילה", "חופש"];

  const [calendar, setCalendar] = useState([]);
  const [monthSelected, setMonthFromUser] = useState(new Date().getMonth());
  const [yearSelected, setYearFromUser] = useState(new Date().getFullYear());
  const [dateSelected, setDateFromUser] = useState(null);
  const [viewSelected, setViewFromUser] = useState("שבועית");
  const [weekSelected, setWeekFromUser] = useState(Math.min(parseInt(((new Date().getDate() + 7) / 7)), 5));
  const [teamSelected, setTeamFromUser] = useState("mf");
  const [allRequests, setAllRequests] = useState([]);


  const dateNow = new Date();
  const monthNow = new Date().getMonth(); //-1
  const yearNow = new Date().getFullYear();



  useEffect(() => {
    console.log(parseInt(((new Date().getDate() + 7) / 7)), "parseInt(((new Date().getDate()+7)/7))");

    const month = new Date(`${yearSelected}-${monthNow}-01`);
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
        array.push({ date: datesArray[i * 7 + j], requests: [] });
      }
      cal.push(array);
    }

 

    if(allRequests.length>0){
      setReqForCal(cal);
    }

    else{
      console.log(cal, "cal after putting dates");
      setCalendar(cal);
    }
    
  };

  useEffect(() => {
    getUsersRequests();
  }, []);


  const getUsersRequests = async () => {
    try {
      const response = await axios.get("/api/requests");
      const requests = response.data;
      console.log(requests, "response.data");
      if (allRequests.length == 0) {
        console.log("setAllRequests(requests);");
        setAllRequests(requests);
      }
      console.log(allRequests, "all req");

    } catch (error) {
      errorHandling(error, navigate);
    }
  };

  useEffect(() => {
    console.log("setReqForCal useEffect");
    setReqForCal([...calendar]);
  }, [allRequests]);


  const setReqForCal = (cal) => {
    console.log(allRequests, "allRequests setReqForCal");

    allRequests.forEach((req) => {
      cal.forEach((week, index) => {
        for (let day = 0; day < week.length; day++) {
          if (req.comment != "מבוטל") {
            if (week[day].date.getDate() == new Date(req.date).getDate() && week[day].date.getMonth() == new Date(req.date).getMonth() && week[day].date.getFullYear() == new Date(req.date).getFullYear()) {
              cal[index][day].requests.push(req);
            }
          }
        }
      });
    });

    if (cal.length > 0)
      setCalendar(cal);
  }

  // const changeStatus = async (value, index) => {
  //   const arr = [...allRequests];
  //   arr[index].status = value;
  //   setAllRequests(arr);


  //   const req = arr[index];
  //   req.date = `${new Date(req.date).toJSON().slice(0, 10)} 07:00:00`;
  //   console.log(req);

  //   try {
  //     const response = await axios.put("/api/requests/" + req.requestId, req);
  //     console.log(response.data);
  //   } catch (error) {
  //     errorHandling(error, navigate);
  //   }
  // }

  return (
    <div className="calendar">
      <H1>לוח בקשות</H1>
      <div className='select-month'>
        <label htmlFor="month">תאריך:</label>
        <select name="month" id="month" value={monthSelected} onChange={(e) => {
          setMonthFromUser(e.target.value);
          setWeekFromUser(0);
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
      <div className='select-view'>
        <label htmlFor="view">תצוגה:</label>
        <select name="view" id="view" onChange={(e) => {
          setViewFromUser(e.target.value);
        }}>
          <option value="שבועית">שבועית</option>
          <option value="חודשית">חודשית</option>
        </select>
        <label htmlFor="week">שבוע:</label>
        <select name="week" id="week" value={weekSelected} disabled={viewSelected == "חודשית" ? true : false} onChange={(e) => {
          setWeekFromUser(e.target.value);
        }}>
          <option value="0">ראשון</option>
          <option value="1">שני</option>
          <option value="2">שלישי</option>
          <option value="3">רביעי</option>
          <option value="4">חמישי</option>
          <option value="5">שישי</option>
        </select>
        <label htmlFor="team">מפעילים:</label>
        <select name="team" id="team" value={teamSelected} onChange={(e) => {
          setTeamFromUser(e.target.value);
        }}>
          <option value="mf">mf</option>
          <option value="open">open</option>
          <option value="all">הכל</option>
        </select>
      </div>
      {calendar.length > 0 && viewSelected == "שבועית" ? <Table>
        <thead>
          <tr>
            <th></th>
            <th>{dateToString(calendar[weekSelected][0].date, "hd dd.mm")}</th>
            <th>{dateToString(calendar[weekSelected][1].date, "hd dd.mm")}</th>
            <th>{dateToString(calendar[weekSelected][2].date, "hd dd.mm")}</th>
            <th>{dateToString(calendar[weekSelected][3].date, "hd dd.mm")}</th>
            <th>{dateToString(calendar[weekSelected][4].date, "hd dd.mm")}</th>
            <th>{dateToString(calendar[weekSelected][5].date, "hd dd.mm")}</th>
            <th>{dateToString(calendar[weekSelected][6].date, "hd dd.mm")}</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift,index) => {
            return <tr key={index}>
              <td>{shift}</td>
              <td>{calendar[weekSelected][0].requests?.map(req => req.shift == shift && req.status != "לא מאושר" && (req.team == teamSelected || teamSelected=="all")? req.fullName + "\n" : "")}</td>
              <td>{calendar[weekSelected][1].requests?.map(req => req.shift == shift && req.status != "לא מאושר" && (req.team == teamSelected || teamSelected=="all")? req.fullName + "\n" : "")}</td>
              <td>{calendar[weekSelected][2].requests?.map(req => req.shift == shift && req.status != "לא מאושר" && (req.team == teamSelected || teamSelected=="all")? req.fullName + "\n" : "")}</td>
              <td>{calendar[weekSelected][3].requests?.map(req => req.shift == shift && req.status != "לא מאושר" && (req.team == teamSelected || teamSelected=="all")? req.fullName + "\n" : "")}</td>
              <td>{calendar[weekSelected][4].requests?.map(req => req.shift == shift && req.status != "לא מאושר" && (req.team == teamSelected || teamSelected=="all")? req.fullName + "\n" : "")}</td>
              <td>{calendar[weekSelected][5].requests?.map(req => req.shift == shift && req.status != "לא מאושר" && (req.team == teamSelected || teamSelected=="all")? req.fullName + "\n" : "")}</td>
              <td>{calendar[weekSelected][6].requests?.map(req => req.shift == shift && req.status != "לא מאושר" && (req.team == teamSelected || teamSelected=="all")? req.fullName + "\n" : "")}</td>
            </tr>
          })}
        </tbody>
      </Table> : ""}

      {viewSelected == "חודשית" ? <Table>
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
              if (day.date.getMonth() < monthSelected && day.date > dateNow) return <td key={"td" + index} onClick={() => setDateFromUser(day.date)} className='prev-month'>{dateToString(day.date, "dd.mm")}</td>
              if (day.date.getMonth() < monthSelected && day.date < dateNow) return <td key={"td" + index} className='prev-month pass'>{dateToString(day.date, "dd.mm")}</td>
              if (day.date.getMonth() == monthSelected && day.date < dateNow) return <td key={"td" + index} className='this-month pass'>{dateToString(day.date, "dd.mm")}</td>
              if (day.date.getMonth() > monthSelected && day.date > dateNow) return <td key={"td" + index} onClick={() => setDateFromUser(day.date)} className={dateSelected?.getDate() == day.date.getDate() && dateSelected?.getMonth() == day.date.getMonth() && dateSelected?.getFullYear() == day.date.getFullYear() ? "next-month selected" : "next-month"}>{dateToString(day.date, "dd.mm")}</td>
              if (day.date.getMonth() > monthSelected && day.date < dateNow) return <td key={"td" + index} className='next-month pass'>{dateToString(day.date, "dd.mm")}</td>
              return <td key={"td" + index} onClick={() => setDateFromUser(day.date)} className={dateSelected?.getDate() == day.date.getDate() && dateSelected?.getMonth() == day.date.getMonth() && dateSelected?.getFullYear() == day.date.getFullYear() ? "this-month selected" : "this-month"}>{dateToString(day.date, "dd.mm")}</td>
            })}</tr>
          })}
        </tbody>
      </Table> : ""}

      {viewSelected == "שבועית" ?
        <form action="">
          <div className='form-div'>
            <div className='date-selected'>
              <span className='date-selected-description'>רשימת בקשות לשבוע זה:</span>
            </div>
          </div>
          <Table>
            <tbody>
              {calendar[weekSelected]?.map(day => {
                return day.requests.map((req, index) => {
                  {return req.team==teamSelected || teamSelected=="all"? <tr key={index}>
                    <td>{dateToString(req.date, "hd")}</td>
                    <td>{req.fullName}</td>
                    <td>{req.shift}</td>
                    <td>{req.comment}</td>
                    <td className={req.status == "ממתין לאישור" ? "waiting" : req.status == "מאושר" ? "confirmed" : "not-confirmed"}>{req.status}</td>
                  </tr> : ""}
                })
              })}
            </tbody>
          </Table>
        </form>
        : ""}
      {viewSelected == "חודשית" ?
        <form action="">
          <div className='form-div'>
            <div className='date-selected'>
              <span className='date-selected-description'>רשימת בקשות לתאריך:</span>
              <span>{dateToString(dateSelected, "hd dd.mm.yy") || "בחר תאריך"}</span>
            </div>
          </div>
          <Table>
            <tbody>
              {allRequests.map((req, index) => {
                if (new Date(req.date).getDate() == new Date(dateSelected).getDate() && new Date(req.date).getMonth() == new Date(dateSelected).getMonth() && new Date(req.date).getFullYear() == new Date(dateSelected).getFullYear() && dateSelected != null) {
                  if (req.comment != "מבוטל") {
                    {return req.team==teamSelected || teamSelected=="all"? <tr key={index}>
                    <td>{dateToString(req.date, "hd")}</td>
                    <td>{req.fullName}</td>
                    <td>{req.shift}</td>
                    <td>{req.comment}</td>
                    <td className={req.status == "ממתין לאישור" ? "waiting" : req.status == "מאושר" ? "confirmed" : "not-confirmed"}>{req.status}</td>
                  </tr> : ""}
                  }
                }
              })}
            </tbody>
          </Table>
        </form>
        : ""}
    </div>
  );
}

export default Calendar;
