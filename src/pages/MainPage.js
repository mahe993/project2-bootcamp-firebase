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

const MainPage = () => {
  const [baseValue, setBaseValue] = useState();
  const [exchangeValue, setExchangeValue] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [date, setDate] = useState();

  return (
    <Grid container>
      <BrowserRouter>
        <UserContextProvider>
          <AppBar />
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/topup" element={<TopUpPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route
              path="/wallet"
              element={
                <WalletPage
                  states={{ baseValue, exchangeValue, exchangeRate, date }}
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
