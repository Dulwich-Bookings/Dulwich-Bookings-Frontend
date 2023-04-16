import React, { useState } from 'react';

import { Stack } from '@mui/material';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import HomeBanner from '@components/Home/HomeBanner/HomeBanner';
import HomeSearchBar from '@components/Home/HomeSearchBar/HomeSearchBar';
import HomeResources from '@/components/Home/HomeResources/HomeResources';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';

import { SearchState, searchStateMap } from '@/consts/constants';

const Home = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const [inputValue, setInputValue] = useState<string>('');
  const [searchState, setSearchState] = useState<SearchState>(searchStateMap.ALL);

  const onInputChangeHandler = (enteredValue: string): void => setInputValue(enteredValue);
  const onSearchStateChangeHandler = (state: SearchState): void => setSearchState(state);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Stack spacing={3}>
              <Stack spacing={-4}>
                <HomeBanner schoolId={1} />
                <HomeSearchBar onInputChange={onInputChangeHandler} onStateChange={onSearchStateChangeHandler} />
              </Stack>
              <HomeResources searchedInput={inputValue} searchState={searchState} currentUser={currentUser} currentSchool={currentSchool} />
            </Stack>
          </main>
        </>
      )}
    </>
  );
};

export default Home;
