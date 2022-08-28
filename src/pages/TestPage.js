import React from "react";
import { useUserContext } from "../contexts/UserContext";
import TopUpPage from "./TopUpPage";

const TestPage = () => {
  const userContext = useUserContext();

  return (
    <>
      <p>userID: {userContext.userId}</p>
      <p>email: {userContext.email}</p>
      <p>Account Balance: {userContext.accountBalance}</p>
      <TopUpPage />
    </>
  );
};

export default TestPage;
