import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';
import UserService from '@/api/user/UserService';
import TagService from '@/api/tag/TagService';

import SubscriptionService from '@/api/subscription/SubscriptionService';
import ResourceService from '@/api/resource/ResourceService';
import SchoolService from '@/api/school/SchoolService';
import TagMapService from '@/api/tagMap/TagMapService';
import DateTime from '@/modules/DateTime/DateTime';
import BookmarkService from '@/api/bookmarks/BookmarkService';
import RecentlyVisitedService from '@/api/recentlyVisited/RecentlyVisitedService';
import ResourceMapService from '@/api/resourceMap/ResourceMapService';

// import BookingsModal from '@/components/BookingsModal/BookingsModal';
import { CreateSubscriptionData, SubscriptionPutData } from '@/modules/subscription/types';
import { CreateSchoolData, SchoolPutData } from '@/modules/school/types';
import { CreateResourceData, ResourcePutData } from '@/modules/resource/types';
import { CreateTagMapData } from '@/modules/tagMap/types';
import { CreateBookmarkData } from '@/modules/Bookmarks/Types';
import { CreateRecentlyVisitedData } from '@/modules/recentlyVisited/Types';
import { CreateResourceMapData } from '@/modules/resourceMap/types';
// import { getCurrentUser } from '@/modules/user/userSlice';

import { ApiData } from '@/api/ApiService';
import { isSuccess } from '@/api/ApiHandler';
import { timezone, role } from '@/consts/constants';
import { Button, Stack, Typography } from '@mui/material';

import BookingService from '@/api/booking/BookingService';
import { BookingPutData, BookingState, BookingType, CreateBookingData } from '@/modules/Bookings/Types';

const createSchoolData: CreateSchoolData = {
  name: 'London',
  alternativeName: '伦敦德威国际学校',
  timezone: timezone.LONDON,
};

const updateSchoolData: SchoolPutData = {
  name: 'Shanghai',
};

const createSubscriptionData: CreateSubscriptionData = {
  subscription: {
    name: 'Adobe Photoshop',
    description: 'For photo editing',
    accessRights: [role.ADMIN, role.TEACHER],
    credentials: 'test123',
    expiry: DateTime.newDateTimeFromDate(new Date()),
    remindMe: true,
  },
  users: [1, 2],
  tags: [1, 2],
};

const updateSubscriptionData: SubscriptionPutData = {
  subscription: { name: 'Adobe Acrobat' },
  tags: [1, 3],
  users: [1, 3],
};

const createResourceData: CreateResourceData = {
  resource: {
    name: 'A113',
    description: 'This is an intriguing room.',
    accessRights: [role.ADMIN, role.TEACHER],
    bookingRights: [role.ADMIN, role.TEACHER],
    inAdvance: 3,
    isBookingDescriptionOptional: true,
    weekProfile: 'Weekly',
  },
  tags: [1, 2],
  users: [1, 2],
};

const updateResourceData: ResourcePutData = {
  resource: {
    name: 'B113',
    description: 'This is an intriguing room.',
    accessRights: [role.ADMIN, role.TEACHER],
    bookingRights: [role.ADMIN, role.TEACHER],
  },
  tags: [1, 3],
  users: [1, 3],
};

let isFirstLoaded = true;

