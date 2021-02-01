import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Box, Button, Collapse, IconButton, OutlinedInput,
} from '@material-ui/core';
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

const BoardColumnCreator = ({ request }) => {
  const [isBoardColumnCreatorVisible, setBoardColumnCreatorVisibility] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef(null);
  const classes = useStyles();

  const showBoardColumnCreator = () => {
    setBoardColumnCreatorVisibility(true);
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
    setBoardColumnCreatorVisibility(false);
  };

  const onInputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Paper className={isBoardColumnCreatorVisible ? classes.creator_visible : classes.creator}>
      <Collapse in={isBoardColumnCreatorVisible} collapsedHeight={45}>
        {isBoardColumnCreatorVisible
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
              className={classes.creator__addNewColButton}
              onClick={showBoardColumnCreator}
            >
              Add new column
            </Button>
          )}
      </Collapse>
    </Paper>
  );
};

BoardColumnCreator.propTypes = {
  request: PropTypes.func,
};

BoardColumnCreator.defaultProps = {
  request: () => {},
};

export default BoardColumnCreator;
