import React, {
  useState, useContext, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
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
  const [isHeaderEditable, setHeaderEditable] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const anchorRef = useRef(null);
  const inputRef = useRef(null);

  const classes = useStyles();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const updateHeaderName = async (value) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { name: value },
      };

      await request(requestOptions);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const startEditHeader = () => {
    setHeaderEditable(true);
  };

  const onChange = (e) => {
    setHeader(e.target.value);
  };

  const stopEditHeader = () => {
    if (!name.trim().length) {
      inputRef.current.focus();
      return;
    }

    setHeaderEditable(false);
    updateHeaderName(header);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  return (
    <Box
      className={classes.board__header}
      aria-describedby={dragHandleProps['aria-describedby']}
      data-rbd-drag-handle-context-id={dragHandleProps['data-rbd-drag-handle-context-id']}
      data-rbd-drag-handle-draggable-id={dragHandleProps['data-rbd-drag-handle-draggable-id']}
      draggable={dragHandleProps.draggable}
      onDragStart={dragHandleProps.onDragStart}
      role={dragHandleProps.role}
      tabIndex={dragHandleProps.tabIndex}
    >
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

BoardColumnHeader.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  dragHandleProps: PropTypes.shape({
    'aria-describedby': PropTypes.string,
    'data-rbd-drag-handle-context-id': PropTypes.string,
    'data-rbd-drag-handle-draggable-id': PropTypes.string,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    role: PropTypes.string,
    tabIndex: PropTypes.number,
  }),
  deleteColumn: PropTypes.func,
};

BoardColumnHeader.defaultProps = {
  name: '',
  id: '',
  dragHandleProps: {},
  deleteColumn: () => {},
};

export default BoardColumnHeader;
