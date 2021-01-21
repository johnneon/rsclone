/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  },
  board__column_draggable: {
    margin: '5px',
    padding: '5px',
    width: '270px',
    minWidth: '270px',
    height: 'fit-content',
    backgroundColor: theme.palette.background.column,
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: 10,
  },
  board__header: {
    padding: '5px',
  },
  board__card: {
    marginBottom: '5px',
    padding: '5px',
    minHeight: '30px',
    backgroundColor: theme.palette.background.main,
    borderRadius: '5px',
  },
}));

const BoardColumn = ({
  data, index, dragHandleProps,
}) => {
  const classes = useStyles();

  const { title, id, cards } = data;

  const getListStyle = (draggableStyle) => ({
    userSelect: 'none',
    overflowY: 'auto',
    maxHeight: '50%',
    height: '100%',
    minHeight: '100%',
    ...draggableStyle,
  });

  return (
    <Paper className={classes.board__column}>
      <Box className={classes.board__header} data-draggable="column-header" {...dragHandleProps}>
        <Typography variant="h2" data-draggable="column-header">{title}</Typography>
      </Box>
      <Droppable droppableId={`${id}`} type="card" ignoreContainerClipping>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(provided.droppableProps.style)}
          >
            <Box>
              {cards.map((card, ind) => (
                <Draggable key={card.title} draggableId={card.title} index={ind} type="card">
                  {(provided2, snapshot) => (
                    <div
                      ref={provided2.innerRef}
                      {...provided2.draggableProps}
                      {...provided2.dragHandleProps}
                    >
                      <Box className={classes.board__card} key={title + ind}>
                        <Typography variant="h5" component="h3">{card.title}</Typography>
                      </Box>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          </div>
        )}
      </Droppable>
              <button type="button">Add card</button>
    </Paper>
  );
};

export default BoardColumn;
