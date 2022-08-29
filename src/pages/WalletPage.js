import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const WalletPage = () => {
  const userContext = useUserContext();
  const navigate = useNavigate();

  if (!userContext.email) {
    return navigate("/");
  }

  return <div>WalletPage</div>;
};

export default WalletPage;
