import React from "react";
import "../../App.css";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="fw600 white f3">{`Hi, ${name}! You've entered ${entries} links!`}</div>
    </div>
  );
};

export default Rank;
