import { LinkBox, LinkOverlay, Text, Badge, useColorModeValue, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import type { Credential, Scalars } from '../../../types/pwdbApiTypes';

type ListItemProps = {
  credential: Credential;
  selectedCredential?: Scalars['ID'];
};

const ListItem = ({ credential, selectedCredential }: ListItemProps) => {
  const boxBg = useColorModeValue('gray.100', 'gray.900');
  const isSelected = credential.id === selectedCredential;

  return (
    <LinkBox
      as="article"
      border="4px"
      borderColor={isSelected ? 'pink.300' : 'transparent'}
      bg={boxBg}
      w="100%"
      p={2}
      borderRadius={4}
      onClick={() => console.log()}
      _hover={{
        borderColor: 'pink.300'
      }}
    >
      <HStack justify="space-between">
        <LinkOverlay
          as={Link}
          replace={true}
          to={`/projects/${credential.assignedTo?.id}/${credential.id}`}
          relative="route"
        >
          <Text fontWeight="bold">{credential.name}</Text>
        </LinkOverlay>
        <HStack>
          <Badge ml="1" colorScheme="pink" variant="outline">
            {credential.type}
          </Badge>
          <Badge ml="1" colorScheme="pink" variant="outline">
            {credential.enviroment}
          </Badge>
        </HStack>
      </HStack>
      <HStack>
        <Text fontSize="sm">Last Updated:</Text>
        <Text as="time" dateTime={credential.lastUpdated_at} fontSize="sm">
          {credential.lastUpdated_at}
        </Text>
      </HStack>
    </LinkBox>
  );
};

export default ListItem;
