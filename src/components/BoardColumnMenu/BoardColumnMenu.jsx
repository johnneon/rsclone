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

const BoardColumnMenu = ({
  open, handleClose, anchorEl, deleteColumn, id,
}) => {
  const classes = useStyles();

  const deleteCurrentColumn = async () => {
    deleteColumn(id);
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
          in={TransitionProps.in}
          onEnter={TransitionProps.onEnter}
          onExited={TransitionProps.onExited}
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
  id: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]),
  deleteColumn: PropTypes.func,
};

BoardColumnMenu.defaultProps = {
  id: '',
  open: false,
  handleClose: () => {},
  anchorEl: null,
  deleteColumn: () => {},
};

export default BoardColumnMenu;
