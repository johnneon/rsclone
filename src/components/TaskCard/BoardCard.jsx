/* eslint-disable no-use-before-define */
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
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import BoardCardCreator from '../BoardCardCreator/BoardCardCreator';
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

const BoardCard = ({ data, deleteCard }) => {
  const [card, setCard] = useState(data);
  const [isEditorOpen, setEditorState] = useState(false);
  // const [isHeaderEditable, setHeaderEditable] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  const updateCard = async (name) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${card._id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: name,
      };

      // if (!response) {
      //   return;
      // }

      const response = await request(requestOptions);

      setCard(response);
      closeEditor();
    } catch (e) {
      console.log(e.message);
    }
  };

  const openEditor = () => {
    setEditorState(true);
  };

  const closeEditor = () => {
    setEditorState(false);
  };

  const onInputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  if (isEditorOpen) {
    return (
      <BoardCardCreator
        sourceState={card}
        setState={setCard}
        // containerId={_id}
        request={updateCard}
        type="editor"
        close={closeEditor}
      />
    );
  }

  // console.log(card);
  return (
    <Box
      className={classes.board__card}
    >
      <Typography variant="h5" component="h3">
        {card.name}
      </Typography>
      <IconButton
        aria-label="edit"
        onClick={openEditor}
        size="small"
      >
        <EditIcon />
      </IconButton>
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
  data: PropTypes.object,
  deleteCard: PropTypes.func,
};

BoardCard.defaultProps = {
  data: {},
  deleteCard: () => {},
};

export default BoardCard;
