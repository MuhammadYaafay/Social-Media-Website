import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Social</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Social.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="registerInput"
            />
            <input
              placeholder="Password"
              minLength="6"
              type="password"
              required
              ref={password}
              className="registerInput"
            />
            <input
              placeholder="Password Again"
              type="password"
              required
              ref={passwordAgain}
              className="registerInput"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button
              className="registerLoginButton"
              type="button"
              onClick={handleLoginClick}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
