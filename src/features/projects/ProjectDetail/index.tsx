import { useParams, useNavigate } from 'react-router-dom';
import { Box, Progress, Grid, GridItem, Flex, Center, Button } from '@chakra-ui/react';
import { FaPlusSquare } from 'react-icons/fa';

import { useGetProjectQuery } from '../../../app/services/projectApiSlice';

import ProjectForm from '../ProjectForm';
import CredentialList from '../../credentials/CredentialList';
import CredentialDetail from '../../credentials/CredentialDetail';

const ProjectDetail = () => {
  const { projectId, credentialId } = useParams();
  const navigate = useNavigate();

  if (projectId === undefined) {
    navigate(-1);
    throw new Error('Project ID can not be undefinded');
  }

  const { data: project, isLoading } = useGetProjectQuery(
    { projectId },
    {
      refetchOnMountOrArgChange: true,
      skip: false
    }
  );

  if (isLoading) return <Progress mt={-4} mx={-4} size="sm" isIndeterminate />;
  if (!project) return <div>Missing Project!</div>;

  return (
    <Grid
      height="100%"
      gap={2}
      templateColumns={{
        sm: '1fr',
        xl: 'repeat(2, 1fr)'
      }}
      templateRows={{
        sm: '1fr 2fr',
        xl: '1fr'
      }}
    >
      <GridItem w="100%">
        <Box mb={2} bg="blackAlpha.400" p={4} borderRadius={8}>
          <ProjectForm project={project} mode="EDIT" />
        </Box>
        <Box
          bg="blackAlpha.400"
          p={4}
          borderRadius={8}
          overflowY="auto"
          display="flex"
          flexDir="column"
          gap={2}
        >
          <Button
            colorScheme="green"
            onClick={() => navigate(`/projects/${projectId}/createCredential`, { replace: true })}
            leftIcon={<FaPlusSquare />}
          >
            Add Credential
          </Button>
          <CredentialList projectId={project.id} />
        </Box>
      </GridItem>
      <GridItem w="100%">
        <Flex h="100%" bg="blackAlpha.400" p={2} borderRadius={8}>
          <Center w="100%">
            {credentialId ? (
              <CredentialDetail
                credentialId={credentialId}
                projectId={project.id}
                mode={credentialId === 'createCredential' ? 'CREATE' : 'EDIT'}
              />
            ) : null}
          </Center>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ProjectDetail;
