import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Add, AccountCircle } from '@mui/icons-material';

import SchoolName from './SchoolName';

const HomeHeader = () => {
  return (
    <AppBar className='bg-bgWhite' position='relative'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div>
          <SchoolName />
        </div>
        <div>
          <Button className='mr-8 bg-dulwichRed normal-case space-x-1' variant='contained' size='small' style={{ borderRadius: '10px' }}>
            <Add fontSize='small' />
            <Typography variant='body2' color='inherit' alignContent='center'>
              Resource
            </Typography>
          </Button>
          <AccountCircle className='fill-current text-bgBlack' fontSize='large' />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default HomeHeader;
