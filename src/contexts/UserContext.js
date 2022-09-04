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
    email: null,
  });

  onAuthStateChanged(auth, (user) => {
    if (user && userInfo.userId === null) {
      setUserInfo({ ...userInfo, userId: user.uid, email: user.email });
    } else if (!user && userInfo.userId !== null) {
      setUserInfo({ ...userInfo, userId: null, email: null });
    }
  });

  const userInfoRef = ref(database, "users/" + userInfo.userId + "/username");

  onValue(userInfoRef, (snapshot) => {
    console.log(snapshot.val());
    if (snapshot.val() && userInfo.username !== snapshot.val) {
      prevSnapshot = snapshot.val();
      setUserInfo({
        ...userInfo,
        username: snapshot.val(),
      });
    }
  });

  return (
    <UserContext.Provider value={userInfo}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }

  return context;
};
