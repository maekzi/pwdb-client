import { createListenerMiddleware } from '@reduxjs/toolkit';

import {
    setLanguageCode
} from './i18nSlice';

export const i18nListenderMiddleware = createListenerMiddleware();

i18nListenderMiddleware.startListening({
    actionCreator: setLanguageCode,
    effect: async (action) => {
       localStorage.setItem('i18n-selected-language', action.payload.languageCode);
    }
})