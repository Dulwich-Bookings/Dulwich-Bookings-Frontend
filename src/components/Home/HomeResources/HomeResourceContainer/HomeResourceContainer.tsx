import React, { useState } from 'react';

import { Grid, Card, CardContent, Typography, Stack } from '@mui/material';

import { Bookmark, PersonOutlineOutlined, Circle } from '@mui/icons-material';
import { ResourceData } from '@/modules/resource/types';
import { tagMap, tagColor } from '@/consts/dummyMaps';
import { TagData } from '@/modules/tag/types';

type Props = {
  resource: ResourceData;
  tagData: TagData[];
};

const vacancy = true;

const HomeRoomItem = (props: Props) => {
  const [isBookmark, setIsBookmark] = useState(false);

  const isBookmarkHandler = () => {
    setIsBookmark(!isBookmark);
  };

  const filteredTagsIDs = tagMap.filter(tagArr => tagArr.resource_id === props.resource.id).map(filteredID => filteredID.tag_id);
  const filteredTags = props.tagData.filter(tag => filteredTagsIDs.includes(tag.id));

  return (
    <Grid item>
      <Card className='bg-bgGray rounded-xl w-80 h-48 hover:shadow-[0_4px_30px_0px_rgba(0,0,0,0.25)] cursor-pointer'>
        <CardContent className='grow'>
          <Stack spacing={-2}>
            <div className='w-72 z-10'>
              <Bookmark
                onClick={isBookmarkHandler}
                className='float-right text-3xl'
                sx={{ color: `${isBookmark ? '#000000' : '#D9D9D9'}` }}
              />
            </div>
            <Stack spacing={0.5} className='z-0'>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                <Circle className={`text-sm`} sx={{ color: `${vacancy ? '#76D674' : '#E25454'}` }} />
                <Typography gutterBottom variant='h5' component='h2' className='font-Inter'>
                  {props.resource.name}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                <PersonOutlineOutlined className='text-xl text-bgNoHover' />
                <Stack spacing={-0.5}>
                  <Typography className='font-Inter text-bgNoHover'>
                    Access available to: {props.resource.accessRights.map(role => role + ' ')}
                  </Typography>
                  <Typography className='font-Inter text-bgNoHover'>Insert available people</Typography>
                </Stack>
              </Stack>
              <Grid container>
                {filteredTags.map(tag => (
                  <Grid item key={tag.id}>
                    <div
                      className={`m-1 text-bgWhite text-sm rounded-xl px-4 `}
                      style={{
                        backgroundColor: `${tagColor.filter(colorTag => colorTag.id === tag.id).map(colorTag => colorTag.color)}`,
                      }}
                    >
                      <p className='font-Inter'>{tag.name}</p>
                    </div>
                  </Grid>
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
