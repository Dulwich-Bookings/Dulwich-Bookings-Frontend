import React from 'react';
// import logo from './logo.svg';
import './App.css';

import AppRouter from './components/Routers/AppRouter';
import Notifier from '@/components/Notifier/Notifier';
import { useSelector } from 'react-redux';
import { isNotifierShown } from '@/modules/ui/uiSlice';

function App() {
  const isNotify = useSelector(isNotifierShown);
  return (
    <>
      {isNotify && <Notifier />}
      <AppRouter />
    </>
  );
}

export default App;
