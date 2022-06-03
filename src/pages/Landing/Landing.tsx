import React from 'react';
import Login from '@/components/Login/Login';
import { Grid } from '@mui/material';

import dulwichlanding from '@/assets/images/dulwichlanding.png';

const Landing = () => {
  return (
    <React.Fragment>
      {' '}
      <Grid container direction='row' className='h-screen'>
        <Grid item xs={0} md={6}>
          <img className='object-fill h-screen' width='100%' src={dulwichlanding}></img>
        </Grid>
        <Grid item xs={12} md={6}>
          <Login />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Landing;
