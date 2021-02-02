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
import { BoardDataContext } from '../../context/BoardDataContext';

const useStyles = makeStyles((theme) => ({
  board__content: {
    height: '100%',
    maxHeight: 'calc(100vh - 115px)',
    overflowX: 'auto',
    overflowY: 'hidden',
    boxSizing: 'border-box',
    flex: 'auto',
    '@media(max-width: 1024px)': {
      overflowY: 'auto',
    },
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

const BoardContent = ({ columnsData, boardId }) => {
  const [columns, setColumns] = useState([]);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();
  const { updateBoardData } = useContext(BoardDataContext);

  const classes = useStyles();

  useEffect(() => setColumns(columnsData), [columnsData, setColumns]);

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
    draggableItem.columnId = destination.droppableId;
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

      await request(requestOptions);
    } catch (e) {
      showSnackbar(e.message, 'error');
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

      await request(requestOptions);
    } catch (e) {
      showSnackbar(e.message, 'error');
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

      updateBoardData.addColumn(response);
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
      const items = reorderColumns(columns, source.index, destination.index);

      setColumns(items);
      updateBoardData.updateColumns(items);
      await updateColumnPosition(draggableId, destination.index);
    }

    if (type === 'card') {
      const items = reorderCrads(columns, source, destination);

      updateBoardData.updateColumns(items);
      await updateCardPosition(draggableId, destination.index, destination.droppableId);
    }
  };

  const droppableStyles = {
    height: '100%',
    width: 'fit-content',
    display: 'flex',
    boxSizing: 'border-box',
  };

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
                  style={droppableStyles}
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
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
                <ColumnCreator request={addColumn} />
              </Box>
            </Box>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

BoardContent.propTypes = {
  columnsData: PropTypes.arrayOf(
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
  columnsData: [],
  boardId: '',
};

export default BoardContent;
