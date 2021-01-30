import React, {
  useState, useContext, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import TaskCard from '../TaskCard/TaskCard';
import BoardCardCreator from '../BoardCardCreator/BoardCardCreator';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';

const BoardColumnTaskList = ({ data, columnId }) => {
  const [cards, setCards] = useState(data);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  useEffect(() => setCards(data), [data]);

  const addCard = async (name) => {
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
          ...name,
        },
      };
      const response = await request(requestOptions);

      setCards([...cards, response]);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const deleteCard = (cardId) => {
    const sourceData = [...cards];

    const removedCardIndex = sourceData.findIndex(({ _id: removedId }) => removedId === cardId);
    sourceData.splice(removedCardIndex, 1);

    setCards(sourceData);
  };

  const getListStyle = () => ({
    userSelect: 'none',
    maxHeight: '50%',
    height: '100%',
    minHeight: '100%',
  });

  return (
    <>
      <Droppable droppableId={columnId} type="card" ignoreContainerClipping>
        {(provided) => {
          const { droppableProps } = provided;
          return (
            <div
              ref={provided.innerRef}
              data-rbd-droppable-context-id={droppableProps['data-rbd-droppable-context-id']}
              data-rbd-droppable-id={droppableProps['data-rbd-droppable-id']}
              style={getListStyle()}
            >
              <Box>
                {cards.map((card, ind) => {
                  const { _id: id } = card;
                  return (
                    <TaskCard
                      index={ind}
                      data={card}
                      key={id}
                      deleteCard={deleteCard}
                    />
                  );
                })}
                {provided.placeholder}
              </Box>
            </div>
          );
        }}
      </Droppable>
      <BoardCardCreator
        sourceState={cards}
        setState={setCards}
        containerId={columnId}
        request={addCard}
        type="card"
      />
    </>
  );
};

BoardColumnTaskList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ),
  columnId: PropTypes.string,
};

BoardColumnTaskList.defaultProps = {
  data: [],
  columnId: '',
};

export default BoardColumnTaskList;
