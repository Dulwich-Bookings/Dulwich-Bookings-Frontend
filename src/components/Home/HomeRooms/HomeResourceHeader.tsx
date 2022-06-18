import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';

type Props = {
  input: string;
};

const HomeRoomHeader = (props: Props) => {
  const [recentClick, setRecentClick] = useState(false);
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
    <Grid container direction='row'>
      {!filterText && (
        <Grid item>
          <Button className=' hover:underline decoration-dulwichRed' onClick={onRecentClickHandler}>
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
          <Button onClick={onBookmarkClickHandler}>
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
