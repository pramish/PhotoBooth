import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { useSelector, useDispatch } from "react-redux";
import { userService } from "../../services/user.service";
import SetLoggedInUser from "../../helpers/actions/login.action";
import auth from "../../helpers/auth/auth";
import PropTypes from "prop-types";
import { Form, Button, Header } from "semantic-ui-react";

/**
 * This component is responsbile for Poping up Sign in and Sign Up Model
 * Also this is the core component that handles authentication for the user.
 */
const Auth = ({ signUpBtnClick }) => {
  // Boolean flag state for signin button toggle
  const [sign_in, setSign_inClicked] = useState(true);
  // Boolean flag state for signup button toggle
  const [sign_up, setSign_upClicked] = useState(false);
  // Errors state for storing errors of this components
  const [errors, setErrors] = useState([]);
  // isAuthenticated state from global state
  const { isAuthenticated } = useSelector(state => state.auth);

  // dispatch hook from react-redux for dispatching actions
  const dispatch = useDispatch();

  // Handle toggle of sign in and sign up click
  const toggle = () => {
    setSign_inClicked(!sign_in);
    setSign_upClicked(!sign_up);
  };

  // Handle Sign in Click
  const signInClick = () => {
    // gets email and password from the form
    const email = document.getElementById("SignInEmail").value;
    const password = document.getElementById("SignInPass").value;
    const user = {
      email: email,
      password: password
    };

    // Login using the user object
    userService
      .login(user)
      .then(res => {
        // dispatch logged user from the local storage
        dispatch(
          SetLoggedInUser(jwt.decode(localStorage.getItem("userToken")))
        );
      })
      .catch(err => setErrors(err.response.data));
  };

  // Handle Sign up toggle
  const signUpClick = () => {
    //   Gets name, email, password and password confirm form form
    const name = document.getElementById("Full name").value;
    const email = document.getElementById("SignUpEmail").value;
    const password = document.getElementById("SignUpPass").value;
    const confirmPassword = document.getElementById("ConfirmPassword").value;
    const user = {
      name: name,
      email: email,
      password: password,
      password2: confirmPassword
    };
    // Registers the user
    userService
      .signup(user)
      .then(res => {})
      .catch(err => setErrors(err.response.data));
  };

  // Logs out the user
  const logout = () => {
    //   Set the auth
    auth(false);
    localStorage.setItem("userToken", null);
    dispatch(SetLoggedInUser({}));
  };

  //   If the sign up btn is clicked show sign up form
  if (signUpBtnClick) {
    //   If the user is authenticated
    if (!isAuthenticated) {
      if (sign_in === false) {
        return (
          <Form>
            <Form.Field>
              <input type="text" placeholder="Full Name" id="Full name" />
            </Form.Field>
            <Form.Field>
              {errors.email ? (
                <span style={{ color: "#ff0000" }}>{errors.email}</span>
              ) : (
                <div></div>
              )}
              <input type="text" placeholder="Email" id="SignUpEmail" />
            </Form.Field>
            <Form.Field>
              {errors.password ? (
                <span style={{ color: "#ff0000" }}>{errors.password}</span>
              ) : (
                <div></div>
              )}
              <input type="password" placeholder="Password" id="SignUpPass" />
            </Form.Field>
            <Form.Field>
              <input
                type="password"
                placeholder="Confirm Password"
                id="ConfirmPassword"
              />
            </Form.Field>
            <Button primary onClick={signUpClick}>
              Confirm
            </Button>
            <Header as="h4" onClick={toggle}>
              Already a Memeber? Click Here.
            </Header>
          </Form>
        );
      } else if (sign_in === true) {
        return (
          <Form>
            <Form.Field>
              {errors.email ? (
                <span style={{ color: "#ff0000" }}>{errors.email}</span>
              ) : (
                <div></div>
              )}
              <input type="text" placeholder="Email" id="SignInEmail" />
            </Form.Field>
            <Form.Field>
              {errors.password ? (
                <span style={{ color: "#ff0000" }}>{errors.password}</span>
              ) : (
                <div></div>
              )}
              <input type="password" placeholder="Password" id="SignInPass" />
            </Form.Field>
            <Button primary onClick={signInClick}>
              Confirm
            </Button>
            <Header as="h4" onClick={toggle}>
              Not a Member yet?
            </Header>
          </Form>
        );
      }
    } else {
    }
  } else {
    return <div></div>;
  }
};

Auth.propTypes = {
  signUpBtnClick: PropTypes.func
};

export default Auth;
