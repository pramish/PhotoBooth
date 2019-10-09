import React, { useEffect } from "react";
import styled from "styled-components";
import spinner from "../../assets/splash.gif";


const Splash = ({ history }) => {
  useEffect(() => {
    setTimeout(
      () => {
        history.push("/home");
      },
      3000,
      false
    );
  }, []);
 

  return (
    <Container>
      <img src={spinner} />
      <h1>Loading...</h1>
    </Container>
  );
};
export default Splash;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  img {
    border: none !important;
    display: block;
    height: auto;
    max-width: 100%;
  }
  h1 {
    margin-top: 0;
  }
`;
