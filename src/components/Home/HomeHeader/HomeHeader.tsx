import React from 'react';
import { AppBar, Button, Grid, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

import SchoolName from './SchoolName';

const HomeHeader = () => {
  return (
    <AppBar className='bg-bgWhite' position='relative'>
      <Grid container className='w-screen h-[80px] flex items-center ' direction='row' sx={{ justifyContent: 'space-between' }}>
        <Grid item display={{ xs: 'none', sm: 'block' }}>
          <SchoolName />
        </Grid>
        <Grid item className='flex items-center'>
          <Button
            className='mr-[28px] bg-dulwichRed normal-case space-x-2 rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-[109px] h-[37px]'
            variant='contained'
            size='small'
          >
            <Add className='-mx-1 stroke-0 stroke-black' />
            <p className='text-md font-Inter tracking-tight py-0.5 pr-1'>Resource</p>
          </Button>
          <Box className='flex mr-[33px] w-[50px] h-[50px] bg-bgIcon rounded-full bg-dulwichRed justify-center items-center'>
            <p className='font-Inter font-[20px]'>CS</p>
          </Box>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default HomeHeader;
