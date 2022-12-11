import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { pwdbAPI } from "./services/pwdbAPI";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [pwdbAPI.reducerPath]: pwdbAPI.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pwdbAPI.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
