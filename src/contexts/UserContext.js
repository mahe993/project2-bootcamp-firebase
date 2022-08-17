import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useContext, useState } from "react";
import { auth, database } from "../firebase";

const UserContext = React.createContext();
let prevSnapshot = {};

export const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    userId: null,
    username: null,
    accountBalance: null,
  });

  onAuthStateChanged(auth, (user) => {
    if (user && userInfo.userId === null) {
      setUserInfo({ ...userInfo, userId: user.uid });
    } else if (!user && userInfo.userId !== null) {
      console.log("testing");
      setUserInfo({ ...userInfo, userId: null });
    }
  });

  const userInfoRef = ref(database, "users/" + userInfo.userId);

  onValue(userInfoRef, (snapshot) => {
    console.log(prevSnapshot, snapshot.val());
    if (snapshot.val().accountBalance !== prevSnapshot.accountBalance) {
      console.log(prevSnapshot === snapshot.val());
      prevSnapshot = snapshot.val();
      setUserInfo({
        ...userInfo,
        username: snapshot.val().username,
        accountBalance: snapshot.val().accountBalance,
      });
    }
  });

  const value = userInfo;
  console.log(value);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }

  return context;
};
