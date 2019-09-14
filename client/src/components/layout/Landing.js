import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadImage } from '../../actions/authActions';
import classnames from 'classnames';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      errors: {}
    };
  }
  onSubmit = e => {
    e.preventDefault();
    const image = {
      image: this.state.image
    };
    this.props.uploadImage(image, this.props.history);
  };

  render() {
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div className='row'>
          <div className='landing-copy col s12 center-align'>
            {/* <b>Hey there,</b> {user.name.split(" ")[0]} */}
            <p className='flow-text grey-text text-darken-1'>
              <span style={{ fontFamily: 'monospace' }}>Upload</span> a Image 📸
            </p>

            <form onSubmit={this.onSubmit}>
              <div className='input-field col s12'>
                <input id='file' type='file' />
              </div>

              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem'
                }}
                type='submit'
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { uploadImage }
)(withRouter(Landing));
