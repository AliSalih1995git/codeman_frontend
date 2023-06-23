import "react-circular-progressbar/dist/styles.css";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const RoundedProgressBar = ({ percentage }) => {
  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({ pathColor: "#BF40BF" })}
    />
  );
};

export default RoundedProgressBar;
