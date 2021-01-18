/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const cards = [{ title: 'first' }, { title: 'second' }, { title: 'third' }, { title: 'fourth' }];

const useStyles = makeStyles((theme) => ({
  board__column: {
    margin: '5px',
    padding: '5px',
    width: '270px',
    backgroundColor: theme.palette.background.column,
    boxSizing: 'border-box',
  },
  board__header: {
    padding: '5px',
  },
  board__card: {
    marginBottom: '5px',
    padding: '5px',
    minHeight: '30px',
    backgroundColor: theme.palette.background.main,
    borderRadius: '5px',
  },
}));

const BoardColumn = ({
  data,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseOver,
  onClick,
  index,
}) => {
  const classes = useStyles();

  const { title } = data;

  return (
    <Paper
      className={classes.board__column}
      data-draggable="column"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseOver={onMouseOver}
      onClick={onClick}
      data-index={index}
    >
      <Box className={classes.board__header} data-draggable="column-header">
        <Typography variant="h2" data-draggable="column-header">{title}</Typography>
      </Box>
      <Box>
        {cards.map((card, ind) => (
          <Box className={classes.board__card} key={title + ind}>
            <Typography variant="h5" component="h3">{card.title}</Typography>
          </Box>
        ))}
      </Box>
      <button type="button">Add card</button>
    </Paper>
  );
};

export default BoardColumn;
