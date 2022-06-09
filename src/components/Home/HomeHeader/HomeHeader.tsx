import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Add, AccountCircle } from '@mui/icons-material';

const HomeHeader = () => {
  return (
    <AppBar className='bg-bgWhite' position='relative'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div>
          <Typography variant='h6' color='black' noWrap>
            School Name
          </Typography>
        </div>
        <div>
          <Button className='mr-8 bg-dulwichRed normal-case space-x-1' variant='contained'>
            <Add />
            <Typography color='inherit'>Resource</Typography>
          </Button>
          <AccountCircle className='fill-current text-bgBlack' />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default HomeHeader;
