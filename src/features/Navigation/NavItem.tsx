import { Flex, Icon, Link, FlexProps } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  route: string;
  children: string;
}

const NavItem = ({ icon, route, children, ...rest }: NavItemProps) => {
  return (
    <Link as={NavLink} to={route} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'purple.700',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
