import React from 'react';
import { Grid, OutlinedInput, FormControl, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import HomeMenu from './HomeMenu';

type Props = {
  onInputChange(enteredValue: string): void;
};

const HomeSearchBar = (props: Props) => {
  //const [roomInput, setRoomInput] = useState<string>('');
  //const roomTextInputRef = useRef<HTMLInputElement>(null);

  const roomInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onInputChange(event.target.value);
  };

  return (
    <Grid container className='justify-center'>
      <FormControl className='rounded-full w-[897px] h-[54px] shadow-[0_4px_20px_0px_rgba(0,0,0,0.25)]'>
        <OutlinedInput
          className='bg-bgWhite rounded-full '
          id='search-rooms'
          classes={{ notchedOutline: `border: 'none'` }}
          startAdornment={
            <InputAdornment position='start'>
              <HomeMenu />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment className='pr-[15px] pb-[6px]' position='end'>
              <Search className='text-bgBlack' />
            </InputAdornment>
          }
          onChange={roomInputChangeHandler}
          placeholder='Search for a Room...'
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
