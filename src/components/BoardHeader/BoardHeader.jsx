import React, {
  useState, useRef, useCallback, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import BoardHeaderUsers from '../BoardHeaderUsers/BoardHeaderUsers';
import BoardHeaderName from '../BoardHeaderName/BoardHeaderName';
import BoardBackgroundMenu from '../BoardBackgroundMenu/BoardBackgroundMenu';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  boardHeader: {
    padding: '8px 10px',
    color: theme.palette.text.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boardHeader__options: {
    display: 'flex',
    alignItems: 'center',
  },
  boardHeader__element: {
    marginRight: '5px',
    padding: '3px 8px',
    width: 'fit-content',
    minWidth: 'unset',
    backgroundColor: theme.palette.buttons.transparentWhite,
    border: 'none',
  },
  boardHeader__homeIcon: {
    color: theme.palette.text.white,
  },
}));

const BoardHeader = ({ boardName, users, boardId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorEl = useRef(null);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const updateBoardData = async (data) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/${boardId}`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      };
      await request(requestOptions);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  return (
    <Box className={classes.boardHeader}>
      <Box className={classes.boardHeader__options}>
        <Link to="/home">
          <Button className={classes.boardHeader__element}>
            <HomeRoundedIcon
              className={classes.boardHeader__homeIcon}
              color="inherit"
            />
          </Button>
        </Link>
        <Button
          color="inherit"
          className={classes.boardHeader__element}
        >
          Boards
        </Button>
        <BoardHeaderName
          boardId={boardId}
          boardName={boardName}
          request={updateBoardData}
        />
        <BoardHeaderUsers data={users} />
      </Box>
      <Button
        color="inherit"
        className={classes.boardHeader__element}
        onClick={toggleMenu}
        ref={anchorEl}
      >
        Background
      </Button>
      <BoardBackgroundMenu
        anchorEl={anchorEl.current}
        handleClose={toggleMenu}
        isOpen={isMenuOpen}
        request={updateBoardData}
      />
    </Box>
  );
};

BoardHeader.propTypes = {
  boardName: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ),
  boardId: PropTypes.string,
};

BoardHeader.defaultProps = {
  boardName: '',
  users: [],
  boardId: '',
};

export default BoardHeader;
