import { ref, update } from "firebase/database";
import React from "react";
import { useUserContext } from "../contexts/UserContext";
import { database } from "../firebase";

const TopUpPage = () => {
  const useContext = useUserContext();

  const handleClick = () => {
    const updates = {};
    updates["/users/" + useContext.userId + "/accountBalance"] =
      useContext.accountBalance + 100;
    update(ref(database), updates);
  };

  return (
    <>
      <div>TopUpPage</div>
      <button onClick={handleClick}>Add Money</button>
    </>
  );
};

export default TopUpPage;
