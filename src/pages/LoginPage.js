import { Box } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm";
import HomeButton from "../components/HomeButton";

const LoginPage = (props) => {
  return (
    <Box
      maxHeight={"90vh"}
      height={"80vh"}
      pt={3}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <LoginForm />
      <HomeButton />
    </Box>
  );
};

export default LoginPage;
