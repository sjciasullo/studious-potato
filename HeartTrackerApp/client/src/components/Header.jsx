import React from 'react';

const Header = function(props){
  const logout = props.logout; // logout method
  return(
    <header>
      <div className='logo'>logo</div>
      <div className='user-nav'>
        <div>
          username(link)
        </div>
        <a href='/' onClick={logout}>
          logout
        </a>
      </div>
    </header>
  )
}

export default Header;