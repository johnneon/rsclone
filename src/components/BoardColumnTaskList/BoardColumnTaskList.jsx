/* eslint-disable no-console */
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
import React, { useState, useContext, useCallback } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import TaskCard from '../TaskCard/TaskCard';
import BoardCardCreator from '../BoardCardCreator/BoardCardCreator';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';

const useStyles = makeStyles((theme) => ({
  //
}));

const BoardColumnTaskList = ({ data, columnId }) => {
  const [cards, setCards] = useState(data);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const sendAddCardRequest = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/cards/',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          position: cards.length,
          columnId,
          ...data,
        },
      };
      const response = await request(requestOptions);

      setCards([...cards, response]);
    } catch (e) {
      console.log(e.message, 'error');
      showSnackbar(e.message, 'error');
    }
  };

  const deleteCard = (cardId) => {
    const sourceData = [...cards];

    const removedCardIndex = sourceData.findIndex(({ _id: removedId }) => removedId === cardId);
    sourceData.splice(removedCardIndex, 1);

    setCards(sourceData);
  }

  const getListStyle = () => ({
    userSelect: 'none',
    maxHeight: '50%',
    height: '100%',
    minHeight: '100%',
  });

  return (
    <>
      <Droppable droppableId={columnId} type="card" ignoreContainerClipping>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle()}
          >
            <Box>
              {cards.map((card, ind) => (
                <TaskCard
                  index={ind}
                  data={card}
                  key={card._id}
                  deleteCard={deleteCard}
                />
              ))}
              {provided.placeholder}
            </Box>
          </div>
        )}
      </Droppable>
      <BoardCardCreator
        sourceState={cards}
        setState={setCards}
        containerId={columnId}
        request={sendAddCardRequest}
        type="card"
      />
    </>
  );
};

export default BoardColumnTaskList;
