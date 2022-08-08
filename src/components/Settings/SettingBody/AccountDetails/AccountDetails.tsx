import React, { useState } from 'react';
import { useApi } from '@/api/ApiHandler';
import ApiService from '@/api/ApiService';
import AuthService from '@/api/auth/AuthService';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import UserProfileCircle from '@/components/Home/HomeHeader/UserProfileCircle/UserProfileCircle';
import InputWithBorder from '@/components/Inputs/InputWithBorder/InputWithBorder';

import { InputValidation } from '@/modules/inputValidation/types';
import { UserData } from '@/modules/user/types';
import { Grid, Stack } from '@mui/material';
import { getLocalStorageValue } from '@/utilities/localStorage';

type Props = {
  user: UserData;
};

const AccountDetails = ({ user }: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [pwError, setPwError] = useState<InputValidation>(noError);
  const [pwConfirmError, setPwConfirmError] = useState<InputValidation>(noError);

  const [updatePassword] = useApi(
    (data: { password: string; passwordConfirmation: string }) =>
      AuthService.setPassword(data.password, data.passwordConfirmation, getLocalStorageValue(ApiService.authTokenKey) ?? ''),
    true,
    true,
  );

  const formValidation = () => {
    const errorText = 'Passwords do not match';
    const errorObj: InputValidation = {
      isError: true,
      errorHelperText: errorText,
    };

    const emptyErrorObj: InputValidation = {
      isError: true,
      errorHelperText: '',
    };

    const isValidPassword = password === passwordConfirmation;

    setPwError(isValidPassword ? noError : errorObj);
    setPwConfirmError(isValidPassword ? noError : emptyErrorObj);

    if (!isValidPassword) {
      throw new Error('Form Invalid');
    }
  };

  const onSaveHandler = async () => {
    try {
      setIsLoading(true);
      formValidation();

      const data = {
        password: password,
        passwordConfirmation: passwordConfirmation,
      };

      await updatePassword(data);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Stack className='w-full' spacing={6}>
        <Grid container className='justify-start'>
          <SettingHeader title='Account Details' />
        </Grid>

        <Grid container>
          <Grid item className='w-1/6'>
            <UserProfileCircle email={user.email} className='mt-2 w-36 h-36 text-3xl text-bgWhite' />
          </Grid>

          <Stack className='w-5/6' spacing={2}>
            <InputWithBorder
              labelText='Email'
              inputType='text'
              labelClassName='font-Inter text-textGray'
              inputSize='small'
              inputClassName='w-1/3'
              inputValue={user.email}
              disabled
            />
            <Grid container className='w-full space-x-12'>
              <Grid item className='w-1/3'>
                <InputWithBorder
                  labelText='Password'
                  inputType='password'
                  labelClassName='font-Inter text-textGray'
                  inputSize='small'
                  inputValue={password}
                  inputHandleOnChange={input => setPassword(input.target.value)}
                  inputValidation={pwError}
                />
              </Grid>
              <Grid item className='w-1/3'>
                <InputWithBorder
                  labelText='Confirm Password'
                  inputType='password'
                  labelClassName='font-Inter text-textGray'
                  inputSize='small'
                  inputValue={passwordConfirmation}
                  inputHandleOnChange={input => setPasswordConfirmation(input.target.value)}
                  inputValidation={pwConfirmError}
                />
              </Grid>
            </Grid>
            <Grid item className='pt-8'>
              <FormSubmitButton
                buttonText='Save'
                handleOnClick={onSaveHandler}
                buttonClassName='w-32 h-10 bg-dulwichRed rounded-xl text-bgWhite font-inter'
                textClassName='text-[16px]'
                loading={isLoading}
              />
            </Grid>
          </Stack>
        </Grid>
      </Stack>
    </>
  );
};

export default AccountDetails;
