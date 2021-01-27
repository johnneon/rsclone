/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
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
  },
}));

const BoardColumn = ({ data, index, deleteColumn }) => {
  const { cards, name, _id: id } = data;
  const classes = useStyles();

  return (

    <Draggable draggableId={id} index={index} type="column">
      {(columnProvided) => (
        <div
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
          style={columnProvided.draggableProps.style}
        >
          <Paper className={classes.board__column}>
            <BoardColumnHeader
              name={name}
              id={id}
              dragHandleProps={columnProvided.dragHandleProps}
              deleteColumn={deleteColumn}
            />
            <BoardColumnTaskList
              data={cards}
              columnId={id}
            />
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

BoardColumn.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  deleteColumn: PropTypes.func,
};

BoardColumn.defaultProps = {
  data: {},
  index: 0,
  deleteColumn: () => {},
};

export default BoardColumn;
