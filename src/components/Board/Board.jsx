/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useState, useContext, useEffect, useCallback,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';
import BoardContent from '../BoardContent/BoardContent';

const useStyles = makeStyles((theme) => ({
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

const Board = ({ id }) => {
  const [boardData, setBoardData] = useState({});

  const { token } = useContext(AuthContext);
  const { request } = useHttp();

  const classes = useStyles();

  const getBoardData = useCallback(async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/${'600f1074f07eac0017def6ef'}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      };
      const response = await request(requestOptions);

      setBoardData(response);
    } catch (e) {
      console.log(e.message, 'error');
    }
  }, [id, request, token]);

  useEffect(() => getBoardData(), [getBoardData]);

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main
          style={{
            height: '100%', backgroundColor: '#88adfb', display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
          }}
          onDragStart={(e) => e.preventDefault()}
        >
          <div style={{ height: '30px', backgroundColor: 'lightgrey' }}>
            Settings
          </div>
          <BoardContent columnData={boardData.columns} boardId={boardData._id} />
        </main>
      </div>
    </SnackbarProvider>
  );
};

export default Board;
