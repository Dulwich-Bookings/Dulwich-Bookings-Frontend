import React from 'react';
import { AppBar, Toolbar, Typography, SvgIcon, Button } from '@mui/material';
import { Add, AccountCircle } from '@mui/icons-material';
import { ReactComponent as DummyIcon } from '../../assets/dummy_icon.svg';

const ProfileIcon = () => {
  return (
    <SvgIcon className='content-end'>
      <DummyIcon />
    </SvgIcon>
  );
};

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
          <Button className='mr-8 bg-dulwichRed' variant='contained'>
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
