import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadImage } from '../../actions/authActions';
import classnames from 'classnames';

class Dashboard extends Component {
  render() {
    // const { errors } = this.state;

    return (
      <div>
        <h1>Hello I am a dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
