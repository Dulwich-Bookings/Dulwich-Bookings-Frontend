import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import RecentlySearchedButton from '@/components/Home/HomeResources/SearchFilterView/RecentlySearchedButton/RecentlySearchedButton';
import BookmarksButton from '@/components/Home/HomeResources/SearchFilterView/BookmarksButton/BookmarksButton';

type Props = {
  searchedInput: string;
  bookmarksClicked: (value: boolean) => void;
  rvClicked: (value: boolean) => void;
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
    props.rvClicked(true);
  };

  const onBookmarkClickHandler = () => {
    if (bookmarkClick) {
      return;
    }
    setRecentClick(false);
    setBookmarkClick(true);
    props.bookmarksClicked(true);
  };

  useEffect(() => {
    setFilterText(props.searchedInput);
  }, [props.searchedInput]);

  return (
    <Grid container direction='row' spacing={3}>
      {!filterText && <RecentlySearchedButton onClick={onRecentClickHandler} clicked={recentClick} />}
      {!filterText && <BookmarksButton onClick={onBookmarkClickHandler} clicked={bookmarkClick} />}
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
