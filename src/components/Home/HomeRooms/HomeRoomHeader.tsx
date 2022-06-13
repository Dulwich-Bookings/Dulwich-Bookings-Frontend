import React from 'react';
import { Grid, ButtonGroup, Button, Typography } from '@mui/material';

const HomeRoomHeader = () => {
  return (
    <Grid container direction='column' alignContent='left'>
      <ButtonGroup variant='text' color='primary'>
        <Button className='no-underline hover:underline'>
          <Typography variant='h5' textTransform='capitalize' color='black'>
            Recently Searched
          </Typography>
        </Button>
        <Button className='no-underline hover:underline'>
          <Typography variant='h5' textTransform='capitalize' color='black'>
            Bookmarks
          </Typography>
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default HomeRoomHeader;
