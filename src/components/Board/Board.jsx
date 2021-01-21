/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable no-unreachable */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable semi */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Container, Button, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BoardColumn from '../BoardColumn/BoardColumn';
import Placeholder from '../Placeholder/Placeholder';
import ColumnCreator from '../ColumnCreator/ColumnCreator';

const columnsArr = [
  {
    title: 'first', key: '1', id: 'firstCol', cards: [{ title: 'firstCol1' }, { title: 'secondCol1' }, { title: 'thirdCol1' }, { title: 'fourthCol1' }], 
  }, 
  {
    title: 'second', key: '2', id: 'secondCol', cards: [{ title: 'firstCol2' }, { title: 'secondCol2' }, { title: 'thirdCol2' }, { title: 'fourthCol2' }], 
  }, 
  {
    title: 'third', key: '3', id: 'thirdCol', cards: [{ title: 'firstCol3' }, { title: 'secondCol3' }, { title: 'thirdCol3' }, { title: 'fourthCol3' }], 
  }, 
  {
    title: 'fourth', key: '4', id: 'fourthCol', cards: [{ title: 'firstCol4' }, { title: 'secondCol4' }, { title: 'thirdCol4' }, { title: 'fourthCol4' }], 
  }, 
  {
    title: 'fifth', key: '5', id: 'fifthCol', cards: [{ title: 'firstCol5' }, { title: 'secondCol5' }, { title: 'thirdCol5' }, { title: 'fourthCol5' }], 
  // }, 
  // {
  //   title: 'sixth', key: '6', id: 'sixth', cards: [{ title: 'first' }, { title: 'second' }, { title: 'third' }, { title: 'fourth' }], 
  // }, 
  // {
  //   title: 'seventh', key: '7', id: 'seventh', cards: [{ title: 'first' }, { title: 'second' }, { title: 'third' }, { title: 'fourth' }], 
  }];

const useStyles = makeStyles((theme) => ({
  board__content: {
    padding: '10px',
    height: '100%',
    display: 'flex',
    position: 'relative',
    overflowX: 'auto',
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

const Board = () => {
  const [columns, setColumns] = useState(columnsArr);
  const [isColumnCreatorVisible, setColumnCreatorVisibility] = useState(false);

  const classes = useStyles();

  const reorderColumns = (list, sourceIndex, destinalionIndex) => {
    const result = [...list];
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinalionIndex, 0, removed);
    
    return result;
  };

  const reorderCrads = (list, source, destination) => {
    const result = [...list];
    const sourceColumn = result.find(({ id }) => id === source.droppableId);
    const destinationColumn = result.find(({ id }) => id === destination.droppableId);
    
    const [draggableItem] = sourceColumn.cards.splice(source.index, 1);
    destinationColumn.cards.splice(destination.index, 0, draggableItem);

    return result;
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    console.log(result);

    let items = [...columns];

    if (result.type === 'column') {      
      items = reorderColumns(
        columns,
        result.source.index,
        result.destination.index,
      );
    }

    if (result.type === 'card') {
      items = reorderCrads(columns, result.source, result.destination)
    }

    setColumns(items);
  }

  const getListStyle = (isDraggingOver) => ({
    // background: isDraggingOver ? 'lightblue' : 'lightgrey',
    
    height: '100%',
    // padding: grid,
    // width: 250
  });

  const addNewColumn = () => {
    setColumnCreatorVisibility(true);
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'grey',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '50px', backgroundColor: 'green' }}>
        Header
      </div>
      <main
        style={{
          height: '100%', backgroundColor: '#88adfb', display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <div style={{ height: '30px', backgroundColor: 'lightgrey' }}>
          Settings
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable 
            droppableId="board" 
            type="column"
            direction="horizontal" 
          >
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}                
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
                className={classes.board__content}
              >
                {columns.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index} type="column">
                    {(provided2, snapshot) => (
                      <div                                                              
                        ref={provided2.innerRef}
                        {...provided2.draggableProps}                      
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided2.draggableProps.style,
                        )}
                      >                      
                      <BoardColumn
                        data={item}
                        index={index}
                        dragHandleProps={provided2.dragHandleProps}
                      />                      
                      </div>
                    )}
                  </Draggable>
                ))}                
                {provided.placeholder}            
                <ColumnCreator columns={columns} setColumns={setColumns} />
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>

  );
};

export default Board;
