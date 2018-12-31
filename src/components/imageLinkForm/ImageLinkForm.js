import React from "react";
import "../../index.css";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onSubmit, onInputChange }) => {
  return (
    <div>
      <p className="f3 fw600">
        {"Link a picture and FaceBrain will find any faces in it!"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv3 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
