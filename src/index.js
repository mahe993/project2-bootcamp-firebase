import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  return loginStatus ? (
    <MainPage />
  ) : (
    <LoginPage toggleLoginStatus={() => setLoginStatus(!loginStatus)} />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
