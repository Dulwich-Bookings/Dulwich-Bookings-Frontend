import React, { useState, useEffect } from 'react';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';

import { useApi } from '@/api/ApiHandler';
import { ApiData } from '@/api/ApiService';
import TagService from '@/api/tag/TagService';
import { isSuccess } from '@/api/ApiHandler';
import { TagData } from '@/modules/tag/types';

import AddRoomForm from '@/components/AddResource/AddRoomForm/AddRoomForm';

const AddRoom = () => {
  const retrieveAllData = async (func: () => Promise<ApiData & isSuccess>) => {
    const res = await func();
    if (res.isSuccess) {
      return res.data;
    }
  };

  const [getAllTags] = useApi(() => TagService.getAllTags(), true, true);

  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const [tags, setTags] = useState<TagData[]>([]);

  useEffect(() => {
    retrieveAllData(getAllTags).then(d => setTags(r => [...r, ...d]));
  }, []);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <AddRoomForm tagData={tags} />
          </main>
        </>
      )}
    </>
  );
};

export default AddRoom;
