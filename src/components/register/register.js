import './register.css';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { errorHandling } from '../../services/auth';

import { SendButton } from "../styles/send-button.styled"
import { Input } from "../styles/input.styled"
import { H1 } from "../styles/h1.styled"
import {Form} from "../styles/form.styled";

function Register() {

  const cookies = new Cookies();
  const [newUser, setNewUser] = useState({ userName: "", firstName: "", lastName: "", password: "", confirmPassword: "", team: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('user')) {
      navigate("/");
    };
  }, []);


  const setUserName = (userName) => {
    const user = { ...newUser };
    user.userName = userName;
    console.log(user, "user");
    setNewUser(user);
  }

  const setFirstName = (firstName) => {
    const user = { ...newUser };
    user.firstName = firstName;
    console.log(user, "user");
    setNewUser(user);
  }

  const setLastName = (lastName) => {
    const user = { ...newUser };
    user.lastName = lastName;
    console.log(user, "user");
    setNewUser(user);
  }

  const setPassword = (password) => {
    const user = { ...newUser };
    user.password = password;
    console.log(user, "user");
    setNewUser(user);
  }

  const confirmPassword = (confirmPassword) => {
    const user = { ...newUser };
    user.confirmPassword = confirmPassword;
    console.log(user, "user");
    setNewUser(user);
  }

  const setTeam = (team) => {
    const user = { ...newUser };
    user.team = team;
    console.log(user, "user");
    setNewUser(user);
  }

  const register = async (e) => {

    try {
      e.preventDefault();
      const response = await axios.post("/api/auth/register", newUser, { withCredentials: true });
      cookies.set('user', response.data, { path: '/' });
      console.log(cookies.get('user'));
      navigate('/');
    } catch (error) {
      errorHandling(error, navigate);
    }
  };

  return (
    <div className="register">
      <H1>יצירת משתמש חדש</H1>
      <Form action="" width={"15%"}>
        <Input type="text" autoComplete="off" name="userName" id="userName" placeholder="שם משתמש באנגלית" value={newUser.userName} onChange={e => { setUserName(e.target.value) }} />
        <Input type="text" autoComplete="off" name="firstName" id="firstName" placeholder="שם פרטי בעברית" value={newUser.firstName} onChange={e => { setFirstName(e.target.value) }} />
        <Input type="text" autoComplete="off" name="lastName" id="lastName" placeholder="שם משפחה בעברית" value={newUser.lastName} onChange={e => { setLastName(e.target.value) }} />
        <Input type="password" autoComplete="off" name="password" id="password" placeholder="סיסמה באנגלית" value={newUser.password} onChange={e => { setPassword(e.target.value) }} />
        <Input type="password" autoComplete="off" name="confirm-password" id="confirm-password" placeholder="אימות סיסמה" value={newUser.confirmPassword} onChange={e => { confirmPassword(e.target.value) }} />
        <div>
          <select name="team" id="team" onChange={e => { setTeam(e.target.value) }}>
            <option value="" disabled selected>בחר מפעיל:</option>
            <option value="mf">mf</option>
            <option value="open">open</option>
          </select>
        </div>

        <SendButton onClick={e => { register(e) }}>הירשם</SendButton>
      </Form>
      <Link to="/login">לעמוד ההתחברות</Link>
    </div>
  );
}

export default Register;
