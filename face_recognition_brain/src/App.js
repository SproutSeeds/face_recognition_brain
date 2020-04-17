import React, { Component } from "react";
import Clarifai from "clarifai";
import Particles from "react-particles-js";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import "./App.css";
import "tachyons";

const app = new Clarifai.App({
  apiKey: "1bcf1a767322480c9a22197063375b4f",
});

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    size: {
      value: 1,
    },
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = (event) => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((error) => console.log(error));
  };
  calculateFaceLocation = (data) => {
    const face_box_dimensions =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const image_width = Number(image.width);
    const image_height = Number(image.height);
    console.log("face_box_dimensions:", face_box_dimensions);

    return {
      top: face_box_dimensions.top_row * image_height,
      right: image_width - face_box_dimensions.right_col * image_width,
      bottom: image_height - face_box_dimensions.bottom_row * image_height,
      left: face_box_dimensions.left_col * image_width,
    };
  };
  displayFaceBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  };
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onButtonSubmit={this.onButtonSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
