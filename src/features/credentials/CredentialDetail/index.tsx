import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useBoolean,
  useClipboard,
  useToast,
  useDisclosure,
  useColorModeValue,
  Avatar,
  Badge,
  Box,
  Button,
  VStack,
  StackDivider,
  HStack,
  FormControl,
  Input,
  IconButton,
  SimpleGrid,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Tag,
  Progress,
  Skeleton,
  Select
} from "@chakra-ui/react";
import { Field, Form, Formik, FieldProps, FormikHelpers } from "formik";
import { object, mixed, string } from "yup";
import {
  FaGlobe,
  FaEdit,
  FaExternalLinkAlt,
  FaUser,
  FaClipboard,
  FaClipboardCheck,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import ConfirmationDialog from "../../../utils/ConfirmationDialog";
import {
  useCreateCredentialMutation,
  useDeleteCredentialMutation,
  useGetCredentialQuery,
  useUpdateCredentialMutation,
} from "../../../app/services/credentialApiSlice";
/**
 * Import Enums for Validation
 */
import {
  CredentialTypeType,
  CredentialEnviromentType,
} from "../../../types/pwdbApiTypes";
import type {
  Credential,
  CredentialUpdateInput,
  CredentialCreateInput,
  Scalars,
} from "../../../types/pwdbApiTypes";

interface CredentialDetailProps {
  credentialId: Scalars["ID"];
  projectId: Scalars["ID"];
  mode: "CREATE" | "EDIT" | "READ";
}

const CredentialDetail = ({
  credentialId,
  projectId,
  mode,
}: CredentialDetailProps) => {
  /**
   * Component Constants
   */
  const toast = useToast();
  const navigate = useNavigate()
  const { isOpen: isDialogeOpen, onOpen: openDialog, onClose: closeDialog } = useDisclosure();
  const [isEditable, setIsEditable] = useBoolean();
  const [show, setShow] = useBoolean(false);
  const { onCopy: onPassCopy, setValue: setPassCopyValue, hasCopied: hasPassCopied } = useClipboard("");
  const { onCopy: onUserCopy,setValue: setUserCopyValue, hasCopied: hasUserCopied } = useClipboard("");

  const boxBg = useColorModeValue("gray.100", "gray.900");

  /**
   * RTK Query Hooks
   */
  const {
    data: credentialData,
    isFetching,
    isLoading,
  } = useGetCredentialQuery(
    { credentialId },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  const credentialCreateData: CredentialCreateInput = {
    url: "",
    user: "",
    password: "",
    name: "",
    assignedTo: {
      connect: {
        id: projectId,
      },
    },
  };

  /**
   * Sync Editable Password Show State
   */
  useEffect(() => {
    if(isEditable === false) {
      setShow.off();
    }

  }, [isEditable, setShow]);

  /**
   * Sync isEditiable State between Mode Changes
   */
  useEffect(() => {
    if(mode === "CREATE") {
      setIsEditable.on();
    } else {
      setIsEditable.off();
    }
  }, [mode, setIsEditable])

  const [createCredential] = useCreateCredentialMutation({
    fixedCacheKey: "shared-create-credential",
  });

  const [updateCredential] = useUpdateCredentialMutation({
    fixedCacheKey: "shared-update-credential",
  });

  const [deleteCredential] = useDeleteCredentialMutation();

  /**
   * Returns on Object of CredentialUpdateInput wich only has the updated differences
   * ToDo: Can we do this in a besser way? Create a general useable function?
   * ts-ignore is needed because i can not add sting as Object key
   * @param {Credential} values
   * @param {Credential} initialValues
   * @returns {CredentialUpdateInput}
   */
  const getUpdatedCredentialtValues = (
    values: Credential,
    initialValues: Credential
  ): CredentialUpdateInput => {
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

  /**
   * Yup Validation Schema
   */
  const credentialSchema = object().shape({
    enviroment: mixed()
      .oneOf(Object.values(CredentialEnviromentType))
      .optional(),
    info: mixed().optional(),
    name: string(),
    password: string().optional(),
    type: mixed().oneOf(Object.values(CredentialTypeType)).optional(),
    url: string().url().optional(),
    user: string().optional(),
  });

  if (isLoading) return <Progress mt={-4} mx={-4} size="sm" isIndeterminate />;
  if (!credentialData && mode !== "CREATE")
    return <div>Missing Credentials!</div>;

  /**
   * Creating a Credential Submit Handler
   * @param values
   * @param actions
   */
  const createCredentialHandler = async (
    values: CredentialCreateInput,
    actions: FormikHelpers<Credential>
  ) => {
    try {
      const createCredentialData = await createCredential({
        data: values,
      }).unwrap();
      setIsEditable.off();
      navigate(`/projects/${projectId}/${createCredentialData.id}`);
    } catch (err: any) {
      toast({
        status: "error",
        title: "Error",
        description: `${err.message}`,
        isClosable: true,
      });
    }
  };

  /**
   * Update Credential Submit Handler
   * @param values
   * @param actions
   */
  const updateCredentialHandler = async (
    values: Credential,
    actions: FormikHelpers<Credential>
  ) => {
    try {
      if (credentialData === undefined) {
        throw new Error("Can not Update without Data");
      }
      await updateCredential({
        where: { id: values.id },
        data: getUpdatedCredentialtValues(values, credentialData),
      });
      setIsEditable.toggle();
    } catch (err) {
      toast({
        status: "error",
        title: "Error",
        description: `${err}`,
        isClosable: true,
      });
    }
  };

  const deleteCredentialHandler = async () => {
    try {
      const deleteCredentialData = await deleteCredential({
        where: {
          id: credentialData?.id,
        },
      }).unwrap();
      if (deleteCredentialData.id === credentialData?.id) {
        toast({
          status: "success",
          title: "Project Deleted",
          description: `${deleteCredentialData.name} is now gone!`,
          isClosable: true,
        });
      } else {
        throw new Error(
          "Error Deleting this Credential. Please contact your Administrator!"
        );
      }
      closeDialog();
    } catch (err: any) {
      toast({
        status: "error",
        title: "Could not delete Project. Please try again.",
        description: `${err.message}`,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      as="article"
      minW={480}
      p="5"
      borderWidth="1px"
      rounded="md"
      bg={boxBg}
    >
      <Skeleton isLoaded={!isFetching}>
        <Formik
          enableReinitialize
          initialValues={credentialData ? credentialData : credentialCreateData}
          validationSchema={credentialSchema}
          onSubmit={mode === "CREATE" ? createCredentialHandler : updateCredentialHandler}
        >
          {(props) => (
            <Form>
              <VStack divider={<StackDivider borderColor="gray.200" />}>
                {mode !== "CREATE" && credentialData !== undefined ? (
                  <HStack justify="space-between" align="center" w="100%">
                    <HStack align="end">
                      <Tag colorScheme="purple" size="lg">
                        <Avatar
                          src={`https://avatars.dicebear.com/api/bottts/${credentialData.created_by?.name}.svg`}
                          size="xs"
                          name={credentialData.name?.toString()}
                          ml={-1}
                          mr={2}
                        />
                        {credentialData.lastUpdated_by?.name}
                      </Tag>
                      <Badge colorScheme="pink">
                        {credentialData.lastUpdated_at}
                      </Badge>
                    </HStack>
                    <IconButton
                      aria-label="Enable Form edit"
                      icon={<FaEdit />}
                      onClick={setIsEditable.toggle}
                      variant="ghost"
                      colorScheme={isEditable ? "purple" : "gray"}
                      size="lg"
                    />
                  </HStack>
                ) : null}
                <Box w="100%">
                  <SimpleGrid
                    columns={{
                      sm: 1,
                      md: 1,
                      lg: 1,
                    }}
                    spacing={2}
                  >
                    <Field name="name">
                      {({ field }: FieldProps) => {
                        return (
                          <FormControl isReadOnly={!isEditable}>
                            <FormLabel>Credential Name</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<FaUser />}
                                color="purple.700"
                              />
                              <Input
                                {...field}
                                placeholder="Credential Name"
                                type="name"
                              />
                            </InputGroup>
                          </FormControl>
                        );
                      }}
                    </Field>
                    <Field name="enviroment">
                      {({ field }: FieldProps) => {
                        return (
                          <FormControl isReadOnly={!isEditable}>
                            <FormLabel>Enviroment</FormLabel>
                            <InputGroup>
                              <Select
                                {...field}
                                placeholder="Select Enviroment"
                              >
                                <option value="develop">Develop</option>
                                <option value="stage">Stage</option>
                                <option value="live">Live</option>
                                <option value="other">Other</option>
                              </Select>
                            </InputGroup>
                          </FormControl>
                        );
                      }}
                    </Field>
                    <Field name="type">
                      {({ field }: FieldProps) => {
                        return (
                          <FormControl isReadOnly={!isEditable}>
                            <FormLabel>Type</FormLabel>
                            <InputGroup>
                              <Select
                                {...field}
                                placeholder="Select Type"
                              >
                                <option value="be">Backend</option>
                                <option value="fe">Frontend</option>
                                <option value="ftp">FTP</option>
                                <option value="ssh">SSH</option>
                                <option value="other">Other</option>
                              </Select>
                            </InputGroup>
                          </FormControl>
                        );
                      }}
                    </Field>
                    <Field name="url">
                      {({ field }: FieldProps) => {
                        return (
                          <FormControl isReadOnly={!isEditable}>
                            <FormLabel>Login Url</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<FaGlobe />}
                                color="purple.700"
                              />
                              <Input
                                {...field}
                                placeholder="Login Url"
                                type="url"
                              />
                              <InputRightElement>
                                <IconButton
                                  as={Link}
                                  aria-label="Open Jira Link"
                                  icon={<FaExternalLinkAlt />}
                                  variant="ghost"
                                  isExternal
                                  href={field.value}
                                  colorScheme=""
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                        );
                      }}
                    </Field>
                    <Field name="user">
                      {({ field }: FieldProps) => {
                        return (
                          <FormControl isReadOnly={!isEditable}>
                            <FormLabel>Login User</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<FaUser />}
                                color="purple.700"
                              />
                              <Input
                                {...field}
                                placeholder="Login User"
                                type="user"
                              />
                              <InputRightElement>
                                <IconButton
                                  aria-label="Copy User"
                                  icon={
                                    !hasUserCopied ? (
                                      <FaClipboard />
                                    ) : (
                                      <FaClipboardCheck />
                                    )
                                  }
                                  colorScheme={
                                    hasUserCopied ? "green" : "Background"
                                  }
                                  variant="ghost"
                                  onClick={() => {
                                    setUserCopyValue(field.value);
                                    onUserCopy();
                                  }}
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                        );
                      }}
                    </Field>
                    <Field name="password">
                      {({ field }: FieldProps) => {
                        return (
                          <FormControl isReadOnly={!isEditable}>
                            <FormLabel>Login Password</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <IconButton
                                  aria-label="Copy Password"
                                  icon={show || isEditable ? <FaLockOpen /> : <FaLock />}
                                  color={show || isEditable ? "green.400" : "purple.700"}
                                  variant="ghost"
                                  onClick={() => setShow.toggle()}
                                />
                              </InputLeftElement>
                              <Input
                                {...field}
                                placeholder="Login Password"
                                type={show || isEditable ? "text" : "password"}
                              />
                              <InputRightElement>
                                <IconButton
                                  aria-label="Copy Password"
                                  icon={
                                    !hasPassCopied ? (
                                      <FaClipboard />
                                    ) : (
                                      <FaClipboardCheck color="green.500" />
                                    )
                                  }
                                  colorScheme={
                                    hasPassCopied ? "green" : "Background"
                                  }
                                  variant="ghost"
                                  onClick={() => {
                                    setPassCopyValue(field.value);
                                    onPassCopy();
                                  }}
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                        );
                      }}
                    </Field>
                  </SimpleGrid>
                  <HStack
                    hidden={!isEditable}
                    mt={4}
                    justify={mode !== "CREATE" ? "space-between" : "end"}
                    align="center"
                    w="100%"
                  >
                    <Button
                      isDisabled={!isEditable}
                      type="button"
                      colorScheme="red"
                      onClick={openDialog}
                      hidden={mode === "CREATE"}
                    >
                      Delete Credential
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
                </Box>
              </VStack>
            </Form>
          )}
        </Formik>
        <ConfirmationDialog
          isOpen={isDialogeOpen}
          onClose={closeDialog}
          onClick={deleteCredentialHandler}
          header="Delete Project"
          message={`Do you really want to delete ${credentialData?.name}`}
          actionButtonText="Delete"
        />
      </Skeleton>
    </Box>
  );
};

export default CredentialDetail;
