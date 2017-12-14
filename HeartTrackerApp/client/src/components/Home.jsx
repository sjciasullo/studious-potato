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
      name: "",
      email: ""
    }

    this.toggleForm = this.toggleForm.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //will toggle form from register to login
  toggleForm(){
    this.state.page === 'login' ? this.setState({page: 'register'}) : this.setState({page: 'login'});
  }

  // ----- handle form functions -----
  submitLogin(e){
    e.preventDefault();
    console.log("login execute")
  }

  submitRegister(e){
    e.preventDefault();
    
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
    let Form = null;
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
        
      </div>
    )
  }
}

export default Home;