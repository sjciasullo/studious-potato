import React from 'react';

const RegisterForm = function(props) {
  // prop list
  const toggleForm = props.toggleForm;
  const submitLogin = props.submitLogin;
  const handleChange = props.handleChange;

  return(
    <div>
      <h2>Register</h2>
      <p>Already have an account? <span className='changeform' onClick={toggleForm}>Login</span></p>
    </div>
  )
}

export default RegisterForm;