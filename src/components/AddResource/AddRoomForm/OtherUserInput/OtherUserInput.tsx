import React, { useState } from 'react';

import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import { Button, ButtonGroup, Stack } from '@mui/material';
import UserChip from '../UserChip/UserChip';
import { UserData } from '@/modules/user/types';

type Props = {
  inputClassName?: string; // Optional ClassNames for Input
  userData: UserData[];
  updateUsers: (data: UserData[]) => void;
};

const OtherUserInput = (props: Props) => {
  const [addOtherUsersValue, setOtherUsersInputValue] = useState('');
  const [filteredOtherUsers, setFilteredOtherUsers] = useState<UserData[]>([]);
  const [selectedOtherUsers, setSelectedOtherUsers] = useState<UserData[]>([]);

  const otherUsersChangeHandler = (input: string): void => {
    setOtherUsersInputValue(input);
    setFilteredOtherUsers(props.userData.filter(user => user.email.match(new RegExp(input, 'i'))));
    if (input.trim() === '') {
      setFilteredOtherUsers([]);
    }
  };

  const userDelete = (userToDelete: number) => () => {
    setSelectedOtherUsers(selectedOtherUsers.filter(user => user.id !== userToDelete));
  };
  return (
    <Stack spacing={1} className={props.inputClassName}>
      <InputWithoutBorder
        inputHandleOnChange={input => otherUsersChangeHandler(input.target.value)}
        inputValue={addOtherUsersValue}
        labelText='Add Others'
        labelClassName='text-[#404040] text-xl font-inter'
        inputPlaceholder='name@dulwich.com'
        inputType='text'
        inputClassName='bg-bgGray rounded-xl w-full focus-within:bg-bgWhite'
      />
      <ButtonGroup orientation='vertical' className='w-full shadow-lg rounded max-h-36 overflow-auto' variant='contained' disableElevation>
        {filteredOtherUsers.map(user => (
          <Button
            key={user.id}
            className='min-h-11 w-full border-bgWhite bg-bgWhite text-bgBlack hover:bg-dulwichRed hover:bg-opacity-10'
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
      <Stack className={'max-h-40 overflow-auto'} spacing={1}>
        {selectedOtherUsers.map(user => (
          <UserChip key={user.id} userData={user} onDelete={userDelete(user.id)} />
        ))}
      </Stack>
    </Stack>
  );
};

export default OtherUserInput;
