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
import { TagData } from '@/modules/tag/types';
import { TagMapData } from '@/modules/tagMap/types';

import ResourceService from '@/api/resource/ResourceService';
import TagService from '@/api/tag/TagService';
import SubscriptionService from '@/api/subscription/SubscriptionService';
import TagMapService from '@/api/tagMap/TagMapService';
import { isSuccess } from '@/api/ApiHandler';
import { SubscriptionData } from '@/modules/subscription/types';
import { resourceTypes } from '@/consts/constants';

const processResourceType = (input: ResourceData): ResourceData => {
  return { ...input, type: resourceTypes.RESOURCE };
};

const processSubscriptionType = (input: SubscriptionData): SubscriptionData => {
  return { ...input, type: resourceTypes.SUBSCRIPTION };
};

const Home = () => {
  const retrieveAllData = async (func: () => Promise<ApiData & isSuccess>) => {
    const res = await func();
    if (res.isSuccess) {
      return res.data;
    }
  };

  const [getAllResources] = useApi(() => ResourceService.getAllResources(), false, true, false);
  const [getAllSubscriptions] = useApi(() => SubscriptionService.getAllSubscriptions(), false, true, false);
  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);
  const [getallTagMaps] = useApi(() => TagMapService.getAllTagMap(), false, true, false);

  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);
  const [inputValue, setInputValue] = useState<string>('');
  const [viewState, setViewState] = useState<string>('all');
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [tags, setTags] = useState<TagData[]>([]);
  const [tagMaps, setTagMaps] = useState<TagMapData[]>([]);

  const onInputChangeHandler = (enteredValue: string): void => {
    setInputValue(enteredValue);
  };

  const onStateChangeHandler = (state: string): void => {
    setViewState(state);
  };

  useEffect(() => {
    retrieveAllData(getAllResources).then(d => {
      setResources(r => [...r, ...d.map((data: ResourceData) => processResourceType(data))]);
    });
    retrieveAllData(getAllSubscriptions).then(d =>
      setSubscriptions(r => [...r, ...d.map((data: SubscriptionData) => processSubscriptionType(data))]),
    );
    retrieveAllData(getAllTags).then(d => setTags(r => [...r, ...d]));
    retrieveAllData(getallTagMaps).then(d => setTagMaps(r => [...r, ...d]));
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
                <HomeSearchBar onInputChange={onInputChangeHandler} onStateChange={onStateChangeHandler} />
              </Stack>
              <HomeResources
                searchedInput={inputValue}
                viewState={viewState}
                resourceData={resources}
                subscriptionData={subscriptions}
                tagMapData={tagMaps}
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
