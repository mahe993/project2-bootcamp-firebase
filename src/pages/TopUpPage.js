import { ref, update } from "firebase/database";
import React from "react";
import { currencyExchange } from "../apis/exchangeRateApi";
import { useUserContext } from "../contexts/UserContext";
import { database } from "../firebase";

const TopUpPage = () => {
  const useContext = useUserContext();

  const handleClick = () => {
    update(ref(database, "users/" + useContext.userId), {
      accountBalance: useContext.accountBalance + 100,
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
