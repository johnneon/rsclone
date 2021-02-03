import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
  ExitToApp,
  Settings,
  Help,
} from '@material-ui/icons';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';
import ValidationModal from '../ValidationModal/ValidationModal';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 'auto',
    color: '#ffffff',
    textDecoration: 'none',
    '@media(max-width: 480px)': {
      fontSize: '18px',
    },
  },
  avatar: {
    marginRight: '10px',
    backgroundColor: '#ffd600',
    '@media(max-width: 480px)': {
      width: '35px',
      height: '35px',
    },
  },
  infoIcon: {
    color: '#ffffff',
  },
}));

function Header() {
  const classes = useStyles();
  const { logout } = useAuth();
  const { isAuthenticated, fullName } = useContext(AuthContext);
  const [openInfo, setOpenInfo] = useState(false);
  let avatarName = null;

  if (fullName) {
    avatarName = fullName.split(' ').map((word) => word[0].toUpperCase()).join('');
  }

  const close = () => {
    setOpenInfo(false);
  };

  const infoHandler = () => {
    setOpenInfo(true);
  };

  const logoutNow = async () => {
    await logout();
    window.location.reload();
  };

  const RenderHeaderBar = () => {
    if (isAuthenticated) {
      return (
        <>
          <Avatar
            color="primary"
            className={classes.avatar}
          >
            {avatarName}
          </Avatar>
          <ButtonGroup color="primary">
            <Button color="inherit">
              <Settings />
            </Button>
            <Button onClick={logoutNow} color="inherit">
              <ExitToApp />
            </Button>
          </ButtonGroup>
        </>
      );
    }

    return (
      <IconButton
        className={classes.infoIcon}
        onClick={infoHandler}
      >
        <Help />
      </IconButton>
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
      <ValidationModal
        isOpen={openInfo}
        close={close}
      />
    </>
  );
}

export default Header;
