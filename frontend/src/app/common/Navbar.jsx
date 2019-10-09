import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import boy from "../../assets/default-girl.png";
import SignIn from "../home/SignIn";
import SetLoggedInUser from "../helpers/actions/login.action";
import jwt from "jsonwebtoken";
import RegistrationModal from "./RegistrationModal";
import { Menu, Segment } from "semantic-ui-react";
import AddImageModel from "./AddImageModel";

const Navbar = props => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Container>
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item name="Photobooth" />
          <Menu.Item position="right">
            {isAuthenticated ? <AddImageModel /> : ""}
            <RegistrationModal />
          </Menu.Item>
        </Menu>
      </Segment>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  margin-bottom: 1rem;
  position: fixed;
  max-width: 100vw;
  min-width: 100vw;
  width: 100%;
  top: 0;
  .ui {
    &.inverted {
      &.menu {
        border-radius: 0px !important;
      }
    }
  }
`;
