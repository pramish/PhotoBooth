import React from "react";
import { Modal, Backdrop, Fade, makeStyles } from "@material-ui/core";
import AddImageForm from "./AddImageForm";

export const CustomModel = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <AddImageForm />
      </Fade>
    </Modal>
  );
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
