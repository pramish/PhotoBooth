import React, { useState } from "react";
import { Button, Header, Modal, Form } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import SetLoggedInUser from "../../helpers/actions/login.action";
import auth from "../../helpers/auth/auth";
import Auth from "../auth/Auth";

/**
 * The components primariliy handles the model for Authentication which compries
 * both sign in and sign up functionality
 */
const RegistrationModal = () => {
  const [signUpClick, setSignUpClick] = useState();
  const dispatch = useDispatch();
  // Logs out the user
  const logout = () => {
    // Set the auth to false and  deletes the localStorage of the user
    auth(false);
    localStorage.setItem("userToken", null);
    // set current user to empty object
    dispatch(SetLoggedInUser({}));
  };

  // get isAuthenticated flag from global state
  const { isAuthenticated } = useSelector(state => state.auth);

  // If the user is authenticated return the corresponding UI
  return isAuthenticated ? (
    <Button primary onClick={logout}>
      Logout
    </Button>
  ) : (
    <Modal
      trigger={
        <Button primary onClick={() => setSignUpClick(true)}>
          Member
        </Button>
      }
    >
      <Modal.Header>Be a Photobooth Memeber</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Auth signUpBtnClick={signUpClick} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

RegistrationModal.propTypes = {};

export default RegistrationModal;
