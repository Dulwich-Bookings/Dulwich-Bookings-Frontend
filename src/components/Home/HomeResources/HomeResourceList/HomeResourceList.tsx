import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ResourceContainer from '@components/Home/HomeResources/HomeResourceContainer/HomeResourceContainer';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';
import { recentlyVisitedMap, bookmarkMap } from '@/consts/dummyMaps';
import { SubscriptionData } from '@/modules/subscription/types';
import { TagMapData } from '@/modules/tagMap/types';
import { resourceTypes, viewState } from '@/consts/constants';

type Props = {
  searchedInput: string;
  viewState: string;
  tagData: TagData[];
  tagMapData: TagMapData[];
  resourceData: ResourceData[];
  subscriptionData: SubscriptionData[];
  bookmarksClicked: boolean;
  rvClicked: boolean;
  currentUser: UserData;
};

const HomeRoomList = (props: Props) => {
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [filteredResources, setFilteredResources] = useState<ResourceData[]>(props.resourceData);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<SubscriptionData[]>(props.subscriptionData);
  const [filteredResourcesAndSubscriptions, setFilteredResourcesAndSubscriptions] = useState<(ResourceData | SubscriptionData)[]>([
    ...props.subscriptionData,
    ...props.resourceData,
  ]);

  useEffect(() => {
    let resourceData: ResourceData[] = [];
    let subscriptionData: SubscriptionData[] = [];
    if (props.searchedInput.length > 0) {
      resourceData = props.resourceData.filter(resource => resource.name.match(new RegExp(props.searchedInput, 'i')));
      subscriptionData = props.subscriptionData.filter(subscription => subscription.name.match(new RegExp(props.searchedInput, 'i')));
      setFilteredResources(resourceData);
      setFilteredSubscriptions(subscriptionData);
      setFilteredResourcesAndSubscriptions([...resourceData, ...subscriptionData]);
    } else if (props.rvClicked) {
      resourceData = props.resourceData.filter(resource =>
        recentlyVisitedMap.some(rvMap => resource.id === rvMap.resource_id && rvMap.user_id === props.currentUser.id),
      );
      setFilteredResources(resourceData);
      setFilteredSubscriptions(subscriptionData);
      setFilteredResourcesAndSubscriptions([...resourceData]);
    } else {
      resourceData = props.resourceData.filter(resource =>
        bookmarkMap.some(bkMap => resource.id === bkMap.resource_id && bkMap.user_id === props.currentUser.id),
      );
      setFilteredResources(resourceData);
      setFilteredSubscriptions(subscriptionData);
      setFilteredResourcesAndSubscriptions([...resourceData]);
    }

    if (props.viewState === viewState.ALL) {
      if (resourceData.length === 0 && subscriptionData.length === 0) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
    } else if (props.viewState === viewState.RESOURCES) {
      if (resourceData.length === 0) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
    } else {
      if (subscriptionData.length === 0) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
    }

    console.log(filteredResourcesAndSubscriptions);
  }, [
    props.searchedInput,
    props.rvClicked,
    props.bookmarksClicked,
    props.resourceData,
    props.subscriptionData,
    props.tagData,
    props.tagMapData,
    props.viewState,
  ]);

  return (
    <>
      <Box className='py-20'>
        {!isDataEmpty && props.viewState === viewState.ALL && (
          <Grid item container spacing={3.5}>
            {filteredResourcesAndSubscriptions.map(resource => (
              <ResourceContainer
                key={resource.type === resourceTypes.RESOURCE ? `Room:${resource.id}` : `Subscription:${resource.id}`}
                data={resource}
                tagData={props.tagData}
                tagMapData={props.tagMapData}
              />
            ))}
          </Grid>
        )}

        {!isDataEmpty && props.viewState === viewState.RESOURCES && (
          <Grid item container spacing={3.5}>
            {filteredResources.map(resource => (
              <ResourceContainer key={resource.id} data={resource} tagData={props.tagData} tagMapData={props.tagMapData} />
            ))}
          </Grid>
        )}

        {!isDataEmpty && props.viewState === viewState.SUBSCRIPTIONS && (
          <Grid item container spacing={3.5}>
            {filteredSubscriptions.map(resource => (
              <ResourceContainer key={resource.id} data={resource} tagData={props.tagData} tagMapData={props.tagMapData} />
            ))}
          </Grid>
        )}

        {isDataEmpty && (
          <Typography className='font-Inter text-[#404040]' variant='h5' textTransform='capitalize'>
            No Resources Found.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default HomeRoomList;
