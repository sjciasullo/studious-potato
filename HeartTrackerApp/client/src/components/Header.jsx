import React from 'react';

const Header = function(props){
  const logout = props.logout; // logout method
  return(
    <header>
      <div id='logo'><a href='/'><i className="fa fa-heartbeat fa-3x"></i></a></div>
      
      <div className='user-nav'>
        <div>
          <a href='/dashboard'>username</a>
        </div>
        <button onClick={logout}>
          LOGOUT
        </button>
      </div>
    </header>
  )
}

export default Header;