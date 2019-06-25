import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js';
import Rank from './components/rank/Rank.js';
import FaceRecognition from './components/faceRecognition/FaceRecognition.js'
import 'tachyons';


const app = new Clarifai.App({
  apiKey: 'cd9bdc34b0e84d9894411f8978c1dc1c'
});

const particlesOptions = {
  particles:{
    number:{
      value:200,
      density:{
        enable: true,
        value_area: 800
      }
    },
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl:'',
      box: {},
    }
  }

  calculateFaceLocation= (response) =>{
    console.log('func call');
    const clarifaiFace= response.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementByID('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.leftCol * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.rightCol * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange= (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        this.displayFaceBox(this.calculateFaceLocation(response));
      },
      function(err) {
        console.log(err);
      }
    );
  }

  render(){
    return (
      <div className="App">
      <Particles className='particles' params={particlesOptions} />
      <Navigation />
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
