import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Select } from '@chakra-ui/react';

import { setLanguageCode, selectCurrentLanguage } from './i18nSlice';

const LanguageSwitcher = () => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector(selectCurrentLanguage);

  return (
    <Select
      variant="outline"
      value={currentLanguage}
      onChange={(e) => {
        dispatch(setLanguageCode({ languageCode: e.target.value }));
      }}
    >
      <option value="en-US">
        <FormattedMessage defaultMessage="English" description="English Language Name" />
      </option>
      <option value="de-DE">
        <FormattedMessage defaultMessage="German" description="German Language Name" />
      </option>
      <option value="tr-TR">
        <FormattedMessage defaultMessage="Turkish" description="Turkish Language Name" />
      </option>
    </Select>
  );
};

export default LanguageSwitcher;
