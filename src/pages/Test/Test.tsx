import React, { useState, useEffect } from 'react';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';
import UserService from '@/api/user/UserService';
import TagService from '@/api/tag/TagService';
import SubscriptionService from '@/api/subscription/SubscriptionService';
import ResourceService from '@/api/resource/ResourceService';
import SchoolService from '@/api/school/SchoolService';
import DateTime from '@/modules/DateTime/DateTime';
import RecentlyVisitedService from '@/api/recently visited/RecentlyVisitedService';

import { CreateSubscriptionData, SubscriptionPutData } from '@/modules/subscription/types';
import { CreateSchoolData, SchoolPutData } from '@/modules/school/types';
import { CreateResourceData } from '@/modules/resource/types';
import { ApiData } from '@/api/ApiService';
import { isSuccess } from '@/api/ApiHandler';
import { timezone, role } from '@/consts/constants';
import { styled } from '@mui/material/styles';
import { Button, Stack, Typography } from '@mui/material';

const Input = styled('input')({
  display: 'none',
});

const createSchoolData: CreateSchoolData = {
  name: 'London',
  alternativeName: '伦敦德威国际学校',
  timezone: timezone.LONDON,
};

const updateSchoolData: SchoolPutData = {
  name: 'Shanghai',
};

const createSubscriptionData: CreateSubscriptionData = {
  name: 'Adobe Photoshop',
  description: 'For photo editing',
  accessRights: [role.ADMIN, role.TEACHER],
  credentials: 'test123',
  expiry: DateTime.newDateTimeFromDate(new Date()),
  remindMe: true,
  schoolId: 1,
};

const updateSubscriptionData: SubscriptionPutData = {
  name: 'Adobe Acrobat',
};

const createResourceData: CreateResourceData = {
  name: 'A113',
  description: 'This is an intriguing room.',
  accessRights: [role.ADMIN, role.TEACHER],
  bookingRights: [role.ADMIN, role.TEACHER],
  inAdvance: 3,
  isBookingDescriptionOptional: true,
  schoolId: 1,
};

let isFirstLoaded = true;

const Test = () => {
  const [loginStudent] = useApi(() => AuthService.login('student23@stu.dulwich.org', 'asdasd', 1), true, true);
  const [loginTeacher] = useApi(() => AuthService.login('teacher@dulwich.org', 'asdasd', 1), true, true);
  const [loginAdmin] = useApi(() => AuthService.login('admin@dulwich.org', 'asdasd', 1), true, true);
  const [bulkSignUp] = useApi(() => AuthService.bulkRegister(bulkSignUpForm), true, true);
  const [bulkSignUpForm, setBulkSignUpForm] = useState<FormData>(new FormData());

  const [getAllUsers] = useApi(() => UserService.getAllUsers(), true, true);
  const [getAllTags] = useApi(() => TagService.getAllTags(), true, true);

  const [createSchool] = useApi(() => SchoolService.createSchool(createSchoolData), true, true);
  const [getAllSchools] = useApi(() => SchoolService.getAllSchools(), true, true);
  const [getSchoolById] = useApi(() => SchoolService.getSchoolById(1), true, true);
  const [updateSchoolById] = useApi(() => SchoolService.updateSchoolById(3, updateSchoolData), true, true);
  const [deleteSchoolById] = useApi(() => SchoolService.deleteSchoolById(5), true, true);

  const [createSubscription] = useApi(() => SubscriptionService.createSubscription(createSubscriptionData), true, true);
  const [getAllSubscriptions] = useApi(() => SubscriptionService.getAllSubscriptions(), true, true);
  const [getSubscriptionById] = useApi(() => SubscriptionService.getSubscriptionById(2), true, true);
  const [updateSubscriptionById] = useApi(() => SubscriptionService.updateSubscriptionById(2, updateSubscriptionData), true, true);
  const [deleteSubscriptionById] = useApi(() => SubscriptionService.deleteSubscriptionById(1), true, true);

  const [createResource] = useApi(() => ResourceService.createResource(createResourceData), true, true);
  const [getAllResources] = useApi(() => ResourceService.getAllResources(), true, true);
  const [getResourceById] = useApi(() => ResourceService.getResourceById(3), true, true);
  const [updateResourceById] = useApi(() => ResourceService.updateResourceById(3, createResourceData), true, true);
  const [deleteResourceById] = useApi(() => ResourceService.deleteResourceById(3), true, true);

  const [createRecentlyVisited] = useApi(
    () =>
      RecentlyVisitedService.createRecentlyVisited({
        resourceId: 1,
        subscriptionId: null,
      }),
    true,
    true,
  );
  const [getAllRecentlyVisited] = useApi(() => RecentlyVisitedService.getAllRecentlyVisited(), true, true);
  const [getRecentlyVisitedById] = useApi(() => RecentlyVisitedService.getRecentlyVisitedById(3), true, true);
  const [getSelfRecentlyVisited] = useApi(() => RecentlyVisitedService.getSelf(), true, true);
  const [deleteRecentlyVisitedById] = useApi(() => RecentlyVisitedService.deleteRecentlyVisitedById(3), true, true);

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

  return (
    <>
      <div className='pt-6 pl-6'>
        <Typography className='pb-6' variant='h3'>
          Add your own test components below!
        </Typography>
        <Typography variant='h4'>APIs</Typography>
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
              <Input accept='.csv' id='bulk-sign-up' type='file' onChange={e => handleBulkSignUp(e)} />
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
            <Button variant='contained' onClick={() => handleButtonClick(updateResourceById)}>
              Update Resource By Id
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(deleteResourceById)}>
              Delete Resource By Id
            </Button>
          </Stack>

          <Typography variant='h5'>Recently Visited</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(createRecentlyVisited)}>
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
        </Stack>
        <br />
      </div>
    </>
  );
};

export default Test;
