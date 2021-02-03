import React from 'react';
import PropTypes from 'prop-types';
import Palette from '../Palette/Palette';

const ColorPalette = ({ onClick, colors }) => {
  const paletteColors = colors.map((color) => ({
    value: color, key: color,
  }));

  return (
    <Palette
      data={paletteColors}
      onClick={onClick}
    />
  );
};

ColorPalette.propTypes = {
  onClick: PropTypes.func,
  colors: PropTypes.arrayOf(PropTypes.string),
};

ColorPalette.defaultProps = {
  onClick: null,
  colors: [],
};

export default ColorPalette;
