import React, { useState } from 'react';

import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import { Button, ButtonGroup, Stack } from '@mui/material';
import UserChip from '@/components/AddResource/AddRoomForm/OtherUserInput/UserChip/UserChip';
import { UserData } from '@/modules/user/types';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';

type Props = {
  inputClassName?: string; // Optional ClassNames for Input
  userData: UserData[];
  updateUsers: (data: UserData[]) => void;
};

const OtherUserInput = (props: Props) => {
  const currentUser = useSelector(getCurrentUser);
  const [addOtherUsersValue, setOtherUsersInputValue] = useState('');
  const [filteredOtherUsers, setFilteredOtherUsers] = useState<UserData[]>([]);
  const [selectedOtherUsers, setSelectedOtherUsers] = useState<UserData[]>([]);

  // Helper Functions
  const isUserAlreadySelected = (user: UserData) =>
    selectedOtherUsers.filter(u => u.email.toUpperCase() === user.email.toUpperCase()).length !== 0;
  const isCurrentUser = (user: UserData) => user.email === currentUser?.email;
  const isEmailMatch = (user: UserData, input: string) => user.email.toUpperCase().indexOf(input.toUpperCase()) > -1;

  const otherUsersChangeHandler = (input: string): void => {
    setOtherUsersInputValue(input);
    setFilteredOtherUsers(props.userData.filter(user => isEmailMatch(user, input) && !isCurrentUser(user) && !isUserAlreadySelected(user)));
    if (input.trim() === '') setFilteredOtherUsers([]);
  };

  const userDelete = (userToDelete: number) => () => {
    setSelectedOtherUsers(selectedOtherUsers.filter(user => user.id !== userToDelete));
  };

  return (
    <div className={props.inputClassName}>
      <Stack spacing={1} position='absolute' className='w-80 z-10'>
        <InputWithoutBorder
          inputHandleOnChange={input => otherUsersChangeHandler(input.target.value)}
          inputValue={addOtherUsersValue}
          labelText='Add Others'
          labelClassName='text-bgDarkGray text-xl font-inter'
          inputPlaceholder='name@dulwich.com'
          inputType='text'
          inputClassName='bg-bgGray rounded-xl w-full focus-within:bg-bgWhite'
        />
        <ButtonGroup
          orientation='vertical'
          className='w-full shadow-lg rounded max-h-36 overflow-auto'
          variant='contained'
          disableElevation
        >
          {filteredOtherUsers.map(user => (
            <Button
              key={user.id}
              className='min-h-11 w-full border-bgWhite bg-bgWhite text-bgBlack hover:bg-dulwichRedHover'
              onClick={() => {
                if (selectedOtherUsers.filter(selectedUser => selectedUser.id === user.id).length === 0) {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  setSelectedOtherUsers([...selectedOtherUsers!, props.userData.find(users => users.id === user.id)!]);
                }
                setOtherUsersInputValue('');
                setFilteredOtherUsers([]);
              }}
            >
              {user.email}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>
      <Stack className={'h-24 mt-24 z-0 overflow-y-scroll'} spacing={1}>
        {selectedOtherUsers.map(user => (
          <UserChip key={user.id} userData={user} onDelete={userDelete(user.id)} />
        ))}
      </Stack>
    </div>
  );
};

export default OtherUserInput;
