import React from 'react';
import { Grid, OutlinedInput, FormControl } from '@mui/material';

const HomeSearchBar = () => {
  return (
    <Grid container justifyContent='center'>
      <FormControl className='rounded-full w-3/4 bg-bgWhite' sx={{ boxShadow: 12 }}>
        <OutlinedInput id='search-rooms' />
      </FormControl>
    </Grid>
  );
};

export default HomeSearchBar;
