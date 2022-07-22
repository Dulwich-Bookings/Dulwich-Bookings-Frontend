import React, { useState, useEffect } from 'react';

import { Stack } from '@mui/material';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import HomeBanner from '@components/Home/HomeBanner/HomeBanner';
import HomeSearchBar from '@components/Home/HomeSearchBar/HomeSearchBar';
import HomeResources from '@/components/Home/HomeResources/HomeResources';

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
import { SubscriptionData } from '@/modules/subscription/types';
import SubscriptionService from '@/api/subscription/SubscriptionService';

const Home = () => {
  const retrieveAllData = async (func: () => Promise<ApiData & isSuccess>) => {
    const res = await func();
    if (res.isSuccess) {
      return res.data;
    }
  };

  const [getAllResources] = useApi(() => ResourceService.getAllResources(), false, true, false);
  const [getAllSubscriptions] = useApi(() => SubscriptionService.getAllSubscriptions(), true, true, false);
  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);

  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);
  const [inputValue, setInputValue] = useState('');
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [tags, setTags] = useState<TagData[]>([]);

  const onInputChangeHandler = (enteredValue: string): void => {
    setInputValue(enteredValue);
  };

  useEffect(() => {
    retrieveAllData(getAllResources).then(d => setResources(r => [...r, ...d]));
    retrieveAllData(getAllSubscriptions).then(d => setSubscriptions(r => [...r, ...d]));
    retrieveAllData(getAllTags).then(d => setTags(r => [...r, ...d]));
  }, []);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Stack spacing={3}>
              <Stack spacing={-4}>
                <HomeBanner schoolId={1} />
                <HomeSearchBar onInputChange={onInputChangeHandler} />
              </Stack>
              <HomeResources
                searchedInput={inputValue}
                resourceData={resources}
                subscriptionData={subscriptions}
                tagData={tags}
                currentUser={currentUser}
              />
            </Stack>
          </main>
        </>
      )}
    </>
  );
};

export default Home;
