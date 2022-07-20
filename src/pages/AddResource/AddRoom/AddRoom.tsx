import React, { useState, useEffect } from 'react';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';

import { useApi } from '@/api/ApiHandler';
import { ApiData } from '@/api/ApiService';
import TagService from '@/api/tag/TagService';
import UserService from '@/api/user/UserService';
import { isSuccess } from '@/api/ApiHandler';
import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';

import AddRoomForm from '@/components/AddResource/AddRoomForm/AddRoomForm';

const AddRoom = () => {
  const retrieveAllData = async (func: () => Promise<ApiData & isSuccess>) => {
    const res = await func();
    if (res.isSuccess) {
      return res.data;
    }
  };

  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), false, true, false);

  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const [tags, setTags] = useState<TagData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    retrieveAllData(getAllTags).then(d => setTags(r => [...r, ...d]));
    retrieveAllData(getAllUsers).then(d => setUsers(r => [...r, ...d]));
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
            <div className='flex w-screen h-screen justify-center items-center mx-5 addRoomLaptop:hidden'>
              <div className='font-Inter text-[24px]'>This page is not supported for mobile devices.</div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default AddRoom;
