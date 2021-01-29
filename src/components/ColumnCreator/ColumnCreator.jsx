/* eslint-disable no-underscore-dangle */
/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Paper, Box, Button, Collapse, IconButton, OutlinedInput } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  creator: {
    margin: '5px',
    backgroundColor: 'transparent',
    height: 'fit-content',
  },
  creator_visible: {
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
  creator__input: {
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
  creator__submit: {
    marginRight: '5px',
    padding: '2px',
  },
}));

const BoardElementCreator = ({ request, type }) => {
  const [isBoardElementCreatorVisible, setBoardElementCreatorVisibility] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef(null);
  const classes = useStyles();

  const showBoardElementCreator = () => {
    setBoardElementCreatorVisibility(true);
  };

  const addBoardElement = async () => {
    if (inputValue === '') {
      return;
    }

    const requestBody = { name: inputValue };

    await request(requestBody);
    setInputValue('');
    inputRef.current.focus();
  };

  const cancel = () => {
    setBoardElementCreatorVisibility(false);
  };

  const onInputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Paper className={isBoardElementCreatorVisible ? classes.creator_visible : classes.creator}>
      <Collapse in={isBoardElementCreatorVisible} collapsedHeight={45}>
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
                  inputRef={inputRef}
                  margin="dense"
                  value={inputValue}
                  onChange={onInputChangeHandler}
                  autoFocus
                />
              </Box>
              <Button
                className={classes.creator__submit}
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
