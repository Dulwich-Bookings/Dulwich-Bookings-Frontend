import React, { useState } from 'react';

import { Grid, Card, CardContent, Typography, Stack } from '@mui/material';

import { Bookmark, PersonOutlineOutlined, Circle } from '@mui/icons-material';
import { ResourceData } from '@/modules/resource/types';
import { SearchState, resourceTypes } from '@/consts/constants';
import { TagData } from '@/modules/tag/types';
import ResourceTag from '@/components/Home/HomeResources/HomeResourceContainer/ResourceTag/ResourceTag';
import ResourceRights from '@/components/Home/HomeResources/HomeResourceContainer/ResourceRights/ResourceRights';
import { SubscriptionData } from '@/modules/subscription/types';
import { TagMapData } from '@/modules/tagMap/types';

type Props = {
  data: ResourceData | SubscriptionData;
  tagData: TagData[];
  tagMapData: TagMapData[];
  isBookmark: boolean;
  onBookmarkChangeHandler: (id: number, type: SearchState) => void;
};

const vacancy = true;

const HomeRoomItem = (props: Props) => {
  const [isBookmark, setIsBookmark] = useState(props.isBookmark);

  const filterTagMaps = (): TagMapData[] => {
    if (props.data.type === resourceTypes.RESOURCE) {
      return props.tagMapData.filter((tagMap: TagMapData) => tagMap.resourceId === props.data.id);
    } else {
      return props.tagMapData.filter((tagMap: TagMapData) => tagMap.subscriptionId === props.data.id);
    }
  };

  const filteredTags: TagData[] = props.tagData.filter(tag =>
    filterTagMaps()
      .map(filteredTagMap => filteredTagMap.tagId)
      .includes(tag.id),
  );

  return (
    <Grid item>
      <Card className='bg-bgGray rounded-xl w-80 h-48 hover:shadow-[0_4px_30px_0px_rgba(0,0,0,0.25)] cursor-pointer'>
        <CardContent className='grow'>
          <Stack spacing={-2}>
            <div className='w-72 z-10'>
              <Bookmark
                onClick={() => {
                  setIsBookmark(!props.isBookmark);
                  props.onBookmarkChangeHandler(props.data.id, props.data.type);
                }}
                className='float-right text-3xl'
                sx={{ color: `${isBookmark ? '#000000' : '#D9D9D9'}` }}
              />
            </div>
            <Stack spacing={0.5} className='z-0'>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                <Circle className={`text-sm`} sx={{ color: `${vacancy ? '#76D674' : '#E25454'}` }} />
                <Typography gutterBottom variant='h5' component='h2' className='font-Inter'>
                  {props.data.name}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                <PersonOutlineOutlined className='text-xl text-bgNoHover' />
                <Stack spacing={-0.5}>
                  <Typography className='font-Inter text-bgNoHover'>Access available to:</Typography>
                  <Typography className='font-Inter text-bgNoHover'>
                    {props.data.accessRights.map(role => (
                      <ResourceRights key={role} role={role} initialIndex={props.data.accessRights[0]} />
                    ))}
                  </Typography>
                </Stack>
              </Stack>
              <Grid container>
                {filteredTags.map(tag => (
                  <ResourceTag key={tag.id} tagData={tag} />
                ))}
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomeRoomItem;
