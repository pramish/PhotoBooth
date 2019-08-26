import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Login from '../LoginComponent/Login';
import SignUp from '../SignUpComponent/SignUp';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: 'left'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' className={classes.title}>
            PHOTOBOOTH
          </Typography>
          <PopupState variant='popover' popupId='demo-popup-menu'>
            {popupState => (
              <React.Fragment>
                <Button variant='contained' {...bindTrigger(popupState)}>
                  SignIn/SignUp
                </Button>
                <Menu {...bindMenu(popupState)}>
                  {/* <MenuItem onClick={popupState.close}>SignIn</MenuItem> */}
                  <Login />
                  <SignUp />
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </Toolbar>
      </AppBar>
    </div>
  );
}
