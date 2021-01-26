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
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
// import BoardElementCreator from '../BoardElementCreator/BoardElementCreator';

const useStyles = makeStyles((theme) => ({
  creator: {
    margin: '5px',
    backgroundColor: 'transparent',
    height: 'fit-content',
  },
  creator_visible: {
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
    padding: '10px',
    width: '100%',
    backgroundColor: theme.palette.background.main,
    borderRadius: '4px',
  },
  creator__inputWrapper: {
    marginBottom: '5px',
    overflow: 'hidden',
  },
  creator__addNewCardButton: {
    padding: '5px',
    height: 'fit-content',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.buttons.grey,
    '&:hover': {
      backgroundColor: theme.palette.buttons.greyHover,
    },
  },
}));

const BoardCardCreator = ({ sourceState, setState, containerId, request }) => {
  const [isBoardCardCreatorVisible, setBoardCardCreatorVisibility] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const classes = useStyles();

  const showBoardCardCreator = () => {
    setBoardCardCreatorVisibility(true);
  };

  const add = async () => {
    if (inputValue === '') {
      return;
    }

    const requestBody = {        
      name: inputValue,
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
    setBoardCardCreatorVisibility(false);
  };

  const onInputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Paper className={isBoardCardCreatorVisible ? classes.creator_visible : classes.creator}>
      <Collapse in={isBoardCardCreatorVisible} collapsedHeight={34}>
        {isBoardCardCreatorVisible
          ? (
            <>
              <Box className={classes.board__header}>
                <Box>
                  Tags
                </Box>
                <OutlinedInput
                  fullWidth
                  className={classes.creator__inputWrapper}
                  inputProps={{ className: classes.creator__input }}
                  size="small"
                  placeholder="Add header..."
                  margin="dense"
                  value={inputValue}
                  onChange={onInputChangeHandler}
                  autoFocus
                />
                <Box>
                  People
                </Box>
              </Box>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={add}
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
                </Box>
                <IconButton
                  aria-label="cancel"
                  onClick={() => {}}
                  size="small"
                >
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <Button
              variant="contained"
              className={classes.creator__addNewCardButton}
              onClick={showBoardCardCreator}
            >
              Add new card
            </Button>
          )}
      </Collapse>
    </Paper>
  );
};

export default BoardCardCreator;
