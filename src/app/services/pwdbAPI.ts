import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';

const APIEndpoint = process.env.REACT_APP_PWDB_API_URL || 'http://localhost:8888/api/graphql/';

export const client = new GraphQLClient(APIEndpoint, {
  credentials: 'include'
});
client.setHeader('Accept', 'application/json');

export const pwdbAPI = createApi({
  // @ts-ignore
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: (builder) => ({}),
  tagTypes: ['Projects', 'Project', 'Credentials']
});
