import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  board__placeholder: {
    backgroundColor: 'darkgrey',
  },
}));

const Placeholder = ({ width, height, id }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.board__placeholder}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
      }}
      id={id}
    />

  );
};

Placeholder.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.string,
};

Placeholder.defaultProps = {
  width: 0,
  height: 0,
  id: 'placeholder',
};
export default Placeholder;
