import styled from "styled-components";
import { Form } from "semantic-ui-react";

// Styling for FormContainer
export const FormContainer = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .field {
    margin-top: 1rem;
  }
  form {
    display: flex;
    justify-content: space-evenly !important;
    flex-direction: column;
    align-items: flex-start !important;
  }
`;

export const NavContainer = styled.div`
  margin-bottom: 1rem;
  position: fixed;
  max-width: 100vw;
  min-width: 100vw;
  width: 100%;
  z-index: 1;
  top: 0;
  .ui {
    &.inverted {
      &.menu {
        border-radius: 0px !important;
      }
    }
  }
`;

export const SearchContainer = styled.div`
  input {
    color: black;
    margin-top: 0.4rem;
    margin-right: 1rem;
    margin-left: 1rem;
    border: none;
    border-bottom: 0px solid #41403e;
    border-radius: 0.4rem;
    height: 1.3rem;
    padding-left: 1rem;
  }
  svg {
    fill: black;
  }
`;
