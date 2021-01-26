import React, {
  useState,
  useCallback,
} from 'react';

import PropTypes from 'prop-types';

import {
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';

import {
  AddCircle,
} from '@material-ui/icons';

import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import BoardCreatePopup from '../BoardCreatePopup/BoardCreatePopup';
import useHttp from '../../hooks/http.hook';

const useStyles = makeStyles({
  navColor: {
    color: '#3e3a3a',
    textDecoration: 'none',
  },
  cardItem: {
    display: 'block',
    width: 'calc(100% / 3 - 14px)',
    marginRight: '20px',
    marginBottom: '20px',
    textDecoration: 'none',
    border: 'none',
    backgroundColor: '#0000000a',
    '&:nth-child(3n)': {
      marginRight: '0',
    },
  },
  fullHeight: {
    height: '100%',
  },
  circleButton: {
    display: 'block',
    margin: '0 auto',
    width: '50px',
    height: '50px',
  },
});

const CreateButton = ({ createCard }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { request } = useHttp();
  const [open, setOpen] = useState(false);

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewBoard = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/board/',
        method: 'POST',
        body: { ...data },
      };

      const boardsData = await request(requestOptions);

      createCard(boardsData);
      showSnackbar('Board created!', 'success');
    } catch (e) {
      showSnackbar(e.message, 'success');
    }
  };

  return (
    <>
      <Card
        onClick={handleClickOpen}
        variant="outlined"
        className={classes.cardItem}
      >
        <CardActionArea className={classes.fullHeight}>
          <CardContent>
            <AddCircle
              color="action"
              className={classes.circleButton}
            />
          </CardContent>
        </CardActionArea>
      </Card>
      <BoardCreatePopup
        isOpen={open}
        close={handleClose}
        createAction={createNewBoard}
      />
    </>
  );
};

CreateButton.propTypes = {
  createCard: PropTypes.func.isRequired,
};

export default CreateButton;
