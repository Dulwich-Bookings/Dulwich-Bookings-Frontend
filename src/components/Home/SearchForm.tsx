import React from 'react';
import { Grid } from '@mui/material';

const SearchForm = () => {
  return (
    <Grid container className='h-8'>
      <form className='w-full '>
        <input type='text' className='rounded-full w-full pr-16'></input>
      </form>
    </Grid>
  );
};

export default SearchForm;
