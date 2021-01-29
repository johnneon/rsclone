/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';

const useStyles = makeStyles((theme) => ({
  menu: {
    zIndex: 1,
  },
  menu__container: {
    // zIndex: 2000,
  },
  menu__Item: {
    // backgroundColor: 'grey',
  },
}));

const BoardColumnMenu = ({
  open, handleClose, anchorEl, deleteColumn, id,
}) => {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const deleteCurrentColumn = async () => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/column/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await request(requestOptions);
      deleteColumn(id);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      transition
      disablePortal
      placement="right-start"
      className={classes.menu}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper className={classes.menu__container}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow">
                <MenuItem
                  className={classes.menu__item}
                  onClick={handleClose}
                >
                  Add card
                </MenuItem>
                <MenuItem
                  className={classes.menu__item}
                  onClick={handleClose}
                >
                  Move list
                </MenuItem>
                <MenuItem
                  className={classes.menu__item}
                  onClick={handleClose}
                >
                  Sort by... (будем делать сортировку карточек?)
                </MenuItem>
                <MenuItem
                  className={classes.menu__item}
                  onClick={handleClose}
                >
                  Move all cards in this list
                </MenuItem>
                <MenuItem
                  className={classes.menu__item}
                  onClick={handleClose}
                >
                  Delete all cards in this list
                </MenuItem>
                <MenuItem
                  className={classes.menu__item}
                  onClick={deleteCurrentColumn}
                >
                  Delete this list
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

BoardColumnMenu.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
  deleteColumn: PropTypes.func,
};

BoardColumnMenu.defaultProps = {
  open: false,
  handleClose: () => {},
  anchorEl: null,
  deleteColumn: () => {},
};

export default BoardColumnMenu;
