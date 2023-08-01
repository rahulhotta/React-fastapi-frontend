import React, { useState } from "react";
import "./LoginPage.css";
import LoginLogo from "../../Images/Login/Login_page_img.png";
import TextField from "@mui/material/TextField";
import { UserData } from "../../Data/UserData";
function LoginPage(props) {
  const [userEnteredEmail, setUserEnteredEmail] = useState("");
  const [userEnteredPassword, setUserEnteredPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const handleEmailChange = (e) => {
    setUserEnteredEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserEnteredPassword(e.target.value);
  };

  const validateLogin = (userEmail, userPassword) => {
    let loginStatus = false
    let currentUser;
    UserData.forEach((user) => {
      if (user.email === userEmail && user.password === userPassword) {
        loginStatus = true;
        currentUser = user
      }
    });
    if(loginStatus){
      props.setIsLoggedIn(true)
      props.setCurrentUser(currentUser)
      return true
    }else{
      props.setIsLoggedIn(false)
      return false
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const isValidLogin = validateLogin(userEnteredEmail, userEnteredPassword);

    if (isValidLogin) {
      setErrorMessage("")
      setIsLoggedIn(true);
    } else {
      setErrorMessage("Invalid Email or Password!!")
      setIsLoggedIn(false);
    }
    setUserEnteredEmail("");
    setUserEnteredPassword("")
  };

  return (
    <div className="login__container">
      <div className="login__left__container">
        <img src={LoginLogo} alt="Login" />
      </div>
      <form onSubmit={handleLogin}>
        <div className="login__right__container">
          <h2 className="login__right__heading">Welcome back</h2>
          <p className="login__right__desc">Please enter your credentials</p>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="login__input"
            type="email"
            required
            onChange={handleEmailChange}
            value={userEnteredEmail}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            required
            className="login__input"
            onChange={handlePasswordChange}
            value={userEnteredPassword}
          />
          <button className="login__right__submit__btn" type="submit">
            submit
          </button>
        {<div className="login__error__message"> {errorMessage}</div>}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
