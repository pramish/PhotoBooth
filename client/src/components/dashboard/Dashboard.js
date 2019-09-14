import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadImage } from '../../actions/authActions';
import classnames from 'classnames';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: ''
    };
  }

  render() {
    return (
      <div>
        <h1>Hello I am a dashboard</h1>
        {/* 
          I have to add the logic i.e. if the user logged in then login button will change to logout and register button will
          change into edit profile
        */}
      </div>
    );
  }
}

export default Dashboard;
