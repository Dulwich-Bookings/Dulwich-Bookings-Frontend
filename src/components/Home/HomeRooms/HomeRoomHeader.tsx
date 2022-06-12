import React from 'react';
import { Grid, ButtonGroup, Button, Typography } from '@mui/material';

const HomeRoomHeader = () => {
  return (
    <Grid container direction='column' alignContent='left'>
      <ButtonGroup variant='text' color='primary'>
        <Button>
          <Typography variant='h4' textTransform='capitalize' color='black'>
            Recently Searched
          </Typography>
        </Button>
        <Button>
          <Typography variant='h4' textTransform='capitalize' color='black'>
            Bookmarks
          </Typography>
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default HomeRoomHeader;
