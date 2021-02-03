import React, {
  useState, useContext, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Typography, Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import BoardCardCreator from '../BoardCardCreator/BoardCardCreator';
import CardPopup from '../CardPopup/CardPopup';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';
import { BoardDataContext } from '../../context/BoardDataContext';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: '5px',
    padding: '5px',
    minHeight: '30px',
    backgroundColor: theme.palette.background.main,
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    cursor: 'pointer',
    '&:hover [class*=card__edit]': {
      visibility: 'visible',
    },
  },
  card__header: {
    padding: '2px',
    width: '100%',
    overflowWrap: 'anywhere',
  },
  card__edit: {
    visibility: 'hidden',
    fontSize: theme.typography.h3.fontSize,
  },
}));

const TaskCard = ({ data, index, users }) => {
  const [card, setCard] = useState(data);
  const [isEditorOpen, setEditorState] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();
  const { updateBoardData } = useContext(BoardDataContext);

  const { _id: id } = card;

  const classes = useStyles();

  useEffect(() => setCard(data), [data, setCard]);

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const openEditor = (e) => {
    e.stopPropagation();
    setEditorState(true);
  };

  const closeEditor = () => {
    setEditorState(false);
  };

  const toggleCardPopup = () => {
    setIsCardOpen(!isCardOpen);
  };

  const deleteCard = async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await request(requestOptions);
      updateBoardData.deleteCard(card);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const updateCard = async (name) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${id}`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: name,
      };

      const response = await request(requestOptions);

      updateBoardData.updateCard(response);
      closeEditor();
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const updateCardData = (value) => {
    const cardData = ({ ...card, ...value });
    updateBoardData.updateCard(cardData);
  };

  if (isEditorOpen) {
    return (
      <BoardCardCreator
        request={updateCard}
        type="editor"
        close={closeEditor}
        value={card.name}
        deleteCard={deleteCard}
      />
    );
  }

  return (
    <>
      <Draggable draggableId={id} index={index} type="card">
        {(provided) => {
          const { draggableProps, dragHandleProps } = provided;
          return (
            <div
              ref={provided.innerRef}
              data-rbd-draggable-context-id={draggableProps['data-rbd-draggable-context-id']}
              data-rbd-draggable-id={draggableProps['data-rbd-draggable-id']}
              onTransitionEnd={draggableProps.onTransitionEnd}
              style={draggableProps.style}
              aria-describedby={dragHandleProps['aria-describedby']}
              data-rbd-drag-handle-context-id={dragHandleProps['data-rbd-drag-handle-context-id']}
              data-rbd-drag-handle-draggable-id={dragHandleProps['data-rbd-drag-handle-draggable-id']}
              draggable={dragHandleProps.draggable}
              onDragStart={dragHandleProps.onDragStart}
              role={dragHandleProps.role}
              tabIndex={dragHandleProps.tabIndex}
            >
              <Box
                className={classes.card}
                onClick={toggleCardPopup}
              >
                <Typography
                  className={classes.card__header}
                  variant="h5"
                  component="h3"
                >
                  {card.name || 'Enter card name'}
                </Typography>
                <IconButton
                  className={classes.card__edit}
                  aria-label="edit"
                  onClick={openEditor}
                  size="small"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </div>
          );
        }}

      </Draggable>
      <CardPopup
        isOpen={isCardOpen}
        idCard={id}
        users={users}
        close={toggleCardPopup}
        updateCardData={updateCardData}
        cardData={card}
      />
    </>
  );
};

TaskCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  users: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
};

TaskCard.defaultProps = {
  data: {},
  users: [],
  index: 0,
};

export default TaskCard;
