import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js';
import Rank from './components/rank/Rank.js';
import 'tachyons';
import Particles from 'react-particles-js';

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

function App() {
  return (
    <div className="App">
    <Particles className='particles' params={particlesOptions} />
    <Navigation />
    <Logo/>
    <Rank/>
    <ImageLinkForm />
    </div>
  );
}

export default App;
