import React from 'react';

const RegisterForm = function(props) {
  // prop list
  const toggleForm = props.toggleForm;
  const submitLogin = props.submitLogin;
  const handleChange = props.handleChange;
  const username = props.username;
  const password = props.password;
  const name = props.name;
  const email = props.email;

  return(
    <div>
      <h2>Register new user</h2>
      <p>Already have an account? <span className='changeform' onClick={toggleForm}>Login</span></p>
    </div>
  )
}

export default RegisterForm;