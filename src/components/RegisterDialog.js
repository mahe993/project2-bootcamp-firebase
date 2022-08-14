import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const RegisterDialog = (props) => {
  const handleClose = (button) => {
    if (button === "cancel") {
      props.setOpenRegisterDialog(false);
    } else if (button === "register") {
      props.registerUser();
    }
  };

  return (
    <Dialog
      open={props.openRegisterDialog}
      onClose={handleClose}
      scroll="paper"
    >
      <DialogTitle id="scroll-dialog-title">REGISTER</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          No such email found.
          <br />
          <br />
          Would you like to register for an account using this email and
          password?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose("cancel")}>Cancel</Button>
        <Button onClick={() => handleClose("register")}>Register</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
