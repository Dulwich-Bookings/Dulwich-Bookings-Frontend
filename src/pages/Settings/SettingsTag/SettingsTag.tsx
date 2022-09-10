import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import { Grid } from '@mui/material';

import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { settingStateMap } from '@/consts/constants';
import TagDetails from '@/components/Settings/SettingBody/TagDetails/TagDetails';
import { useApi } from '@/api/ApiHandler';
import TagService from '@/api/tag/TagService';
import { TagData } from '@/modules/tag/types';
import { retrieveAllData } from '@/utilities/api';
import Loading from '@/components/Loading/Loading';

const SettingsTag = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);
  const [allTags, setAllTags] = useState<TagData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const allTagData = await retrieveAllData<TagData[]>(getAllTags);

    setAllTags(allTagData ?? []);
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
              <SettingNavigation isClicked={settingStateMap.TAG} customClassName='w-2/12 justify-end' />

              <Grid item className='w-9/12 pt-10'>
                {isLoading ? <Loading /> : <TagDetails user={currentUser} tags={allTags} handleRefresh={fetchData} />}
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default SettingsTag;
