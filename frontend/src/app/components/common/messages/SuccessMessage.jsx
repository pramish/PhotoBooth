import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

/**
 * This component is responsible for displaying success messages
 */
const SuccessMessage = ({ headerTxt, content }) => {
  return (
    <div>
      <Message success header={headerTxt} content={content} />
    </div>
  );
};

SuccessMessage.propTypes = {
  headerTxt: PropTypes.string,
  content: PropTypes.string
};

export default SuccessMessage;
