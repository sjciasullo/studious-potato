import React from 'react';

const LoginForm = function(props) {
  // prop list
  const toggleForm = props.toggleForm;
  const submitLogin = props.submitLogin;
  const handleChange = props.handleChange;
  const username = props.username;
  const password = props.password;

  return(
    <div>
      <h2>Please login</h2>
      <form onSubmit={submitLogin}>
        <input name="username" type='text' onChange={handleChange} 
          placeholder="Username" value={username}/>
        <input name="password" type='password' onChange={handleChange} 
          placeholder="Password" value={password}/>
        <input type='submit' value="Log In"/>
      </form>
      <p>Don't have an account? <span className='changeform' onClick={toggleForm}>Register</span></p>
    </div>
  )
}

export default LoginForm;