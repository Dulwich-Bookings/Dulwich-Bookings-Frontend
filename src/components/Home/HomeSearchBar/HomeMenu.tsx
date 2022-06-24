import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

const HomeMenu = () => {
  const [selectedIndex, setSelectedIndex] = React.useState('1');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedIndex(event.target.value);
  };

  return (
    <>
      <div>
        <Select
          id='select-menu'
          className='bg-dulwichRed text-bgWhite rounded-full normal-case font-Inter max-h-9'
          value={selectedIndex}
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: -10,
              horizontal: 'left',
            },
          }}
        >
          <MenuItem className='bg-white hover:bg-dulwichRedHover' value={1}>
            Rooms
          </MenuItem>
          <MenuItem className='bg-white hover:bg-dulwichRedHover' value={2}>
            Subscriptions
          </MenuItem>
          <MenuItem className='bg-white hover:bg-dulwichRedHover' value={3}>
            All
          </MenuItem>
        </Select>
      </div>
    </>
  );
};

export default HomeMenu;
