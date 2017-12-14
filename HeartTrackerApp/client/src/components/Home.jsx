import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      page: "login",
      username: "",
      password: "",
    }

    this.toggleForm = this.toggleForm.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitLogin = this.submitRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //will toggle form from register to login
  toggleForm(){
    this.state.page === 'login' ? this.setState({page: 'register'}) : this.setState({page: 'login'});
  }

  // ----- handle form functions -----
  submitLogin(){

  }

  submitRegister(){

  }

  handleChange(){

  }
  // ----- end handle form functions -----


  render(){
    let Form = null;
    if(this.state.page === 'login') {
      Form = <LoginForm 
              toggleForm={this.toggleForm} 
              handleChange={this.handleChange}
              submitLogin={this.submitLogin}
              />;
    } else if(this.state.page === 'register') {
      Form = <RegisterForm 
              toggleForm={this.toggleForm} 
              handleChange={this.handleChange}
              submitRegister={this.submitRegister}
              />;
    } else {
      Form = <p>An error has occurred!</p>
    }

    return(
      <div className='home'>
        <h1 className='title'>Heart Tracker</h1>
        {Form}
      </div>
    )
  }
}

export default Home;