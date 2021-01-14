import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 'auto',
    color: '#ffffff',
    textDecoration: 'none',
  },
}));

function Header(prop) {
  const classes = useStyles();
  const { isAuthenticated } = prop;

  const RenderSigns = () => {
    if (!isAuthenticated) {
      return (
        <ButtonGroup color="primary">
          <Button color="inherit">Sign UP</Button>
          <Button color="inherit">Sign IN</Button>
        </ButtonGroup>
      );
    }
    return null;
  };

  const { logout } = useAuth();

  const logoutNow = () => {
    logout();
    window.location.reload();
  };

  const RenderMenu = () => {
    if (isAuthenticated) {
      return (
        <ButtonGroup color="primary">
          <Button color="inherit">Settings</Button>
          <Button color="inherit">User</Button>
          <Button onClick={logoutNow} color="inherit">logout</Button>
        </ButtonGroup>
      );
    }
    return null;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h1" component="a" href="/home" className={classes.title}>
            RS Tasktracker
          </Typography>
          <RenderSigns />
          <RenderMenu />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
