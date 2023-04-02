import React from 'react';
import { useHistory } from 'react-router-dom';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import HomeResourceList from '@/components/Home/HomeResources/HomeResourceList/HomeResourceList';
import { Grid, Stack } from '@mui/material';

import { resourceTypes, searchStateMap } from '@/consts/constants';
import { UserData } from '@/modules/user/types';
import { ResourceData } from '@/modules/resource/types';
import { SubscriptionData } from '@/modules/subscription/types';
import { SchoolData } from '@/modules/school/types';

type Props = {
  user: UserData;
  school: SchoolData;
};

const ResourceDetails = ({ user: userSelf, school: schoolSelf }: Props) => {
  const history = useHistory();

  const openEditResourceHandler = (data: ResourceData | SubscriptionData) => {
    if (data.type === resourceTypes.RESOURCE) history.push(`/settings/resources/edit/room/${data.id}`);
    if (data.type === resourceTypes.SUBSCRIPTION) history.push(`/settings/resources/edit/subscription/${data.id}`);
  };

  return (
    <>
      <Stack className='w-full'>
        <Grid container className='justify-start'>
          <SettingHeader title={`My Resources`} />
        </Grid>

        <Grid container className='justify-center pt-10 '>
          <HomeResourceList
            searchedInput=''
            searchState={searchStateMap.ALL}
            isBookmarksViewClicked={false}
            isRvViewClicked={false}
            currentUser={userSelf}
            className='justify-center'
            editMode={true}
            editResourceHandler={openEditResourceHandler}
            currentSchool={schoolSelf}
          />
        </Grid>
      </Stack>
    </>
  );
};

export default ResourceDetails;
