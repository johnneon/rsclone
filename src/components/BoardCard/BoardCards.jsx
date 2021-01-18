import React, { useContext, useState, useEffect } from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';

import {
  AddCircle,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../../context/AuthContext';
import BoardCreatePopup from '../BoardCreatePopup/BoardCreatePopup';
import useHttp from '../../hooks/http.hook';
import BoardCard from './BoardCard';

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

const BoardCards = () => {
  const classes = useStyles();
  const { token, userId } = useContext(AuthContext);
  const { request } = useHttp();
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getCardsData = async (id, tok, req) => {
    const requestOptions = {
      url: `https://rsclone-back-end.herokuapp.com/api/board/all/${id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${tok}` },
    };

    const data = await req(requestOptions);

    setCards(data);
  };

  const createNewBoard = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/board/',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: { ...data },
      };

      const boardsData = await request(requestOptions);
      const totalNum = Object.keys(cards).length + 1;
      const total = { ...cards };

      total[totalNum] = boardsData;
      setCards(total);
    } catch (e) {
      console.log(e.message, 'error');
    }
  };

  const deleteBoard = async (id) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/${id}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      };

      await request(requestOptions);
      getCardsData(userId, token, request);
    } catch (e) {
      console.log(e.message, 'error');
    }
  };

  useEffect(() => {
    getCardsData(userId, token, request);
  }, [userId, token, request]);

  const cardsTemplates = Object.keys(cards).map((item) => {
    const currentItem = cards[item];

    return (
      <BoardCard
        id={currentItem._id}
        title={currentItem.name}
        deleteBoard={deleteBoard}
      />
    );
  });

  return (
    <>
      {cardsTemplates}
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

export default BoardCards;
