import { Grid } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "../components/AppBar";
import { UserContextProvider } from "../contexts/UserContext";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import TopUpPage from "./TopUpPage";
import AccountPage from "./AccountPage";
import WalletPage from "./WalletPage";

const MainPage = (props) => {
  return (
    <Grid container>
      <BrowserRouter>
        <UserContextProvider>
          <AppBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/topup" element={<TopUpPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/wallet" element={<WalletPage />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </Grid>
  );
};

export default MainPage;
