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
  apiPromise: (id?: number) => Promise<ApiData<T>>,
  withSuccessNotification = false,
  withFailureNotification = false,
) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  async function fetchApi(id?: number): Promise<ApiData<T> & isSuccess> {
    if (withSuccessNotification || withFailureNotification) {
      dispatch(toggleShowNotification({ message: 'Loading...', severity: severity.LOADING }));
    }
    try {
      const response = await apiPromise(id);
      if (response?.message && withSuccessNotification) {
        dispatch(toggleShowNotification({ message: response.message, severity: severity.SUCCESS }));
      }
      console.log(response);
      return { ...response, isSuccess: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.data?.message && withFailureNotification) {
        dispatch(toggleShowNotification({ message: error.data.message, severity: severity.ERROR }));
      }
      if (error?.status === 403) {
        history.push(Routes.base);
      }
      console.log(error);
      return { ...error?.data, isSuccess: false };
    } finally {
      setIsLoading(false);
    }
  }

  async function callApi(id?: number) {
    if (!isLoading) {
      setIsLoading(true);
      const response = await fetchApi(id);
      return response;
    }
    return { message: 'Internal Server Error', isSuccess: false };
  }

  return [callApi] as const;
}
