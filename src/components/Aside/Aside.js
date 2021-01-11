import React from 'react';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
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
});

const Aside = () => {
  const classes = useStyles();

  return (
    <List component="nav" aria-label="main mailbox folders">
      <Link href="/home" className={classes.navColor}>
        <ListItem button key="home">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home page" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/drafts" className={classes.navColor}>
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </Link>
    </List>
  );
};

export default Aside;
