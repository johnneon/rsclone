import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, InputBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boardHeader__element: {
    marginRight: '5px',
    padding: '3px 8px',
    width: 'fit-content',
    minWidth: 'unset',
    backgroundColor: theme.palette.buttons.transparentWhite,
    border: 'none',
  },
  boardHeader__nameContainer: {
    position: 'relative',
  },
  boardHeader__name: {
    padding: '1px 4px',
    marginRight: '5px',
    height: '100%',
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    color: theme.palette.text.white,
    lineHeight: '1.75',
    whiteSpace: 'pre',
    backgroundColor: theme.palette.buttons.transparentWhite,
    border: 'none',
    borderRadius: '4px',
    boxSizing: 'border-box',
    visibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    '& input': {
      padding: '4px 0px 5px',
      height: '100%',
      letterSpacing: 'normal',
      whiteSpace: 'pre-wrap',
      border: 'none',
    },
  },
  boardHeader__name_visible: {
    visibility: 'visible',
    position: 'static',
  },
}));

const BoardHeaderName = ({ boardName, request }) => {
  const [name, setName] = useState(boardName);
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [nameInputWidth, setNameInputWidth] = useState('0px');

  const inputRef = useRef(null);
  const nameTextFieldRef = useRef(null);

  const classes = useStyles();

  const headerNameChangeHandler = (e) => {
    const { width } = nameTextFieldRef.current.getBoundingClientRect();

    setNameInputWidth(`${width}px`);
    setName(e.target.value);
  };

  const startNameEditing = () => {
    setIsNameEdited(true);
  };

  const stopNameEditing = async () => {
    if (!name.trim().length) {
      inputRef.current.focus();
      return;
    }

    setIsNameEdited(false);
    request({ name });
  };

  const onKeyPressHandler = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    stopNameEditing();
  };

  useEffect(() => setName(boardName), [boardName, setName]);

  useEffect(() => {
    if (isNameEdited) {
      inputRef.current.focus();
    }
  }, [isNameEdited]);

  useEffect(() => {
    const { width } = nameTextFieldRef.current.getBoundingClientRect();
    setNameInputWidth(`${width}px`);
  }, [name]);

  return (
    <Box className={classes.boardHeader__nameContainer}>
      <InputBase
        value={name}
        className={`
          ${classes.boardHeader__name} 
          ${isNameEdited ? classes.boardHeader__name_visible : ''}
        `}
        inputProps={{ maxLength: 50 }}
        style={{ width: nameInputWidth }}
        size="small"
        inputRef={inputRef}
        spellCheck="false"
        onChange={headerNameChangeHandler}
        onBlur={stopNameEditing}
        onKeyPress={onKeyPressHandler}
      />
      <Typography
        className={`
          ${classes.boardHeader__name} 
          ${!isNameEdited ? classes.boardHeader__name_visible : ''}
        `}
        variant="h5"
        onClick={startNameEditing}
        component="p"
        ref={nameTextFieldRef}
      >
        {name}
      </Typography>
    </Box>
  );
};

BoardHeaderName.propTypes = {
  boardName: PropTypes.string,
  request: PropTypes.func,
};

BoardHeaderName.defaultProps = {
  boardName: '',
  request: null,
};

export default BoardHeaderName;
