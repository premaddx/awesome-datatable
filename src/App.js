import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './components/HomePage';
import UserInfo from './components/UserInfo';
import './App.css';

class App extends Component {

  render () {
    return (
      <Router>
        <div className="App">
          <div id="modal-root"></div>
          <div className="App-header">
            <h2>Awesome Datatable</h2>
          </div>
          <Switch>
            <Route path='/users/:userid'>
              <UserInfo />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
