import { useEffect, ChangeEvent, useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Divider,
  Center,
  useToast,
  Skeleton
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCredentials } from './authSlice';
import { useLoginMutation, useGetAuthenticatedItemMutation } from '../../app/services/authApiSlice';
import type { LogInMutationVariables } from '../../types/pwdbApiTypes';

function PasswordInput({
  name,
  onChange
}: {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        name={name}
        onChange={onChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

/**
 * Return the Login Page
 * ToDo: Implement Formik for the Login form.
 * @returns {JSX.Element}
 */
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [formState, setFormState] = useState<LogInMutationVariables>({
    username: '',
    password: ''
  });

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [reAuth, { isLoading: isAuthenticating }] = useGetAuthenticatedItemMutation();

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    /**
     * ToDo: Get a better way to reauth the User
     */
    const isStillAuthed = async () => {
      const authResponse = await reAuth().unwrap();
      if (authResponse.authenticatedItem === null) {
        throw new Error('No Active Session');
      }
      dispatch(setCredentials({ item: authResponse.authenticatedItem }));
      navigate(location.state?.location?.pathname);
    };
    isStillAuthed().catch((err) => console.info(err));
  }, [dispatch, navigate, reAuth, location]);

  return (
    <Center h="500px">
      <Skeleton isLoaded={!isAuthenticating}>
        <VStack spacing="4">
          <InputGroup>
            <Input onChange={handleChange} name="username" type="text" placeholder="Email" />
          </InputGroup>
          <InputGroup>
            <PasswordInput onChange={handleChange} name="password" />
          </InputGroup>
          <Button
            onClick={async () => {
              try {
                const authResponse = await login(formState).unwrap();
                if (authResponse.__typename === 'UserAuthenticationWithPasswordFailure') {
                  throw new Error(authResponse.message);
                }
                if (authResponse.__typename === 'UserAuthenticationWithPasswordSuccess') {
                  dispatch(setCredentials({ ...authResponse }));
                  navigate('/');
                }
              } catch (err) {
                toast({
                  status: 'error',
                  title: 'Error',
                  description: `${err}`,
                  isClosable: true
                });
              }
            }}
            colorScheme="green"
            isLoading={isLoggingIn}
            loadingText="Logging in"
          >
            Login
          </Button>
          <Divider />
        </VStack>
      </Skeleton>
    </Center>
  );
};

export default Login;
