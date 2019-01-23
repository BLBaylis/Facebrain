import React, { Component } from "react";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";
import Stats from "./components/stats/Stats";
import "./App.css";
import params from "./particlesConfig";

const app = new Clarifai.App({
  apiKey: "94cc0409d4ab41698e2988f413cc60ef"
});

const initialState = {
  input: "",
  url: "",
  boxes: [],
  route: "signIn",
  isSignedIn: false,
  user: {
    id: undefined,
    username: "unknown user",
    imageCount: 0,
    faceCount: 0
  }
};

class App extends Component {
  state = initialState;

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onSubmit = event => {
    this.setState({ url: this.state.input, input: "" });
    app.models
      .initModel({ id: Clarifai.FACE_DETECT_MODEL })
      .then(model => {
        return model.predict(this.state.url);
      })
      .then(response => {
        const regions = response["outputs"][0]["data"]["regions"];
        return regions.map(region =>
          this.generateBoxInfo(region["region_info"]["bounding_box"])
        );
      })
      .then(boxes => {
        fetch("http://localhost:4000/image", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id,
            faceCountIncre: boxes.length
          })
        });
        this.setState({
          boxes,
          user: {
            ...this.state.user,
            imageCount: this.state.user.imageCount + 1,
            faceCount: this.state.user.faceCount + boxes.length
          }
        });
      });
  };

  loadUser = user => {
    const { id, username, imageCount, faceCount } = user;
    this.setState({ user: { id, username, imageCount, faceCount } });
  };

  signOut = () => {
    this.setState(initialState);
    this.onRouteChange("signIn");
  };

  onRouteChange = newRoute => {
    if (newRoute === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState(initialState);
    }
    this.setState({ route: newRoute });
  };

  generateBoxInfo = rawBoxData => {
    const boxObj = {};
    const boxPercentageValues = Object.values(rawBoxData).map(
      boxDecimal => 100 * boxDecimal
    );
    const boxCssPercentages = boxPercentageValues.map(
      (oldPercent, index, currArr) => {
        if (index > 1) {
          return `${100 - oldPercent}%`;
        }
        return `${oldPercent}%`;
      }
    );
    const boxPropNames = Object.keys(rawBoxData)
      .map(propName => propName.replace("_row", ""))
      .map(propName => propName.replace("_col", ""));
    for (let i = 0; i < boxPropNames.length; i++) {
      boxObj[boxPropNames[i]] = boxCssPercentages[i];
    }
    return boxObj;
  };

  render() {
    const { url, boxes, route, isSignedIn, user } = this.state;
    //const { id, username, imageCount, faceCount} = user;
    console.log(user);
    return (
      <div className="App courier">
        <Particles className="particles" params={params} />
        <Navigation
          isSignedIn={isSignedIn}
          signOut={this.signOut}
          onRouteChange={this.onRouteChange}
        />
        {route === "signIn" && (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
        {route === "register" && (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
        {route === "home" && (
          <React.Fragment>
            <Logo />
            <Stats user={user} />
            <ImageLinkForm
              onSubmit={this.onSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition boxes={boxes} url={url} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
