import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/login.js';
import ChatList from './components/selectChat.js';


import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
     <Router>
       <div>
       <Route path='/login' component={LoginPage} />
       <Route path='/select/:counselorID' component={ChatList} />
       </div>
       </Router>
    );
  }
}

export default App;
