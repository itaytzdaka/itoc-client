import axios from '../../api/axios';
import './edit-user.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorHandling } from '../../services/auth';

import { SendButton } from "../styles/send-button.styled"
import { Input } from "../styles/input.styled"
import { H1 } from "../styles/h1.styled"
import { Form } from "../styles/form.styled"

function EditUser() {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setUser] = useState();

  useEffect(() => {
    if (allUsers.length == 0) {
      getAllUsers();
    }
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/auth");
      console.log(response.data);
      setAllUsers(response.data);
      setUser(response.data[0])
    } catch (error) {
      errorHandling(error, navigate);
    }

  };

  const userSelectedHandle = (index) => {
    setUser(allUsers[index]);
  };

  const setFirstName = (firstName) => {
    const user = { ...selectedUser };
    user.firstName = firstName;
    console.log(user, "user");
    setUser(user);
  }

  const setLastName = (lastName) => {
    const user = { ...selectedUser };
    user.lastName = lastName;
    console.log(user, "user");
    setUser(user);
  }

  const setPassword = (password) => {
    const user = { ...selectedUser };
    user.password = password;
    console.log(user, "user");
    setUser(user);
  }

  const setTeam = (team) => {
    const user = { ...selectedUser };
    user.team = team;
    console.log(user, "user");
    setUser(user);
  }

  const setIsAdmin = (isAdmin) => {
    const user = { ...selectedUser };
    user.isAdmin = isAdmin;
    console.log(user, "user");
    setUser(user);
  }

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/auth/" + selectedUser.userName, selectedUser);
      alert("המשתמש עודכן בהצלחה");
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <div className="edit-user">
      <H1>ניהול משתמשים</H1>
      <Form action="">
        

          <div>
            <label htmlFor="userName">בחר משתמש:</label>
            <select name="userName" id="userName" onChange={(e) => {
              userSelectedHandle(e.target.value);
            }}>
              {allUsers?.map((user, index) => {
                return <option value={index} key={user.userName}>{user.userName}</option>
              })}
            </select>
          </div>
          <div>
            <label htmlFor="firstName">שם פרטי:</label>
            <Input type="text" name="firstName" id="firstName" value={selectedUser?.firstName || ""} onChange={e => { setFirstName(e.target.value) }} />
          </div>
          <div>
            <label htmlFor="lastName"> שם משפחה:</label>
            <Input type="text" name="lastName" id="lastName" value={selectedUser?.lastName || ""} onChange={e => { setLastName(e.target.value) }} />
          </div>
          <div>
            <label htmlFor="password">סיסמה:</label>
            <Input type="password" name="password" id="password" value={selectedUser?.password || ""} onChange={e => { setPassword(e.target.value) }} />
          </div>
          <div>
            <label htmlFor="">מפעיל:</label>
            <select name="team" id="team" value={selectedUser?.team} onChange={e => { setTeam(e.target.value) }}>
              <option value="mf">mf</option>
              <option value="open">open</option>
            </select>
          </div>
          <div>
            <label htmlFor="">הרשאות:</label>
            <select name="auth" id="auth" value={selectedUser?.isAdmin} onChange={e => { setIsAdmin(e.target.value) }}>
              <option value="0">משתמש רגיל</option>
              <option value="1">מנהל</option>
            </select>
          </div>
          <SendButton onClick={(e) => { saveUser(e) }}>שמור</SendButton>
      </Form>
    </div>
  );
}

export default EditUser;
