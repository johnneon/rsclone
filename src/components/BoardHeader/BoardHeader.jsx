/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useState, useEffect, useCallback, useContext, useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, InputBase, Typography,
} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  boardHeader: {
    padding: '8px 10px',
    color: theme.palette.text.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boardHeader__options: {
    display: 'flex',
    alignItems: 'center',
  },
  boardHeader__element: {
    marginRight: '5px',
    padding: '3px 5px',
    width: 'fit-content',
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
      marginLeft: '-1px',
      padding: '4px 0px',
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
  boardHeader__avatar: {
    marginRight: '5px',
    width: '30px',
    height: '30px',
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  boardHeader__users: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const BoardHeader = ({ boardName, users, boardId }) => {
  const [name, setName] = useState(boardName);
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [nameInputWidth, setNameInputWidth] = useState('0px');

  const inputRef = useRef(null);
  const nameTextFieldRef = useRef(null);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const headerNameChangeHandler = (e) => {
    setName(e.target.value);
    setNameInputWidth(`${nameTextFieldRef.current.offsetWidth}px`);
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

    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/${boardId}`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { name },
      };
      await request(requestOptions);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  useEffect(() => setName(boardName), [boardName, setName]);

  useEffect(() => {
    if (isNameEdited) {
      inputRef.current.focus();
    }
  }, [isNameEdited]);

  useEffect(() => {
    setNameInputWidth(nameTextFieldRef.current.offsetWidth);
  }, [name]);

  return (
    <Box className={classes.boardHeader}>
      <Box className={classes.boardHeader__options}>
        <Button className={classes.boardHeader__element}>
          <HomeRoundedIcon color="inherit" />
        </Button>
        <Button
          color="inherit"
          className={classes.boardHeader__element}
        >
          Boards
        </Button>
        <Box className={classes.boardHeader__nameContainer}>
          <InputBase
            className={`
              ${classes.boardHeader__name} 
              ${isNameEdited ? classes.boardHeader__name_visible : ''}
            `}
            inputProps={{ maxLength: 50 }}
            style={{ width: nameInputWidth }}
            value={name}
            onChange={headerNameChangeHandler}
            size="small"
            onBlur={stopNameEditing}
            inputRef={inputRef}
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
        <Box className={classes.boardHeader__users}>
          <Avatar className={classes.boardHeader__avatar}>N</Avatar>
          <Button
            color="inherit"
            className={classes.boardHeader__element}
          >
            Invite
          </Button>
        </Box>
      </Box>
      <Button
        color="inherit"
        className={classes.boardHeader__element}
      >
        Menu
      </Button>
    </Box>
  );
};

BoardHeader.propTypes = {
  boardName: PropTypes.string,
  users: PropTypes.array,
  boardId: PropTypes.string,
};

BoardHeader.defaultProps = {
  boardName: '',
  users: [],
  boardId: '',
};

export default BoardHeader;
