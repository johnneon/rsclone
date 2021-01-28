/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Typography, Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import BoardCardCreator from '../BoardCardCreator/BoardCardCreator';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: '5px',
    padding: '5px',
    minHeight: '30px',
    backgroundColor: theme.palette.background.main,
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    '&:hover [class*=card__edit]': {
      visibility: 'visible',
    },
  },
  card__header: {
    padding: '2px',
    width: '100%',
    overflowWrap: 'anywhere',
  },
  card__edit: {
    visibility: 'hidden',
    fontSize: theme.typography.h3.fontSize,
  },
}));

const TaskCard = ({ data, deleteCard, index }) => {
  const [card, setCard] = useState(data);
  const [isEditorOpen, setEditorState] = useState(false);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const { _id: id } = card;

  const classes = useStyles();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const openEditor = () => {
    setEditorState(true);
  };

  const closeEditor = () => {
    setEditorState(false);
  };

  const deleteCurrentCard = async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(requestOptions);
      const response = await request(requestOptions);

      console.log('delete card');

      deleteCard(id);
      console.log(response);
    } catch (e) {
      console.log(e.message);
      showSnackbar(e.message, 'error');
    }
  };

  const updateCard = async (name) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: name,
      };

      const response = await request(requestOptions);

      setCard(response);
      closeEditor();
    } catch (e) {
      console.log(e.message);
      showSnackbar(e.message, 'error');
    }
  };

  if (isEditorOpen) {
    return (
      <BoardCardCreator
        sourceState={card}
        setState={setCard}
        request={updateCard}
        type="editor"
        close={closeEditor}
        value={card.name}
        deleteCard={deleteCurrentCard}
      />
    );
  }

  let isEditVisible = false;

  const handleOnMouseOver = () => {
    isEditVisible = true;
  };

  // console.log(isEditVisible);

  return (
    <Draggable draggableId={id} index={index} type="card">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            className={classes.card}
            onMouseOver={handleOnMouseOver}
          >
            <Typography
              className={classes.card__header}
              variant="h5"
              component="h3"
            >
              {card.name}
            </Typography>
            {/* {isEditVisible && ( */}
            <IconButton
              className={classes.card__edit}
              aria-label="edit"
              onClick={openEditor}
              size="small"
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            {/* )} */}
          </Box>
        </div>
      )}
    </Draggable>
  );
};

TaskCard.propTypes = {
  data: PropTypes.object,
  deleteCard: PropTypes.func,
  index: PropTypes.number,
};

TaskCard.defaultProps = {
  data: {},
  deleteCard: () => {},
  index: 0,
};

export default TaskCard;
