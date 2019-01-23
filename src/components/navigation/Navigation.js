import React from "react";
import "../../App.css";

const Navigation = ({ onRouteChange, isSignedIn, signOut }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        position: "absolute",
        right: 0
      }}
    >
      {!isSignedIn && (
        <span
          onClick={() => onRouteChange("register")}
          className="fw600 f3 link dim black underline ma4 pointer"
        >
          Register
        </span>
      )}
      <span
        onClick={signOut}
        className="fw600 f3 link dim black underline ma4 pointer"
      >
        {isSignedIn ? "Sign Out" : "Sign In"}
      </span>
    </nav>
  );
};

export default Navigation;
