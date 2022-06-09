import React from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const HomeMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button id='home-menu-button' className='bg-dulwichRed text-bgWhite rounded-full normal-case' onClick={handleClick}>
        <Typography color='inherit'>Rooms</Typography>
        <ArrowDropDown />
      </Button>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Rooms</MenuItem>
        <MenuItem onClick={handleClose}>Subscriptions</MenuItem>
        <MenuItem onClick={handleClose}>All</MenuItem>
      </Menu>
    </>
  );
};

export default HomeMenu;
