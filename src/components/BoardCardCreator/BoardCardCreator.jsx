import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Box, Button, Collapse, IconButton, OutlinedInput,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
import BoardCardMenu from '../BoardCardMenu/BoardCardMenu';

const useStyles = makeStyles((theme) => ({
  creator: {
    margin: '5px',
    backgroundColor: 'transparent',
    height: 'fit-content',
  },
  creator_visible: {
    marginBottom: '5px',
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
    padding: '0px',
    width: '100%',
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
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
  creator__submit: {
    marginRight: '5px',
    padding: '2px',
  },
}));

const BoardCardCreator = ({
  request, type, close, value, deleteCard,
}) => {
  const [isBoardCardCreatorVisible, setBoardCardCreatorVisibility] = useState(type === 'editor');
  const [inputValue, setInputValue] = useState(value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const anchorRef = useRef(null);
  const inputRef = useRef(null);
  const classes = useStyles();

  const showBoardCardCreator = () => {
    setBoardCardCreatorVisibility(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const add = async () => {
    if (!inputValue.trim()) {
      inputRef.current.focus();
      return;
    }

    const requestBody = { name: inputValue };

    await request(requestBody);
    setInputValue('');

    if (type !== 'editor') {
      inputRef.current.focus();
    }
  };

  const cancel = () => {
    setBoardCardCreatorVisibility(false);
    setInputValue('');

    if (close) {
      close();
    }
  };

  const onInputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Paper
      className={isBoardCardCreatorVisible ? classes.creator_visible : classes.creator}
      variant="outlined"
      ref={anchorRef}
    >
      <Collapse in={isBoardCardCreatorVisible} collapsedHeight={34}>
        {isBoardCardCreatorVisible
          ? (
            <>
              <Box className={classes.board__header}>
                <Box>
                  {/* Tags */}
                </Box>
                <OutlinedInput
                  fullWidth
                  className={classes.creator__inputWrapper}
                  inputProps={{ className: classes.creator__input }}
                  inputRef={inputRef}
                  size="small"
                  placeholder="Add header..."
                  margin="dense"
                  value={inputValue}
                  onChange={onInputChangeHandler}
                  autoFocus
                  multiline
                />
                <Box>
                  {/* People */}
                </Box>
              </Box>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Button
                    className={classes.creator__submit}
                    aria-label="submit"
                    variant="contained"
                    color="primary"
                    onClick={add}
                    size="small"
                  >
                    { type === 'editor' ? 'Submit' : 'Add'}
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
                  aria-label="options"
                  onClick={openMenu}
                  size="small"
                  // ref={anchorRef}
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
      <BoardCardMenu
        open={isMenuOpen}
        handleClose={closeMenu}
        anchorEl={anchorRef.current}
        deleteCard={deleteCard}
      />
    </Paper>
  );
};

BoardCardCreator.propTypes = {
  request: PropTypes.func,
  type: PropTypes.string,
  close: PropTypes.func,
  value: PropTypes.string,
  deleteCard: PropTypes.func,
};

BoardCardCreator.defaultProps = {
  request: () => {},
  type: '',
  close: () => {},
  value: '',
  deleteCard: () => {},
};

export default BoardCardCreator;
