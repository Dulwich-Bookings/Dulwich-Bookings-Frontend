import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useApi } from '@/api/ApiHandler';
import TagService from '@/api/tag/TagService';
import UserService from '@/api/user/UserService';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';

import AddSubscriptionForm from '@/components/AddResource/Forms/AddSubscriptionForm/AddSubscriptionForm';
import { Grid, Stack } from '@mui/material';

import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';
import { retrieveAllData } from '@/utilities/api';

import ResourceSample1 from '@/assets/images/Resource-Sample-2.png';

const AddSubscription = () => {
  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), false, true, false);

  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const [tags, setTags] = useState<TagData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);

  const fetchData = async () => {
    const allTagData = await retrieveAllData<TagData[]>(getAllTags);
    const allUserData = await retrieveAllData<UserData[]>(getAllUsers);

    setTags(allTagData ?? []);
    setUsers(allUserData ?? []);
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
            <div className='hidden addRoomSmallerLaptop:block'>
              <Stack direction='row' className='w-screen justify-start'>
                <Grid className='w-2/3'>
                  <AddSubscriptionForm
                    tagData={tags}
                    userData={users}
                    editMode={false}
                    closeEditForm={() => {
                      return;
                    }}
                  />
                </Grid>

                <img className='hidden w-1/3 h-screen float-right object-cover addRoomLaptop:block' src={ResourceSample1} />
              </Stack>
            </div>
            <div className='flex w-screen justify-center h-screen items-center addRoomSmallerLaptop:hidden'>
              <div className='font-Inter text-[24px] text-center pb-20 px-5'>This page is not supported for small screens</div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default AddSubscription;
