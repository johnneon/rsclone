import React, {
  useState, useContext, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Box, OutlinedInput, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';
import { BoardDataContext } from '../../context/BoardDataContext';

const useStyles = makeStyles((theme) => ({
  board__header: {
    padding: '3px',
    fontWeight: 700,
    fontSize: theme.typography.h4.fontSize,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  board__headerInput: {
    padding: '5px',
    width: '100%',
    fontWeight: 700,
    fontSize: theme.typography.h4.fontSize,
    overflowWrap: 'anywhere',
    alignSelf: 'baseline',
    '& textarea': {
      padding: '0px',
      height: '100%',
      lineHeight: '1.2',
      alignSelf: 'baseline',
    },
  },
}));

const BoardColumnHeader = ({ name, id, dragHandleProps }) => {
  const [header, setHeader] = useState(name);
  const [isHeaderEditable, setHeaderEditable] = useState(false);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();
  const { updateBoardData } = useContext(BoardDataContext);

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
      updateBoardData.updateColumn({ name: value, _id: id });
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const deleteColumn = async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await request(requestOptions);
      updateBoardData.deleteColumn(id);
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
          <OutlinedInput
            className={classes.board__headerInput}
            value={header}
            inputProps={{ 'aria-label': 'column header' }}
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
        onClick={deleteColumn}
        size="small"
      >
        <DeleteForeverIcon fontSize="inherit" />
      </IconButton>
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
};

BoardColumnHeader.defaultProps = {
  name: '',
  id: '',
  dragHandleProps: {},
};

export default BoardColumnHeader;
