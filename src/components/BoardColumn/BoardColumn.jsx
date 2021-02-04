import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BoardColumnHeader from '../BoardColumnHeader/BoardColumnHeader';
import BoardColumnTaskList from '../BoardColumnTaskList/BoardColumnTaskList';

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
    overflowY: 'hidden',
  },
}));

const BoardColumn = ({ data, index, users }) => {
  const { cards, name, _id: id } = data;
  const classes = useStyles();

  return (

    <Draggable draggableId={id} index={index} type="column">
      {(providedColumn) => {
        const { draggableProps } = providedColumn;
        return (
          <div
            ref={providedColumn.innerRef}
            data-rbd-draggable-context-id={draggableProps['data-rbd-draggable-context-id']}
            data-rbd-draggable-id={draggableProps['data-rbd-draggable-id']}
            onTransitionEnd={draggableProps.onTransitionEnd}
            style={draggableProps.style}
          >
            <Paper className={classes.board__column}>
              <BoardColumnHeader
                name={name}
                id={id}
                dragHandleProps={providedColumn.dragHandleProps}
              />
              <BoardColumnTaskList
                data={cards}
                columnId={id}
                users={users}
              />
            </Paper>
          </div>
        );
      }}
    </Draggable>
  );
};

BoardColumn.propTypes = {
  data: PropTypes.shape({
    boardId: PropTypes.string,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        columnId: PropTypes.string,
        name: PropTypes.string,
        _id: PropTypes.string,
        labels: PropTypes.arrayOf(
          PropTypes.objectOf(PropTypes.string),
        ),
      }),
    ),
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
  users: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
};

BoardColumn.defaultProps = {
  data: {},
  users: [],
  index: 0,
};

export default BoardColumn;
