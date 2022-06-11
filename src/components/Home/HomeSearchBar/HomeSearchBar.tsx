import React from 'react';
import { Grid, OutlinedInput, FormControl, InputAdornment, Button } from '@mui/material';
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
    <Grid container justifyContent='center'>
      <FormControl className='rounded-full w-3/4 bg-bgWhite' sx={{ boxShadow: 12 }}>
        <OutlinedInput
          id='search-rooms'
          startAdornment={
            <InputAdornment position='start'>
              <HomeMenu />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position='end'>
              <Button>
                <Search />
              </Button>
            </InputAdornment>
          }
          onChange={roomInputChangeHandler}
        />
      </FormControl>
    </Grid>
  );
};

export default HomeSearchBar;
