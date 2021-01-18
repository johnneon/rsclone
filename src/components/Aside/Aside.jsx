import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';

import {
  Dashboard,
  Home,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  navColor: {
    color: '#3e3a3a',
    textDecoration: 'none',
  },
  navAside: {
    width: '100%',
    paddingTop: '0',
    paddingBottom: '0',
  },
});

const Aside = () => {
  const classes = useStyles();

  return (
    <List component="nav" aria-label="main mailbox folders" className={classes.navAside}>
      <NavLink to="/home" className={classes.navColor}>
        <ListItem button key="home">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>
      <Divider />
      <NavLink to="/boards" className={classes.navColor}>
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Boards" />
        </ListItem>
      </NavLink>
    </List>
  );
};

export default Aside;
