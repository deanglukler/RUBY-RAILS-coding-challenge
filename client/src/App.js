import React, { Component } from 'react';
import './App.css';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div className="flex w-screen h-screen justify-center items-center bg-grey-lighter">
        <p className="absolute text-5xl pin-b pin-r p-5 text-grey-dark">DoubleTime</p>
        <Login />
      </div>
    );
  }
}

export default App;
