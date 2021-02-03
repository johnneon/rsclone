import React, {
  useState, useContext, useEffect, useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';
import BoardHeader from '../BoardHeader/BoardHeader';
import BoardContent from '../BoardContent/BoardContent';
import BoardDataContextProvider from '../../context/BoardDataContext';

const useStyles = makeStyles((theme) => ({
  board: {
    height: '100%',
    backgroundColor: '#88adfb',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  board__content: {
    padding: '10px',
    height: '100%',
    display: 'flex',
    position: 'relative',
    overflowX: 'auto',
    boxSizing: 'border-box',
  },
  board__button: {
    padding: '10px 20px',
    height: 'fit-content',
    minWidth: '270px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.buttons.transparentWhite,
    '&:hover': {
      backgroundColor: theme.palette.buttons.transparentWhiteHover,
    },
  },
}));

const Board = () => {
  const { id } = useParams();

  const [boardData, setBoardData] = useState({});
  const { _id: boardId, columns } = boardData;

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const getBoardData = useCallback(async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await request(requestOptions);

      setBoardData(response);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  }, [id, request, token, showSnackbar]);

  useEffect(() => {
    getBoardData();
  }, [getBoardData]);

  return (
    <BoardDataContextProvider
      boardData={boardData}
      setBoardData={setBoardData}
    >
      <main
        className={classes.board}
        style={{ background: `center / cover no-repeat ${boardData.background || '#88adfb'}` }}
      >
        <BoardHeader
          boardName={boardData.name}
          boardId={boardId}
          users={boardData.users}
        />
        <BoardContent
          columnsData={columns}
          boardId={boardId}
        />
      </main>
    </BoardDataContextProvider>
  );
};

export default Board;
