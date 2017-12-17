// components
import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import UserController from './components/UserController';

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
    this.logout = this.logout.bind(this);
  }

  updateAuthState(){
    this.setState({
      auth: Auth.isUserAuthenticated()
    })
  }

  logout(){
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then ( res => {
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
        //maybe reset username if we use it
      })
    }).catch( err => {
      console.log(err);
    })
  }

  render() {
    return (
      <Router >
        <div className="App">
          {this.state.auth && <Header logout={this.logout} />}

          {/* Home page has login and register form functionality */}
          <Route exact path='/' render={() =>
            !this.state.auth ? (
              <Home updateAuthState={this.updateAuthState} />
            ) : (
              <Redirect to="/dashboard" />
            )} 
          />

          {/* After register/login a user is directed to their dashboard */}
          <Route exact path='/dashboard' render={() => 
            this.state.auth ? (
              <UserController page='dashboard' />
            ) : (
              <Redirect to='/' />
            )} 
          />
          
          {/* has to go above experiment/:id, this is create an experiment route*/}
          <Route exact path='/create-experiment' render={() => 
            this.state.auth ? (
              <UserController page='experimentCreate' />
            ) : (
              <Redirect to='/' />
            )} 
          />

          {/* Route to a single experiment */}
          <Route exact path='/experiment/:id' render={(props) => 
            this.state.auth ? (
              <UserController page='experimentSingle' experimentId={props.match.params.id}/>
            ) : (
              <Redirect to='/' />
            )} 
          />

          
         
          
        </div>
      </Router>
    );
  }
}

export default App;
