import { Grid } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuDrawer from "../drawers/MenuDrawer";
import HomePage from "./HomePage";

const MainPage = (props) => {
  return (
    <Grid container>
      <MenuDrawer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Grid>
  );
};

export default MainPage;
