import React from "react";
import PropTypes from "prop-types";
import { Message, Icon } from "semantic-ui-react";

/**
 * This component is responsible for displaying messages during uploading
 */
const UploadingMessage = ({ message, feedback }) => (
  <Message icon>
    <Icon name="circle notched" loading />
    <Message.Content>
      <Message.Header>{message}</Message.Header>
      {feedback}
    </Message.Content>
  </Message>
);

UploadingMessage.propTypes = {
  message: PropTypes.string,
  feedback: PropTypes.string
};

export default UploadingMessage;
