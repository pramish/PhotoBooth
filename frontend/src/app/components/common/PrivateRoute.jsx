import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * This private route component is inspired from Brad Traversy youtube course
 * Link to the tutorial: https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE
 */
const PrivateRoute = ({
  component: Component,
  auth,
  ...restOftheProperties
}) => (
  <Route
    {...restOftheProperties}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/home" />
      )
    }
  />
);

// Gets auth state from global state
const mapStateToProps = state => ({
  auth: state.auth
});

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PrivateRoute);
