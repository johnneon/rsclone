import React from 'react';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
      card: '#fafafa',
      column: '#eceff1',
    },
    shadow: {
      main: '#9e9e9e',
    },
    text: {
      main: '#3e3a3a',
      white: '#fff',
    },
    buttons: {
      transparentWhite: '#78787866',
      transparentWhiteHover: '#b2b2b270',
      grey: '#dcdcdc',
      greyHover: '#b3b3b3',
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
    subtitle1: {
      fontSize: '0.875rem',
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
