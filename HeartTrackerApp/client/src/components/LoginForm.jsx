import React from 'react';

const LoginForm = function(props) {
  // prop list
  const toggleForm = props.toggleForm;
  const submitLogin = props.submitLogin;
  const handleChange = props.handleChange;

  return(
    <div>
      <h2>Login</h2>
      <p>Don't have an account? <span className='changeform' onClick={toggleForm}>Register</span></p>
    </div>
  )
}

export default LoginForm;