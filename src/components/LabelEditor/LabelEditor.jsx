/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, {
  useState, useRef, useContext, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import { useSnackbar } from 'notistack';
import AuthContext from '../../context/AuthContext';
import { BoardDataContext } from '../../context/BoardDataContext';
import useHttp from '../../hooks/http.hook';

const useStyles = ({ color, textColor }) => (makeStyles(() => ({
  editor: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textfield: {
    margin: 5,
    padding: 0,
    width: 180,
    height: 30,
    backgroundColor: color,
    color: textColor,
    boxSizing: 'border-box',
    cursor: 'auto',
    '& input': {
      margin: 0,
      padding: '0 10px',
      boxSizing: 'border-box',
    },
    '& [type="button"]': {
      cursor: 'pointer',
    },
  },
})))();

const LabelEditor = ({ onClick, styles, cardId }) => {
  const [value, setValue] = useState(styles.name);
  const [isEdited, setIsEdited] = useState(false);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();
  const { boardData, updateBoardData } = useContext(BoardDataContext);
  const { labels, _id: id } = boardData;

  const inputRef = useRef(null);
  const classes = useStyles(styles);

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const handlerOnChange = ({ target }) => {
    setValue(target.value);
  };

  const updateLabel = async (label) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/${id}`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { label },
      };
      await request(requestOptions);

      const editableLable = labels.find(({ color }) => color === label.color);
      editableLable.name = label.name;
      updateBoardData.updateBoard({ labels });
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const toggleEditor = () => {
    if (!isEdited) {
      inputRef.current.focus();
    } else {
      updateLabel({ ...styles, name: value });
    }

    setIsEdited(!isEdited);
  };

  const handlerOnClick = async () => {
    if (isEdited) {
      return;
    }

    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${cardId}`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          label: {
            color: styles.color,
          },
        },
      };
      const response = await request(requestOptions);

      updateBoardData.updateCard(response);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  return (
    <Box className={classes.editor}>
      <Input
        fullWidth
        disableUnderline
        inputRef={inputRef}
        value={value}
        readOnly={!isEdited}
        className={classes.textfield}
        type={isEdited ? 'text' : 'button'}
        onClick={handlerOnClick}
        onChange={handlerOnChange}
      />
      <IconButton
        // className={classes.card__edit}
        aria-label="edit"
        onClick={toggleEditor}
        size="small"
      >
        {isEdited
          ? (
            <DoneIcon
              fontSize="inherit"
              color="primary"
            />
          ) : (
            <EditIcon fontSize="inherit" />
          )}
      </IconButton>
    </Box>
  );
};

export default LabelEditor;
