import React from "react";
import FaceBox from "../faceBox/FaceBox";

const FaceRecognition = ({ url, boxes }) => {
  return (
    <div className="center">
      <div className="center mt2 flex" style={{position: "relative" }}>
        {url && <img src={url} alt={"user-submitted"} width="100%" style = {{alignSelf : "center"}}/>}
        <FaceBox boxes={boxes} />
      </div>
    </div>
  );
};

export default FaceRecognition;
