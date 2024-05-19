import React, { useState, useEffect } from "react";
import "./navbar.scss";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="item">
          <AccessAlarmIcon className="icon" />
          <span class="time">{currentTime.toLocaleTimeString()}</span>
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

