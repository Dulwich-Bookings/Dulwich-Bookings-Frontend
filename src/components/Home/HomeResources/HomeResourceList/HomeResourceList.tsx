import React, { useEffect, useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import ResourceContainer from '@components/Home/HomeResources/HomeResourceContainer/HomeResourceContainer';

import BookmarkService from '@/api/bookmarks/BookmarkService';
import RecentlyVisitedService from '@/api/recentlyVisited/RecentlyVisitedService';
import { useApi } from '@/api/ApiHandler';
import { retrieveAllData } from '@/utilities/api';

import { resourceTypes, searchStateMap, SearchState } from '@/consts/constants';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';
import { SubscriptionData } from '@/modules/subscription/types';
import { TagMapData } from '@/modules/tagMap/types';
import { BookmarkData, CreateBookmarkData } from '@/modules/Bookmarks/Types';
import { RecentlyVisitedData, CreateRecentlyVisitedData } from '@/modules/recentlyVisited/Types';

type Props = {
  searchedInput: string;
  searchState: SearchState;
  tagData: TagData[];
  tagMapData: TagMapData[];
  resourceData: ResourceData[];
  subscriptionData: SubscriptionData[];
  isBookmarksViewClicked: boolean;
  isRvViewClicked: boolean;
  currentUser: UserData;
};

const sortResourcesByName = (resourceAndSubscriptions: (ResourceData | SubscriptionData)[]) =>
  resourceAndSubscriptions.sort((x, y) => x.name.localeCompare(y.name));

const HomeRoomList = (props: Props) => {
  // react hooks
  const initResourceAndSubscriptionData = sortResourcesByName([...props.subscriptionData, ...props.resourceData]);
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [recentlyVisited, setRecentlyVisited] = useState<RecentlyVisitedData[]>([]);
  const [allResourceAndSubscriptions, setAllResourceAndSubcription] =
    useState<(ResourceData | SubscriptionData)[]>(initResourceAndSubscriptionData);

  // useApi hooks
  const [getMyBookmarks] = useApi(() => BookmarkService.getSelf(), false, true, false);
  const [createBookmark] = useApi((data: CreateBookmarkData) => BookmarkService.createBookmark(data ?? null), false, true, false);
  const [deleteBookmarkById] = useApi((id: number) => BookmarkService.deleteBookmarkById(id), false, true, false);
  const [getMyRecentlyVisited] = useApi(() => RecentlyVisitedService.getSelf(), false, true, false);
  const [createRecentlyVisited] = useApi(
    (data: CreateRecentlyVisitedData) => RecentlyVisitedService.createRecentlyVisited(data ?? null),
    false,
    true,
    false,
  );

  // helper functions
  const isEmptyArray = (arr: unknown[]) => arr.length === 0;
  const isBookmark = (r: SubscriptionData | ResourceData) =>
    r.type === resourceTypes.RESOURCE
      ? !isEmptyArray(bookmarks.filter(b => b.resourceId === r.id))
      : !isEmptyArray(bookmarks.filter(b => b.subscriptionId === r.id));
  const isRecentlyVisited = (r: SubscriptionData | ResourceData) =>
    r.type === resourceTypes.RESOURCE
      ? !isEmptyArray(recentlyVisited.filter(b => b.resourceId === r.id))
      : !isEmptyArray(recentlyVisited.filter(b => b.subscriptionId === r.id));

  const fetchBookmarksData = async () => {
    const myBookmarks = await retrieveAllData<BookmarkData[]>(getMyBookmarks);
    setBookmarks(myBookmarks ?? []);
  };

  const fetchRecentlyVisitedData = async () => {
    const myRecentlyVisited = await retrieveAllData<RecentlyVisitedData[]>(getMyRecentlyVisited);
    setRecentlyVisited(myRecentlyVisited ?? []);
  };

  const onBookmarkHandler = async (id: number, type: SearchState): Promise<void> => {
    const newBookmark: BookmarkData =
      type === resourceTypes.RESOURCE
        ? ({ resourceId: id, subscriptionId: null, userId: props.currentUser?.id, id: Math.random() } as BookmarkData)
        : ({ resourceId: null, subscriptionId: id, userId: props.currentUser?.id, id: Math.random() } as BookmarkData);
    const newBookMarkList: BookmarkData[] = [...bookmarks, newBookmark];
    setBookmarks(newBookMarkList);

    const createBookmarkData = type === resourceTypes.RESOURCE ? { resourceId: id } : { subscriptionId: id };
    await createBookmark(createBookmarkData);
    await fetchBookmarksData();
  };

  const onUnBookmarkHandler = async (id: number, type: SearchState): Promise<void> => {
    const isToDeleteBookmark = (b: BookmarkData): boolean =>
      type === resourceTypes.RESOURCE ? b.resourceId === id : b.subscriptionId === id;
    const newBookmarkList = bookmarks.filter(bookmark => !isToDeleteBookmark(bookmark));
    setBookmarks(newBookmarkList);

    const deletionId = bookmarks.find(b => (type === resourceTypes.RESOURCE ? b.resourceId === id : b.subscriptionId === id))?.id;
    await deleteBookmarkById(deletionId);
    await fetchBookmarksData();
  };

  const onRecentlyVisitedHandler = async (id: number, type: SearchState, isRecentlyVisited: boolean): Promise<void> => {
    if (!isRecentlyVisited) {
      const newRecentlyVisited: RecentlyVisitedData =
        type === resourceTypes.RESOURCE
          ? ({ resourceId: id, subscriptionId: null, userId: props.currentUser?.id, id: Math.random() } as RecentlyVisitedData)
          : ({ resourceId: null, subscriptionId: id, userId: props.currentUser?.id, id: Math.random() } as RecentlyVisitedData);
      const newRecentlyVisitedList: RecentlyVisitedData[] = [...recentlyVisited, newRecentlyVisited];
      setRecentlyVisited(newRecentlyVisitedList);

      const createRecentlyVisitedData = type === resourceTypes.RESOURCE ? { resourceId: id } : { subscriptionId: id };
      await createRecentlyVisited(createRecentlyVisitedData);
      await fetchRecentlyVisitedData();
    }
  };

  // Fetch Data from API
  useEffect(() => {
    fetchBookmarksData();
    fetchRecentlyVisitedData();
  }, []);

  // update useStates upon prop change
  useEffect(() => {
    const resourceData: ResourceData[] = props.resourceData;
    const subscriptionData: SubscriptionData[] = props.subscriptionData;
    setAllResourceAndSubcription(sortResourcesByName([...resourceData, ...subscriptionData]));
  }, [props.subscriptionData, props.resourceData]);

  // Check and Swap View State (isRvView or isBookmarksView or UserSearchView) &&
  // Check and Swap searchState Filter (isAll or isRoom or isSubscription)
  useEffect(() => {
    const resourceData: ResourceData[] = props.resourceData;
    const subscriptionData: SubscriptionData[] = props.subscriptionData;
    let newCombinedData = sortResourcesByName([...resourceData, ...subscriptionData]);
    const searchInput = props.searchedInput;

    // Check and Swap View State (isRvView or isBookmarksView or UserSearchView)
    const isSearchEmpty = searchInput.length === 0;
    if (!isSearchEmpty) {
      const isSearchInputInString = (str: string): boolean => str.toUpperCase().indexOf(searchInput.toUpperCase()) > -1;
      const filteredResourceData = resourceData.filter(resource => isSearchInputInString(resource.name));
      const filteredSubscriptionData = subscriptionData.filter(subscription => isSearchInputInString(subscription.name));
      newCombinedData = sortResourcesByName([...filteredResourceData, ...filteredSubscriptionData]);
      setAllResourceAndSubcription(newCombinedData);
    }

    if (props.isBookmarksViewClicked && isSearchEmpty) {
      const allBookmarkedResourcesAndSubcriptions = [...resourceData, ...subscriptionData].filter(r => isBookmark(r));
      newCombinedData = sortResourcesByName(allBookmarkedResourcesAndSubcriptions);
      setAllResourceAndSubcription(newCombinedData);
    }

    if (props.isRvViewClicked && isSearchEmpty) {
      const allRecentlyVisitedResourcesAndSubcriptions = [...resourceData, ...subscriptionData].filter(r => isRecentlyVisited(r));
      newCombinedData = sortResourcesByName(allRecentlyVisitedResourcesAndSubcriptions);
      setAllResourceAndSubcription(newCombinedData);
    }

    // Check and Swap searchState Filter (isAll or isRoom or isSubscription)
    if (props.searchState === searchStateMap.ALL) {
      setAllResourceAndSubcription(newCombinedData);
    }
    if (props.searchState === searchStateMap.RESOURCES) {
      const filteredData = newCombinedData.filter(r => r.type === searchStateMap.RESOURCES);
      setAllResourceAndSubcription(filteredData);
    }
    if (props.searchState === searchStateMap.SUBSCRIPTIONS) {
      const filteredData = newCombinedData.filter(r => r.type === searchStateMap.SUBSCRIPTIONS);
      setAllResourceAndSubcription(filteredData);
    }
  }, [
    props.searchedInput,
    props.resourceData,
    props.subscriptionData,
    props.isBookmarksViewClicked,
    props.isRvViewClicked,
    props.searchState,
    bookmarks,
  ]);

  const isDataEmpty = allResourceAndSubscriptions.length === 0;
  return (
    <>
      <Box className='py-20'>
        {!isDataEmpty && (
          <Grid item container spacing={3.5}>
            {allResourceAndSubscriptions.map(resource => (
              <ResourceContainer
                key={resource.type === resourceTypes.RESOURCE ? `Room:${resource.id}` : `Subscription:${resource.id}`}
                data={resource}
                tagData={props.tagData}
                tagMapData={props.tagMapData}
                isBookmark={isBookmark(resource)}
                isRecentlyVisited={isRecentlyVisited(resource)}
                onBookmarkChangeHandler={isBookmark(resource) ? onUnBookmarkHandler : onBookmarkHandler}
                onRecentlyVisitedHandler={onRecentlyVisitedHandler}
              />
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
