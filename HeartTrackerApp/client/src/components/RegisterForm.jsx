import React from 'react';

const RegisterForm = function(props) {
  // prop list
  const toggleForm = props.toggleForm;
  const submitRegister = props.submitRegister;
  const handleChange = props.handleChange;
  const username = props.username;
  const password = props.password;
  const name = props.name;
  const email = props.email;

  return(
    <div>
      <h2>Register new user</h2>
      <form className='login-form' onSubmit={submitRegister}>
        <input name="name" type='text' onChange={handleChange} 
            placeholder="Name" value={name}/>
            <br />
        <input name="username" type='text' onChange={handleChange} 
          placeholder="Username" value={username}/>
          <br />
        <input name="password" type='password' onChange={handleChange} 
          placeholder="Password" value={password}/>
          <br />
        <input name="email" type='text' onChange={handleChange} 
          placeholder="Email" value={email}/>
          <br />
        <input className='login-submit' type='submit' value="Register"/>
      </form>
      <p>Already have an account? <span className='changeform' onClick={toggleForm}>Login</span></p>
    </div>
  )
}

export default RegisterForm;