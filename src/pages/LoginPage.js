import React from "react";
import ToggleDarkMode from "../components/ToggleDarkMode";

const LoginPage = (props) => {
  return (
    <>
      <h1>Hello login</h1>
      <button onClick={props.toggleLoginStatus}>Login</button>
      <ToggleDarkMode />
    </>
  );
};

export default LoginPage;
