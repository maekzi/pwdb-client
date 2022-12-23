import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { Login } from './features/auth/Login';
import { PrivateOutlet } from './utils/PrivateOutlet';

import Dashboard from './features/Dashboard';
import ProjectList from './features/projects/ProjectList';
import ProjectDetail from './features/projects/ProjectDetail';
import ProjectCreate from './features/projects/ProjectCreate';
import NotFound from './utils/NotFound';

import { selectCurrentLanguage } from './features/i18n/i18nSlice';
import i18n from './app/services/i18n';

/**
 * ToDo: Create Dashboard, Project View, Credential View
 * @returns
 */
function App() {
  const selectedLanguageCode = useSelector(selectCurrentLanguage);
  const [messages, setMessages] = useState();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateOutlet />}>
          <Route index element={<Dashboard />} />
          <Route path="/projects" element={<Outlet />}>
            <Route index element={<ProjectList />} />
            <Route path=":projectId" element={<ProjectDetail />} />
            <Route path=":projectId/:credentialId" element={<ProjectDetail />} />
            <Route path="/projects/create" element={<ProjectCreate />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  useEffect(() => {
    i18n.getMessages(selectedLanguageCode).then(data => {
      setMessages(data)
    });
  }, [selectedLanguageCode])

  return (
    <IntlProvider locale={selectedLanguageCode} defaultLocale="en-US" messages={messages}>
      <RouterProvider router={router} />
    </IntlProvider>
  );
}

export default App;
