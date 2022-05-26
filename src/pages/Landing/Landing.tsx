import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleShowNotification } from '@/modules/ui/uiSlice';

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleShowNotification({ message: 'Loading Data...', severity: 'success' }));
  }, []);

  return <div>Landing Page</div>;
};

export default Landing;
