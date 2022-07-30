import React, { useState, useEffect } from 'react';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';

import { useApi } from '@/api/ApiHandler';
import TagService from '@/api/tag/TagService';
import UserService from '@/api/user/UserService';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';

import AddRoomForm from '@/components/AddResource/AddRoomForm/AddRoomForm';
import { retrieveAllData } from '@/utilities/api';

const AddRoom = () => {
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
            <div className='hidden addRoomLaptop:block'>
              <AddRoomForm tagData={tags} userData={users} />
            </div>
            <div className='flex w-screen justify-center h-screen items-center addRoomLaptop:hidden'>
              <div className='font-Inter text-[24px] text-center pb-20'>This page is not supported for mobile devices.</div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default AddRoom;
