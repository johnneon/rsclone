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
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BoardColumn from '../BoardColumn/BoardColumn';

const columnsArr = [{ title: 'first', key: '1' }, { title: 'second', key: '2' }, { title: 'third', key: '3' }, { title: 'fourth', key: '4' }];

const useStyles = makeStyles(() => ({
  board__content: {
    padding: '10px',
    display: 'flex',
    position: 'relative',
  },
}));

const Board = () => {
  const [columns, setColumns] = useState(columnsArr);
  const [draggableElement, setDraggableElement] = useState(null);
  const [isMoved, setIsMoved] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [switchableElement, setSwitchableElement] = useState(null);

  const classes = useStyles();

  const onMouseDown = (e) => {
    if (!e.target.dataset.draggable) {
      return;
    }

    let newDraggableElem = e.currentTarget;

    if (newDraggableElem.tagName !== 'DIV') {
      newDraggableElem = getDraggableElement(newDraggableElem);
    }

    setDraggableElement(newDraggableElem);
    setOffset({
      x: e.pageX - e.currentTarget.offsetLeft,
      y: e.pageY - e.currentTarget.offsetTop,
    })
  }

  const onMouseUp = (e) => {
    if (!isMoved) {
      return;
    }

    setTimeout(() => setIsMoved(false), 0);
    setColumns((state) => {
      const newState = [...state];
      const placeholderIndex = columns.findIndex((column) => column.key === 'placeholder');
      if (placeholderIndex !== -1) {        
        newState.splice(placeholderIndex, 1);
      }
      return newState;
    });

    draggableElement.style = '';
    setDraggableElement(null);
  }

  const onMouseMove = (e) => {
    if (!draggableElement) {
      return;
    }

    if (!isMoved) {
      setIsMoved(true);
      setColumns((state) => {
        const newState = [...state];
        if (!columns.find((column) => column.key === 'placeholder')) {
          newState.splice(draggableElement.dataset.index, 0, { title: 'placeholder', key: 'placeholder' });
        }
        return newState;
      });
    }

    const hoveredElement = getDraggableElement(e);

    if (hoveredElement !== switchableElement) {
      setSwitchableElement(hoveredElement);

      if (hoveredElement) {
        setColumns((state) => {
          const { index } = hoveredElement.dataset;
          const placeholderIndex = columns.findIndex((column) => column.key === 'placeholder');
          const newState = [...state];

          if (newState[index].key !== 'placeholder' && placeholderIndex !== -1) {
            const placeholder = newState.splice(placeholderIndex, 2);
            newState.splice(+index, 0, ...placeholder);
          }

          return newState;
        });
      }
    }
    
    draggableElement.style.position = 'absolute';
    draggableElement.style.zIndex = '10';
    draggableElement.style.left = `${e.pageX - offset.x}px`;
    draggableElement.style.top = `${e.pageY - offset.y}px`;
    return;
  }

  function getDraggableElement(event) {
    draggableElement.hidden = true;
    const elem = document.elementFromPoint(event.clientX, event.clientY);

    draggableElement.hidden = false;
  
    if (elem == null) {
      return null;
    }

    return elem.closest('[data-draggable="column"]');
  }

  const onClick = (e) => {
    if (isMoved) {
      return;
    }
  }

  const btnClick = () => {
    setColumns((state) => {      
      const newColumns = [...state];    
      const first = newColumns.shift();
      newColumns.push(first);
      return newColumns;
    })
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '50px', backgroundColor: 'green' }}>
        Header
      </div>
      <main style={{ height: '100%', backgroundColor: '#88adfb' }} onDragStart={(e) => e.preventDefault()}>
        <div style={{ height: '30px', backgroundColor: 'lightgrey' }}>
          Settings
        </div>
        <Box
          className={classes.board__content}
        >
          {columns.map((column, index) => (
            <BoardColumn
              data={column}
              key={column.key}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onClick={onClick}
              index={index}
            />
          ))}
          <button type="button" onClick={btnClick}>Add new column</button>
        </Box>
      </main>
    </div>

  );
};

export default Board;
