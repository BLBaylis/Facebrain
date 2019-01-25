import React, { Component } from "react";
import Clarifai from "clarifai";
import ParticlesWrapper from "../particlesWrapper/ParticlesWrapper";
import Navigation from "../../components/navigation/Navigation";
import Home from "../../components/home/Home";
import SignIn from "../signIn/SignIn";
import Register from "../register/Register";
import params from "../../particlesConfig";

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
        })
        .catch(console.error);
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
    const { id, username, image_count : imageCount, face_count : faceCount } = user;
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
    let className = "App courier flex flex-column";
    if (!isSignedIn) {className += ' justify-center'}
    return (
      <div className= {className}>
        <ParticlesWrapper params={params} />
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
        {route === "home" &&
          <Home
            user={user}
            onSubmit={this.onSubmit}
            onInputChange={this.onInputChange}
            boxes={boxes}
            url={url}
          />
        }
      </div>
    );
  }
}

export default App;
