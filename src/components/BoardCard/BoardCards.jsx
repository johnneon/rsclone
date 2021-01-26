/* eslint-disable no-underscore-dangle */
import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useSnackbar } from 'notistack';
import CreateButton from '../CreateButton/CreateButton';
import useHttp from '../../hooks/http.hook';
import BoardCard from './BoardCard';
import BoardDeletePopup from '../boardDeletePopup/boardDeletePopup';

const BoardCards = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { request } = useHttp();
  const [cards, setCards] = useState([]);
  const [openAsk, setOpen] = useState(false);
  const [cardDeleteName, setName] = useState();
  const [cardDeleteId, setId] = useState();

  const createCard = (data) => {
    setCards([...cards, data]);
  };

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const getCardsData = useCallback(async () => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/board/',
        method: 'GET',
      };

      const data = await request(requestOptions);
      setCards(data);
    } catch (e) {
      console.log(e);
    }
  }, [request]);

  const deleteBoard = async (id) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/${id}`,
        method: 'DELETE',
      };

      await request(requestOptions);
      getCardsData(request);
      showSnackbar('Board deleted!', 'success');
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
    setOpen(false);
  };

  const getAskPopup = (id, name) => {
    setOpen(true);
    setName(name);
    setId(id);
  };

  const agree = () => {
    deleteBoard(cardDeleteId);
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log('here');
    getCardsData();
  }, [getCardsData]);

  const cardsTemplates = cards.map((item) => {
    const currentItem = item;

    if (typeof currentItem === 'object') {
      return (
        <BoardCard
          id={currentItem._id}
          title={currentItem.name}
          deleteBoard={getAskPopup}
          key={currentItem._id}
        />
      );
    }

    return null;
  });

  return (
    <>
      {cardsTemplates}
      <CreateButton
        setCards={setCards}
        createCard={createCard}
      />
      <BoardDeletePopup
        isOpen={openAsk}
        name={cardDeleteName}
        agree={agree}
        close={close}
      />
    </>
  );
};

export default BoardCards;
