import React, { useState } from 'react';

import { Grid, Card, CardContent, Typography, Stack } from '@mui/material';
import ModalWrapper from '@/components/Modals/ModalWrapper/ModalWrapper';
import SubscriptionModal from '@/components/Modals/SubscriptionModal/SubscriptionModal';
import { Bookmark, PersonOutlineOutlined, Circle } from '@mui/icons-material';
import ResourceTag from '@/components/Home/HomeResources/HomeResourceContainer/ResourceTag/ResourceTag';
import ResourceRights from '@/components/Home/HomeResources/HomeResourceContainer/ResourceRights/ResourceRights';
import BookingsModal from '@/components/Modals/BookingsModal/BookingsModal';

import { SearchState, resourceTypes, searchStateMap } from '@/consts/constants';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { SubscriptionData } from '@/modules/subscription/types';
import { TagMapData } from '@/modules/tagMap/types';
import { UserData } from '@/modules/user/types';
import { SchoolData } from '@/modules/school/types';

import TailWindTheme from '@/tailwind.config';

const { colors } = TailWindTheme.theme.extend;
import EditButton from './EditButton/EditButton';

type Props = {
  data: ResourceData | SubscriptionData;
  currentUser: UserData;
  currentSchool: SchoolData;
  tagData: TagData[];
  tagMapData: TagMapData[];
  isBookmark: boolean;
  isRecentlyVisited: boolean;
  onBookmarkChangeHandler: (id: number, type: SearchState) => void;
  onRecentlyVisitedHandler: (id: number, type: SearchState, isRecentlyVisited: boolean) => void;
  editMode: boolean;
  onEditHandler: (data: ResourceData | SubscriptionData, tagData: TagData[]) => void;
};

const vacancy = true;

const HomeResourceContainer = (props: Props) => {
const HomeResourceContainer = (props: Props) => {
  const [isBookmark, setIsBookmark] = useState(props.isBookmark);
  const [openCalendarModal, setOpenCalendarModal] = useState<boolean>(false);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState<boolean>(false);

  const { editMode } = props;

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

  const handleOpenModal = () => {
    if (editMode) {
      return;
    }
    props.data.type === resourceTypes.RESOURCE ? setOpenCalendarModal(true) : setOpenSubscriptionModal(true);
  };

  const handleCloseModal = () => {
    props.data.type === resourceTypes.RESOURCE ? setOpenCalendarModal(false) : setOpenSubscriptionModal(false);
  };

  const handleEdit = () => {
    props.onEditHandler(props.data, filteredTags);
  };


  return (
    <>
      {props.data.type === searchStateMap.SUBSCRIPTIONS && (
        <ModalWrapper
          isOpen={openSubscriptionModal}
          handleClose={handleCloseModal}
          bodyComponent={<SubscriptionModal data={props.data as SubscriptionData} handleClose={handleCloseModal} />}
        />
      )}
      {props.data.type === resourceTypes.RESOURCE && (
        <BookingsModal
          openState={openCalendarModal}
          handleCloseModal={handleCloseModal}
          resourceData={props.data as ResourceData}
          currentUser={props.currentUser}
          currentSchool={props.currentSchool}
        />
      )}
      <Grid item className='w-full homeLaptop:w-auto'>
        {editMode && <EditButton handleOnClick={handleEdit} />}
        {editMode && <EditButton handleOnClick={handleEdit} />}
        <Card
          className={`bg-bgGray rounded-xl w-full homeLaptop:w-80 h-48 hover:shadow-[0_4px_30px_0px_rgba(0,0,0,0.25)] cursor-pointer${
            !props.editMode && 'cursor-pointer'
          }`}
          onClick={handleOpenModal}
        >
          <div
            className='w-full h-full'
            onClick={() => {
              handleOpenModal();
              props.onRecentlyVisitedHandler(props.data.id, props.data.type, props.isRecentlyVisited);
            }}
          >
            <CardContent className='grow relative'>
            <CardContent className='grow relative'>
              <Stack spacing={-2}>
                <div className='w-full z-10'>
                  <Bookmark
                    onClick={async () => {
                      if (editMode) {
                        return;
                      }
                      if (editMode) {
                        return;
                      }
                      setIsBookmark(!props.isBookmark);
                      await props.onBookmarkChangeHandler(props.data.id, props.data.type);
                    }}
                    className='float-right text-3xl'
                    sx={{ color: `${isBookmark ? colors.bgBlack : colors.grayLight}` }}
                  />
                </div>
                <Stack spacing={0.5} className='z-0'>
                  <Stack direction='row' spacing={1.5} alignItems='center'>
                    <Circle className={`text-sm`} sx={{ color: `${vacancy ? colors.green : colors.dulwichRed}` }} />
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
          </div>
        </Card>
      </Grid>
    </>
  );
};

export default HomeResourceContainer;
