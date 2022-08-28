import { Box } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const navigate = useNavigate();

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
      <HomeIcon
        fontSize="large"
        onClick={() => {
          navigate("/");
        }}
      />
    </Box>
  );
};

export default LoginPage;
