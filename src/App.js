import React, { Component } from 'react';
import Navigation from './components/Navigations/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import FaceRecongnition from './components/FaceRecongnition/FaceRecongnition'
import ParticlesBg from 'particles-bg'
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import 'tachyons'


const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = 'API-KEY';
  const USER_ID = 'Your-UserID';
  const APP_ID = 'Your-App-ID';
  // const MODEL_ID = 'face-detection';
  // const MODEL_VERSION_ID = 'dd9458324b4b45c2be1a7ba84d27cd04';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT,
      'Content-Type': 'application/json'
    },
    body: raw
  };
  return requestOptions
}

class App extends Component {

  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false

    }
  }


  calculateFaceLocation = (data) => {
    const clarfaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarfaiFace.left_col * width,
      topRow: clarfaiFace.top_row * height,
      rightCol: width - (clarfaiFace.right_col * width),
      bottomRow: height - (clarfaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch(`/v2/users/Your-UserID/apps/{Your-AppID}/models/celebrity-face-detection/outputs`, returnClarifaiRequestOptions(this.state.input))
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        console.log(result)
        this.displayFaceBox(this.calculateFaceLocation(result))
      })
      .catch(error => {
        console.error('error:', error);
      });

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route })

  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state
    return (
      <div className="App" >
        <ParticlesBg type="tadpole" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />

            <FaceRecongnition box={box} imageUrl={imageUrl} />
          </div>
          : (route === 'signin' ? < Signin onRouteChange={this.onRouteChange} /> : <Register onRouteChange={this.onRouteChange} />)


        }
      </div>
    );
  }
}

export default App;
