import React, { useState } from 'react';

import { Stack, Grid } from '@mui/material';

import SearchFilterView from '@/components/Home/HomeResources/SearchFilterView/SearchFilterView';
import HomeResourceList from '@/components/Home/HomeResources/HomeResourceList/HomeResourceList';

import { UserData } from '@/modules/user/types';
import { SearchState } from '@/consts/constants';

type Props = {
  searchedInput: string;
  searchState: SearchState;
  currentUser: UserData;
};

const HomeRooms = (props: Props) => {
  const [bookmarksClicked, setBookmarksClicked] = useState(false);
  const [rvClicked, setRVClicked] = useState(true);

  const bookmarksClickedHandler = (value: boolean) => {
    setBookmarksClicked(value);
    setRVClicked(!value);
  };
  const rvClickedHandler = (value: boolean) => {
    setRVClicked(value);
    setBookmarksClicked(!value);
  };

  return (
    <Grid container className='px-10 justify-center'>
      <Stack spacing={-7} className='w-screen max-w-5xl'>
        <SearchFilterView searchedInput={props.searchedInput} bookmarksClicked={bookmarksClickedHandler} rvClicked={rvClickedHandler} />
        <HomeResourceList
          searchState={props.searchState}
          searchedInput={props.searchedInput}
          isBookmarksViewClicked={bookmarksClicked}
          isRvViewClicked={rvClicked}
          currentUser={props.currentUser}
        />
      </Stack>
    </Grid>
  );
};

export default HomeRooms;
