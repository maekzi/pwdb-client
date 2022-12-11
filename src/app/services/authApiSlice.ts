import { gql } from 'graphql-request';

import type {
  UserAuthenticationWithPasswordResult,
  LogInMutationVariables,
  AuthenticatedItem
} from '../../types/pwdbApiTypes';

import { pwdbAPI } from './pwdbAPI';

export interface ReAuthSuccessResponse {
  authenticatedItem: AuthenticatedItem;
}

export interface ReAuthFailureResponse {
  authenticatedItem: null;
}

const pwdbAuthAPI = pwdbAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserAuthenticationWithPasswordResult, LogInMutationVariables>({
      query: (credentials) => ({
        document: gql`
          mutation logIn($username: String!, $password: String!) {
            authenticate: authenticateUserWithPassword(email: $username, password: $password) {
              __typename
              ... on UserAuthenticationWithPasswordSuccess {
                sessionToken
                item {
                  id
                  name
                  email
                  role {
                    id
                    name
                    canManageProjects
                    canDeleteProjects
                    canManageCredentials
                    canDeleteCredentials
                  }
                }
              }
              ... on UserAuthenticationWithPasswordFailure {
                message
              }
            }
          }
        `,
        variables: {
          ...credentials
        }
      }),
      transformResponse: (response: { authenticate: UserAuthenticationWithPasswordResult }) =>
        response.authenticate
    }),
    logout: builder.mutation<boolean, void>({
      query: () => ({
        document: gql`
          mutation logOut {
            endSession
          }
        `
      })
    }),
    getAuthenticatedItem: builder.mutation<ReAuthSuccessResponse | ReAuthFailureResponse, void>({
      query: () => ({
        document: gql`
          query getAuthItem {
            authenticatedItem {
              __typename
              ... on User {
                id
                email
                name
                role {
                  id
                  name
                  canManageProjects
                  canDeleteProjects
                  canManageCredentials
                  canDeleteCredentials
                }
              }
            }
          }
        `
      })
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected'
    })
  }),
  overrideExisting: false
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useProtectedMutation,
  useGetAuthenticatedItemMutation
} = pwdbAuthAPI;
