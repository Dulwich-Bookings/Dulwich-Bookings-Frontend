import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

type Props = {
  onClick: () => void;
  clicked: boolean;
};

const RecentlySearchedButton = (props: Props) => {
  return (
    <Grid item className='scale-[0.8] pl-0 sm:scale-100 sm:pl-6'>
      <Button className='p-0 hover:bg-[transparent] ' disableRipple={true} onClick={props.onClick}>
        <Typography
          className={`${'font-Inter '} ${props.clicked && 'underline decoration-dulwichRed'} ${!props.clicked && 'text-[#404040]'}`}
          variant='h5'
          textTransform='capitalize'
          color='black'
        >
          Recently Searched
        </Typography>
      </Button>
    </Grid>
  );
};

export default RecentlySearchedButton;
