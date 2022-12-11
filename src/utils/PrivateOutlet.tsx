import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Navigation from '../features/Navigation';

export function PrivateOutlet() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate('/login', { state: { location } });
    }
  });

  return (
    <>
      <Navigation children={<Outlet />} />
    </>
  );
}
