import React, { useState } from "react";
import { Button, Header, Modal, Form } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import { userService, signOut } from "../services/user.service";
import SetLoggedInUser from "../helpers/actions/login.action";
import auth from "../helpers/auth/auth";

const SignIn = ({ signUpBtnClick }) => {
  const [sign_in, setSign_inClicked] = useState(true);
  const [sign_up, setSign_upClicked] = useState(false);
  const [errors, setErrors] = useState("");
  const { isAuthenticated } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const toggle = () => {
    setSign_inClicked(!sign_in);
    setSign_upClicked(!sign_up);
  };

  const signInClick = () => {
    const email = document.getElementById("SignInEmail").value;
    const password = document.getElementById("SignInPass").value;

    const user = {
      email: email,
      password: password
    };

    userService.login(user).then(res => {
      //   history.push("/");
      console.log(user);
      dispatch(SetLoggedInUser(jwt.decode(localStorage.getItem("userToken"))));
    });
  };

  const signUpClick = () => {
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
    userService.signup(user).then(res => {
      //   history.push("/");
    });
  };

  const logout = () => {
    auth(false);
    localStorage.setItem("userToken", null);
    dispatch(SetLoggedInUser({}));
  };

  // const signUpClick = () => {};
  if (signUpBtnClick) {
    if (!isAuthenticated) {
      if (sign_in === false) {
        return (
          <Form>
            <Form.Field>
              <input type="text" placeholder="Full Name" id="Full name" />
            </Form.Field>
            <Form.Field>
              <input type="text" placeholder="Email" id="SignUpEmail" />
            </Form.Field>
            <Form.Field>
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
              <input type="text" placeholder="Email" id="SignInEmail" />
            </Form.Field>
            <Form.Field>
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
// TODO
//  isAuth : <img className="ui avatar image" src={boy} /> and Sign Up
const RegistrationModal = () => {
  const [signUpClick, setSignUpClick] = useState();
  const dispatch = useDispatch();
  const logout = () => {
    auth(false);
    localStorage.setItem("userToken", null);
    dispatch(SetLoggedInUser({}));
  };

  const { isAuthenticated } = useSelector(state => state.auth);

  return isAuthenticated ? (
    <Button primary onClick={logout}>
      Logout
    </Button>
  ) : (
    <Modal
      trigger={
        <Button primary onClick={() => setSignUpClick(true)}>
          Sign Up
        </Button>
      }
    >
      <Modal.Header>Be a Photobooth Memeber</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <SignIn signUpBtnClick={signUpClick} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default RegistrationModal;
