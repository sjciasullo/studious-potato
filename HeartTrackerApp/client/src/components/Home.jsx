import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Auth from '../modules/Auth';

class Home extends Component{
  constructor(props){
    // prop list:
    //   > this.props.updateAuthState() => updates the state of auth in App for login
    super(props);
    this.state={
      page: 'login',
      error: '',
      username: '',
      password: '',
      name: '',
      email: ''
    }

    this.toggleForm = this.toggleForm.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //will toggle form from register to login
  toggleForm(){
    let page = null;
    this.state.page === 'login' ? page = 'register' : page = 'login';
    this.setState({
      error: '', // take off error message if there was one
      page: page,
    })
  }

  // ----- handle form functions -----
  submitLogin(e){
    e.preventDefault();

    this.setState({
      error: '',
    }) // clear error message

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    }).then(res => res.json())
    .then(json => {
      if (json.token) {
        // if there is a token on the response, add it to session storage
        Auth.authenticateToken(json.token);

        // clear username and password from state
        this.setState({
          username: '',
          password: '',
        })

         // updates the state of auth in App
         this.props.updateAuthState(json.username);
      } else {
        // if there is no token, this means failed login so display an error
        this.setState({
          error: "No match found between username and password",
          password: '',
        })
      }
    }).catch( err => {
      console.log(err);
    })
  }

  submitRegister(e){
    e.preventDefault();

    this.setState({
      error: '',
    }) // clear error message
    
    // similar to submit login, but needs a user object to be sent in post request
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }
      })
    }).then(res => res.json())
    .then(json => {
      if (json.token) {
        Auth.authenticateToken(json.token);

        // clear user data from state
        this.setState({
          username: '',
          password: '',
          name: '',
          email: '',
        })

        this.props.updateAuthState(json.username);
      } else {
        // if there is no token, this means register failed so display an error
        this.setState({
          error: "Invalid registration. Requires unique username and a valid password!",
          password: '',
          username: '',
        })
      }
    }).catch( err => {
      console.log(err);
    })
  }

  // controlled component flow
  handleChange(e){
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value,
    })
  }
  // ----- end handle form functions -----


  render(){
    let Form = null; // Form for Naming Component Convention (capitalized)
    if(this.state.page === 'login') {
      Form = <LoginForm 
                toggleForm={this.toggleForm} 
                handleChange={this.handleChange}
                submitLogin={this.submitLogin}
                username={this.state.username}
                password={this.state.password}
              />;
    } else if(this.state.page === 'register') {
      Form = <RegisterForm 
                toggleForm={this.toggleForm} 
                handleChange={this.handleChange}
                submitRegister={this.submitRegister}
                username={this.state.username}
                password={this.state.password}
                name={this.state.name}
                email={this.state.email}
              />;
    } else {
      Form = <p>An error has occurred!</p>
    }

    return(
      <div className='home'>
        <h1 className='title'>Heart Tracker</h1>
        {Form}
        {this.state.error !== '' && <p className="error">{this.state.error}</p>}
      </div>
    )
  }
}

export default Home;