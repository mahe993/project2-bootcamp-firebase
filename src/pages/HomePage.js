import React from "react";
import { UserContextProvider } from "../contexts/UserContext";
import TestPage from "./TestPage";

const HomePage = () => {
  return (
    <>
      <h1>Hello Home</h1>
      <UserContextProvider>
        <TestPage />
      </UserContextProvider>
    </>
  );
};

export default HomePage;
