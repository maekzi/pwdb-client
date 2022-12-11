import { ReactNode } from 'react';
import { Box, useColorModeValue, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLogoutMutation } from '../../app/services/authApiSlice';
import { removeCredentials } from '../auth/authSlice';
import { useAuth } from '../../hooks/useAuth';

import SidebarContent from './SidebarContent';
import NavBar from './NavBar';

export default function Nav({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logout] = useLogoutMutation();

  const logoutUser = async () => {
    try {
      const logoutResponse = await logout().unwrap();
      if (logoutResponse === false) {
        throw new Error('');
      }
      dispatch(removeCredentials());
      navigate('/');
    } catch (err) {
      console.error('Error logging out...');
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <NavBar onOpen={onOpen} user={auth.user} logout={logoutUser} />
      <Box h="calc(var(--chakra-vh) - var(--chakra-space-20))" ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
