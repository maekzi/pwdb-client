import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import type { User } from '../../types/pwdbApiTypes';

interface AuthState {
  user: null | User;
}

const initialState: AuthState = {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { item } }: PayloadAction<{ item: User }>) => {
      state.user = item;
    },
    removeCredentials: (state) => {
      state.user = null;
    }
  }
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
