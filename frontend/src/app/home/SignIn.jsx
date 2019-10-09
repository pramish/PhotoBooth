import React, { useState } from "react";
import { userService } from "../services/user.service";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import SetLoggedInUser from "../helpers/actions/login.action";
import auth from "../helpers/auth/auth"

const SignIn = ({ profileClicked, history }) => {
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
      history.push("/");
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
      history.push("/");
    });
  };

  const logout = () =>{
    auth(false);
    localStorage.setItem("userToken", null);
    dispatch(SetLoggedInUser({}));
  }

  // const signUpClick = () => {};
  if (profileClicked) {
    if (!isAuthenticated) {
      if (sign_in === false) {
        return (
          <div>
            <input type="text" placeholder="Full Name" id="Full name" />
            <input type="text" placeholder="Email" id="SignUpEmail" />
            <input type="password" placeholder="Password" id="SignUpPass" />
            <input
              type="password"
              placeholder="Confirm Password"
              id="ConfirmPassword"
            />
            <button onClick={signUpClick}>Confirm</button>
            <button onClick={toggle}>SignUp</button>
          </div>
        );
      } else if (sign_in === true) {
        return (
          <div>
            <input type="text" placeholder="Email" id="SignInEmail" />
            <input type="password" placeholder="Password" id="SignInPass" />
            <button onClick={signInClick}>Confirm</button>
            <button onClick={toggle}>SignIn</button>
          </div>
        );
      }
    } else {
      return <button onClick={logout}>LogOut</button>;
    }
  } else {
    return <div></div>;
  }
};
export default SignIn;
