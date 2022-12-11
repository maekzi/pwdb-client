import { IconType } from 'react-icons';
import { Box, CloseButton, Flex, Image, useColorModeValue, BoxProps } from '@chakra-ui/react';
import { FiHome, FiTrendingUp } from 'react-icons/fi';

import logo from './logo.png';
import NavItem from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
  isSubRoute: boolean;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, route: '/', isSubRoute: false },
  { name: 'Projects', icon: FiTrendingUp, route: '/projects', isSubRoute: false },
  { name: 'Create Project', icon: FiTrendingUp, route: '/projects/create', isSubRoute: true }
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box maxW="130">
          <Image src={logo} alt="pwdb Logo" />
        </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
