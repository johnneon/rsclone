import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useSnackbar } from 'notistack';
import CreateButton from '../CreateButton/CreateButton';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';
import BoardCard from './BoardCard';

const BoardCards = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [cards, setCards] = useState([]);

  const createCard = (data) => {
    setCards([...cards, data]);
  };

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const getCardsData = async (tok, req) => {
    const requestOptions = {
      url: 'https://rsclone-back-end.herokuapp.com/api/board/',
      method: 'GET',
      headers: { Authorization: `Bearer ${tok}` },
    };

    const data = await req(requestOptions);
    setCards(data);
  };

  const deleteBoard = async (id) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/${id}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      };

      await request(requestOptions);
      getCardsData(token, request);
      showSnackbar('Board deleted!', 'success');
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  useEffect(() => {
    getCardsData(token, request);
  }, [token, request]);

  const cardsTemplates = cards.map((item) => {
    const currentItem = item;

    if (typeof currentItem === 'object') {
      return (
        <BoardCard
          id={currentItem._id}
          title={currentItem.name}
          deleteBoard={deleteBoard}
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
    </>
  );
};

export default BoardCards;
