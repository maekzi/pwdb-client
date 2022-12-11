import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useBoolean,
  useToast,
  useDisclosure,
  Box,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Link,
  StackDivider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Collapse
} from '@chakra-ui/react';
import { Field, Form, Formik, FieldProps, FormikHelpers } from 'formik';
import { FaGitlab, FaJira, FaConfluence, FaEdit, FaExternalLinkAlt } from 'react-icons/fa';
import { object, string } from 'yup';

import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation
} from '../../../app/services/projectApiSlice';

import type { Project, ProjectUpdateInput, ProjectCreateInput } from '../../../types/pwdbApiTypes';

import ConfirmationDialog from '../../../utils/ConfirmationDialog';

type ProjectDetailFormProps = {
  project: Project;
  mode?: 'CREATE' | 'EDIT' | 'READ';
};

const initialCreateValues: ProjectCreateInput = {
  confluenceLink: '',
  gitlabLink: '',
  jiraLink: '',
  name: ''
};

const projectSchema = object().shape({
  name: string().required(),
  confluenceLink: string().url().optional(),
  gitlabLink: string().url().optional(),
  jiraLink: string().url().optional()
});

/**
 * Returns on Object of ProjectUpdateInput wich only has the updated differences
 * ToDo: Can we do this in a besser way? Create a general useable function?
 * ts-ignore is needed because i can not add sting as Object key
 * @param {Project} values
 * @param {Project} initialValues
 * @returns {ProjectUpdateInput}
 */
const getUpdatedProjectValues = (values: Project, initialValues: Project): ProjectUpdateInput => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    // @ts-ignore
    const hasChanged = initialValues[key] !== value;

    if (hasChanged) {
      // @ts-ignore
      acc[key] = value;
    }

    return acc;
  }, {});
};

