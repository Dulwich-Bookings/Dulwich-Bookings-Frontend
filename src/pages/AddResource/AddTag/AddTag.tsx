import React from 'react';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';

import AddTagForm from '@/components/AddResource/Forms/AddTagForm/AddTagForm';

const AddTag = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <div className='hidden addRoomSmallerLaptop:block'>
              <AddTagForm />
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

export default AddTag;
