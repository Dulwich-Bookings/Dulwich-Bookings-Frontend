import { configureStore, combineReducers } from '@reduxjs/toolkit';
import uiReducer from '@/modules/ui/uiSlice';
import userReducer from '@/modules/user/userSlice';
import schoolReducer from '@/modules/school/schoolSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  ui: uiReducer,
  users: userReducer,
  school: schoolReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
