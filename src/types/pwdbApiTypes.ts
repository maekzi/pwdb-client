export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilter>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Credential = {
  __typename?: 'Credential';
  assignedTo?: Maybe<Project>;
  created_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<User>;
  enviroment?: Maybe<CredentialEnviromentType>;
  id: Scalars['ID'];
  info?: Maybe<Credential_Info_Document>;
  lastUpdated_at?: Maybe<Scalars['DateTime']>;
  lastUpdated_by?: Maybe<User>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  type?: Maybe<CredentialTypeType>;
  url?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type CredentialCreateInput = {
  assignedTo?: InputMaybe<ProjectRelateToOneForCreateInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by?: InputMaybe<UserRelateToOneForCreateInput>;
  enviroment?: InputMaybe<CredentialEnviromentType>;
  info?: InputMaybe<Scalars['JSON']>;
  lastUpdated_at?: InputMaybe<Scalars['DateTime']>;
  lastUpdated_by?: InputMaybe<UserRelateToOneForCreateInput>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<CredentialTypeType>;
  url?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};

export enum CredentialEnviromentType {
  Develop = 'develop',
  Live = 'live',
  Other = 'other',
  Stage = 'stage'
}

export type CredentialEnviromentTypeNullableFilter = {
  equals?: InputMaybe<CredentialEnviromentType>;
  in?: InputMaybe<Array<CredentialEnviromentType>>;
  not?: InputMaybe<CredentialEnviromentTypeNullableFilter>;
  notIn?: InputMaybe<Array<CredentialEnviromentType>>;
};

export type CredentialManyRelationFilter = {
  every?: InputMaybe<CredentialWhereInput>;
  none?: InputMaybe<CredentialWhereInput>;
  some?: InputMaybe<CredentialWhereInput>;
};

export type CredentialOrderByInput = {
  created_at?: InputMaybe<OrderDirection>;
  enviroment?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastUpdated_at?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  password?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  url?: InputMaybe<OrderDirection>;
  user?: InputMaybe<OrderDirection>;
};

export type CredentialRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CredentialWhereUniqueInput>>;
  create?: InputMaybe<Array<CredentialCreateInput>>;
};

export type CredentialRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CredentialWhereUniqueInput>>;
  create?: InputMaybe<Array<CredentialCreateInput>>;
  disconnect?: InputMaybe<Array<CredentialWhereUniqueInput>>;
  set?: InputMaybe<Array<CredentialWhereUniqueInput>>;
};

export enum CredentialTypeType {
  Be = 'be',
  Fe = 'fe',
  Ftp = 'ftp',
  Other = 'other',
  Ssh = 'ssh'
}

export type CredentialTypeTypeNullableFilter = {
  equals?: InputMaybe<CredentialTypeType>;
  in?: InputMaybe<Array<CredentialTypeType>>;
  not?: InputMaybe<CredentialTypeTypeNullableFilter>;
  notIn?: InputMaybe<Array<CredentialTypeType>>;
};

export type CredentialUpdateArgs = {
  data: CredentialUpdateInput;
  where: CredentialWhereUniqueInput;
};

export type CredentialUpdateInput = {
  assignedTo?: InputMaybe<ProjectRelateToOneForUpdateInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by?: InputMaybe<UserRelateToOneForUpdateInput>;
  enviroment?: InputMaybe<CredentialEnviromentType>;
  info?: InputMaybe<Scalars['JSON']>;
  lastUpdated_at?: InputMaybe<Scalars['DateTime']>;
  lastUpdated_by?: InputMaybe<UserRelateToOneForUpdateInput>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<CredentialTypeType>;
  url?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};

