import Cookies from "universal-cookie";
import axios from "../api/axios";

export async function errorHandling(error, navigate) {

    if (error.message === "Network Error") {
        alert("תקלת תקשורת");
        return;
    }

    if (!error?.response?.data) return;

    console.log(typeof error.response.data);

    if (error.response.data === "You are not logged-in") {
        await disconnect(navigate);
        alert("אתה לא מחובר.");
        navigate("/login");
        return;
    }

    if (error.response.data === "You are not admin!") {
        await disconnect(navigate);
        alert("אתה לא מנהל.");
        navigate("/login");
        return;
    }

    if (error.response.data === "Illegal username or password") {
        alert("משתמש או סיסמה לא נכונים.");
        return;
    }

    console.log(typeof error.response.data);

    if(typeof error.response.data != "string"){
        alert(error.response.data[0]);
    }
    else{
        alert(error.response.data);
    }
    

}


export async function disconnect(navigate) {
    try {
        const cookies = new Cookies();

        await axios.get("/api/auth/logout");
        cookies.remove('user');
        navigate('/login');

    } catch (error) {
        errorHandling(error);
    }
}