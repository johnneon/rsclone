/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useCallback, useRef } from 'react';
import {
  Typography, Box, InputBase, IconButton,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import BoardColumnMenu from '../BoardColumnMenu/BoardColumnMenu';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';

const useStyles = makeStyles((theme) => ({
  board__header: {
    padding: '0px',
    fontWeight: 700,
    fontSize: theme.typography.h4.fontSize,
    display: 'flex',
    justifyContent: 'space-between',
  },
  board__headerInput: {
    padding: '2px 5px',
    fontWeight: 700,
    fontSize: theme.typography.h4.fontSize,
    overflowWrap: 'anywhere',
  },
}));

const BoardColumnHeader = ({
  name, id, dragHandleProps, deleteColumn,
}) => {
  const [header, setHeader] = useState(name);
  const [isHeaderEditable, setHeaderEditable] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const anchorRef = useRef(null);
  const inputRef = useRef(null);

  const classes = useStyles();

  const startEditHeader = () => {
    setHeaderEditable(true);
  }

  const stopEditHeader = () => {
    if (!name.trim().length) {
      inputRef.current.focus();
      return;
    }

    setHeaderEditable(false);
    updateHeaderName(header);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  // const deleteCurrentColumn = async () => {
  //   try {
  //     const requestOptions = {
  //       url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     await request(requestOptions);
  //     deleteColumn(id);
  //   } catch (e) {
  //     showSnackbar(e.message, 'error');
  //   }
  // }

  const onChange = (e) => {
    setHeader(e.target.value)
  }

  const updateHeaderName = async (name) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { name },
      };

      await request(requestOptions);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  }

  return (
    <Box className={classes.board__header} {...dragHandleProps}>
      {isHeaderEditable
        ? (
        <InputBase
          className={classes.board__headerInput}
          value={header}
          inputProps={{ 'aria-label': 'column header' }}
          readOnly={!isHeaderEditable}
          inputRef={inputRef}
          fullWidth
          autoFocus
          multiline
          onBlur={stopEditHeader}
          onChange={onChange}
        />
        ) : (
          <Typography
            className={classes.board__headerInput}
            variant="h2"
            onClick={startEditHeader}
          >
            {header}
          </Typography>
        )}
      <IconButton
        aria-label="cancel"
        onClick={openMenu}
        size="small"
        ref={anchorRef}
      >
        <MoreHorizIcon />
      </IconButton>
      <BoardColumnMenu
        open={isMenuOpen}
        handleClose={closeMenu}
        anchorEl={anchorRef.current}
        deleteColumn={deleteColumn}
        id={id}
      />
    </Box>
  );
};

export default BoardColumnHeader;