export type CredentialWhereInput = {
  AND?: InputMaybe<Array<CredentialWhereInput>>;
  NOT?: InputMaybe<Array<CredentialWhereInput>>;
  OR?: InputMaybe<Array<CredentialWhereInput>>;
  assignedTo?: InputMaybe<ProjectWhereInput>;
  created_at?: InputMaybe<DateTimeFilter>;
  created_by?: InputMaybe<UserWhereInput>;
  enviroment?: InputMaybe<CredentialEnviromentTypeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  lastUpdated_at?: InputMaybe<DateTimeFilter>;
  lastUpdated_by?: InputMaybe<UserWhereInput>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  type?: InputMaybe<CredentialTypeTypeNullableFilter>;
  url?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type CredentialWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Credential_Info_Document = {
  __typename?: 'Credential_info_Document';
  document: Scalars['JSON'];
};


export type Credential_Info_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  fieldMeta?: Maybe<Scalars['JSON']>;
  isFilterable: Scalars['Boolean'];
  isOrderable: Scalars['Boolean'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean'];
  hideDelete: Scalars['Boolean'];
  initialColumns: Array<Scalars['String']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean'];
  isSingleton: Scalars['Boolean'];
  itemQueryName: Scalars['String'];
  key: Scalars['String'];
  label: Scalars['String'];
  labelField: Scalars['String'];
  listQueryName: Scalars['String'];
  pageSize: Scalars['Int'];
  path: Scalars['String'];
  plural: Scalars['String'];
  singular: Scalars['String'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createCredential?: Maybe<Credential>;
  createCredentials?: Maybe<Array<Maybe<Credential>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createProject?: Maybe<Project>;
  createProjects?: Maybe<Array<Maybe<Project>>>;
  createRole?: Maybe<Role>;
  createRoles?: Maybe<Array<Maybe<Role>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteCredential?: Maybe<Credential>;
  deleteCredentials?: Maybe<Array<Maybe<Credential>>>;
  deleteProject?: Maybe<Project>;
  deleteProjects?: Maybe<Array<Maybe<Project>>>;
  deleteRole?: Maybe<Role>;
  deleteRoles?: Maybe<Array<Maybe<Role>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean'];
  updateCredential?: Maybe<Credential>;
  updateCredentials?: Maybe<Array<Maybe<Credential>>>;
  updateProject?: Maybe<Project>;
  updateProjects?: Maybe<Array<Maybe<Project>>>;
  updateRole?: Maybe<Role>;
  updateRoles?: Maybe<Array<Maybe<Role>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateCredentialArgs = {
  data: CredentialCreateInput;
};


export type MutationCreateCredentialsArgs = {
  data: Array<CredentialCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationCreateProjectsArgs = {
  data: Array<ProjectCreateInput>;
};


export type MutationCreateRoleArgs = {
  data: RoleCreateInput;
};


export type MutationCreateRolesArgs = {
  data: Array<RoleCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteCredentialArgs = {
  where: CredentialWhereUniqueInput;
};


export type MutationDeleteCredentialsArgs = {
  where: Array<CredentialWhereUniqueInput>;
};


export type MutationDeleteProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type MutationDeleteProjectsArgs = {
  where: Array<ProjectWhereUniqueInput>;
};


export type MutationDeleteRoleArgs = {
  where: RoleWhereUniqueInput;
};


export type MutationDeleteRolesArgs = {
  where: Array<RoleWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationUpdateCredentialArgs = {
  data: CredentialUpdateInput;
  where: CredentialWhereUniqueInput;
};


export type MutationUpdateCredentialsArgs = {
  data: Array<CredentialUpdateArgs>;
};


export type MutationUpdateProjectArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};


export type MutationUpdateProjectsArgs = {
  data: Array<ProjectUpdateArgs>;
};


export type MutationUpdateRoleArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};


export type MutationUpdateRolesArgs = {
  data: Array<RoleUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean'];
};

export type Project = {
  __typename?: 'Project';
  confluenceLink?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<User>;
  credentials?: Maybe<Array<Credential>>;
  credentialsCount?: Maybe<Scalars['Int']>;
  desciption?: Maybe<Project_Desciption_Document>;
  gitlabLink?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  jiraLink?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type ProjectCredentialsArgs = {
  orderBy?: Array<CredentialOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CredentialWhereInput;
};


export type ProjectCredentialsCountArgs = {
  where?: CredentialWhereInput;
};

export type ProjectCreateInput = {
  confluenceLink?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by?: InputMaybe<UserRelateToOneForCreateInput>;
  credentials?: InputMaybe<CredentialRelateToManyForCreateInput>;
  desciption?: InputMaybe<Scalars['JSON']>;
  gitlabLink?: InputMaybe<Scalars['String']>;
  jiraLink?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ProjectOrderByInput = {
  confluenceLink?: InputMaybe<OrderDirection>;
  created_at?: InputMaybe<OrderDirection>;
  gitlabLink?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  jiraLink?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type ProjectRelateToOneForCreateInput = {
  connect?: InputMaybe<ProjectWhereUniqueInput>;
  create?: InputMaybe<ProjectCreateInput>;
};

export type ProjectRelateToOneForUpdateInput = {
  connect?: InputMaybe<ProjectWhereUniqueInput>;
  create?: InputMaybe<ProjectCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type ProjectUpdateArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};

export type ProjectUpdateInput = {
  confluenceLink?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by?: InputMaybe<UserRelateToOneForUpdateInput>;
  credentials?: InputMaybe<CredentialRelateToManyForUpdateInput>;
  desciption?: InputMaybe<Scalars['JSON']>;
  gitlabLink?: InputMaybe<Scalars['String']>;
  jiraLink?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  confluenceLink?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  created_by?: InputMaybe<UserWhereInput>;
  credentials?: InputMaybe<CredentialManyRelationFilter>;
  gitlabLink?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  jiraLink?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Project_Desciption_Document = {
  __typename?: 'Project_desciption_Document';
  document: Scalars['JSON'];
};


export type Project_Desciption_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  credential?: Maybe<Credential>;
  credentials?: Maybe<Array<Credential>>;
  credentialsCount?: Maybe<Scalars['Int']>;
  keystone: KeystoneMeta;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
  projectsCount?: Maybe<Scalars['Int']>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Role>>;
  rolesCount?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']>;
};


export type QueryCredentialArgs = {
  where: CredentialWhereUniqueInput;
};


export type QueryCredentialsArgs = {
  orderBy?: Array<CredentialOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CredentialWhereInput;
};


export type QueryCredentialsCountArgs = {
  where?: CredentialWhereInput;
};


export type QueryProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type QueryProjectsArgs = {
  orderBy?: Array<ProjectOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: ProjectWhereInput;
};


export type QueryProjectsCountArgs = {
  where?: ProjectWhereInput;
};


export type QueryRoleArgs = {
  where: RoleWhereUniqueInput;
};


export type QueryRolesArgs = {
  orderBy?: Array<RoleOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: RoleWhereInput;
};


export type QueryRolesCountArgs = {
  where?: RoleWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Role = {
  __typename?: 'Role';
  assignedTo?: Maybe<Array<User>>;
  assignedToCount?: Maybe<Scalars['Int']>;
  canDeleteCredentials?: Maybe<Scalars['Boolean']>;
  canDeleteProjects?: Maybe<Scalars['Boolean']>;
  canManageCredentials?: Maybe<Scalars['Boolean']>;
  canManageProjects?: Maybe<Scalars['Boolean']>;
  canManageRoles?: Maybe<Scalars['Boolean']>;
  canManageUsers?: Maybe<Scalars['Boolean']>;
  canSeeOtherUsers?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};


export type RoleAssignedToArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: UserWhereInput;
};


export type RoleAssignedToCountArgs = {
  where?: UserWhereInput;
};

export type RoleCreateInput = {
  assignedTo?: InputMaybe<UserRelateToManyForCreateInput>;
  canDeleteCredentials?: InputMaybe<Scalars['Boolean']>;
  canDeleteProjects?: InputMaybe<Scalars['Boolean']>;
  canManageCredentials?: InputMaybe<Scalars['Boolean']>;
  canManageProjects?: InputMaybe<Scalars['Boolean']>;
  canManageRoles?: InputMaybe<Scalars['Boolean']>;
  canManageUsers?: InputMaybe<Scalars['Boolean']>;
  canSeeOtherUsers?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type RoleOrderByInput = {
  canDeleteCredentials?: InputMaybe<OrderDirection>;
  canDeleteProjects?: InputMaybe<OrderDirection>;
  canManageCredentials?: InputMaybe<OrderDirection>;
  canManageProjects?: InputMaybe<OrderDirection>;
  canManageRoles?: InputMaybe<OrderDirection>;
  canManageUsers?: InputMaybe<OrderDirection>;
  canSeeOtherUsers?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type RoleRelateToOneForCreateInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  create?: InputMaybe<RoleCreateInput>;
};

export type RoleRelateToOneForUpdateInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  create?: InputMaybe<RoleCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type RoleUpdateArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};

export type RoleUpdateInput = {
  assignedTo?: InputMaybe<UserRelateToManyForUpdateInput>;
  canDeleteCredentials?: InputMaybe<Scalars['Boolean']>;
  canDeleteProjects?: InputMaybe<Scalars['Boolean']>;
  canManageCredentials?: InputMaybe<Scalars['Boolean']>;
  canManageProjects?: InputMaybe<Scalars['Boolean']>;
  canManageRoles?: InputMaybe<Scalars['Boolean']>;
  canManageUsers?: InputMaybe<Scalars['Boolean']>;
  canSeeOtherUsers?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type RoleWhereInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  assignedTo?: InputMaybe<UserManyRelationFilter>;
  canDeleteCredentials?: InputMaybe<BooleanFilter>;
  canDeleteProjects?: InputMaybe<BooleanFilter>;
  canManageCredentials?: InputMaybe<BooleanFilter>;
  canManageProjects?: InputMaybe<BooleanFilter>;
  canManageRoles?: InputMaybe<BooleanFilter>;
  canManageUsers?: InputMaybe<BooleanFilter>;
  canSeeOtherUsers?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type RoleWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<PasswordState>;
  role?: Maybe<Role>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String'];
};

export type UserCreateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleRelateToOneForCreateInput>;
};

export type UserManyRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByInput = {
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type UserRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
};

export type UserRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleRelateToOneForUpdateInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  role?: InputMaybe<RoleWhereInput>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type LogInMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { __typename?: 'Mutation', authenticate?: { __typename: 'UserAuthenticationWithPasswordFailure', message: string } | { __typename: 'UserAuthenticationWithPasswordSuccess', sessionToken: string, item: { __typename?: 'User', id: string, name?: string | null, email?: string | null, role?: { __typename?: 'Role', id: string, name?: string | null, canManageProjects?: boolean | null, canDeleteProjects?: boolean | null, canManageCredentials?: boolean | null, canDeleteCredentials?: boolean | null } | null } } | null };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', endSession: boolean };

export type GetAuthItemQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthItemQuery = { __typename?: 'Query', authenticatedItem?: { __typename: 'User', id: string, email?: string | null, name?: string | null, role?: { __typename?: 'Role', id: string, name?: string | null, canManageProjects?: boolean | null, canDeleteProjects?: boolean | null, canManageCredentials?: boolean | null, canDeleteCredentials?: boolean | null } | null } | null };

export type GetCredentialsQueryVariables = Exact<{
  credentialWhereInput?: InputMaybe<CredentialWhereInput>;
}>;


export type GetCredentialsQuery = { __typename?: 'Query', credentials?: Array<{ __typename?: 'Credential', id: string, name?: string | null, type?: CredentialTypeType | null, enviroment?: CredentialEnviromentType | null, user?: string | null, password?: string | null, url?: string | null, lastUpdated_at?: any | null, created_at?: any | null, info?: { __typename?: 'Credential_info_Document', document: any } | null, assignedTo?: { __typename?: 'Project', name?: string | null } | null, lastUpdated_by?: { __typename?: 'User', name?: string | null } | null, created_by?: { __typename?: 'User', name?: string | null } | null }> | null };

export type GetCredentialQueryVariables = Exact<{
  credentialId: Scalars['ID'];
}>;


export type GetCredentialQuery = { __typename?: 'Query', credential?: { __typename?: 'Credential', id: string, name?: string | null, type?: CredentialTypeType | null, enviroment?: CredentialEnviromentType | null, user?: string | null, password?: string | null, url?: string | null, lastUpdated_at?: any | null, created_at?: any | null, info?: { __typename?: 'Credential_info_Document', document: any } | null, assignedTo?: { __typename?: 'Project', id: string, name?: string | null } | null, lastUpdated_by?: { __typename?: 'User', name?: string | null } | null, created_by?: { __typename?: 'User', name?: string | null } | null } | null };

export type UpdateCredentialMutationVariables = Exact<{
  where: CredentialWhereUniqueInput;
  data: CredentialUpdateInput;
}>;


export type UpdateCredentialMutation = { __typename?: 'Mutation', updateCredential?: { __typename?: 'Credential', id: string, name?: string | null, type?: CredentialTypeType | null, enviroment?: CredentialEnviromentType | null, user?: string | null, password?: string | null, url?: string | null, lastUpdated_at?: any | null, created_at?: any | null, info?: { __typename?: 'Credential_info_Document', document: any } | null, assignedTo?: { __typename?: 'Project', id: string, name?: string | null } | null, lastUpdated_by?: { __typename?: 'User', name?: string | null } | null, created_by?: { __typename?: 'User', name?: string | null } | null } | null };

export type CreateCredentialMutationVariables = Exact<{
  data: CredentialCreateInput;
}>;


export type CreateCredentialMutation = { __typename?: 'Mutation', createCredential?: { __typename?: 'Credential', id: string, name?: string | null, type?: CredentialTypeType | null, enviroment?: CredentialEnviromentType | null, user?: string | null, password?: string | null, url?: string | null, lastUpdated_at?: any | null, created_at?: any | null, info?: { __typename?: 'Credential_info_Document', document: any } | null, assignedTo?: { __typename?: 'Project', id: string, name?: string | null } | null, lastUpdated_by?: { __typename?: 'User', name?: string | null } | null, created_by?: { __typename?: 'User', name?: string | null } | null } | null };

export type DeleteCredentialMutationVariables = Exact<{
  where: CredentialWhereUniqueInput;
}>;


export type DeleteCredentialMutation = { __typename?: 'Mutation', deleteCredential?: { __typename?: 'Credential', id: string, name?: string | null } | null };

export type GetProjectsQueryVariables = Exact<{
  projectWhereInput?: InputMaybe<ProjectWhereInput>;
}>;


export type GetProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id: string, name?: string | null, jiraLink?: string | null, gitlabLink?: string | null, confluenceLink?: string | null, credentialsCount?: number | null, desciption?: { __typename?: 'Project_desciption_Document', document: any } | null }> | null };

export type GetProjectQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name?: string | null, jiraLink?: string | null, gitlabLink?: string | null, confluenceLink?: string | null, credentialsCount?: number | null, created_at?: any | null, desciption?: { __typename?: 'Project_desciption_Document', document: any } | null, created_by?: { __typename?: 'User', id: string, name?: string | null } | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  where: ProjectWhereUniqueInput;
  data: ProjectUpdateInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: string, name?: string | null, jiraLink?: string | null, gitlabLink?: string | null, confluenceLink?: string | null, credentialsCount?: number | null, created_at?: any | null, desciption?: { __typename?: 'Project_desciption_Document', document: any } | null, created_by?: { __typename?: 'User', id: string, name?: string | null } | null } | null };

export type CreateProjectMutationVariables = Exact<{
  data: ProjectCreateInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string } | null };

export type DeleteProjectMutationVariables = Exact<{
  where: ProjectWhereUniqueInput;
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'Project', id: string, name?: string | null } | null };
