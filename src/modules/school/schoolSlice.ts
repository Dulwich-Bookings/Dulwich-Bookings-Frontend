import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { SchoolData } from '@/modules/school/types';

interface SchoolState {
  currentSchool: SchoolData | null;
}

const initialState: SchoolState = {
  currentSchool: null,
};

export const schoolSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCurrentSchool: (state, action: PayloadAction<SchoolData>) => {
      state.currentSchool = action.payload;
    },
  },
});

export const { updateCurrentSchool } = schoolSlice.actions;

export const getCurrentSchool = (state: RootState): SchoolData | null => {
  return state.school.currentSchool;
};

export default schoolSlice.reducer;
