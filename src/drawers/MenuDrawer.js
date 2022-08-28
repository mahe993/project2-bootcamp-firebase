/* eslint-disable default-case */
import { Drawer, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleDarkMode from "../components/ToggleDarkMode";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useUserContext } from "../contexts/UserContext";

const MenuDrawer = (props) => {
  const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  const DRAWER_ITEMS = ["Account", "Top-Up", "Wallet", "Logout"];
  const userContext = useUserContext();

  const handleClick = (page) => {
    switch (page) {
      case "Account":
        console.log("account page");
        //if !user, open dialog to prompt sign in, otherwise nav to account page
        break;

      case "Top-Up":
        console.log("topup page");
        //if !user, open dialog to prompt sign in, otherwise nav to topup page
        break;

      case "Wallet":
        console.log("Wallet page");
        //if !user, open dialog to prompt sign in, otherwise nav to wallet page
        break;

      case "Logout":
        console.log("logout");
        //if !user, Logout button should be disabled
        //sign out
        signOut(auth)
          .then(() => {
            console.log("signout successful");
            //navigate back to unprotected page/ home page
          })
          .catch((error) => {
            // An error happened.
            console.log("signout error:", error);
          });
        break;
    }
  };

  return (
    <>
      <MenuIcon
        onClick={() => {
          setOpenMenuDrawer(true);
        }}
      />
      <Drawer
        variant="temporary"
        anchor="right"
        open={openMenuDrawer}
        onClose={() => {
          setOpenMenuDrawer(false);
        }}
      >
        <ToggleDarkMode />
        {DRAWER_ITEMS.map((x) => (
          <ListItem
            key={x}
            button
            onClick={() => handleClick(x)}
            disabled={!userContext.email}
          >
            <ListItemText primary={x} />
          </ListItem>
        ))}
      </Drawer>
    </>
  );
};

export default MenuDrawer;
