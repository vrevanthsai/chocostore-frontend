import React, { useEffect, useState } from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThemeButton = () => {
  const [theme, setTheme] = useState("dark-theme");
  const themeIcon = (
    <FontAwesomeIcon icon={theme === "dark-theme" ? faMoon : faSun} />
  );

  const handleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light-theme" ? "dark-theme" : "light-theme"
    );
    localStorage.setItem(
      "theme",
      theme === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  useEffect(() => {
    let element = document.getElementById("theme-color");
    if(theme === "dark-theme"){
      element.className = 'btn btn-primary dark-button'
    }else{
      element.className = 'btn btn-primary light-button'
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = theme;
    }
  }, [theme]);

  return (
    <button
      className="btn btn-primary theme-button"
      id="theme-color"
      onClick={() => {
        handleTheme();
      }}
    >
      {themeIcon}
    </button>
  );
};

export default ThemeButton;
