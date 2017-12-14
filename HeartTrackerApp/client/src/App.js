// components
import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';

// helpers
import Auth from './modules/Auth';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//style
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state= {
      auth: Auth.isUserAuthenticated(), // check if there is a token in storage
      // do i need a username or something? we use 
    }

    this.updateAuthState = this.updateAuthState.bind(this);
  }

  updateAuthState(){
    this.setState({
      auth: Auth.isUserAuthenticated()
    })
  }

  render() {
    return (
      <Router >
        <div className="App">
          {this.state.auth && <Header />}
          <Route exact path='/' render={() => <Home updateAuthState={this.updateAuthState} />} />
        </div>
      </Router>
    );
  }
}

export default App;
