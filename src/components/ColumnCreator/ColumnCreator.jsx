/* eslint-disable no-underscore-dangle */
/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useContext } from 'react';
import { Paper, Box, Button, Collapse, IconButton, OutlinedInput } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  creator: {
    margin: '5px',
    backgroundColor: 'transparent',
    height: 'fit-content',
  },
  creator__column_visible: {
    margin: '5px',
    padding: '5px',
    width: '270px',
    minWidth: '270px',
    maxHeight: '100%',
    height: 'fit-content',
    backgroundColor: theme.palette.background.column,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  creator__card_visible: {
    padding: '5px',
    width: '100%',
    maxWidth: '260px',
    maxHeight: '100%',
    height: 'fit-content',
    backgroundColor: theme.palette.background.card,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  creator__input: {
    // marginBottom: '5px',
    padding: '10px',
    width: '100%',
    backgroundColor: theme.palette.background.main,
    borderRadius: '4px',
  },
  creator__inputWrapper: {
    marginBottom: '5px',
    overflow: 'hidden',
  },
  creator__addNewColButton: {
    padding: '10px',
    height: 'fit-content',
    minWidth: '270px',
    color: theme.palette.text.white,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.buttons.transparentWhite,
    '&:hover': {
      backgroundColor: theme.palette.buttons.transparentWhiteHover,
    },
  },
  creator__addNewCardButton: {
    padding: '5px',
    height: 'fit-content',
    width: '100%',
    // color: theme.palette.text.white,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.buttons.grey,
    '&:hover': {
      backgroundColor: theme.palette.buttons.greyHover,
    },
  },
}));

const BoardElementCreator = ({ sourceState, setState, containerId, request, type }) => {
  const [isBoardElementCreatorVisible, setBoardElementCreatorVisibility] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // const inputRef = useRef(null);
  const classes = useStyles();

  const showBoardElementCreator = () => {
    setBoardElementCreatorVisibility(true);
  };

  const addBoardElement = async () => {
    if (inputValue === '') {
      return;
    }

    // console.log(inputValue, sourceState, sourceState.length, containerId);

    const requestBody = type === 'column' 
      ? { 
        name: inputValue, 
        position: sourceState.length, 
        boardId: containerId, 
      } : {        
        name: inputValue, 
        position: sourceState.length, 
        columnId: containerId, 
      };

    const response = await request(requestBody);

    if (!response) {
      return;
    }

    setState([ 
      ...sourceState, 
      response,
    ]);

    setInputValue('');
  };

  const cancel = () => {
    setBoardElementCreatorVisibility(false);
  };

  const onInputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Paper className={isBoardElementCreatorVisible ? classes[`creator__${type}_visible`] : classes.creator}>
      <Collapse in={isBoardElementCreatorVisible} collapsedHeight={type === 'column' ? 45 : 34}>
        {isBoardElementCreatorVisible
          ? (
            <>
              <Box className={classes.board__header}>
                <OutlinedInput
                  fullWidth
                  className={classes.creator__inputWrapper}
                  inputProps={{ className: classes.creator__input }}
                  size="small"
                  placeholder="Add header..."
                  // inputRef={inputRef}
                  margin="dense"
                  value={inputValue}
                  onChange={onInputChangeHandler}
                  autoFocus
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={addBoardElement}
                size="small"
              >
                Add
              </Button>
              <IconButton
                aria-label="cancel"
                onClick={cancel}
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <Button
              variant="contained"
              className={
                type === 'column' 
                  ? classes.creator__addNewColButton 
                  : classes.creator__addNewCardButton
              }
              onClick={showBoardElementCreator}
            >
              {`Add new ${type}`}
            </Button>
          )}
      </Collapse>
    </Paper>
  );
};

export default BoardElementCreator;