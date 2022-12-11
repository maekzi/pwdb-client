import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet
} from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { Login } from './features/auth/Login';
import { PrivateOutlet } from './utils/PrivateOutlet';

import Dashboard from './features/Dashboard';
import ProjectList from './features/projects/ProjectList';
import ProjectDetail from './features/projects/ProjectDetail';
import ProjectCreate from './features/projects/ProjectCreate';
import NotFound from './utils/NotFound';

/**
 * ToDo: Create Dashboard, Project View, Credential View
 * @returns
 */
function App() {
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

  return (
    <Box>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
