/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Box, Button, Collapse, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const BoardElementCreator = ({
  inputField,
  addElement,
  invisibleStyle,
  wrapperStyle,
  contentStyle,
  invisibleCreatorText,
  collapsedHeight,
  children,
}) => {
  const [isBoardElementCreatorVisible, setBoardElementCreatorVisibility] = useState(false);

  const showBoardElementCreator = () => {
    setBoardElementCreatorVisibility(true);
  };

  const cancel = () => {
    setBoardElementCreatorVisibility(false);
  };

  return (
    <Paper className={wrapperStyle}>
      <Collapse in={isBoardElementCreatorVisible} collapsedHeight={collapsedHeight}>
        {isBoardElementCreatorVisible
          ? (
            <>
              <Box className={contentStyle}>
                {children}
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addElement}
                  size="small"
                >
                  Add
                </Button>
                <IconButton
                  aria-label="cancel"
                  onClick={cancel}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
                <Button>
                  options
                </Button>
              </Box>
            </>
          ) : (
            <Button
              variant="contained"
              className={invisibleStyle}
              onClick={showBoardElementCreator}
            >
              {invisibleCreatorText}
            </Button>
          )}
      </Collapse>
    </Paper>
  );
};

BoardElementCreator.propTypes = {
  inputField: PropTypes.node,
  addElement: PropTypes.func,
  invisibleStyle: PropTypes.string,
  wrapperStyle: PropTypes.string,
  contentStyle: PropTypes.string,
  invisibleCreatorText: PropTypes.string,
  collapsedHeight: PropTypes.number,
  children: PropTypes.node,
};

BoardElementCreator.defaultProps = {
  inputField: {},
  addElement: () => {},
  invisibleStyle: '',
  wrapperStyle: '',
  contentStyle: '',
  invisibleCreatorText: 'Add new element',
  collapsedHeight: 34,
  children: {},
};

export default BoardElementCreator;
