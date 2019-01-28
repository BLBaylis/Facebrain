import React from "react";
import Logo from "../logo/Logo";
import Stats from "../stats/Stats";
import FaceRecognition from "../faceRecognition/FaceRecognition";
import ImageLinkForm from "../imageLinkForm/ImageLinkForm";

const Home = ({ user, onSubmit, onInputChange, boxes, url }) => {
  return (
    <React.Fragment>
      <Logo />
      <Stats user={user} />
      <ImageLinkForm onSubmit={onSubmit} onInputChange={onInputChange} />
      <FaceRecognition boxes={boxes} url={url} />
    </React.Fragment>
  );
};

export default Home;
