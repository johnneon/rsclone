import React, {
  useState, useContext, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import BoardColumn from '../BoardColumn/BoardColumn';
import ColumnCreator from '../ColumnCreator/ColumnCreator';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  board__content: {
    height: '100%',
    maxHeight: 'calc(100vh - 115px)',
    overflowX: 'auto',
    overflowY: 'hidden',
    boxSizing: 'border-box',
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '8px',
      backgroundColor: '#cecfd1',
      borderRadius: '15px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#cecfd1',
      borderRadius: '15px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '15px',
      background: '#bbbcbc',
      transition: 'all 1s linear',
      '&:hover': {
        backgroundColor: '#989898',
      },
    },
  },
  board__contentWrapper: {
    padding: '10px 10px 20px',
    width: 'fit-content',
    height: '100%',
    display: 'flex',
    boxSizing: 'border-box',
  },
  board__button: {
    padding: '10px 20px',
    height: 'fit-content',
    minWidth: '270px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.buttons.transparentWhite,
    '&:hover': {
      backgroundColor: theme.palette.buttons.transparentWhiteHover,
    },
  },
}));

const BoardContent = ({ columnData, boardId }) => {
  const [columns, setColumns] = useState([]);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  useEffect(() => setColumns(columnData), [columnData, setColumns]);

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const reorderColumns = (list, sourceIndex, destinalionIndex) => {
    const result = [...list];
    const [draggableItem] = result.splice(sourceIndex, 1);
    result.splice(destinalionIndex, 0, draggableItem);

    return result;
  };

  const reorderCrads = (list, source, destination) => {
    const result = [...list];
    const sourceColumn = result.find(({ _id: columnId }) => columnId === source.droppableId);
    const destinationColumn = result.find(({ _id: columnId }) => (
      columnId === destination.droppableId
    ));

    const [draggableItem] = sourceColumn.cards.splice(source.index, 1);
    destinationColumn.cards.splice(destination.index, 0, draggableItem);

    return result;
  };

  const updateColumnPosition = useCallback(async (id, position) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { position },
      };
      const response = await request(requestOptions);

      return response;
    } catch (e) {
      showSnackbar(e.message, 'error');
      return null;
    }
  }, [request, showSnackbar, token]);

  const updateCardPosition = useCallback(async (id, position, columnId) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { position, columnId },
      };
      const response = await request(requestOptions);

      return response;
    } catch (e) {
      showSnackbar(e.message, 'error');
      return null;
    }
  }, [request, showSnackbar, token]);

  const addColumn = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/column/',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          position: columns.length,
          boardId,
          ...data,
        },
      };
      const response = await request(requestOptions);

      setColumns([...columns, response]);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const deleteColumn = async (id) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await request(requestOptions);

      const sourceData = [...columns];
      const removedCardIndex = sourceData.findIndex(({ _id }) => _id === id);
      sourceData.splice(removedCardIndex, 1);

      setColumns(sourceData);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const onDragEnd = async (result) => {
    const {
      type,
      destination,
      source,
      draggableId,
    } = result;

    if (!destination) {
      return;
    }

    if (type === 'column') {
      const items = reorderColumns(
        columns,
        source.index,
        destination.index,
      );

      setColumns(items);
      await updateColumnPosition(draggableId, destination.index);
    }

    if (type === 'card') {
      const items = reorderCrads(columns, source, destination);

      setColumns(items);
      await updateCardPosition(draggableId, destination.index, destination.droppableId);
    }
  };

  const getDroppableStyles = () => ({
    height: '100%',
    width: 'fit-content',
    display: 'flex',
    boxSizing: 'border-box',
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="column"
        direction="horizontal"
      >
        {(provided) => {
          const { droppableProps } = provided;
          return (
            <Box
              className={classes.board__content}
            >
              <Box className={classes.board__contentWrapper}>
                <div
                  ref={provided.innerRef}
                  style={getDroppableStyles()}
                  data-rbd-droppable-context-id={droppableProps['data-rbd-droppable-context-id']}
                  data-rbd-droppable-id={droppableProps['data-rbd-droppable-id']}
                >
                  {columns.map((column, index) => {
                    const { _id: id } = column;
                    return (
                      <BoardColumn
                        key={id}
                        data={column}
                        index={index}
                        deleteColumn={deleteColumn}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
                <ColumnCreator
                  sourceState={columns}
                  setState={setColumns}
                  containerId={boardId}
                  request={addColumn}
                  type="column"
                />
              </Box>
            </Box>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

BoardContent.propTypes = {
  columnData: PropTypes.arrayOf(
    PropTypes.shape({
      boardId: PropTypes.string,
      name: PropTypes.string,
      _id: PropTypes.string,
      cards: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.string),
      ),
    }),
  ),
  boardId: PropTypes.string,
};

BoardContent.defaultProps = {
  columnData: [],
  boardId: '',
};

export default BoardContent;
