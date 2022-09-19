import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/user/UserService';
import ResourceMapService from '@/api/resourceMap/ResourceMapService';
import TagService from '@/api/tag/TagService';
import TagMapService from '@/api/tagMap/TagMapService';
import ResourceService from '@/api/resource/ResourceService';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import EditResourceBody from '@/components/Settings/SettingBody/ResourceDetails/EditResourceBody/EditResourceBody';
import Loading from '@/components/Loading/Loading';
import { Grid } from '@mui/material';

import { settingStateMap } from '@/consts/constants';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';
import { TagMapData } from '@/modules/tagMap/types';
import { ResourceMapData } from '@/modules/resourceMap/types';
import { retrieveAllData } from '@/utilities/api';
import UnsupportedSettings from '@/pages/UnsupportedPages/UnsupportedSetting';

const EditResource = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);
  const location = useLocation();
  const dataId = +location.pathname.split('room/')[1];

  const [getAllUsers] = useApi(() => UserService.getAllUsers(), false, true, false);
  const [getAllResourceMaps] = useApi(() => ResourceMapService.getAllResourceMaps(), false, true, false);
  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);
  const [getAllTagMap] = useApi(() => TagMapService.getAllTagMap(), false, true, false);
  const [getResourceById] = useApi(() => ResourceService.getResourceById(dataId), false, true, false);

  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [allTags, setAllTags] = useState<TagData[]>([]);
  const [tagMaps, setTagMaps] = useState<TagMapData[]>([]);
  const [resourceMaps, setResourceMaps] = useState<ResourceMapData[]>([]);
  const [data, setData] = useState<ResourceData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const allUserData = await retrieveAllData<UserData[]>(getAllUsers);
    const allTagData = await retrieveAllData<TagData[]>(getAllTags);
    const allTagMapData = await retrieveAllData<TagMapData[]>(getAllTagMap);
    const AllResourceMapData = await retrieveAllData<ResourceMapData[]>(getAllResourceMaps);
    const resourceData = await retrieveAllData<ResourceData>(getResourceById);

    setAllUsers(allUserData ?? []);
    setAllTags(allTagData ?? []);
    setTagMaps(allTagMapData ?? []);
    setResourceMaps(AllResourceMapData ?? []);
    setData(resourceData);

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

              <Grid container className='settingLaptop:w-9/12 settingPhone:w-11/12 settingPhone:block hidden pt-10'>
                {isLoading ? (
                  <Loading />
                ) : (
                  <EditResourceBody
                    oldFormData={data as ResourceData}
                    tags={allTags}
                    users={allUsers}
                    resourceMaps={resourceMaps}
                    tagMaps={tagMaps}
                  />
                )}
              </Grid>
              <UnsupportedSettings />
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default EditResource;
