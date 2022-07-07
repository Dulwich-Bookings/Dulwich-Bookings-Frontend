import React, { useState } from 'react';

import { Stack, Grid } from '@mui/material';

import HomeRoomHeader from '@/components/Home/HomeResources/SearchFilterView/SearchFilterView';
import HomeRoomList from '@/components/Home/HomeResources/HomeResourceList/HomeResourceList';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';

type Props = {
  searchedInput: string;
  resourceData: ResourceData[];
  tagData: TagData[];
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
    <Grid container className='pl-10 md:justify-center md:pl-0'>
      <Stack spacing={-7} className='w-screen max-w-5xl'>
        <HomeRoomHeader searchedInput={props.searchedInput} bookmarksClicked={bookmarksClickedHandler} rvClicked={rvClickedHandler} />
        <HomeRoomList
          resourceData={props.resourceData}
          searchedInput={props.searchedInput}
          tagData={props.tagData}
          bookmarksClicked={bookmarksClicked}
          rvClicked={rvClicked}
        />
      </Stack>
    </Grid>
  );
};

export default HomeRooms;
