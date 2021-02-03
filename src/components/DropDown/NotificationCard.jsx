import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import {
  Card,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    padding: '5px',
    margin: '5px 0',
  },
  title: {
    paddingBottom: '10px',
  },
}));

const NotificationCard = ({
  boardId,
  boardName,
  from,
  agree,
  loading,
  cancel,
}) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      id={boardId}
      key={boardId}
    >
      <Typography
        variant="body1"
      >
        {`You have received an invitation to ${boardName} from ${from}`}
      </Typography>
      <Button
        component={NavLink}
        to="/boards"
        type="button"
        color="primary"
        onClick={agree}
        disabled={loading}
      >
        Agree
      </Button>
      <Button
        color="secondary"
        onClick={cancel}
        disabled={loading}
      >
        Cancel
      </Button>
    </Card>
  );
};

export default NotificationCard;

NotificationCard.propTypes = {
  boardId: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  agree: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
};
