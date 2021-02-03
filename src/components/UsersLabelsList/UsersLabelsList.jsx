import {
  React,
  useContext,
  useCallback,
} from 'react';

import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import {
  Done,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import AuthContext from '../../context/AuthContext';
import { BoardDataContext } from '../../context/BoardDataContext';
import useHttp from '../../hooks/http.hook';

const useStyles = makeStyles(() => ({
  done: {
    border: 'none',
    marginRight: '10px',
    marginLeft: '-5px',
    width: '10px',
    height: '10px',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
  },
}));

const UsersLabelsList = ({
  idCard, users, usersIdx, open, handleClose, anchorEl,
}) => {
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { updateBoardData } = useContext(BoardDataContext);
  const { enqueueSnackbar } = useSnackbar();
  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const updateCardUser = async (data) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${idCard}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          ...data,
        },
      };

      const response = await request(requestOptions);
      updateBoardData.updateCard(response);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const setUser = ({ target }) => {
    const id = target.getAttribute('data-id');
    const have = target.getAttribute('data-have');
    const user = { ...users[id] };
    const body = {};
    const { _id: userId } = user;

    if (have === '1') {
      body.kick = userId;
    } else {
      body.add = userId;
    }

    updateCardUser(body);
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      transition
      disablePortal
      placement="bottom"
      className={classes.menu}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          in={TransitionProps.in}
          onEnter={TransitionProps.onEnter}
          onExited={TransitionProps.onExited}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper className={classes.card__menu}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow">
                {users.map((item, idx) => {
                  const user = item;
                  const { _id: userId } = user;
                  let checked = false;

                  if (usersIdx.indexOf(userId) !== -1) {
                    checked = true;
                  }

                  return (
                    <MenuItem
                      className={classes.card__menuItem}
                      onClick={setUser}
                      data-id={idx}
                      data-have={checked ? '1' : '0'}
                      key={userId}
                    >
                      {
                      checked
                        ? <Done className={classes.done} />
                        : ''
                      }
                      {user.fullName}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

UsersLabelsList.propTypes = {
  idCard: PropTypes.string,
  open: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
  usersIdx: PropTypes.arrayOf(PropTypes.string),
  handleClose: PropTypes.func,
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]),
};

UsersLabelsList.defaultProps = {
  idCard: '',
  users: [],
  usersIdx: [],
  open: false,
  handleClose: () => {},
  anchorEl: null,
};

export default UsersLabelsList;
