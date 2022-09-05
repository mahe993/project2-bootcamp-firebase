import { Grid } from "@mui/material";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "../components/AppBar";
import { UserContextProvider } from "../contexts/UserContext";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import TopUpPage from "./TopUpPage";
import AccountPage from "./AccountPage";
import WalletPage from "./WalletPage";
import LoginForm from "../components/LoginForm";

const MainPage = () => {
  const [baseValue, setBaseValue] = useState();
  const [exchangeValue, setExchangeValue] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [date, setDate] = useState();
  const [avatarURL, setAvatarURL] = useState();

  return (
    <Grid container>
      <BrowserRouter>
        <UserContextProvider>
          <AppBar avatarURL={avatarURL} setAvatarURL={setAvatarURL} />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  states={{ baseValue, exchangeValue, exchangeRate, date }}
                  setBaseValue={setBaseValue}
                  setExchangeValue={setExchangeValue}
                  setExchangeRate={setExchangeRate}
                  setDate={setDate}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginPage form={<LoginForm setAvatarURL={setAvatarURL} />} />
              }
            />
            <Route path="/topup" element={<TopUpPage />} />
            <Route
              path="/account"
              element={
                <AccountPage
                  avatarURL={avatarURL}
                  setAvatarURL={setAvatarURL}
                />
              }
            />
            <Route
              path="/wallet"
              element={
                <WalletPage
                  states={{ baseValue, exchangeValue, exchangeRate, date }}
                  setExchangeRate={setExchangeRate}
                />
              }
            />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </Grid>
  );
};

export default MainPage;
