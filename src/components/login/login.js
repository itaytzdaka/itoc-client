import './login.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { errorHandling } from '../../services/auth';
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

import {SendButton} from "../styles/send-button.styled";
import {Input} from "../styles/input.styled";
import {H1} from "../styles/h1.styled";
import {Form} from "../styles/form.styled";

function Login() {
  const cookies = new Cookies();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setValidation] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    if(cookies.get('user')){
      navigate("/");
    };
  },[]);

  const login = async (e) => {

    try {
      e.preventDefault();
      const response = await axios.post("/api/auth/login" ,{ userName, password }, { withCredentials: true });
      console.log(response.data, "response.data /login");
      cookies.set('user', response.data, { path: '/' });
      console.log(cookies.get('user'), "cookies.get('user') /login");
      navigate('/');
    } catch (error) {
      errorHandling(error, navigate);
    }
  };


  const validation = () => {
    return false;
  }

  return (
    <div className="login">
      <H1>אתר בקשות למשמרות וחופשות</H1>
      <Form action="" width={"15%"}>
        <Input type="text" autoComplete="off" name="userName" id="userName" onChange={(e) => { setUserName(e.target.value) }} placeholder="שם משתמש" />
        <Input type="password" autoComplete="off" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="סיסמה" />
        <SendButton disabled={!isValid} onClick={(e) => { login(e) }}>התחברות</SendButton>
      </Form>

      <Link to="/register">יצירת משתמש חדש</Link>
    </div>
  );
}

export default Login;