const ProjectForm = ({ project, mode = 'CREATE' }: ProjectDetailFormProps) => {
  /**
   * Component Constants
   */
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useBoolean(mode === 'CREATE');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectData, setProjectData] = useState<Project>(project);
  const [projectCreateData] = useState<ProjectCreateInput>(initialCreateValues);

  /**
   * RTK Query Hooks
   */
  const [updateProject] = useUpdateProjectMutation({
    fixedCacheKey: 'shared-update-project'
  });
  const [createProject] = useCreateProjectMutation({
    fixedCacheKey: 'shared-create-project'
  });
  const [deleteProject] = useDeleteProjectMutation();

  /**
   * Updating a Project Submit Handler
   * @param values
   * @param actions
   */
  const updateProjectHandler = async (values: Project, actions: FormikHelpers<Project>) => {
    try {
      const updatedProjectData = await updateProject({
        where: { id: values.id },
        data: getUpdatedProjectValues(values, projectData)
      }).unwrap();
      setProjectData(updatedProjectData);
      setIsEditable.toggle();
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error',
        description: `${err}`,
        isClosable: true
      });
    }
  };

  /**
   * Creating a Project Submit Handler
   * @param values
   * @param actions
   */
  const createProjectHandler = async (
    values: ProjectCreateInput,
    actions: FormikHelpers<Project>
  ) => {
    try {
      const createProjectData = await createProject({
        data: values
      }).unwrap();
      navigate(`/projects/${createProjectData.id}`);
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error',
        description: `${err}`,
        isClosable: true
      });
    }
  };

  /**
   * Handles Project Delete
   */
  const deleteProjectHandler = async () => {
    try {
      const deleteProjectData = await deleteProject({
        where: {
          id: projectData.id
        }
      }).unwrap();
      if (deleteProjectData.id === projectData.id) {
        toast({
          status: 'success',
          title: 'Project Deleted',
          description: `${deleteProjectData.name} is now gone!`,
          isClosable: true
        });
        navigate('/projects');
      } else {
        throw new Error('Error Deleting your Project. Please contact your Administrator!');
      }
    } catch (err: any) {
      toast({
        status: 'error',
        title: 'Could not delete Project. Please try again.',
        description: `${err.message}`,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={mode === 'CREATE' ? projectCreateData : projectData}
        onSubmit={mode === 'CREATE' ? createProjectHandler : updateProjectHandler}
        validationSchema={projectSchema}
      >
        {(props) => (
          <Form>
            <VStack divider={<StackDivider />}>
              <HStack justify="space-between" align="center" w="100%">
                <Field name="name">
                  {({ field }: FieldProps) => {
                    return (
                      <FormControl isReadOnly={!isEditable}>
                        <Input
                          {...field}
                          size="lg"
                          variant={!isEditable ? 'unstyled' : 'outline'}
                          placeholder="Project Name"
                          fontWeight="bold"
                        />
                      </FormControl>
                    );
                  }}
                </Field>
                {mode === 'EDIT' ? (
                  <IconButton
                    aria-label="Enable Form edit"
                    icon={<FaEdit />}
                    onClick={setIsEditable.toggle}
                    variant="ghost"
                    colorScheme={isEditable ? 'purple' : 'gray'}
                    size="lg"
                  />
                ) : null}
              </HStack>
              <Box w="100%">
                <SimpleGrid
                  columns={{
                    sm: 1
                  }}
                  spacing={4}
                >
                  <Field name="jiraLink">
                    {({ field }: FieldProps) => {
                      return (
                        <FormControl isReadOnly={!isEditable}>
                          <FormLabel>Jira Link</FormLabel>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<FaJira />}
                              color="blue.500"
                            />
                            <Input {...field} placeholder="Jira Link" type="url" />
                            <InputRightElement hidden={mode === 'CREATE'}>
                              <IconButton
                                as={Link}
                                aria-label="Open Jira Link"
                                icon={<FaExternalLinkAlt />}
                                variant="ghost"
                                isExternal
                                href={field.value}
                              />
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="gitlabLink">
                    {({ field }: FieldProps) => {
                      return (
                        <FormControl isReadOnly={!isEditable}>
                          <FormLabel>Gitlab Link</FormLabel>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<FaGitlab />}
                              color="orange.500"
                            />
                            <Input {...field} placeholder="Gitlab Link" type="url" />
                            <InputRightElement hidden={mode === 'CREATE'}>
                              <IconButton
                                as={Link}
                                aria-label="Open Jira Link"
                                icon={<FaExternalLinkAlt />}
                                variant="ghost"
                                isExternal
                                href={field.value}
                              />
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="confluenceLink">
                    {({ field }: FieldProps) => {
                      return (
                        <FormControl isReadOnly={!isEditable}>
                          <FormLabel>Confluence Link</FormLabel>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<FaConfluence />}
                              color="blue.500"
                            />
                            <Input {...field} placeholder="Jira Link" type="url" />
                            <InputRightElement hidden={mode === 'CREATE'}>
                              <IconButton
                                as={Link}
                                aria-label="Open Jira Link"
                                icon={<FaExternalLinkAlt />}
                                variant="ghost"
                                isExternal
                                href={field.value}
                              />
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      );
                    }}
                  </Field>
                  {/* ToDo: TD-SLATE - Component here*/}
                </SimpleGrid>
                <Collapse in={isEditable} animateOpacity>
                  <HStack
                    hidden={!isEditable}
                    mt={4}
                    justify={mode !== 'CREATE' ? 'space-between' : 'end'}
                    align="center"
                    w="100%"
                  >
                    <Button
                      isDisabled={!isEditable}
                      type="button"
                      colorScheme="red"
                      onClick={onOpen}
                      hidden={mode === 'CREATE'}
                    >
                      Delete Project
                    </Button>
                    <HStack>
                      <Button isDisabled={!isEditable} type="reset">
                        Reset
                      </Button>
                      <Button
                        colorScheme="purple"
                        isDisabled={!isEditable}
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </HStack>
                  </HStack>
                </Collapse>
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        onClick={deleteProjectHandler}
        header="Delete Project"
        message={`Do you really want to delete ${projectData.name}`}
        actionButtonText="Delete"
      />
    </>
  );
};

export default ProjectForm;
