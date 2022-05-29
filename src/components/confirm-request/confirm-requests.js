import './confirm-requests.css';
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { errorHandling } from '../../services/auth';
import { dateToString, dateToSqlFormat } from '../../services/date';
import { H1 } from "../styles/h1.styled"
import { Table } from "../styles/table.styled"

function ConfirmRequests() {
  const navigate = useNavigate();

  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    if (allRequests.length == 0) {
      getAllRequests();
    }
  }, []);


  const getAllRequests = async () => {
    try {
      const response = await axios.get("/api/requests");
      const data = response.data;
      setAllRequests(data);
    } catch (error) {
      alert(error);
    }
  }

  const changeStatus = async (value, index) => {
    const arr = [...allRequests];
    arr[index].status = value;
    setAllRequests(arr);


    const userRequest = arr[index];
    userRequest.date = dateToSqlFormat(userRequest.date);
    console.log(userRequest);

    try {
      const response = await axios.put("/api/requests/" + userRequest.requestId, userRequest);
      console.log(response.data);
    } catch (error) {
      errorHandling(error, navigate);
    }

  }


  return (
    <div className="confirm-requests">
      <H1>אישור בקשות</H1>
      <Table>
        <thead>
          <tr>
            <th>יום</th>
            <th>תאריך</th>
            <th>שם</th>
            <th>משמרת</th>
            <th>הערה</th>
            <th>סטטוס</th>
          </tr>
        </thead>
        <tbody>
          {allRequests.map((req, index) => {
            if (new Date(req.date) > new Date()) {
              return <tr key={index}>
                <td>{days[new Date(req.date).getDay()]}</td>
                <td>{dateToString(req.date, "dd.mm.yy")}</td>
                <td>{req.fullName}</td>
                <td>{req.shift}</td>
                <td>{req.comment}</td>
                <td>
                  {req.comment == "מבוטל"?
                   <span className={req.status == "ממתין לאישור" ? "waiting" : req.status == "מאושר" ? "confirmed" : "not-confirmed"}>{req.status}</span> : 
                   <select name="status" id="index" value={req.status} className={req.status == "ממתין לאישור" ? "waiting" : req.status == "מאושר" ? "confirmed" : "not-confirmed"} onChange={(e) => {
                    changeStatus(e.target.value, index);
                  }} >
                    <option value="ממתין לאישור">ממתין לאישור</option>
                    <option value="מאושר">מאושר</option>
                    <option value="לא מאושר">לא מאושר</option>
                  </select>
                  }
                  </td>
              </tr>
            }
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ConfirmRequests;
