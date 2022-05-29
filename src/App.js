import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import logo from '../src/assets/png/isracard.png';

import Layout from "./components/layout/layout";
import Login from './components/login/login';
import Register from './components/register/register';
import AddRequest from './components/add-request/add-request';
import MyRequests from './components/my-request/my-requests';
import OldRequests from './components/old-request/old-requests';
import ConfirmRequests from './components/confirm-request/confirm-requests';
import EditUser from './components/edit-user/edit-user';
import Calendar from './components/calendar/calendar';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/styles/global';

const themeColors={
  main: "#19388A",
  secondary: "#EE2D24",
  buttonText: "white"
}

const theme = {
  input: {
    bc: "#F0F0F0",
    color: "#676767"
  },
  sendButton: {
    bc: themeColors.main,
    color: themeColors.buttonText
  },
  DisconnectButton: {
    bc: themeColors.secondary,
    color: themeColors.buttonText
  },
  H1: {
    color: themeColors.main
  },
  computer:{
    fontSize: "20px"
  },
  tablet: {
    width: "1100px",
    fontSize: "15px"
  },
  mobile: {
    width: "550px",
    fontSize: "8px"
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <div className="app">
        {/* <img src={logo} alt="isracard-logo" /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<AddRequest />} />
              <Route path="my-requests" element={<MyRequests />} />
              <Route path="old-requests" element={<OldRequests />} />
              <Route path="confirm-requests" element={<ConfirmRequests />} />
              <Route path="edit-user" element={<EditUser />} />
              <Route path="calendar" element={<Calendar />} />
            </Route>
            <Route path="login" index element={<Login />} />
            <Route path="register" index element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
