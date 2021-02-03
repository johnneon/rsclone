import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  palette: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'auto',
  },
  palette__item: {
    margin: 5,
    width: 80,
    height: 55,
    borderRadius: 4,
    '&:hover': {
      filter: 'brightness(0.5)',
    },
  },
}));

const Palette = ({ onClick, data }) => {
  const classes = useStyles();

  const handleClick = (color) => () => onClick(color);

  return (
    <List className={classes.palette}>
      {data.map((elem) => (
        <ListItem
          button
          key={elem.key}
          className={classes.palette__item}
          style={{ background: `center / cover no-repeat ${elem.value}` }}
          onClick={handleClick(elem.value)}
        />
      ))}
    </List>
  );
};

Palette.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ),
};

Palette.defaultProps = {
  onClick: null,
  data: [],
};

export default Palette;
