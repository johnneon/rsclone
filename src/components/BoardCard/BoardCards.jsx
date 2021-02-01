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
import BoardDeletePopup from '../boardDeletePopup/boardDeletePopup';

const BoardCards = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useContext(AuthContext);
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
    getCardsData(token, request);
  }, [token, request]);

  const cardsTemplates = cards.map((item) => {
    const { _id: itemId, name } = item;

    if (typeof item === 'object') {
      return (
        <BoardCard
          id={itemId}
          title={name}
          deleteBoard={getAskPopup}
          key={itemId}
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
