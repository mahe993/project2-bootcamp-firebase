import { Drawer } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleDarkMode from "../components/ToggleDarkMode";

const MenuDrawer = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <MenuIcon
        onClick={() => {
          setOpenDrawer(true);
        }}
      />
      <Drawer
        variant="temporary"
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <ToggleDarkMode />
      </Drawer>
    </>
  );
};
export default MenuDrawer;
