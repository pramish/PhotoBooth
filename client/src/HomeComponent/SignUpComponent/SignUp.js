import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function SignUp() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant='text' color='primary' onClick={handleClickOpen}>
        SignUp
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent>
          <DialogContentText>
            Please create your account for free
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Full Name'
            type='text'
            fullWidth
            placeholder='Enter your full name'
          />
          <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Email Address'
            type='email'
            fullWidth
            placeholder='Enter your email address'
          />
          <TextField
            autoFocus
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
            placeholder='Enter your password'
          />
          <TextField
            autoFocus
            margin='dense'
            id='confirm-password'
            label='Password'
            type='password'
            fullWidth
            placeholder='Confirm your password'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
