import { Avatar, Box, Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import MenuDrawer from "../drawers/MenuDrawer";

const AppBar = (props) => {
  const userContext = useUserContext();
  const navigate = useNavigate();

  return (
    <Box
      width={"95%"}
      height={"15vh"}
      p={1}
      display={"flex"}
      mr={"auto"}
      ml={"auto"}
    >
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
            <Box>
              <Link
                component="button"
                variant="subtitle1"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login/Signup
              </Link>
            </Box>
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
