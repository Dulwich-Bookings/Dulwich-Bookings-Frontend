import React from 'react';
import { Grid, ButtonGroup, Button, Typography } from '@mui/material';

const HomeRoomHeader = () => {
  return (
    <Grid container direction='row' alignContent='left'>
      <Grid item>
        <Button className=' hover:underline decoration-dulwichRed'>
          <Typography className='font-Inter text-bgNoHover hover:text-bgBlack' variant='h5' textTransform='capitalize' color='black'>
            Recently Searched
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button className='hover:underline decoration-dulwichRed'>
          <Typography className='font-Inter text-bgNoHover hover:text-bgBlack' variant='h5' textTransform='capitalize' color='black'>
            Bookmarks
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomeRoomHeader;
