import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ResourceContainer from '@components/Home/HomeResources/HomeResourceContainer/HomeResourceContainer';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';

type Props = {
  searchedInput: string;
  tagData: TagData[];
  resourceData: ResourceData[];
  bookmarksClicked: boolean;
  rvClicked: boolean;
};

const HomeRoomList = (props: Props) => {
  const [isResourceEmpty, setIsResourceEmpty] = useState(false);

  useEffect(() => {
    if (props.searchedInput.length > 0) {
      console.log('typing...');
    } else if (props.rvClicked) {
      console.log('rv');
    } else {
      console.log('bookmarks');
    }
  }, [props.searchedInput, props.rvClicked, props.bookmarksClicked]);
  const filteredResources = props.resourceData.filter(resource => resource.name.match(new RegExp(props.searchedInput, 'i')));

  useEffect(() => {
    if (filteredResources.length == 0) {
      setIsResourceEmpty(true);
    } else {
      setIsResourceEmpty(false);
    }
  }, [props.searchedInput]);

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
