import React from "react";
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";

/**
 * This component is responsible for displaying error (failure) messages
 */
const FailureMessage = ({ errorMsg, headerTxt }) => {
  return (
    <div>
      <Message negative>
        <Message.Header>{headerTxt}</Message.Header>
        <p>{errorMsg}</p>
      </Message>
    </div>
  );
};

FailureMessage.propTypes = {
  errorMsg: PropTypes.string,
  headerTxt: PropTypes.string
};

export default FailureMessage;
