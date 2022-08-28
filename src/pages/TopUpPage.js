import { ref, update } from "firebase/database";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { database } from "../firebase";

const TopUpPage = () => {
  const userContext = useUserContext();
  const navigate = useNavigate();

  if (!userContext.email) {
    navigate("/");
  }

  const handleClick = () => {
    console.log("test:", userContext.accountBalance);
    update(ref(database, "users/" + userContext.userId), {
      accountBalance: userContext.accountBalance + 100,
    });
  };

  return (
    <>
      <div>TopUpPage</div>
      <button onClick={handleClick}>Add Money</button>
    </>
  );
};

export default TopUpPage;
