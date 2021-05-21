import React, { Component } from 'react';
import './App.css';
//Importing Components
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';




const initialState = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user:{
          id: '',
          name: '',
          entries: 0,
          joined: ''
        }
  }
  
class App extends Component{ 
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width -(clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch('https://guarded-woodland-04891.herokuapp.com/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://guarded-woodland-04891.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries:count}))
          }).catch(console.log)
        }
        this.displayFaceBox( this.calculateFaceLocation(response)) 
      })
      .catch(err => console.log("Error:",err));
  } 

  onRouteChange = (endpoint) => {
    this.setState({route: endpoint});
    if(endpoint ==='signout'){
      this.setState(initialState);
    } else if (endpoint ==='home'){
      this.setState({isSignedIn: true});
    }
  }

  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
            ? <div>
                <Logo />
                <Rank 
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />
                <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
                <FaceRecognition box={box} imageUrl = {imageUrl}/>
              </div>
            : (
                route === 'signin'
                ?   <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
                :   <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 

             )
        }
      </div>
  )};
}

export default App;


