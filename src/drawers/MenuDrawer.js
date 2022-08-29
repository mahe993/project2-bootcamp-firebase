/* eslint-disable default-case */
import { Box, Drawer, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleDarkMode from "../components/ToggleDarkMode";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const MenuDrawer = (props) => {
  const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  const DRAWER_ITEMS = ["Account", "Top-Up", "Wallet", "Logout"];
  const userContext = useUserContext();
  const navigate = useNavigate();

  const handleClick = (page) => {
    switch (page) {
      case "Account":
        navigate("/account");
        setOpenMenuDrawer(false);
        //if !user, open dialog to prompt sign in, otherwise nav to account page
        break;

      case "Top-Up":
        //if !user, open dialog to prompt sign in, otherwise nav to topup page
        navigate("/topup");
        setOpenMenuDrawer(false);
        break;

      case "Wallet":
        navigate("/wallet");
        setOpenMenuDrawer(false);
        //if !user, open dialog to prompt sign in, otherwise nav to wallet page
        break;

      case "Logout":
        //if !user, Logout button should be disabled
        //sign out
        signOut(auth)
          .then(() => {
            console.log("signout successful");
            setOpenMenuDrawer(false);
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
        fontSize="large"
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
        <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={1}>
          <ToggleDarkMode />
        </Box>
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
