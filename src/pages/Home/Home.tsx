import React, { useState, useEffect } from 'react';

import { Stack } from '@mui/material';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import HomeBanner from '@components/Home/HomeBanner/HomeBanner';
import HomeSearchBar from '@components/Home/HomeSearchBar/HomeSearchBar';
import HomeRooms from '@/components/Home/HomeResources/HomeResources';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';

import { useApi } from '@/api/ApiHandler';
import { ApiData } from '@/api/ApiService';
import { ResourceData } from '@/modules/resource/types';
import ResourceService from '@/api/resource/ResourceService';
import TagService from '@/api/tag/TagService';
import { isSuccess } from '@/api/ApiHandler';
import { TagData } from '@/modules/tag/types';

const resources: ResourceData[] = [];
const tags: TagData[] = [];

const Home = () => {
  const retrieveAllData = async (func: () => Promise<ApiData & isSuccess>) => {
    const res = await func();
    if (res.isSuccess) {
      return res.data;
    }
  };

  const [getAllResources] = useApi(() => ResourceService.getAllResources(), true, true);
  const [getAllTags] = useApi(() => TagService.getAllTags(), true, true);

  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);
  const [inputValue, setInputValue] = useState('');

  const onInputChangeHandler = (enteredValue: string): void => {
    setInputValue(enteredValue);
  };

  useEffect(() => {
    retrieveAllData(getAllResources).then(d => d.filter((x: any) => resources.push(x)));
    retrieveAllData(getAllTags).then(d => d.filter((x: any) => tags.push(x)));
  }, [resources, tags]);

  return (
    <>
      {currentUser && currentSchool && <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />}
      <main>
        <Stack spacing={3}>
          <Stack spacing={-4}>
            <HomeBanner schoolId={1} />
            <HomeSearchBar onInputChange={onInputChangeHandler} />
          </Stack>
          <HomeRooms searchedInput={inputValue} resourceData={resources} tagData={tags} />
        </Stack>
      </main>
    </>
  );
};

export default Home;
