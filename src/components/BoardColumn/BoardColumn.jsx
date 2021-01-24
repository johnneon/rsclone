/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Paper, Typography, Box, InputBase, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import BoardCard from '../BoardCard/BoardCard';
import ColumnCreator from '../ColumnCreator/ColumnCreator';
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
  // board__column_draggable: {
  //   margin: '5px',
  //   padding: '5px',
  //   width: '270px',
  //   minWidth: '270px',
  //   height: 'fit-content',
  //   backgroundColor: theme.palette.background.column,
  //   boxSizing: 'border-box',
  //   position: 'absolute',
  //   zIndex: 10,
  // },
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
  // board__card: {
  //   marginBottom: '5px',
  //   padding: '5px',
  //   minHeight: '30px',
  //   backgroundColor: theme.palette.background.main,
  //   borderRadius: '5px',
  // },
}));

const BoardColumn = ({
  data: { cards: cardsData, name, _id }, index, dragHandleProps, deleteColumn,
}) => {
  const [cards, setCards] = useState(cardsData);
  const [isHeaderEditable, setHeaderEditable] = useState(false)
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  // console.log(cards)

  // const { name, _id } = data;

  const sendAddCardRequest = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/cards/',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: data,
      };
      const response = await request(requestOptions);
      return response;
    } catch (e) {
      console.log(e.message, 'error');
      return null;
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

  const editHeader = () => {
    //
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

  return (
    <Paper className={classes.board__column}>
      <Box className={classes.board__header} {...dragHandleProps}>
        <Typography variant="h2">{name}</Typography>
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
                        card={card}
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
      <ColumnCreator
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
