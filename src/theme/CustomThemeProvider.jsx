import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const theme = createMuiTheme({
  root: {
    fontColor: '#f10c0c',
  },
  container: {
    paddingTop: '50px',
  },
  palette: {
    primary: {
      main: '#00c853',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffd600',
      contrastText: '#8c5203',
    },
    background: {
      main: '#fff',
      column: '#fafafa',
    },
    shadow: {
      main: '#9e9e9e',
    },
    text: {
      main: '#3e3a3a',
    },
    buttons: {
      transparentWhite: '#ffffff3d',
    },
  },
  typography: {
    htmlFontSize: 16,
    h1: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.13rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '1rem',
    },
  },
});

export default function CustomThemeProvider(props) {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

CustomThemeProvider.propTypes = {
  children: PropTypes.node,
};

CustomThemeProvider.defaultProps = {
  children: {},
};
