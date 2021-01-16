import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';

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

function Header() {
  const classes = useStyles();
  const { logout } = useAuth();
  const { isAuthenticated, fullName } = useContext(AuthContext);

  const logoutNow = () => {
    logout();
    window.location.reload();
  };

  const RenderHeaderBar = () => {
    if (isAuthenticated) {
      return (
        <ButtonGroup color="primary">
          <Button color="inherit">Settings</Button>
          <Button color="inherit">{fullName}</Button>
          <Button onClick={logoutNow} color="inherit">logout</Button>
        </ButtonGroup>
      );
    }

    return (
      <ButtonGroup color="primary">
        <Button color="inherit">Sign UP</Button>
        <Button color="inherit">Sign IN</Button>
      </ButtonGroup>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h1"
            component="a"
            href="/home"
            className={classes.title}
          >
            RS Tasktracker
          </Typography>
          <RenderHeaderBar />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
