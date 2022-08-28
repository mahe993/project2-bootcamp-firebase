import { Avatar, Box } from "@mui/material";
import React from "react";
import { useUserContext } from "../contexts/UserContext";
import MenuDrawer from "../drawers/MenuDrawer";

const AppBar = () => {
  const userContext = useUserContext();
  return (
    <Box width={"100vw"} height={"10vh"} p={1} display={"flex"}>
      <Box flexGrow={1} display={"flex"}>
        <Box display={"flex"} alignItems={"center"}>
          <Avatar src="/broken-image.jpg" sx={{ width: 50, height: 50 }} />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          p={0.5}
        >
          {userContext.email ? (
            <>
              <Box>
                {userContext.username
                  ? userContext.username
                  : userContext.email}
              </Box>
              <Box>SGD$ {userContext.accountBalance}</Box>
            </>
          ) : (
            <Box>Login</Box>
          )}
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <MenuDrawer />
      </Box>
    </Box>
  );
};

export default AppBar;
