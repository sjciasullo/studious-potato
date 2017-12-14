import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
    }
  }

  render(){
    return(
      <div className='home'>
        <h1 className='title'>Heart Tracker</h1>
      </div>
    )
  }
}

export default Home;