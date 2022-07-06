import React from 'react';

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
  const filteredResources = props.resourceData.filter(resource => resource.name.match(new RegExp(props.searchedInput, 'i')));

  return (
    <Grid container className='pl-10 md:justify-center md:pl-0'>
      <Stack spacing={-7} className='w-screen max-w-5xl'>
        <HomeRoomHeader searchedInput={props.searchedInput} />
        <HomeRoomList filteredResources={filteredResources} tagData={props.tagData} />
      </Stack>
    </Grid>
  );
};

export default HomeRooms;
