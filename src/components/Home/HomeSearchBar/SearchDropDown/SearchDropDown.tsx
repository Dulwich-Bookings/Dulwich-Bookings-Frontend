import React, { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { searchStateMap, SearchState } from '@/consts/constants';

type Props = {
  selectedState(state: string): void;
};

const HomeMenu = (props: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<SearchState>(searchStateMap.ALL);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedIndex(event.target.value as SearchState);
    props.selectedState(event.target.value);
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
          <MenuItem className='bg-white hover:bg-dulwichRedHover' value={searchStateMap.ALL}>
            All
          </MenuItem>
          <MenuItem className='bg-white hover:bg-dulwichRedHover' value={searchStateMap.RESOURCES}>
            Rooms
          </MenuItem>
          <MenuItem className='bg-white hover:bg-dulwichRedHover' value={searchStateMap.SUBSCRIPTIONS}>
            Subscriptions
          </MenuItem>
        </Select>
      </div>
    </>
  );
};

export default HomeMenu;
