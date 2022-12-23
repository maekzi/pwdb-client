import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { pwdbAPI } from "./services/pwdbAPI";
import authReducer from "../features/auth/authSlice";
import i18nReducer from "../features/i18n/i18nSlice";
import { i18nListenderMiddleware } from "../features/i18n/i18nMiddleware";

export const store = configureStore({
  reducer: {
    [pwdbAPI.reducerPath]: pwdbAPI.reducer,
    auth: authReducer,
    i18n: i18nReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pwdbAPI.middleware).prepend(i18nListenderMiddleware.middleware),
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
