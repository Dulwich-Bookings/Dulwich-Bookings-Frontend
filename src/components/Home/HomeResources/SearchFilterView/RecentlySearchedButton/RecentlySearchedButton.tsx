import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

type Props = {
  onClick: () => void;
  clicked: boolean;
};

const RecentlySearchedButton = (props: Props) => {
  return (
    <Grid item>
      <Button className='p-0 hover:bg-[transparent] ' disableRipple={true} onClick={props.onClick}>
        <div
          className={`${'font-Inter '} ${props.clicked && 'underline decoration-dulwichRed text-bgBlack'} ${
            !props.clicked && 'text-[#404040]'
          } 
          text-lg homeLaptop:text-xxl capitalize `}
        >
          Recently Searched
        </div>
      </Button>
    </Grid>
  );
};

export default RecentlySearchedButton;
