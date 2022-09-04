import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <HomeIcon
      fontSize="large"
      onClick={() => {
        navigate("/");
      }}
    />
  );
};

export default HomeButton;
