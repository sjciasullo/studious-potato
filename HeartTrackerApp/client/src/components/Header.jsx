import React from 'react';

const Header = function(props){
  return(
    <header>
      <div className='logo'>logo</div>
      <div className='user-nav'>
        <div>
          username(link)
        </div>
        <div>
          logout
        </div>
      </div>
    </header>
  )
}

export default Header;