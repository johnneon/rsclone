import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  auth__tabs: {
    maxWidth: '50%',
    minWidth: '40%',
  },
}));

const AuthFormTabs = ({ activeTab, changeActiveTabHandler }) => {
  const classes = useStyles();

  return (
    <Tabs
      variant="fullWidth"
      value={activeTab}
      indicatorColor="primary"
      textColor="inherit"
      onChange={changeActiveTabHandler}
      scrollButtons="off"
    >
      <Tab
        label="Sing Up"
        className={classes.auth__tabs}
      />
      <Tab
        label="Login"
        className={classes.auth__tabs}
      />
    </Tabs>
  );
};

AuthFormTabs.propTypes = {
  activeTab: PropTypes.number,
  changeActiveTabHandler: PropTypes.func,
};

AuthFormTabs.defaultProps = {
  activeTab: 0,
  changeActiveTabHandler: () => {},
};

export default AuthFormTabs;
