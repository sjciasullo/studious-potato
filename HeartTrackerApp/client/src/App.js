// components
import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

// helpers
import Auth from './modules/Auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

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

          {/* Home page has login and register form functionality */}
          <Route exact path='/' render={() =>
            !this.state.auth ? (
              <Home updateAuthState={this.state.updateAuthState} />
            ) : (
              <Redirect to="/dash" />
            )} 
          />

          {/* After register/login a user is directed to their dash */}
          <Route exact path='/dash' render={() => <Dashboard />} />
         
          
        </div>
      </Router>
    );
  }
}

export default App;
