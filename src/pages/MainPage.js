import { Grid } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "../components/AppBar";
import { UserContextProvider } from "../contexts/UserContext";
import HomePage from "./HomePage";

const MainPage = (props) => {
  return (
    <Grid container>
      <UserContextProvider>
        <AppBar />
      </UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Grid>
  );
};

export default MainPage;
