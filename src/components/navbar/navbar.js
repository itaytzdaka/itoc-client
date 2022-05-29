import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import Cookies from 'universal-cookie';
import React, { useEffect } from 'react';
import { disconnect } from '../../services/auth';
import {DisconnectButton} from "../styles/disconnect-button.styled"
import {Nav} from "../styles/nav.styled"

function Navbar() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!cookies.get('user')){
      

    }
  },[]);

  const logoff = () => {
    disconnect(navigate);
  };

  return (
    <Nav>
      <div className='user'>
        <p>שלום {cookies.get('user')?.firstName}</p>
        <DisconnectButton onClick={logoff}>התנתק</DisconnectButton>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">בקשה חדשה</Link>
          </li>
          <li>
            <Link to="/my-requests">הבקשות שלי</Link>
          </li>
          <li>
            <Link to="/old-requests">בקשות ישנות</Link>
          </li>
          {cookies.get('user')?.isAdmin==1 && <li><Link to="/confirm-requests">אישור בקשות</Link></li>}
          {cookies.get('user')?.isAdmin==1 && <li><Link to="/calendar">לוח בקשות</Link></li>}
          {cookies.get('user')?.isAdmin==1 && <li><Link to="/edit-user">ניהול משתמשים</Link></li>}
        </ul>
      </nav>
    </Nav>
  );
}

export default Navbar;
