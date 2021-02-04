import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = (color, textColor) => (makeStyles(() => ({
  background: {
    margin: 2,
    backgroundColor: color,
    color: textColor,
    border: 'none',
    borderRadius: 5,
    height: 'fit-content',
    minHeight: 16,
    minWidth: 30,
  },
})))();

const Label = ({ color, textColor, text }) => {
  const classes = useStyles(color, textColor);

  return (
    <Chip
      variant="outlined"
      className={classes.background}
      label={text}
      size="small"
    />
  );
};

Label.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string,
};

Label.defaultProps = {
  color: '',
  textColor: '',
  text: '',
};

export default Label;
