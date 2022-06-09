import React from 'react';
import { Grid, OutlinedInput, FormControl, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import HomeMenu from './HomeMenu';

const HomeSearchBar = () => {
  return (
    <Grid container justifyContent='center'>
      <FormControl className='rounded-full w-3/4 bg-bgWhite' sx={{ boxShadow: 12 }}>
        <OutlinedInput
          id='search-rooms'
          startAdornment={
            <InputAdornment position='start'>
              <HomeMenu />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position='end'>
              <Button>
                <Search />
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
  );
};

export default HomeSearchBar;
