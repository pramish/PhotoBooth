import React from "react";
import { useSelector } from "react-redux";
import RegistrationModal from "./RegistrationModal";
import { Menu, Segment, Button } from "semantic-ui-react";
import AddImageModel from "./AddImageModel";
import { NavContainer } from "./common.style";

/**
 * This component renders main Navbar of the application
 */
const Navbar = props => {
  // get isAuth boolean flag from global state
  const { isAuthenticated } = useSelector(state => state.auth);

  // Invoke the hidden button trending using this function
  const handleTrending = () => {
    document.getElementById("trending").click();
  };
  // Invoke the hidden button sort by popularity using this function
  const sortByPopularity = () => {
    document.getElementById("sort").click();
  };

  return (
    <NavContainer>
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item name="Photobooth" />
          <Menu.Item position="right">
            <Menu.Item>
              <Button onClick={handleTrending}>Trending Posts</Button>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={sortByPopularity}>Popular Posts</Button>
            </Menu.Item>
            {isAuthenticated ? (
              <AddImageModel />
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <RegistrationModal />
          </Menu.Item>
        </Menu>
      </Segment>
    </NavContainer>
  );
};

export default Navbar;
