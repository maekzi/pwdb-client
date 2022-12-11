import { useState } from 'react';
import { Progress, SimpleGrid } from '@chakra-ui/react';

import { useGetCredentialsQuery } from '../../../app/services/credentialApiSlice';

import type { CredentialWhereInput, Scalars } from '../../../types/pwdbApiTypes';

import ListItem from './ListItem';

type CredentialListProps = {
  projectId: Scalars['ID'];
};

const CredentialList = ({ projectId }: CredentialListProps) => {
  const INITIAL_FILTER: CredentialWhereInput = {
    assignedTo: {
      id: {
        equals: projectId
      }
    }
  };

  const [listFilter] = useState<CredentialWhereInput>(INITIAL_FILTER);

  const {
    data: credentials,
    isFetching,
    isLoading
  } = useGetCredentialsQuery(listFilter, {
    refetchOnMountOrArgChange: true,
    skip: false
  });

  if (isLoading) return <Progress mt={-4} mx={-4} size="sm" isIndeterminate />;
  if (!credentials) return <div>Missing Credentials!</div>;

  return (
    <>
      {isFetching ? <Progress size="sm" isIndeterminate /> : ''}
      <SimpleGrid
        color="white"
        gap={2}
        templateColumns={{
          sm: '1fr',
          md: 'repeat(2, 1fr)',
          xl: '1fr',
          '2xl': '1fr'
        }}
        templateRows={{
          sm: '1fr'
        }}
      >
        {credentials.map((credential) => (
          <ListItem credential={credential} key={credential.id.toString()} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default CredentialList;
