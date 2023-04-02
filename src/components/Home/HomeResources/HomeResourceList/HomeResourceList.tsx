import React, { useEffect, useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import ResourceContainer from '@components/Home/HomeResources/HomeResourceContainer/HomeResourceContainer';
import Loading from '@components/Loading/Loading';

import { useApi } from '@/api/ApiHandler';
import { retrieveAllData } from '@/utilities/api';
import BookmarkService from '@/api/bookmarks/BookmarkService';
import RecentlyVisitedService from '@/api/recentlyVisited/RecentlyVisitedService';
import ResourceService from '@/api/resource/ResourceService';
import TagService from '@/api/tag/TagService';
import SubscriptionService from '@/api/subscription/SubscriptionService';
import TagMapService from '@/api/tagMap/TagMapService';

import { resourceTypes, searchStateMap, SearchState, role } from '@/consts/constants';
import { ResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { SchoolData } from '@/modules/school/types';
import { Role, UserData } from '@/modules/user/types';
import { SubscriptionData } from '@/modules/subscription/types';
import { TagMapData } from '@/modules/tagMap/types';
import { BookmarkData, CreateBookmarkData } from '@/modules/Bookmarks/Types';
import { RecentlyVisitedData } from '@/modules/recentlyVisited/Types';

type Props = {
  searchedInput: string;
  searchState: SearchState;
  isBookmarksViewClicked: boolean;
  isRvViewClicked: boolean;
  className?: string;
  currentUser: UserData;
  currentSchool: SchoolData;
  editMode: boolean;
  editResourceHandler: (data: ResourceData | SubscriptionData, tags: TagData[]) => void;
};

const sortResourcesByName = (resourceAndSubscriptions: (ResourceData | SubscriptionData)[]) =>
  resourceAndSubscriptions.sort((x, y) => x.name.localeCompare(y.name));

const HomeResourceList = (props: Props) => {
  // react hooks
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [recentlyVisited, setRecentlyVisited] = useState<RecentlyVisitedData[]>([]);
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [tags, setTags] = useState<TagData[]>([]);
  const [tagMaps, setTagMaps] = useState<TagMapData[]>([]);
  const initResourceAndSubscriptionData = sortResourcesByName([...subscriptions, ...resources]);
  const [allResourceAndSubscriptions, setAllResourceAndSubcription] =
    useState<(ResourceData | SubscriptionData)[]>(initResourceAndSubscriptionData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useApi hooks
  const [getMyBookmarks] = useApi(() => BookmarkService.getSelf(), false, true, false);
  const [createBookmark] = useApi((data: CreateBookmarkData) => BookmarkService.createBookmark(data ?? null), false, true, false);
  const [deleteBookmarkById] = useApi((id: number) => BookmarkService.deleteBookmarkById(id), false, true, false);
  const [getMyRecentlyVisited] = useApi(() => RecentlyVisitedService.getSelf(), false, true, false);
  const [getAllResources] = useApi(() => ResourceService.getAllResources(), false, true, false);
  const [getResourceSelf] = useApi(() => ResourceService.getResourceSelf(), false, true, false);
  const [getAllSubscriptions] = useApi(() => SubscriptionService.getAllSubscriptions(), false, true, false);
  const [getSubscriptionSelf] = useApi(() => SubscriptionService.getSubscriptionSelf(), false, true, false);
  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);
  const [getAllTagMaps] = useApi(() => TagMapService.getAllTagMap(), false, true, false);
  // const [createRecentlyVisited] = useApi(
  //   (data: CreateRecentlyVisitedData) => RecentlyVisitedService.createRecentlyVisited(data ?? null),
  //   false,
  //   true,
  //   false,
  // );

  // API Functions
  const fetchBookmarksData = async () => {
    const myBookmarks = await retrieveAllData<BookmarkData[]>(getMyBookmarks);
    setBookmarks(myBookmarks ?? []);
  };

  const fetchRecentlyVisitedData = async () => {
    const myRecentlyVisited = await retrieveAllData<RecentlyVisitedData[]>(getMyRecentlyVisited);
    setRecentlyVisited(myRecentlyVisited ?? []);
  };

  const fetchAllData = async () => {
    setIsLoading(true);

    await fetchBookmarksData();
    await fetchRecentlyVisitedData();
    const allResourceData =
      !props.editMode || props.currentUser.role === role.ADMIN
        ? await retrieveAllData<ResourceData[]>(getAllResources)
        : await retrieveAllData<ResourceData[]>(getResourceSelf);

    const allSubscriptionData =
      !props.editMode || props.currentUser.role === role.ADMIN
        ? await retrieveAllData<SubscriptionData[]>(getAllSubscriptions)
        : await retrieveAllData<SubscriptionData[]>(getSubscriptionSelf);

    const allTagData = await retrieveAllData<TagData[]>(getAllTags);
    const allTagMapData = await retrieveAllData<TagMapData[]>(getAllTagMaps);

    setResources(allResourceData?.filter(r => filterResourceByRole(r)) ?? []);
    setSubscriptions(allSubscriptionData?.filter(r => filterResourceByRole(r)) ?? []);
    setTags(allTagData ?? []);
    setTagMaps(allTagMapData ?? []);
    allResourceData &&
      allSubscriptionData &&
      setAllResourceAndSubcription(sortResourcesByName([...allResourceData, ...allSubscriptionData]));

    setIsLoading(false);
  };

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

  const onBookmarkHandler = async (id: number, type: SearchState): Promise<void> => {
    setIsLoading(true);
    const newBookmark: BookmarkData =
      type === resourceTypes.RESOURCE
        ? ({ resourceId: id, subscriptionId: null, userId: props.currentUser?.id, id: Math.random() } as BookmarkData)
        : ({ resourceId: null, subscriptionId: id, userId: props.currentUser?.id, id: Math.random() } as BookmarkData);
    const newBookMarkList: BookmarkData[] = [...bookmarks, newBookmark];
    setBookmarks(newBookMarkList);

    const createBookmarkData = type === resourceTypes.RESOURCE ? { resourceId: id } : { subscriptionId: id };
    await createBookmark(createBookmarkData);
    await fetchBookmarksData();
    setIsLoading(false);
  };

  const onUnBookmarkHandler = async (id: number, type: SearchState): Promise<void> => {
    setIsLoading(true);
    const isToDeleteBookmark = (b: BookmarkData): boolean =>
      type === resourceTypes.RESOURCE ? b.resourceId === id : b.subscriptionId === id;
    const newBookmarkList = bookmarks.filter(bookmark => !isToDeleteBookmark(bookmark));
    setBookmarks(newBookmarkList);

    const deletionId = bookmarks.find(b => (type === resourceTypes.RESOURCE ? b.resourceId === id : b.subscriptionId === id))?.id;
    await deleteBookmarkById(deletionId);
    await fetchBookmarksData();
    setIsLoading(false);
  };

  const filterResourceByRole = (data: ResourceData | SubscriptionData): boolean => {
    const userRole: Role = props.currentUser.role;
    const roles: Role[] = data.accessRights;

    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === userRole) {
        return true;
      }
    }
    return false;
  };

  const editResourceHandler = (data: ResourceData | SubscriptionData, tags: TagData[]) => {
    props.editResourceHandler(data, tags);
  };

  // TODO Add this to the Bookings Modal Component instead
  // const onRecentlyVisitedHandler = async (id: number, type: SearchState, isRecentlyVisited: boolean): Promise<void> => {
  //   if (isRecentlyVisited) return;

  //   const newRecentlyVisited: RecentlyVisitedData =
  //     type === resourceTypes.RESOURCE
  //       ? ({ resourceId: id, subscriptionId: null, userId: props.currentUser?.id, id: Math.random() } as unknown as RecentlyVisitedData)
  //       : ({ resourceId: null, subscriptionId: id, userId: props.currentUser?.id, id: Math.random() } as unknown as RecentlyVisitedData);
  //   const newRecentlyVisitedList: RecentlyVisitedData[] = [...recentlyVisited, newRecentlyVisited];
  //   setRecentlyVisited(newRecentlyVisitedList);

  //   const createRecentlyVisitedData = type === resourceTypes.RESOURCE ? { resourceId: id } : { subscriptionId: id };
  //     await createRecentlyVisited(createRecentlyVisitedData);
  //     await fetchRecentlyVisitedData();
  //   }
  // };

  // Fetch Data from API
  useEffect(() => {
    fetchAllData();
  }, []);

  // Check and Swap View State (isRvView or isBookmarksView or UserSearchView) &&
  // Check and Swap searchState Filter (isAll or isRoom or isSubscription)
  useEffect(() => {
    const resourceData: ResourceData[] = resources;
    const subscriptionData: SubscriptionData[] = subscriptions;
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
  }, [props.searchedInput, props.isBookmarksViewClicked, props.isRvViewClicked, props.searchState, bookmarks, resources, subscriptions]);

  const isDataEmpty = allResourceAndSubscriptions.length === 0;
  return (
    <>
      <Box className={props.className}>
        {isLoading ? (
          <Loading />
        ) : !isDataEmpty ? (
          <Grid item container spacing={3.5}>
            {allResourceAndSubscriptions.map(resource => (
              <ResourceContainer
                key={resource.type === resourceTypes.RESOURCE ? `Room:${resource.id}` : `Subscription:${resource.id}`}
                data={resource}
                currentUser={props.currentUser}
                currentSchool={props.currentSchool}
                tagData={tags}
                tagMapData={tagMaps}
                isBookmark={isBookmark(resource)}
                isRecentlyVisited={isRecentlyVisited(resource)}
                onBookmarkChangeHandler={isBookmark(resource) ? onUnBookmarkHandler : onBookmarkHandler}
                onRecentlyVisitedHandler={() => ''}
                editMode={props.editMode}
                onEditHandler={editResourceHandler}
              />
            ))}
          </Grid>
        ) : (
          <Typography className='font-Inter text-textGray' variant='h5' textTransform='capitalize'>
            No Resources Found.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default HomeResourceList;
