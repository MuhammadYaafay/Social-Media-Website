import "./login.css"
import { useRef } from "react"    //ref used because of less rendering otherwise in usestate or other it would render on every character typed
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }

    const handleRegisterClick = () => {
        navigate("/register");
    };
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Social.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" className="loginInput" required ref={email}/>
                    <input placeholder="Password" type="password" className="loginInput" required minLength={6 } ref={password}/>
                    <button className="loginButton" type="submit" disabled={isFetching}> {isFetching? <CircularProgress color="white" size="20px"/>: "login"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton" type="button" onClick={handleRegisterClick} >Create a new account</button>
                </form>
            </div>
        </div>
      
    </div>
  )
}
