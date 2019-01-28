import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import brain from "./brain.png";

const Logo = () => {
  return (
    <div className="dib w-100">
      <Tilt className="tilt br2 shadow-2 ma3 ma4-ns" options={{ max: 50 }}>
        <div className="tilt-inner pa4">
          <img style={{ height: "100%" }} src={brain} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
