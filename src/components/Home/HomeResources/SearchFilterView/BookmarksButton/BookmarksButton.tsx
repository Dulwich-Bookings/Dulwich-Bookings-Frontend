import React from 'react';
import { Grid, Button } from '@mui/material';

type Props = {
  onClick: () => void;
  clicked: boolean;
};

const BookmarksButton = (props: Props) => {
  return (
    <Grid item>
      <Button className='p-0 hover:bg-[transparent]' disableRipple={true} onClick={props.onClick}>
        <div
          className={`${'font-Inter '} ${props.clicked && 'underline decoration-dulwichRed text-bgBlack'} ${
            !props.clicked && 'text-textGray'
          } 
          text-lg homeLaptop:text-xxl capitalize `}
        >
          Bookmarks
        </div>
      </Button>
    </Grid>
  );
};

export default BookmarksButton;
