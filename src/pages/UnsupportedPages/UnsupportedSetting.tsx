import React from 'react';

// This page is used when the resolution becomes too small for the setting page to be of use.
const UnsupportedSettings = () => {
  return (
    <div className='flex w-11/12 justify-center h-screen items-center settingPhone:hidden'>
      <div className='font-Inter text-[24px] text-center pb-20 px-5'>This page is not supported for small screens</div>
    </div>
  );
};

export default UnsupportedSettings;
