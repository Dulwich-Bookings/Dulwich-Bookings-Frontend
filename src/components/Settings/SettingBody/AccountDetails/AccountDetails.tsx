import React, { useState } from 'react';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import UserProfileCircle from '@/components/Home/HomeHeader/UserProfileCircle/UserProfileCircle';
import InputWithBorder from '@/components/Inputs/InputWithBorder/InputWithBorder';
import { Grid, Stack } from '@mui/material';

import { InputValidation } from '@/modules/inputValidation/types';
import { UserData } from '@/modules/user/types';

type Props = {
  user: UserData;
};

const AccountDetails = ({ user }: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordNew, setPasswordNew] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [pwError, setPwError] = useState<InputValidation>(noError);
  const [pwNewError, setPwNewError] = useState<InputValidation>(noError);
  const [pwConfirmError, setPwConfirmError] = useState<InputValidation>(noError);

  const [resetPassword] = useApi(
    (data: { originalPassword: string; newPassword: string; newPasswordConfirmation: string }) =>
      AuthService.resetPassword(data.originalPassword, data.newPassword, data.newPasswordConfirmation),
    true,
    true,
  );

  const formValidation = () => {
    const errorText = 'Field Cannot be Empty';
    const errorMismatchText = 'Passwords do not match';

    const errorObj: InputValidation = {
      isError: true,
      errorHelperText: errorText,
    };

    const errorMismatchObj: InputValidation = {
      isError: true,
      errorHelperText: errorMismatchText,
    };

    const emptyErrorObj: InputValidation = {
      isError: true,
      errorHelperText: '',
    };

    const isValidPasswordOld = password.length !== 0;
    const isValidPasswordNew = passwordNew.length !== 0;
    const isValidPasswordConfirm = passwordConfirmation.length !== 0;

    const isPasswordEqual = passwordNew === passwordConfirmation;

    setPwError(isValidPasswordOld ? noError : errorObj);
    setPwNewError(isValidPasswordNew ? (isPasswordEqual ? noError : errorMismatchObj) : errorObj);
    setPwConfirmError(isValidPasswordConfirm ? (isPasswordEqual ? noError : emptyErrorObj) : errorObj);

    if (!isValidPasswordOld || !isValidPasswordNew || !isValidPasswordConfirm || !isPasswordEqual) {
      throw new Error('Form Invalid');
    }
  };

  const onSaveHandler = async () => {
    try {
      setIsLoading(true);
      formValidation();

      const data = {
        originalPassword: password,
        newPassword: passwordNew,
        newPasswordConfirmation: passwordConfirmation,
      };

      await resetPassword(data);

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
          <Grid item className='w-1/6 settingLaptop:block hidden'>
            <UserProfileCircle email={user.email} className='mt-2 w-36 h-36 text-3xl text-bgWhite cursor-default' />
          </Grid>

          <Stack className='settingLaptop:w-5/6 w-full' spacing={2}>
            <InputWithBorder
              labelText='Email'
              inputType='text'
              labelClassName='font-Inter text-textGray'
              inputSize='small'
              inputClassName='settingLaptop:w-1/3 w-full'
              inputValue={user.email}
              disabled
            />
            <InputWithBorder
              labelText='Old Password'
              inputType='password'
              labelClassName='font-Inter text-textGray'
              inputSize='small'
              inputClassName='settingLaptop:w-1/3 w-full'
              inputValue={password}
              inputHandleOnChange={input => setPassword(input.target.value)}
              inputValidation={pwError}
            />
            <Grid container className='w-full settingLaptop:flex-row flex-col'>
              <Grid item className='settingLaptop:w-1/3 w-full'>
                <InputWithBorder
                  labelText='Password'
                  inputType='password'
                  labelClassName='font-Inter text-textGray'
                  inputSize='small'
                  inputValue={passwordNew}
                  inputHandleOnChange={input => setPasswordNew(input.target.value)}
                  inputValidation={pwNewError}
                />
              </Grid>
              <Grid item className='settingLaptop:w-1/3 settingLaptop:pl-4 w-full '>
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
