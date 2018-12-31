import React from "react";
import "./FaceBox.css";

const FaceBox = ({ boxes }) => {
  return (
    <React.Fragment>
      {boxes.map((box, index) => {
        const { top, left, right, bottom } = box;
        return (
          <div
            className="bounding-box"
            key={index}
            style={{ top, left, right, bottom }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default FaceBox;
