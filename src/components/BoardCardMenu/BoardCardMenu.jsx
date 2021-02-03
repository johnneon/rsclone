/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  menu: {
    zIndex: 1,
  },
}));

const BoardCardMenu = ({
  open, handleClose, anchorEl, deleteCard,
}) => {
  const classes = useStyles();

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      // role={undefined}
      transition
      // disablePortal={false}
      placement="left-start"
      className={classes.menu}
      modifiers={{
        flip: {
          enabled: true,
        },
        // preventOverflow: {
        //   enabled: true,
        //   boundariesElement: 'scrollParent',
        // },
        // arrow: {
        //   enabled: false,
        //   element: anchorEl,
        // },
      }}
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
    PropTypes.shape({ current: PropTypes.node }),
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
