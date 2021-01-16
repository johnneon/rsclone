import React, { useContext } from 'react';

import {
  Container,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import AuthContext from '../context/AuthContext';

import Aside from '../components/Aside/Aside';
import useStyles from '../hooks/styles.hook';

const HomePage = () => {
  const classes = useStyles();
  const { fullName } = useContext(AuthContext);

  return (
    <Container className={classes.paddingTopBig}>
      <Typography variant="h1" component="h1" className={classes.marginBottomSmall}>Home page</Typography>
      <Divider className={classes.marginBottomMiddle} />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="start"
      >
        <Grid container item xs={2}>
          <Aside />
        </Grid>
        <Grid item xs={10} className={classes.contentContainer}>
          <Typography
            variant="h1"
            component="h2"
            className={classes.marginBottomSmall}
          >
            {`Welcome, ${fullName} !`}
          </Typography>
          <Divider />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
