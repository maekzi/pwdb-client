import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  Button,
  useColorModeValue,
  useColorMode,
  Center,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { FaRegSun, FaRegMoon, FaSignOutAlt } from 'react-icons/fa';

import type { User } from '../../types/pwdbApiTypes';

import logo from './logo.png';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

interface NavBarProps extends FlexProps {
  onOpen: () => void;
  logout: () => void;
  user: User | null;
}
const NavBar = ({ onOpen, user, logout, ...rest }: NavBarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box maxW="130" display={{ base: 'flex', md: 'none' }}>
        <Image src={logo} alt="pwdb Logo" />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <LanguageSwitcher />
        <IconButton
          onClick={toggleColorMode}
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode === 'light' ? <FaRegMoon /> : <FaRegSun />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar
                size={'sm'}
                src={`https://avatars.dicebear.com/api/bottts/${user?.name}.svg`}
              />
            </MenuButton>
            <MenuList zIndex="popover" alignItems={'center'}>
              <br />
              <Center>
                <Avatar
                  size={'2xl'}
                  src={`https://avatars.dicebear.com/api/bottts/${user?.name}.svg`}
                />
              </Center>
              <br />
              <Center>
                <p>{user?.name}</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem icon={<FaSignOutAlt />} onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default NavBar;
