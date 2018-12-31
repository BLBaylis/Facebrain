import React from "react";
import FaceBox from "../faceBox/FaceBox";

const FaceRecognition = ({ url, boxes }) => {
  return (
    <div className="center">
      <div className="center mt2" style={{ position: "relative" }}>
        <img src={url} alt={"user-submitted"} height="200px" width="auto" />
        <FaceBox boxes={boxes} />
      </div>
    </div>
  );
};

export default FaceRecognition;
