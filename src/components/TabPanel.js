import { Box } from "@mui/material";
import React from "react";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return value === index && <Box>{children}</Box>;
};

export default TabPanel;
