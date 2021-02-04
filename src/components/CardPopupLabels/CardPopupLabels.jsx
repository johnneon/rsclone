import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { AddCircle } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import useStyles from '../../hooks/style.hook';
import LabelsMenu from '../LabelsMenu/LabelsMenu';
import Label from '../Label/Label';
import { BoardDataContext } from '../../context/BoardDataContext';

const currentStyles = makeStyles({
  avatars: {
    overflow: 'auto',
    width: 'calc(100% - 70px)',
    flexWrap: 'wrap',
  },
  avatar: {
    marginRight: '10px',
    '&:last-child': {
      marginRight: 0,
    },
  },
});

const CardPopupLabels = ({ idCard, labels }) => {
  const classes = { ...currentStyles(), ...useStyles() };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { boardData } = useContext(BoardDataContext);

  const anchorRef = useRef(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  return (
    <div
      className={`
        ${classes.marginBottomMiddle} 
        ${classes.flex} 
        ${classes.alignItemCenter}
      `}
      ref={anchorRef}
    >
      <div className={`${classes.avatars} ${classes.flex}`}>
        {labels?.length
          ? labels.map(({ color }) => {
            const { textColor, name } = boardData.labels.find((label) => (
              color === label.color
            ));
            return (
              <Label
                text={name}
                color={color}
                textColor={textColor}
                key={color}
              />
            );
          }) : (
            <i>No labels</i>
          )}
      </div>
      <Button
        className={classes.MarginLeftAuto}
        onClick={openMenu}
      >
        <AddCircle />
      </Button>
      <Popover
        open={isMenuOpen}
        anchorEl={anchorRef.current}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >

        <LabelsMenu
          cardId={idCard}
          close={closeMenu}
        />
      </Popover>
    </div>
  );
};

CardPopupLabels.propTypes = {
  idCard: PropTypes.string,
  labels: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ),
};

CardPopupLabels.defaultProps = {
  idCard: '',
  labels: [],
};

export default CardPopupLabels;
