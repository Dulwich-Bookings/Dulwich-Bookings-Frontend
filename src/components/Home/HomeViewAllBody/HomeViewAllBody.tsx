import React, { useState } from 'react';

import HomeResourceList from '@/components/Home/HomeResources/HomeResourceList/HomeResourceList';
import HomeSearchBar from '@components/Home/HomeSearchBar/HomeSearchBar';
import { Stack, Grid } from '@mui/material';

import { UserData } from '@/modules/user/types';
import { SearchState, searchStateMap } from '@/consts/constants';

type Props = {
  currentUser: UserData;
};

const HomeViewAllBody = (props: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchState, setSearchState] = useState<SearchState>(searchStateMap.ALL);

  const onInputChangeHandler = (enteredValue: string): void => setInputValue(enteredValue);
  const onSearchStateChangeHandler = (state: SearchState): void => setSearchState(state);

  const title: string = searchState === searchStateMap.ALL ? 'All' : searchState === searchStateMap.RESOURCES ? 'Rooms' : 'Subscriptions';

  return (
    <Grid container className='justify-center'>
      <Stack spacing={1} className='w-screen max-w-[1100px] px-10'>
        <div className={'font-Inter text-bgBlack text-[48px] capitalize'}>{title}</div>
        <Stack className='pb-5' spacing={5}>
          <HomeSearchBar onInputChange={onInputChangeHandler} onStateChange={onSearchStateChangeHandler} />
          <HomeResourceList
            searchState={searchState}
            searchedInput={inputValue}
            isBookmarksViewClicked={false}
            isRvViewClicked={false}
            currentUser={props.currentUser}
            editMode={false}
            editResourceHandler={() => {
              return;
            }}
          />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default HomeViewAllBody;
