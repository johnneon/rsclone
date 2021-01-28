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
import React, { useState, useContext, useCallback } from 'react';
import {
  Typography, Box, InputBase, IconButton,
} from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
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
    // userSelect: 'none',
  },
}));

const BoardColumnHeader = ({
  name, id, dragHandleProps, deleteColumn,
}) => {
  const [header, setHeader] = useState(name);
  const [isHeaderEditable, setHeaderEditable] = useState(false)
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const startEditHeader = () => {
    setHeaderEditable(true);
  }

  const stopEditHeader = () => {
    setHeaderEditable(false);
    updateHeaderName(header);
  }

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const deleteCurrentColumn = async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await request(requestOptions);

      deleteColumn(id);
      console.log(response);
    } catch (e) {
      console.log(e.message);
      showSnackbar(e.message, 'error');
    }
  }

  const onChange = (e) => {
    setHeader(e.target.value)
  }

  const updateHeaderName = async (name) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: { name },
      };
      console.log(requestOptions)
      const response = await request(requestOptions);

      console.log(response);
    } catch (e) {
      console.log(e.message);
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
        onClick={deleteCurrentColumn}
        size="small"
      >
        <MoreHorizIcon />
      </IconButton>
    </Box>
  );
};

export default BoardColumnHeader;
