import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import SubscriptionService from '@/api/subscription/SubscriptionService';
import TagMapService from '@/api/tagMap/TagMapService';
import UserService from '@/api/user/UserService';
import TagService from '@/api/tag/TagService';
import { useApi } from '@/api/ApiHandler';
import ResourceMapService from '@/api/resourceMap/ResourceMapService';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import EditSubscriptionBody from '@/components/Settings/SettingBody/ResourceDetails/EditSubscriptionBody/EditSubscriptionBody';
import Loading from '@/components/Loading/Loading';
import { Grid } from '@mui/material';

import { settingStateMap } from '@/consts/constants';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { SubscriptionData } from '@/modules/subscription/types';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';
import { ResourceMapData } from '@/modules/resourceMap/types';
import { TagMapData } from '@/modules/tagMap/types';
import { retrieveAllData } from '@/utilities/api';

const EditSubscription = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);
  const location = useLocation();
  const dataId = +location.pathname.split('subscription/')[1];

  const [getAllUsers] = useApi(() => UserService.getAllUsers(), false, true, false);
  const [getAllResourceMaps] = useApi(() => ResourceMapService.getAllResourceMaps(), false, true, false);
  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);
  const [getAllTagMap] = useApi(() => TagMapService.getAllTagMap(), false, true, false);
  const [getSubscriptionById] = useApi(() => SubscriptionService.getSubscriptionById(dataId), false, true, false);

  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [allTags, setAllTags] = useState<TagData[]>([]);
  const [tagMaps, setTagMaps] = useState<TagMapData[]>([]);
  const [resourceMaps, setResourceMaps] = useState<ResourceMapData[]>([]);
  const [data, setData] = useState<SubscriptionData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const allUserData = await retrieveAllData<UserData[]>(getAllUsers);
    const allTagData = await retrieveAllData<TagData[]>(getAllTags);
    const allTagMapData = await retrieveAllData<TagMapData[]>(getAllTagMap);
    const AllResourceMapData = await retrieveAllData<ResourceMapData[]>(getAllResourceMaps);
    const SubscriptionData = await retrieveAllData<SubscriptionData>(getSubscriptionById);

    setAllUsers(allUserData ?? []);
    setAllTags(allTagData ?? []);
    setTagMaps(allTagMapData ?? []);
    setResourceMaps(AllResourceMapData ?? []);
    setData(SubscriptionData);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Grid container className='w-screen h-screen'>
              <SettingNavigation isClicked={settingStateMap.RESOURCE} customClassName='w-2/12 justify-end' />

              <Grid item className='w-9/12 pt-10'>
                {isLoading ? (
                  <Loading />
                ) : (
                  <EditSubscriptionBody
                    oldFormData={data as SubscriptionData}
                    tags={allTags}
                    users={allUsers}
                    resourceMaps={resourceMaps}
                    tagMaps={tagMaps}
                  />
                )}
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default EditSubscription;
