import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Collapse,
  Typography,
} from '@material-ui/core';

import Notifications from './Notifications';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.card,
    color: theme.palette.text.main,
    position: 'absolute',
    right: '0',
    top: '100%',
    padding: '10px',
    width: '100%',
    maxWidth: '300px',
    borderRadius: '10px',
    boxShadow: '0 0 7px rgb(0, 0, 0, .5)',
  },
  card: {
    padding: '5px',
    margin: '5px 0',
  },
  title: {
    paddingBottom: '10px',
  },
}));

const DropDown = ({ isOpen }) => {
  const classes = useStyles();

  return (
    <Collapse in={isOpen}>
      <div className={classes.container}>
        <Typography
          variant="h3"
          className={classes.title}
        >
          Notifications
        </Typography>
        <Notifications isOpen={isOpen} />
      </div>
    </Collapse>
  );
};

DropDown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default DropDown;
