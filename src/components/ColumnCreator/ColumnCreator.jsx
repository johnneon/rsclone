/* eslint-disable react/prop-types */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Paper, Typography, Box, TextField, Button, Collapse, IconButton, OutlinedInput } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { YoutubeSearchedFor } from '@material-ui/icons';

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
    // marginBottom: '5px',
    padding: '12px',
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
}));

const ColumnCreator = ({ columns, setColumns }) => {
  const [isColumnCreatorVisible, setColumnCreatorVisibility] = useState(false);

  const inputRef = useRef(null);

  const classes = useStyles();

  const showColumnCreator = () => {
    setColumnCreatorVisibility(true);
  };

  const addColumn = () => {
    const { value } = inputRef.current;

    if (value === '') {
      return;
    }

    setColumns([ 
      ...columns, 
      {
        title: value, 
        key: `${columns.length}`, 
        id: `col${columns.length}`, 
        cards: [],
      },
    ]);
  };

  const cancel = () => {
    setColumnCreatorVisibility(false);
  };

  return (
    <Paper className={isColumnCreatorVisible ? classes.creator_visible : classes.creator}>
      <Collapse in={isColumnCreatorVisible} collapsedHeight={45}>
        {isColumnCreatorVisible
          ? (
            <>
              <Box className={classes.board__header}>
                <OutlinedInput
                  fullWidth
                  className={classes.creator__inputWrapper}
                  inputProps={{ className: classes.creator__input }}
                  size="small"
                  placeholder="Add column header..."
                  inputRef={inputRef}
                  margin="dense"
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={addColumn}
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
              className={classes.creator__addNewColButton}
              onClick={showColumnCreator}
            >
              Add new column
            </Button>
          )}
      </Collapse>
    </Paper>
  );
};

export default ColumnCreator;
