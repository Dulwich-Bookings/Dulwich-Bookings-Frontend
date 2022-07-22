import React, { useState } from 'react';

import { Stack, Grid } from '@mui/material';

import SearchFilterView from '@/components/Home/HomeResources/SearchFilterView/SearchFilterView';
import HomeResourceList from '@/components/Home/HomeResources/HomeResourceList/HomeResourceList';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';
import { SubscriptionData } from '@/modules/subscription/types';

type Props = {
  searchedInput: string;
  stateValue: string;
  resourceData: ResourceData[];
  subscriptionData: SubscriptionData[];
  tagData: TagData[];
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
    <Grid container className='pl-10 md:justify-center md:pl-0'>
      <Stack spacing={-7} className='w-screen max-w-5xl'>
        <SearchFilterView searchedInput={props.searchedInput} bookmarksClicked={bookmarksClickedHandler} rvClicked={rvClickedHandler} />
        <HomeResourceList
          resourceData={props.resourceData}
          stateValue={props.stateValue}
          subscriptionData={props.subscriptionData}
          searchedInput={props.searchedInput}
          tagData={props.tagData}
          bookmarksClicked={bookmarksClicked}
          rvClicked={rvClicked}
          currentUser={props.currentUser}
        />
      </Stack>
    </Grid>
  );
};

export default HomeRooms;
