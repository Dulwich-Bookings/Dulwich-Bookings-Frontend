import React from 'react';
import { Grid, OutlinedInput, FormControl, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import SearchDropDown from '@components/Home/HomeSearchBar/SearchDropDown/SearchDropDown';

type Props = {
  onInputChange(enteredValue: string): void;
};

const HomeSearchBar = (props: Props) => {
  const roomInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onInputChange(event.target.value);
  };

  return (
    <Grid container className='justify-center'>
      <FormControl className='rounded-full w-[900px] h-14 shadow-[0_4px_20px_0px_rgba(0,0,0,0.25)]'>
        <OutlinedInput
          className='bg-bgWhite rounded-full '
          id='search-rooms'
          classes={{ notchedOutline: `border: 'none'` }}
          startAdornment={
            <InputAdornment position='start'>
              <SearchDropDown />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment className='pr-3.5 pb-1.5' position='end'>
              <Search className='text-bgBlack' />
            </InputAdornment>
          }
          onChange={roomInputChangeHandler}
          placeholder='Search...'
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: '0 none',
            },
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default HomeSearchBar;
