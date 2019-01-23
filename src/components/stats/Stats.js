import React from "react";
import "../../App.css";

const Stats = ({ user }) => {
  const { username, imageCount, faceCount } = user;
  return (
    <div>
      <div className="fw600 white f3">{`Hi ${username}! You've entered ${imageCount} links from which ${faceCount} faces have been detected!`}</div>
    </div>
  );
};

export default Stats;
