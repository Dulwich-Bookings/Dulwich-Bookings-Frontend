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
import { retrieveAllData } from '@/utilities/api';
import ResourceService from '@/api/resource/ResourceService';
import TagService from '@/api/tag/TagService';
import SubscriptionService from '@/api/subscription/SubscriptionService';
import TagMapService from '@/api/tagMap/TagMapService';

import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { TagMapData } from '@/modules/tagMap/types';
import { SubscriptionData } from '@/modules/subscription/types';
import { resourceTypes, SearchState, searchStateMap } from '@/consts/constants';

const Home = () => {
  const [getAllResources] = useApi(() => ResourceService.getAllResources(), false, true, false);
  const [getAllSubscriptions] = useApi(() => SubscriptionService.getAllSubscriptions(), false, true, false);
  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);
  const [getAllTagMaps] = useApi(() => TagMapService.getAllTagMap(), false, true, false);

  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const [inputValue, setInputValue] = useState<string>('');
  const [searchState, setSearchState] = useState<SearchState>(searchStateMap.ALL);

  const [resources, setResources] = useState<ResourceData[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [tags, setTags] = useState<TagData[]>([]);
  const [tagMaps, setTagMaps] = useState<TagMapData[]>([]);

  const fetchData = async () => {
    // Process 'Resource' by Adding it's resource type
    const processResourceType = (input: ResourceData): ResourceData => {
      return { ...input, type: resourceTypes.RESOURCE };
    };
    // Process 'Subscription' by Adding it's resource type
    const processSubscriptionType = (input: SubscriptionData): SubscriptionData => {
      return { ...input, type: resourceTypes.SUBSCRIPTION };
    };

    const allResourceData = (await retrieveAllData<ResourceData[]>(getAllResources))?.map(resource => processResourceType(resource));
    const allSubscriptionData = (await retrieveAllData<SubscriptionData[]>(getAllSubscriptions))?.map(subscription =>
      processSubscriptionType(subscription),
    );
    const allTagData = await retrieveAllData<TagData[]>(getAllTags);
    const allTagMapData = await retrieveAllData<TagMapData[]>(getAllTagMaps);

    setResources(allResourceData ?? []);
    setSubscriptions(allSubscriptionData ?? []);
    setTags(allTagData ?? []);
    setTagMaps(allTagMapData ?? []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onInputChangeHandler = (enteredValue: string): void => setInputValue(enteredValue);
  const onSearchStateChangeHandler = (state: SearchState): void => setSearchState(state);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Stack spacing={3}>
              <Stack spacing={-4}>
                <HomeBanner schoolId={1} />
                <HomeSearchBar onInputChange={onInputChangeHandler} onStateChange={onSearchStateChangeHandler} />
              </Stack>
              <HomeResources
                searchedInput={inputValue}
                searchState={searchState}
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
