import React, { useState, useEffect } from 'react';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';
import { LandingRoute } from '@/consts/constants';
import Routes from '@/utilities/routes';
import { useLocation } from 'react-router-dom';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';
import { decodeJwt } from '@/utilities/jwtUtils';
import { useDispatch } from 'react-redux';
import { toggleShowNotification } from '@/modules/ui/uiSlice';
import { severity } from '@/consts/constants';

const ConfirmEmailForm = () => {
  const dispatch = useDispatch();
  const [isConfirming, setIsConfirming] = useState<boolean>(true);
  const search = useLocation().search;
  const queryToken = new URLSearchParams(search).get('token');
  const token = queryToken ? queryToken : '';
  const userId = decodeJwt(token).id;
  const [confirmEmail] = useApi(() => AuthService.confirmEmail(userId, token), true, true, false);

  const loginRoute: LandingRoute = {
    route: Routes.authentication.login,
    routeText: 'Sign In',
  };

  const emptyRoute: LandingRoute = {
    route: Routes.authentication.login,
    routeText: '',
  };

  const handleConfirmEmail = async () => {
    if (!queryToken) {
      dispatch(
        toggleShowNotification({
          message: 'Invalid link! Check your email (and junk) for a confirm email link',
          severity: severity.WARNING,
        }),
      );
      return;
    }
    const res = await confirmEmail();
    if (res.isSuccess) {
      setIsConfirming(false);
    }
  };

  useEffect(() => {
    handleConfirmEmail();
  }, []);

  const pendingConfirmation = 'Confirming your email, please wait...';
  const confirmedEmail = 'Email confirmed! Please ';

  return (
    <LandingFormHeader
      title='Confirm Email'
      description={isConfirming ? pendingConfirmation : confirmedEmail}
      route={isConfirming ? emptyRoute : loginRoute}
    />
  );
};

export default ConfirmEmailForm;