const Test = () => {
  const [loginStudent] = useApi(() => AuthService.login('student23@stu.dulwich.org', 'asdasd', 1), true, true);
  const [loginTeacher] = useApi(() => AuthService.login('teacher@dulwich.org', 'asdasd', 1), true, true);
  const [loginAdmin] = useApi(() => AuthService.login('admin@dulwich.org', 'asdasd?', 1), true, true);
  const [bulkSignUp] = useApi(() => AuthService.bulkRegister(bulkSignUpForm), true, true);
  const [bulkSignUpForm, setBulkSignUpForm] = useState<FormData>(new FormData());

  const [getAllUsers] = useApi(() => UserService.getAllUsers(), true, true);
  const [getAllTags] = useApi(() => TagService.getAllTags(), true, true);

  // const [openCalendarModal, setOpenCalendarModal] = useState<boolean>(false);

  // const handleCloseModal = () => {
  //   setOpenCalendarModal(false);
  // };
  const [createSchool] = useApi(() => SchoolService.createSchool(createSchoolData), true, true);
  const [getAllSchools] = useApi(() => SchoolService.getAllSchools(), true, true);
  const [getSchoolById] = useApi(() => SchoolService.getSchoolById(1), true, true);
  const [updateSchoolById] = useApi(() => SchoolService.updateSchoolById(3, updateSchoolData), true, true);
  const [deleteSchoolById] = useApi(() => SchoolService.deleteSchoolById(5), true, true);

  const [createSubscription] = useApi(() => SubscriptionService.createSubscription(createSubscriptionData), true, true);
  const [getAllSubscriptions] = useApi(() => SubscriptionService.getAllSubscriptions(), true, true);
  const [getSubscriptionById] = useApi(() => SubscriptionService.getSubscriptionById(2), true, true);
  const [getSubscriptionSelf] = useApi(() => SubscriptionService.getSubscriptionSelf(), true, true);
  const [updateSubscriptionById] = useApi(() => SubscriptionService.updateSubscriptionById(6, updateSubscriptionData), true, true);
  const [deleteSubscriptionById] = useApi(() => SubscriptionService.deleteSubscriptionById(2), true, true);

  const [createResource] = useApi(() => ResourceService.createResource(createResourceData), true, true);
  const [getAllResources] = useApi(() => ResourceService.getAllResources(), true, true);
  const [getResourceById] = useApi(() => ResourceService.getResourceById(27), true, true);
  const [getResourceSelf] = useApi(() => ResourceService.getResourceSelf(), true, true);
  const [updateResourceById] = useApi(() => ResourceService.updateResourceById(27, updateResourceData), true, true);
  const [deleteResourceById] = useApi(() => ResourceService.deleteResourceById(27), true, true);

  const [createResourceMap] = useApi((data: CreateResourceMapData) => ResourceMapService.createResourceMap(data ?? null), true, true);
  const [getAllResourceMaps] = useApi(() => ResourceMapService.getAllResourceMaps(), true, true);
  const [getResourceMapById] = useApi(() => ResourceMapService.getResourceMapById(1), true, true);
  const [getResourceMapSelf] = useApi(() => ResourceMapService.getResourceMapSelf(), true, true);
  const [deleteResourceMapById] = useApi(() => ResourceMapService.deleteResourceMapById(6), true, true);
  const [bulkCreateResourceMap] = useApi(
    (data: CreateResourceMapData[]) => ResourceMapService.bulkCreateResourceMap(data ?? null),
    true,
    true,
  );
  const [bulkDeleteResourceMap] = useApi(() => ResourceMapService.bulkDeleteResourceMap([1, 2]), true, true);

  const [createBookmark] = useApi((data: CreateBookmarkData) => BookmarkService.createBookmark(data ?? null), true, true);
  const [getAllBookmarks] = useApi(() => BookmarkService.getAllBookmarks(), true, true);
  const [getBookmarkdById] = useApi(() => BookmarkService.getBookmarkById(3), true, true);
  const [getSelfBookmark] = useApi(() => BookmarkService.getSelf(), true, true);
  const [deleteBookmarkById] = useApi(() => BookmarkService.deleteBookmarkById(17), true, true);

  const [createTagMap] = useApi((data: CreateTagMapData) => TagMapService.createTagMap(data ?? null), true, true);
  const [bulkCreateTagMap] = useApi((data: CreateTagMapData[]) => TagMapService.bulkCreateTagMap(data ?? null), true, true);
  const [getAllTagMap] = useApi(() => TagMapService.getAllTagMap(), true, true);
  const [getTagMapById] = useApi(() => TagMapService.getTagMapById(1), true, true);
  const [deleteTagMapById] = useApi(() => TagMapService.deleteTagMapById(13), true, true);
  const [bulkDeleteTagMap] = useApi(() => TagMapService.bulkDeleteTagMap([19, 20]), true, true);

  const [createRecentlyVisited] = useApi(
    (data: CreateRecentlyVisitedData) => RecentlyVisitedService.createRecentlyVisited(data ?? null),
    true,
    true,
  );
  const [getAllRecentlyVisited] = useApi(() => RecentlyVisitedService.getAllRecentlyVisited(), true, true);
  const [getRecentlyVisitedById] = useApi(() => RecentlyVisitedService.getRecentlyVisitedById(3), true, true);
  const [getSelfRecentlyVisited] = useApi(() => RecentlyVisitedService.getSelf(), true, true);
  const [deleteRecentlyVisitedById] = useApi(() => RecentlyVisitedService.deleteRecentlyVisitedById(3), true, true);

  const [createBooking] = useApi((data: CreateBookingData) => BookingService.createBooking(data ?? null), true, true);
  const [getAllBookings] = useApi(() => BookingService.getOwnBookings(), true, true);
  const [getBookingById] = useApi(() => BookingService.getBookingById(2), true, true);
  const [updateCurrBookingById] = useApi((data: BookingPutData) => BookingService.updateCurrBookingById(5, data ?? null), true, true);
  const [deleteBookingById] = useApi((index: number) => BookingService.deleteCurrBookingById(index), true, true);

  const handleButtonClick = async (func: () => Promise<ApiData & isSuccess>) => {
    const res = await func();
    if (res.isSuccess) {
      console.log(res.data);
    }
  };

  const handleBulkSignUp = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    setBulkSignUpForm(formData);
  };

  useEffect(() => {
    if (isFirstLoaded) {
      isFirstLoaded = false;
      return;
    }
    bulkSignUp();
  }, [bulkSignUpForm]);

  // const currentUser = useSelector(getCurrentUser);

  return (
    <>
      {/* {currentUser && <BookingsModal
        openState={openCalendarModal}
        handleCloseModal={handleCloseModal}
        title='technology'
        description='tech1'
        currentUser={currentUser}
      />} */}
      <div className='pt-6 pl-6'>
        <Typography className='pb-6' variant='h3'>
          Add your own test components below!
        </Typography>
        <Typography variant='h4'>APIs</Typography>

        <Stack spacing={4}>
          <Stack spacing={2} direction='column'>
            <Typography variant='h5'>Auth</Typography>
            <Stack spacing={2} direction='row'>
              <Button variant='contained' onClick={() => handleButtonClick(loginStudent)}>
                Sign In Student
              </Button>
              <Button variant='contained' onClick={() => handleButtonClick(loginTeacher)}>
                Sign In Teacher
              </Button>
              <Button variant='contained' onClick={() => handleButtonClick(loginAdmin)}>
                Sign In Admin
              </Button>
              <label htmlFor='bulk-sign-up'>
                <input className='hidden' accept='.csv' id='bulk-sign-up' type='file' onChange={e => handleBulkSignUp(e)} />
                <Button variant='contained' component='span'>
                  Bulk Sign Up
                </Button>
              </label>
              <Button variant='contained' onClick={() => AuthService.logout()}>
                Logout
              </Button>
            </Stack>
            <Typography variant='h5'>Tag</Typography>
            <Stack spacing={2} direction='row'>
              <Button variant='contained' onClick={() => handleButtonClick(getAllTags)}>
                Get All Tags
              </Button>
            </Stack>
            <Typography variant='h5'>User</Typography>
            <Stack spacing={2} direction='row'>
              <Button variant='contained' onClick={() => handleButtonClick(getAllUsers)}>
                Get All Users
              </Button>
            </Stack>
          </Stack>

          <Typography variant='h5'>Tag</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(getAllTags)}>
              Get All Tags
            </Button>
          </Stack>

          <Typography variant='h5'>User</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(getAllUsers)}>
              Get All Users
            </Button>
          </Stack>

          <Typography variant='h5'>School</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(createSchool)}>
              Create school
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getAllSchools)}>
              Get all schools
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getSchoolById)}>
              Get school by Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(updateSchoolById)}>
              Update school by Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(deleteSchoolById)}>
              Delete school by Id
            </Button>
          </Stack>

          <Typography variant='h5'>Subscription</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(createSubscription)}>
              Create Subscription
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getAllSubscriptions)}>
              Get All Subscriptions
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getSubscriptionById)}>
              Get Subscription By Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getSubscriptionSelf)}>
              Get Subscription Self
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(updateSubscriptionById)}>
              Update Subscription By Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(deleteSubscriptionById)}>
              Delete Subscription By Id
            </Button>
          </Stack>

          <Typography variant='h5'>Resource</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(createResource)}>
              Create Resource
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getAllResources)}>
              Get all resources
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getResourceById)}>
              Get Resource by Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getResourceSelf)}>
              Get Resource Self
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(updateResourceById)}>
              Update Resource By Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(deleteResourceById)}>
              Delete Resource By Id
            </Button>
          </Stack>

          <Typography variant='h5'>Resource Map</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(() => createResourceMap({ userId: 2, resourceId: 1 }))}>
              Create Resource Map
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getAllResourceMaps)}>
              Get all resources maps
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getResourceMapById)}>
              Get Resource Map by Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getResourceMapSelf)}>
              Get Resource Map Self
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(deleteResourceMapById)}>
              Delete Resource Map By Id
            </Button>
            <Button
              variant='contained'
              onClick={() =>
                handleButtonClick(() =>
                  bulkCreateResourceMap([
                    { userId: 2, resourceId: 1 },
                    { userId: 2, resourceId: 2 },
                  ]),
                )
              }
            >
              Bulk Create Resource Map
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(bulkDeleteResourceMap)}>
              Bulk Delete Resource Map
            </Button>
          </Stack>

          <Typography variant='h5'>TagMap</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(() => createTagMap({ tagId: 5, resourceId: 1 }))}>
              Create Tag Map
            </Button>

            <Button
              variant='contained'
              onClick={() =>
                handleButtonClick(() =>
                  bulkCreateTagMap([
                    { tagId: 5, resourceId: 1 },
                    { tagId: 4, resourceId: 1 },
                  ]),
                )
              }
            >
              Create Tag Map (Bulk)
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getAllTagMap)}>
              Get all Tag Map
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getTagMapById)}>
              Get Tag Map by Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(deleteTagMapById)}>
              Delete Tag Map By Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(bulkDeleteTagMap)}>
              Delete Tag Map (Bulk)
            </Button>
          </Stack>

          <Typography variant='h5'>Bookmarks</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(() => createBookmark({ resourceId: 1 }))}>
              Create Bookmark
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getAllBookmarks)}>
              Get All Bookmarks
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getBookmarkdById)}>
              Get Bookmark by Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getSelfBookmark)}>
              Get Self
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(deleteBookmarkById)}>
              Delete Bookmark By Id
            </Button>
          </Stack>

          <Typography variant='h5'>Recently Visited</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(() => createRecentlyVisited({ resourceId: 1 }))}>
              Create Recently Visited
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getAllRecentlyVisited)}>
              Get All Recently Visited
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getRecentlyVisitedById)}>
              Get Recently Visited by Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getSelfRecentlyVisited)}>
              Get Self
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(deleteRecentlyVisitedById)}>
              Delete Recently Visited By Id
            </Button>
          </Stack>

          <Typography variant='h5'>Bookings</Typography>
          <Stack spacing={2} direction='row'>
            <Button
              variant='contained'
              onClick={() =>
                handleButtonClick(() =>
                  createBooking({
                    resourceId: 1,
                    description: 'booking desc',
                    bookingState: BookingState.PENDING,
                    bookingType: BookingType.LESSON,
                    startDateTime: '2020-06-06T08:00:00.000Z',
                    endDateTime: '2020-06-06T10:00:00.000Z',
                  }),
                )
              }
            >
              Create Booking
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getAllBookings)}>
              Get All Bookings
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getBookingById)}>
              Get Booking by Id
            </Button>
            <Button
              variant='contained'
              onClick={() =>
                handleButtonClick(() =>
                  updateCurrBookingById({
                    startDateTime: '2020-07-20T08:00:00.000Z',
                    newBooking: {
                      resourceId: 1,
                      description: 'booking desc',
                      bookingState: BookingState.PENDING,
                      bookingType: BookingType.LESSON,
                      startDateTime: '2020-06-06T10:00:00.000Z',
                      endDateTime: '2020-06-06T11:00:00.000Z',
                    },
                  }),
                )
              }
            >
              Update Curr Booking by Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(() => deleteBookingById(6))}>
              Delete Booking by Id
            </Button>
          </Stack>
          {/* <Typography variant='h4'>Calendar Modal</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => setOpenCalendarModal(true)}>
              Open Modal
            </Button>
          </Stack> */}
        </Stack>
      </div>
      <br />
      <br />
    </>
  );
};

export default Test;
