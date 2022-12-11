import {
  LinkBox,
  LinkOverlay,
  Heading,
  IconButton,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Project } from '../../../types/pwdbApiTypes';

import { FaGitlab, FaJira, FaConfluence } from 'react-icons/fa';

type ListItemProps = {
  project: Project;
  hasSearch?: boolean;
};

const ListItem = ({ project }: ListItemProps) => {
  return (
    <LinkBox
      as="article"
      p="5"
      borderWidth="1px"
      rounded="md"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Stack direction="row" justify="space-between">
        <Heading size="md" my="2" key={1}>
          <LinkOverlay
            as={Link}
            to={`${project.id}`}
            color={useColorModeValue('gray.700', 'gray.50')}
          >
            {project.name}
          </LinkOverlay>
        </Heading>
        <Stack spacing={2} direction="row" key={2}>
          {project.gitlabLink ? (
            <IconButton color="orange.500" aria-label="Gitlab Link" icon={<FaGitlab />} />
          ) : (
            ''
          )}
          {project.jiraLink ? (
            <IconButton color="blue.500" aria-label="Jira Link" icon={<FaJira />} />
          ) : (
            ''
          )}
          {project.confluenceLink ? (
            <IconButton color="blue.500" aria-label="Confluence Link" icon={<FaConfluence />} />
          ) : (
            ''
          )}
        </Stack>
      </Stack>
    </LinkBox>
  );
};

export default ListItem;
