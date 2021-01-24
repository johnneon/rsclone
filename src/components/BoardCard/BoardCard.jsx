/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Paper, Typography, Box, InputBase, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  board__card: {
    marginBottom: '5px',
    padding: '5px',
    minHeight: '30px',
    backgroundColor: theme.palette.background.main,
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const BoardCard = ({ card, deleteCard }) => {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();

  const classes = useStyles();

  const deleteCurrentCard = async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${card._id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await request(requestOptions);

      deleteCard(card._id);
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  // console.log(card);
  return (
    <Box
      className={classes.board__card}
    >
      <Typography variant="h5" component="h3">{card.name}</Typography>
      <IconButton
        aria-label="cancel"
        onClick={deleteCurrentCard}
        size="small"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

BoardCard.propTypes = {
  card: PropTypes.object,
  deleteCard: PropTypes.func,
};

BoardCard.defaultProps = {
  card: {},
  deleteCard: () => {},
};

export default BoardCard;
