import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ResourceContainer from '@components/Home/HomeResources/HomeResourceContainer/HomeResourceContainer';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';
import { recentlyVisitedMap, bookmarkMap } from '@/consts/dummyMaps';

type Props = {
  searchedInput: string;
  tagData: TagData[];
  resourceData: ResourceData[];
  bookmarksClicked: boolean;
  rvClicked: boolean;
  currentUser: UserData;
};

const HomeRoomList = (props: Props) => {
  const [isResourceEmpty, setIsResourceEmpty] = useState(false);
  const [filteredResources, setFilteredResources] = useState(
    props.resourceData.filter(resource =>
      recentlyVisitedMap.some(rvMap => resource.id === rvMap.resource_id && rvMap.user_id === props.currentUser.id),
    ),
  );

  useEffect(() => {
    let data: ResourceData[] = [];
    if (props.searchedInput.length > 0) {
      data = props.resourceData.filter(resource => resource.name.match(new RegExp(props.searchedInput, 'i')));
      setFilteredResources(data);
    } else if (props.rvClicked) {
      data = props.resourceData.filter(resource =>
        recentlyVisitedMap.some(rvMap => resource.id === rvMap.resource_id && rvMap.user_id === props.currentUser.id),
      );
      setFilteredResources(data);
    } else {
      data = props.resourceData.filter(resource =>
        bookmarkMap.some(bkMap => resource.id === bkMap.resource_id && bkMap.user_id === props.currentUser.id),
      );
      setFilteredResources(data);
    }
    if (data.length === 0) {
      setIsResourceEmpty(true);
    } else {
      setIsResourceEmpty(false);
    }
  }, [props.searchedInput, props.rvClicked, props.bookmarksClicked]);

  return (
    <Box className='py-20'>
      {!isResourceEmpty && (
        <Grid item container spacing={3.5}>
          {filteredResources.map(resource => (
            <ResourceContainer key={resource.id} resource={resource} tagData={props.tagData} />
          ))}
        </Grid>
      )}

      {isResourceEmpty && (
        <Typography className='font-Inter text-[#404040]' variant='h5' textTransform='capitalize'>
          No Resources Found.
        </Typography>
      )}
    </Box>
  );
};

export default HomeRoomList;
