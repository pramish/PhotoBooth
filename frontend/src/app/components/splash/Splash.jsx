import React, { useEffect } from "react";
import styled from "styled-components";
import spinner from "../../../assets/splash.gif";
import { SplashContainer } from "./splash.styles";

/**
 * Renders initial Loading screen for the application for 3secs.
 */
const Splash = ({ history }) => {
  useEffect(() => {
    setTimeout(
      () => {
        // Route to home page
        history.push("/home");
      },
      3000,
      false
    );
  }, []);

  return (
    <SplashContainer>
      <img src={spinner} />
      <h1>Loading...</h1>
    </SplashContainer>
  );
};
export default Splash;
