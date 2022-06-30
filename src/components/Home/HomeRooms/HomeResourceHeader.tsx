import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';

type Props = {
  input: string;
};

const HomeRoomHeader = (props: Props) => {
  const [recentClick, setRecentClick] = useState(true);
  const [bookmarkClick, setBookmarkClick] = useState(false);
  const [filterText, setFilterText] = useState('');

  const onRecentClickHandler = () => {
    if (recentClick) {
      return;
    }

    setRecentClick(true);
    setBookmarkClick(false);
  };

  const onBookmarkClickHandler = () => {
    if (bookmarkClick) {
      return;
    }

    setRecentClick(false);
    setBookmarkClick(true);
  };

  useEffect(() => {
    setFilterText(props.input);
  }, [props.input]);

  return (
    <Grid container direction='row' spacing={3}>
      {!filterText && (
        <Grid item>
          <Button className='p-0' disableRipple={true} onClick={onRecentClickHandler}>
            <Typography
              className={`${'font-Inter'} ${recentClick && 'underline decoration-dulwichRed'} ${!recentClick && 'text-bgNoHover'}`}
              variant='h5'
              textTransform='capitalize'
              color='black'
            >
              Recently Searched
            </Typography>
          </Button>
        </Grid>
      )}

      {!filterText && (
        <Grid item>
          <Button className='p-0 ' disableRipple={true} onClick={onBookmarkClickHandler}>
            <Typography
              className={`${'font-Inter'} ${bookmarkClick && 'underline decoration-dulwichRed'} ${!bookmarkClick && 'text-bgNoHover'}`}
              variant='h5'
              textTransform='capitalize'
              color='black'
            >
              Bookmarks
            </Typography>
          </Button>
        </Grid>
      )}

      {filterText && (
        <Grid item>
          <Typography className='font-Inter' variant='h5' textTransform='capitalize' color='black'>
            {filterText}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default HomeRoomHeader;
