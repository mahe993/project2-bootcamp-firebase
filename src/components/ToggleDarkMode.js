import React from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const ToggleDarkMode = () => {
  const rootCSS = document.documentElement;
  const toggleDarkMode = () => {
    if (
      getComputedStyle(rootCSS).getPropertyValue("--main-font-color") ===
      "black"
    ) {
      rootCSS.style.setProperty("--main-bg-color", "#2b2b2b");
      rootCSS.style.setProperty("--main-font-color", "white");
    } else {
      rootCSS.style.setProperty("--main-bg-color", "#ededed");
      rootCSS.style.setProperty("--main-font-color", "black");
    }
  };
  return <LightbulbIcon onClick={toggleDarkMode} />;
};

export default ToggleDarkMode;
