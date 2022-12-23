import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../app/services/i18n';
import type { RootState } from '../../app/store';

interface I18nState {
  language: string;
}

const localLanguage = localStorage.getItem('i18n-selected-language');
if (localLanguage === null) {
  localStorage.setItem('i18n-selected-language', i18n.getDefaultLocale());
}
const initialState: I18nState = {
  language: localLanguage !== null ? localLanguage : i18n.getDefaultLocale()
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguageCode: (
      state,
      { payload: { languageCode } }: PayloadAction<{ languageCode: string }>
    ) => {
      if (i18n.isLocaleAvailable(languageCode)) {
        state.language = languageCode;
      } else {
        state.language = i18n.getDefaultLocale();
      }
    }
  }
});

export const { setLanguageCode } = i18nSlice.actions;

export default i18nSlice.reducer;

export const selectCurrentLanguage = (state: RootState) => state.i18n.language;
