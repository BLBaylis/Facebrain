import React from "react";

const Navigation = ({ onRouteChange, isSignedIn, signOut }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        position: "absolute",
        top: 0,
        right: 0
      }}
    >
      {!isSignedIn && (
        <span
          onClick={() => onRouteChange("register")}
          className="fw600 f3 link dim black underline ma3 ma4-ns pointer"
        >
          Register
        </span>
      )}
      <span
        onClick={signOut}
        className="fw600 f3 link dim black underline ma3 ma4-ns pointer"
      >
        {isSignedIn ? "Sign Out" : "Sign In"}
      </span>
    </nav>
  );
};

export default Navigation;
