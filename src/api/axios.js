import axios from "axios";
// const BASE_URL= process.env.REACT_APP_SERVER_URL;

const BASE_URL=process.env.NODE_ENV === "production"? "https://itay-shifts.herokuapp.com" : "http://localhost:3000";

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});
