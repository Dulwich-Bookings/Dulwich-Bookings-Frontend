import React, { useState } from 'react';

import { Stack, Grid } from '@mui/material';

import SearchFilterView from '@/components/Home/HomeResources/SearchFilterView/SearchFilterView';
import HomeResourceList from '@/components/Home/HomeResources/HomeResourceList/HomeResourceList';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';

type Props = {
  searchedInput: string;
  resourceData: ResourceData[];
  tagData: TagData[];
  currentUser: UserData;
};

const HomeRooms = (props: Props) => {
  const [isBookmarksClicked, setIsBookmarksClicked] = useState(false);
  const [isRvClicked, setIsRVClicked] = useState(true);

  const bookmarksClickedHandler = (value: boolean) => {
    setIsBookmarksClicked(value);
    setIsRVClicked(!value);
  };
  const rvClickedHandler = (value: boolean) => {
    setIsRVClicked(value);
    setIsBookmarksClicked(!value);
  };

  return (
    <Grid container className='pl-10 md:justify-center md:pl-0'>
      <Stack spacing={-7} className='w-screen max-w-5xl'>
        <SearchFilterView searchedInput={props.searchedInput} bookmarksClicked={bookmarksClickedHandler} rvClicked={rvClickedHandler} />
        <HomeResourceList
          resourceData={props.resourceData}
          searchedInput={props.searchedInput}
          tagData={props.tagData}
          isBookmarksClicked={isBookmarksClicked}
          isRvClicked={isRvClicked}
          currentUser={props.currentUser}
        />
      </Stack>
    </Grid>
  );
};

export default HomeRooms;
