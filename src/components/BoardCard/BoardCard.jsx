import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';

import {
  Close,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  navColor: {
    color: '#3e3a3a',
    textDecoration: 'none',
  },
  cardItem: {
    display: 'block',
    width: 'calc(100% / 3 - 14px)',
    marginRight: '20px',
    marginBottom: '20px',
    textDecoration: 'none',
    padding: 0,
    border: 'none',
    textAlign: 'left',
    '&:nth-child(3n)': {
      marginRight: 0,
    },
    '&:hover .MuiSvgIcon-root': {
      opacity: '1',
    },
    '@media(max-width: 768px)': {
      width: 'calc(50% - 10px)',
      justifyContent: 'center',
      '&:nth-child(3n)': {
        marginRight: '20px',
      },
      '&:nth-child(2n)': {
        marginRight: 0,
      },
    },
    '@media(max-width: 480px)': {
      width: '100%',
      marginRight: 0,
      '&:nth-child(3n)': {
        marginRight: 0,
      },
    },
  },
  media: {
    height: '200px',
    backgroundColor: '#f5f5f5',
  },
  closeButton: {
    position: 'absolute',
    right: '5px',
    top: '5px',
    opacity: 0,
    transition: 'opacity 0.2s',
    zIndex: '10',
  },
});

const BoardCard = ({
  id, title, deleteBoard, background,
}) => {
  const classes = useStyles();

  const deleteThis = () => {
    deleteBoard(id, title);
  };

  const locate = (e) => {
    if (e.target.closest('svg')) {
      e.preventDefault();
    }
  };

  return (
    <NavLink
      onClick={locate}
      className={classes.cardItem}
      to={`/board_${id}`}
    >
      <Card variant="outlined" className={classes.navAside}>
        <CardActionArea>
          <Close
            className={classes.closeButton}
            onClick={deleteThis}
          />
          <CardMedia
            className={classes.media}
            title={title}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `center / cover no-repeat ${background}`,
              }}
            />
          </CardMedia>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  );
};

BoardCard.defaultProps = {
  title: 'Card',
  background: '#fbf089',
};

BoardCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  deleteBoard: PropTypes.func.isRequired,
  background: PropTypes.string,
};

export default BoardCard;
