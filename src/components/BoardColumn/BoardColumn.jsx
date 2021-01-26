/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Paper, Typography, Box, InputBase, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import BoardCard from '../TaskCard/BoardCard';
import BoardCardCreator from '../BoardCardCreator/BoardCardCreator';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';

const useStyles = makeStyles((theme) => ({
  board__column: {
    margin: '5px',
    padding: '5px',
    width: '270px',
    minWidth: '270px',
    maxHeight: '100%',
    backgroundColor: theme.palette.background.column,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    userSelect: 'none',
  },
  board__header: {
    padding: '0px',
    fontWeight: 700,
    fontSize: theme.typography.h4.fontSize,
    display: 'flex',
    justifyContent: 'space-between',
  },
  board__headerInput: {
    padding: '2px 5px',
    fontWeight: 700,
    fontSize: theme.typography.h4.fontSize,
    // userSelect: 'none',
  },
}));

const BoardColumn = ({
  data: { cards: cardsData, name, _id }, index, dragHandleProps, deleteColumn,
}) => {
  const [cards, setCards] = useState(cardsData);
  const [isHeaderEditable, setHeaderEditable] = useState(false)
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [header, setHeader] = useState(name);

  // const { name, _id } = data;

  const sendAddCardRequest = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/cards/',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: {
          position: cards.length,
          columnId: _id,
          ...data,
        },
      };
      const response = await request(requestOptions);

      // if (!response) {
      //   return;
      // }

      setCards([...cards, response]);
    } catch (e) {
      console.log(e.message, 'error');
    }
  };

  const getListStyle = (draggableStyle) => ({
    userSelect: 'none',
    overflowY: 'auto',
    maxHeight: '50%',
    height: '100%',
    minHeight: '100%',
    ...draggableStyle,
  });

  const startEditHeader = () => {
    setHeaderEditable(true);
  }

  const stopEditHeader = () => {
    setHeaderEditable(false);
    updateHeaderName(header);
  }

  const deleteCard = (id) => {
    const sourceData = [...cards];
    const removedCardIndex = sourceData.findIndex(({ _id }) => _id === id);
    sourceData.splice(removedCardIndex, 1);

    setCards(sourceData);
  }

  const deleteCurrentBoard = async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${_id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await request(requestOptions);

      deleteColumn(_id);
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  }
  console.log('render')

  const onChange = (e) => {
    setHeader(e.target.value)
  }

  const updateHeaderName = async (name) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${_id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: { name },
      };
      console.log(requestOptions)
      const response = await request(requestOptions);

      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Paper className={classes.board__column}>
      <Box className={classes.board__header} {...dragHandleProps}>
        {isHeaderEditable
          ? (
          <InputBase
            className={classes.board__headerInput}
            value={header}
            inputProps={{ 'aria-label': 'column header' }}
            // disabled={!isHeaderEditable}
            readOnly={!isHeaderEditable}
            fullWidth
            autoFocus
            multiline
            // onClick={startEditHeader}
            onBlur={stopEditHeader}
            onChange={onChange}
          />
          ) : (
            <Typography variant="h2" onClick={startEditHeader}>{header}</Typography>
          )}
        {/* <InputBase
          className={classes.board__headerInput}
          value={name}
          inputProps={{ 'aria-label': 'naked' }}
          disabled={!isHeaderEditable}
          fullWidth
          onClick={editHeader}
        /> */}
        <IconButton
          aria-label="cancel"
          onClick={deleteCurrentBoard}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Droppable droppableId={_id} type="card" ignoreContainerClipping>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(provided.droppableProps.style)}
          >
            <Box>
              {cards.map((card, ind) => (
                <Draggable key={card._id} draggableId={card._id} index={ind} type="card">
                  {(provided2, snapshot) => (
                    <div
                      ref={provided2.innerRef}
                      {...provided2.draggableProps}
                      {...provided2.dragHandleProps}
                    >
                      <BoardCard
                        data={card}
                        key={card._id}
                        deleteCard={deleteCard}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          </div>
        )}
      </Droppable>
      <BoardCardCreator
        sourceState={cards}
        setState={setCards}
        containerId={_id}
        request={sendAddCardRequest}
        type="card"
      />
    </Paper>
  );
};

export default BoardColumn;
