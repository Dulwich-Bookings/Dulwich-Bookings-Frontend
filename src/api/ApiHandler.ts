import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Routes from '@/utilities/routes';
import { ApiData } from '@/api/ApiService';
import { useDispatch } from 'react-redux';
import { severity } from '@/consts/constants';
import { toggleShowNotification } from '@/modules/ui/uiSlice';

export interface isSuccess {
  isSuccess: boolean;
}

export function useApi<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiPromise: (data?: any) => Promise<ApiData<T>>,
  withSuccessNotification = false,
  withFailureNotification = false,
  withLoadingNotification = true,
) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function fetchApi(data?: any): Promise<ApiData<T> & isSuccess> {
    if (withLoadingNotification) {
      dispatch(toggleShowNotification({ message: 'Loading...', severity: severity.LOADING }));
    }
    try {
      const response = await apiPromise(data);
      if (response?.message && withSuccessNotification) {
        dispatch(toggleShowNotification({ message: response.message, severity: severity.SUCCESS }));
      } else if (response && withSuccessNotification) {
        dispatch(toggleShowNotification({ message: 'API Call Successful', severity: severity.SUCCESS }));
      }
      console.log(response);
      return { ...response, isSuccess: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.data?.message && withFailureNotification) {
        dispatch(toggleShowNotification({ message: error.data.message, severity: severity.ERROR }));
      }
      if (error?.status === 403) {
        history.push(Routes.authentication.login);
      }
      console.log(error);
      return { ...error?.data, isSuccess: false };
    } finally {
      setIsLoading(false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function callApi(data?: any) {
    if (!isLoading) {
      setIsLoading(true);
      const response = await fetchApi(data);
      return response;
    }
    return { message: 'Internal Server Error', isSuccess: false };
  }

  return [callApi] as const;
}
