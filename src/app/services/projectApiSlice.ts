import { gql } from 'graphql-request';

import type {
  Project,
  GetProjectQueryVariables,
  ProjectUpdateArgs,
  ProjectWhereInput,
  MutationCreateProjectArgs,
  MutationDeleteProjectArgs
} from '../../types/pwdbApiTypes';

import { pwdbAPI } from './pwdbAPI';

const pwdbProjectAPI = pwdbAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], ProjectWhereInput>({
      query: (projectWhereInput = {}) => ({
        document: gql`
          query getProjects($projectWhereInput: ProjectWhereInput) {
            projects(where: $projectWhereInput) {
              id
              name
              desciption {
                document
              }
              jiraLink
              gitlabLink
              confluenceLink
              credentialsCount
            }
          }
        `,
        variables: {
          projectWhereInput
        }
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Projects' as const, id })), 'Projects']
          : ['Projects'],
      transformResponse: (response: { projects: Project[] }) => response.projects
    }),
    getProject: builder.query<Project, GetProjectQueryVariables>({
      providesTags: ['Project'],
      query: (projectQueryVariables) => ({
        document: gql`
          query getProject($projectId: ID!) {
            project(where: { id: $projectId }) {
              id
              name
              desciption {
                document
              }
              jiraLink
              gitlabLink
              confluenceLink
              credentialsCount
              created_by {
                id
                name
              }
              created_at
            }
          }
        `,
        variables: {
          projectId: projectQueryVariables.projectId
        }
      }),
      transformResponse: (response: { project: Project }) => response.project
    }),
    updateProject: builder.mutation<Project, ProjectUpdateArgs>({
      query: (updateArgs) => ({
        document: gql`
          mutation updateProject($where: ProjectWhereUniqueInput!, $data: ProjectUpdateInput!) {
            updateProject(where: $where, data: $data) {
              id
              name
              desciption {
                document
              }
              jiraLink
              gitlabLink
              confluenceLink
              credentialsCount
              created_by {
                id
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
      transformResponse: (data: { updateProject: Project }) => data.updateProject,
      invalidatesTags: (result) => ['Project', { type: 'Projects', id: result?.id }]
    }),
    createProject: builder.mutation<Project, MutationCreateProjectArgs>({
      query: (projectCreateInputArgs) => ({
        document: gql`
          mutation createProject($data: ProjectCreateInput!) {
            createProject(data: $data) {
              id
            }
          }
        `,
        variables: {
          ...projectCreateInputArgs
        }
      }),
      transformResponse: (data: { createProject: Project }) => data.createProject,
      invalidatesTags: ['Projects']
    }),
    deleteProject: builder.mutation<Project, MutationDeleteProjectArgs>({
      query: (deleteProjectArgs) => ({
        document: gql`
          mutation deleteProject($where: ProjectWhereUniqueInput!) {
            deleteProject(where: $where) {
              id
              name
            }
          }
        `,
        variables: {
          ...deleteProjectArgs
        }
      }),
      invalidatesTags: (result) => [{ type: 'Projects', id: result?.id }],
      transformResponse: (data: { deleteProject: Project }) => data.deleteProject
    })
  }),
  overrideExisting: false
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useCreateProjectMutation,
  useDeleteProjectMutation
} = pwdbProjectAPI;
