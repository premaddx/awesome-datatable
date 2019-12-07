import React, { Component } from 'react';
import HomePage from './components/HomePage';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div id="modal-root"></div>
        <div className="App-header">
          <h2>Awesome Datatable</h2>
        </div>
        <HomePage></HomePage>
      </div>
    );
  }
}

export default App;
