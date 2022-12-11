import { Box, Grid, GridItem } from '@chakra-ui/react';

import ProjectForm from '../ProjectForm';

const ProjectCreate = () => {
  return (
    <Grid
      gap={1}
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
        <Box bg="blackAlpha.400" p={4} borderRadius={8}>
          <ProjectForm project={{ id: 'NEWPROJECT' }} mode="CREATE" />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProjectCreate;
