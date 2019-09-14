import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <ul id='nav-mobile' class='right hide-on-med-and-down'>
            <li>
              <a href='/login'>Login</a>
            </li>
            <li>
              <a href='/register'>Register</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
