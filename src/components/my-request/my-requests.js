import axios from '../../api/axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Icon from '@mdi/react'
import { mdiDelete } from '@mdi/js';
import './my-requests.css';
import { useNavigate } from 'react-router-dom';
import { errorHandling } from '../../services/auth';
import { dateToString, dateToSqlFormat } from '../../services/date';
import { H1 } from "../styles/h1.styled"
import { Table } from "../styles/table.styled";

function MyRequests() {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    console.log(process.env.SERVER_URL, "process.env.SERVER_URL");
    getMyRequests();
  }, []);

  const getMyRequests = async () => {
    if (myRequests.length == 0) {
      try {
        const response = await axios.get("/api/requests/" + cookies.get('user').userName);
        console.log(response.data);
        setMyRequests(response.data);
      } catch (error) {
        errorHandling(error, navigate);
      }
    }
  }

  const deleteReq = async (req, index) => {
    console.log(req);
    req.date = dateToSqlFormat(req.date);
    req.comment = "מבוטל"

    try {
      await axios.put("/api/requests/" + req.requestId, req);
    } catch (error) {
      errorHandling(error, navigate);
    }

    const requests=[...myRequests];
    requests[index]=req;
    setMyRequests(requests);

  }


  return (
    <div className="my-requests">
      <H1>הבקשות שלי</H1>
      <Table>
        <thead>
          <tr>
            <th>יום</th>
            <th>תאריך</th>
            <th>משמרת</th>
            <th>הערה</th>
            <th>סטטוס</th>
          </tr>
        </thead>
        <tbody>
          {myRequests?.map((req, index) => {
            if (new Date(req.date) > new Date()) {
              return req.comment != "מבוטל" ?
                <tr key={index}>
                  <td>{dateToString(req.date, "hd")}</td>
                  <td>{dateToString(req.date, "dd.mm.yy")}</td>
                  <td>{req.shift}</td>
                  <td>{req.comment}</td>
                  <td className={req.status == "ממתין לאישור" ? "waiting" : req.status == "מאושר" ? "confirmed" : "not-confirmed"}>{req.status}</td>
                  <td className='td-icon-delete'><Icon path={mdiDelete} size={1} onClick={() => { deleteReq(req, index) }} /></td>
                </tr>
                : "";
            }
          })}
        </tbody>
      </Table>

    </div>
  );
}

export default MyRequests;
