import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bmi from './components/Bmi';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Bmi />
      </div>
    );
  }
}

export default App;
