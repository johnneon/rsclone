/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card__menu: {
    // backgroundColor: 'transparent',
  },
  card__menuItem: {
    // backgroundColor: 'grey',
  },
}));

const BoardCardMenu = ({
  open, handleClose, anchorEl, deleteCard,
}) => {
  // const classes = '';
  const classes = useStyles();

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      transition
      disablePortal
      placement="right-start"
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper className={classes.card__menu}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow">
                <MenuItem
                  className={classes.card__menuItem}
                  onClick={handleClose}
                >
                  Open card
                </MenuItem>
                <MenuItem
                  className={classes.card__menuItem}
                  onClick={handleClose}
                >
                  Edit members
                </MenuItem>
                <MenuItem
                  className={classes.card__menuItem}
                  onClick={handleClose}
                >
                  Change labels
                </MenuItem>
                <MenuItem
                  className={classes.card__menuItem}
                  onClick={handleClose}
                >
                  Change due date
                </MenuItem>
                <MenuItem
                  className={classes.card__menuItem}
                  onClick={deleteCard}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

BoardCardMenu.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
  deleteCard: PropTypes.func,
};

BoardCardMenu.defaultProps = {
  open: false,
  handleClose: () => {},
  anchorEl: null,
  deleteCard: () => {},
};

export default BoardCardMenu;
