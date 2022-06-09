import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@/modules/ui/uiSlice';
import userReducer from '@/modules/user/userSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    users: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
