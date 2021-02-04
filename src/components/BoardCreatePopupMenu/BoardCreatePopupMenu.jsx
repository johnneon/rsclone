import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import ColorPalette from '../ColorPalette/ColorPalette';
import ImagePalette from '../ImagePalette/ImagePalette';
import variables from '../../variables';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: '100%',
    maxWidth: 500,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    '& .MuiMenu-paper': {
      marginTop: 16,
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        minWidth: 'calc(100% - 64px)',
        maxWidth: 'calc(100% - 64px)',
      },
    },
    '& .MuiList-padding': {
      padding: 0,
      width: '100%',
    },
    zIndex: theme.zIndex.backdrop + 1,
  },
  accordion: {
    margin: 0,
    // width: '100%',
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    minHeight: 40,
    display: 'flex',
    flexDirection: 'column',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: 0,
    },
    '& .MuiCollapse-container': {
      overflowY: 'auto',
    },
  },
  heading: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 40,
    fontSize: theme.typography.pxToRem(15),
    '&.Mui-expanded': {
      minHeight: 40,
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: '2px 0',
    },
    '& .MuiIconButton-root': {
      padding: 8,
    },
  },
  palette__wrapper: {
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
  },
  palette: {
    height: 'fit-content',
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
    backgroundSize: 'cover',
    '&:hover': {
      filter: 'brightness(0.5)',
    },
  },
  hidden: {
    display: 'none',
  },
}));

const BoardCreatePopupMenu = ({ onClick, isOpen }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const { BACKGROUND_COLORS } = variables;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      elevation={0}
      className={isOpen ? classes.menu : classes.hidden}
    >
      <Accordion
        expanded={expanded === 'colors'}
        onChange={handleChange('colors')}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.heading}
        >
          <Typography>Colors</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.palette__wrapper}>
          <ColorPalette
            onClick={onClick}
            colors={BACKGROUND_COLORS}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'images'}
        onChange={handleChange('images')}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.heading}
        >
          <Typography>Images</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.palette__wrapper}>
          <ImagePalette
            onClick={onClick}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

BoardCreatePopupMenu.propTypes = {
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
};

BoardCreatePopupMenu.defaultProps = {
  onClick: null,
  isOpen: false,
};

export default BoardCreatePopupMenu;
