/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
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
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import BoardColumn from '../BoardColumn/BoardColumn';
// import Placeholder from '../Placeholder/Placeholder';
import ColumnCreator from '../ColumnCreator/ColumnCreator';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

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

const Board = ({ id }) => {
  const [columns, setColumns] = useState([]);
  const [boardData, setBoardData] = useState({});
  
  const { token } = useContext(AuthContext); 
  const { request } = useHttp();  
  // const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  // const showSnackbar = useCallback((message, variant) => (
  //   enqueueSnackbar(message, { variant })
  // ), [enqueueSnackbar]);



  const getBoardData = useCallback(async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/${'60099858a40f6400173a66e5'}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      };
      const response = await request(requestOptions);
      // console.log(response);

      setColumns(response.columns);
      setBoardData(response);

      // console.log(response, 'success')

      // showSnackbar(response.message, 'success');
    } catch (e) {
      // showSnackbar(e.message, 'error');
      // console.log(e.message, 'error');
    }
  }, [id, request, token]);

  useEffect(() => {
    getBoardData();
  }, [getBoardData])

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

  const updateCardPosition = useCallback(async (id, position) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}`,
        },
        body: { position },
      };
      const response = await request(requestOptions);
      console.log(response)

      // showSnackbar(response.message, 'success');
      return response;
    } catch (e) {
      console.log(e.message)
      // showSnackbar(e.message, 'error');
      return null;
    }
  });  

  const sendAddColumnRequest = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/column/',
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

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    console.log(result);

    const resp = await updateCardPosition(result.draggableId, result.destination.index);

    if (!resp) {
      return;
    }

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
    height: '100%',
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
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
                  <Draggable key={item._id} draggableId={item._id} index={index} type="column">
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
                <ColumnCreator 
                  sourceState={columns} 
                  setState={setColumns} 
                  containerId={boardData._id} 
                  request={sendAddColumnRequest}
                  type="column"
                />
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>

  );
};

export default Board;
