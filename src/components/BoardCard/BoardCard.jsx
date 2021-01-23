/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Paper, Typography, Box, InputBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  board__card: {
    marginBottom: '5px',
    padding: '5px',
    minHeight: '30px',
    backgroundColor: theme.palette.background.main,
    borderRadius: '5px',
  },
}));

const BoardCard = ({ card }) => {
  const classes = useStyles();

  console.log(card);
  return (
    <Box
      className={classes.board__card}
    >
      <Typography variant="h5" component="h3">{card.name}</Typography>
    </Box>
  );
};

BoardCard.propTypes = {
  card: PropTypes.object,
};

BoardCard.defaultProps = {
  card: {},
};

export default BoardCard;
