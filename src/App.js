import React, { Component } from "react";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";
import Rank from "./components/rank/Rank";
import "./App.css";
import params from "./particlesConfig";

const app = new Clarifai.App({
  apiKey: "94cc0409d4ab41698e2988f413cc60ef"
});

class App extends Component {
  state = {
    input: "",
    url: "",
    boxes: [],
    route : "signIn",
    isSignedIn : false,
    user : {
      name: "unknown user",
      email: "",
      entries: "unknown",
      joined: "unknown"
    }
  };

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
        this.setState({ boxes });
      });
  };

  loadUser = user => {
    const { password, id, ...rest } = user;
    this.setState({ user : rest });
  };

  signOut = () => {
    this.setState({
      user : {
        name: "unknown user",
        email: "",
        entries: "unknown",
        joined: "unknown"
      }
    });
    this.onRouteChange("signIn");
  }

  onRouteChange = (newRoute) => {
    if (newRoute === "home") {
      this.setState({ isSignedIn : true })
    } else {
      this.setState({ isSignedIn : false })
    }
    this.setState({route : newRoute});
  }

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
    const { name, entries} = user;
    return (
      <div className="App courier">
        <Particles className="particles" params={params} />
        <Navigation isSignedIn = {isSignedIn} signOut = {this.signOut} onRouteChange = {this.onRouteChange}/>
        {route === "signIn" && <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />}
        {route === "register" && <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>}
        {route === "home" &&
          <React.Fragment>
            <Logo />
            <Rank name = {name} entries = {entries} />
            <ImageLinkForm
              onSubmit={this.onSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition boxes={boxes} url={url} />
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
