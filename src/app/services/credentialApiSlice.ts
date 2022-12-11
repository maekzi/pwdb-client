import { gql } from 'graphql-request';

import type {
  Credential,
  CredentialWhereInput,
  CredentialUpdateArgs,
  GetCredentialQueryVariables,
  MutationCreateCredentialArgs,
  MutationDeleteCredentialArgs
} from '../../types/pwdbApiTypes';

import { pwdbAPI } from './pwdbAPI';

const pwdbProjectAPI = pwdbAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCredentials: builder.query<Credential[], CredentialWhereInput>({
      query: (credentialWhereInput = {}) => ({
        document: gql`
          query getCredentials($credentialWhereInput: CredentialWhereInput) {
            credentials(where: $credentialWhereInput, orderBy: { lastUpdated_at: desc }) {
              id
              name
              type
              enviroment
              user
              password
              url
              info {
                document
              }
              assignedTo {
                id
                name
              }
              lastUpdated_by {
                name
              }
              lastUpdated_at
              created_by {
                name
              }
              created_at
            }
          }
        `,
        variables: {
          credentialWhereInput
        }
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Credentials' as const, id })),
              { type: 'Credentials', id: 'LIST' }
            ]
          : [{ type: 'Credentials', id: 'LIST' }],
      transformResponse: (response: { credentials: Credential[] }) => response.credentials
    }),
    getCredential: builder.query<Credential, GetCredentialQueryVariables>({
      query: (credentialQueryVariables) => ({
        document: gql`
          query getCredential($credentialId: ID!) {
            credential(where: { id: $credentialId }) {
              id
              name
              type
              enviroment
              user
              password
              url
              info {
                document
              }
              assignedTo {
                id
                name
              }
              lastUpdated_by {
                name
              }
              lastUpdated_at
              created_by {
                name
              }
              created_at
            }
          }
        `,
        variables: {
          credentialId: credentialQueryVariables.credentialId
        }
      }),
      transformResponse: (data: { credential: Credential }) => data.credential
    }),
    updateCredential: builder.mutation<Credential, CredentialUpdateArgs>({
      query: (updateArgs) => ({
        document: gql`
          mutation updateCredential(
            $where: CredentialWhereUniqueInput!
            $data: CredentialUpdateInput!
          ) {
            updateCredential(where: $where, data: $data) {
              id
              name
              type
              enviroment
              user
              password
              url
              info {
                document
              }
              assignedTo {
                id
                name
              }
              lastUpdated_by {
                name
              }
              lastUpdated_at
              created_by {
                name
              }
              created_at
            }
          }
        `,
        variables: {
          ...updateArgs
        }
      }),
      invalidatesTags: (result) => [{ type: 'Credentials', id: result?.id }],
      transformResponse: (data: { updateCredential: Credential }) => data.updateCredential
    }),
    createCredential: builder.mutation<Credential, MutationCreateCredentialArgs>({
      query: (createCredentialArgs) => ({
        document: gql`
          mutation createCredential($data: CredentialCreateInput!) {
            createCredential(data: $data) {
              id
              name
              type
              enviroment
              user
              password
              url
              info {
                document
              }
              assignedTo {
                id
                name
              }
              lastUpdated_by {
                name
              }
              lastUpdated_at
              created_by {
                name
              }
              created_at
            }
          }
        `,
        variables: {
          ...createCredentialArgs
        }
      }),
      invalidatesTags: [{ type: 'Credentials', id: 'LIST' }],
      transformResponse: (data: { createCredential: Credential }) => data.createCredential
    }),
    deleteCredential: builder.mutation<Credential, MutationDeleteCredentialArgs>({
      query: (deleteCredentialArgs) => ({
        document: gql`
          mutation deleteCredential($where: CredentialWhereUniqueInput!) {
            deleteCredential(where: $where) {
              id
              name
            }
          }
        `,
        variables: {
          ...deleteCredentialArgs
        }
      }),
      invalidatesTags: (result) => [{ type: 'Credentials', id: result?.id }],
      transformResponse: (data: { deleteCredential: Credential }) => data.deleteCredential
    })
  }),
  overrideExisting: false
});

export const {
  useGetCredentialsQuery,
  useLazyGetCredentialQuery,
  useGetCredentialQuery,
  useUpdateCredentialMutation,
  useCreateCredentialMutation,
  useDeleteCredentialMutation
} = pwdbProjectAPI;
