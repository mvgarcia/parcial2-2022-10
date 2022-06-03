import React, { useContext } from "react";
import "../App.scss";
import { ThemeContext } from "./ThemeProvider";
import './Switch.scss';

export default function SwitchButton() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const onClick = () => {
    console.log(theme);
    if (darkMode) {
      theme.dispatch({ type: "LIGHTMODE" });
    } else {
      theme.dispatch({ type: "DARKMODE" });
    }
  };

  /* return (
    <button className={`btn ${darkMode ? "btn-dark" : "btn-light"}`} onClick={onClick}>
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  ); */

  return (
    <>
      <input
        //checked={isOn}
        onChange={onClick}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  ); 

}