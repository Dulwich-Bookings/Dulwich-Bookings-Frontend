import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@/modules/ui/uiSlice';
import userReducer from '@/modules/user/userSlice';
import schoolReducer from '@/modules/school/schoolSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    users: userReducer,
    school: schoolReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
