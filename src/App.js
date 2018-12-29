import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import './App.css';
import params from './particlesConfig';

class App extends Component {
  render() {
    return (
      <div className="App courier">
        <Particles className = "particles" params={params} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm/>
        {/*<FaceRecognition/>*/}
      </div>
    );
  }
}

export default App;
