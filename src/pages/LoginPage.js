import React from "react";
import LoginForm from "../components/LoginForm";
import ToggleDarkMode from "../components/ToggleDarkMode";

const LoginPage = (props) => {
  return (
    <>
      <h1>Hello login</h1>
      <LoginForm />
      <button onClick={props.toggleLoginStatus}>Login</button>
      <ToggleDarkMode />
    </>
  );
};

export default LoginPage;
