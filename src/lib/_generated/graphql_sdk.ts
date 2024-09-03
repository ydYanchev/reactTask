import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type CacheConfig = {
  customKey?: InputMaybe<Scalars['String']['input']>
  extraKeys?: InputMaybe<Array<Scalars['String']['input']>>
  ttlMin?: InputMaybe<Scalars['Int']['input']>
  useCache?: InputMaybe<Scalars['Boolean']['input']>
}

export type CarBrand = {
  __typename?: 'CarBrand'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type CarBrandData = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export enum CarCoupe {
  Convertible = 'CONVERTIBLE',
  Coupe = 'COUPE',
  Hatchback = 'HATCHBACK',
  Sedan = 'SEDAN',
  Suv = 'SUV',
  Truck = 'TRUCK',
  Van = 'VAN',
  Wagon = 'WAGON',
}

export type CarModel = {
  __typename?: 'CarModel'
  brand: CarBrand
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type CarModelData = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type CarModification = {
  __typename?: 'CarModification'
  coupe: CarCoupe
  horsePower: Scalars['Int']['output']
  id: Scalars['ID']['output']
  model: CarModel
  name: Scalars['String']['output']
  weight: Scalars['Float']['output']
}

export type CarModificationData = {
  coupe?: InputMaybe<CarCoupe>
  horsePower?: InputMaybe<Scalars['Int']['input']>
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  weight?: InputMaybe<Scalars['Float']['input']>
}

export type ClearCacheConfig = {
  clear?: InputMaybe<Scalars['Boolean']['input']>
  extraKeys?: InputMaybe<Array<Scalars['String']['input']>>
}

export enum Constraint {
  Email = 'EMAIL',
  Max = 'MAX',
  Min = 'MIN',
  Numeric = 'NUMERIC',
  OneOf = 'ONE_OF',
  Password = 'PASSWORD',
  Required = 'REQUIRED',
}

export type EditExtraValidations = {
  afterSave?: InputMaybe<Array<Scalars['String']['input']>>
  beforeSave?: InputMaybe<Array<Scalars['String']['input']>>
}

export enum EntityFilterSort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type EntityToModel = {
  enable?: InputMaybe<Scalars['Boolean']['input']>
  excludeFields?: InputMaybe<Array<Scalars['String']['input']>>
}

export type Filter = {
  Condition: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  _health?: Maybe<Scalars['Boolean']['output']>
  createCarBrand: CarBrand
  createCarModel: CarModel
  createCarModification: CarModification
  deleteCarBrand: Scalars['Boolean']['output']
  deleteCarModel: Scalars['Boolean']['output']
  deleteCarModification: Scalars['Boolean']['output']
  editCarBrand: CarBrand
  editCarModel: CarModel
  editCarModification: CarModification
}

export type MutationCreateCarBrandArgs = {
  name: Scalars['String']['input']
}

export type MutationCreateCarModelArgs = {
  brandId: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationCreateCarModificationArgs = {
  modelId: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationDeleteCarBrandArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteCarModelArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteCarModificationArgs = {
  id: Scalars['ID']['input']
}

export type MutationEditCarBrandArgs = {
  data: CarBrandData
}

export type MutationEditCarModelArgs = {
  data: CarModelData
}

export type MutationEditCarModificationArgs = {
  data: CarModificationData
}

export type Query = {
  __typename?: 'Query'
  _health?: Maybe<Scalars['Boolean']['output']>
  allCarModifications: Array<CarModification>
  carBrands: Array<CarBrand>
  carModels: Array<CarModel>
  carModifications: Array<CarModification>
}

export type QueryCarModelsArgs = {
  brandId: Scalars['ID']['input']
}

export type QueryCarModificationsArgs = {
  modelId: Scalars['ID']['input']
}

export type ResultsPager = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  sortField: Scalars['String']['input']
  sortOrder?: EntityFilterSort
}

export type ValidationCheck = {
  check: Constraint
  value?: InputMaybe<Scalars['String']['input']>
}

export type PostCarBrandMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type PostCarBrandMutation = {
  __typename?: 'Mutation'
  createCarBrand: { __typename?: 'CarBrand'; id: string; name: string }
}

export type PostCarModelMutationVariables = Exact<{
  brandId: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type PostCarModelMutation = {
  __typename?: 'Mutation'
  createCarModel: {
    __typename?: 'CarModel'
    id: string
    name: string
    brand: { __typename?: 'CarBrand'; id: string; name: string }
  }
}

export type PostCarModificationMutationVariables = Exact<{
  modelId: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type PostCarModificationMutation = {
  __typename?: 'Mutation'
  createCarModification: {
    __typename?: 'CarModification'
    id: string
    name: string
  }
}

export type EditCarBrandMutationVariables = Exact<{
  data: CarBrandData
}>

export type EditCarBrandMutation = {
  __typename?: 'Mutation'
  editCarBrand: { __typename?: 'CarBrand'; id: string; name: string }
}

export type EditCarModelMutationVariables = Exact<{
  data: CarModelData
}>

export type EditCarModelMutation = {
  __typename?: 'Mutation'
  editCarModel: { __typename?: 'CarModel'; id: string }
}

export type EditCarModificationNameMutationVariables = Exact<{
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type EditCarModificationNameMutation = {
  __typename?: 'Mutation'
  editCarModification: {
    __typename?: 'CarModification'
    id: string
    name: string
  }
}

export type EditCarModificationMutationVariables = Exact<{
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  coupe?: InputMaybe<CarCoupe>
  horsePower?: InputMaybe<Scalars['Int']['input']>
  weight?: InputMaybe<Scalars['Float']['input']>
}>

export type EditCarModificationMutation = {
  __typename?: 'Mutation'
  editCarModification: {
    __typename?: 'CarModification'
    id: string
    name: string
    coupe: CarCoupe
    horsePower: number
    weight: number
    model: {
      __typename?: 'CarModel'
      id: string
      name: string
      brand: { __typename?: 'CarBrand'; id: string; name: string }
    }
  }
}

export type DeleteCarModificationMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteCarModificationMutation = {
  __typename?: 'Mutation'
  deleteCarModification: boolean
}

export type DeleteCarBrandMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteCarBrandMutation = {
  __typename?: 'Mutation'
  deleteCarBrand: boolean
}

export type DeleteCarModelMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteCarModelMutation = {
  __typename?: 'Mutation'
  deleteCarModel: boolean
}

export type GetCarModelsQueryVariables = Exact<{
  brandId: Scalars['ID']['input']
}>

export type GetCarModelsQuery = {
  __typename?: 'Query'
  carModels: Array<{ __typename?: 'CarModel'; id: string; name: string }>
}

export type GetCarModificationsQueryVariables = Exact<{
  modelId: Scalars['ID']['input']
}>

export type GetCarModificationsQuery = {
  __typename?: 'Query'
  carModifications: Array<{
    __typename?: 'CarModification'
    horsePower: number
    id: string
    name: string
    weight: number
    coupe: CarCoupe
  }>
}

export type GetAllCarBrandsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllCarBrandsQuery = {
  __typename?: 'Query'
  carBrands: Array<{ __typename?: 'CarBrand'; id: string; name: string }>
}

export type GetAllCarModificationsQueryVariables = Exact<{
  [key: string]: never
}>

export type GetAllCarModificationsQuery = {
  __typename?: 'Query'
  allCarModifications: Array<{
    __typename?: 'CarModification'
    id: string
    name: string
    horsePower: number
    weight: number
    model: {
      __typename?: 'CarModel'
      id: string
      name: string
      brand: { __typename?: 'CarBrand'; id: string; name: string }
    }
  }>
}

export const PostCarBrandDocument = gql`
  mutation postCarBrand($name: String!) {
    createCarBrand(name: $name) {
      id
      name
    }
  }
`
export const PostCarModelDocument = gql`
  mutation postCarModel($brandId: ID!, $name: String!) {
    createCarModel(brandId: $brandId, name: $name) {
      id
      name
      brand {
        id
        name
      }
    }
  }
`
export const PostCarModificationDocument = gql`
  mutation postCarModification($modelId: ID!, $name: String!) {
    createCarModification(modelId: $modelId, name: $name) {
      id
      name
    }
  }
`
export const EditCarBrandDocument = gql`
  mutation EditCarBrand($data: CarBrandData!) {
    editCarBrand(data: $data) {
      id
      name
    }
  }
`
export const EditCarModelDocument = gql`
  mutation EditCarModel($data: CarModelData!) {
    editCarModel(data: $data) {
      id
    }
  }
`
export const EditCarModificationNameDocument = gql`
  mutation EditCarModificationName($id: ID!, $name: String!) {
    editCarModification(data: { id: $id, name: $name }) {
      id
      name
    }
  }
`
export const EditCarModificationDocument = gql`
  mutation EditCarModification(
    $id: ID!
    $name: String
    $coupe: CarCoupe
    $horsePower: Int
    $weight: Float
  ) {
    editCarModification(
      data: {
        id: $id
        name: $name
        coupe: $coupe
        horsePower: $horsePower
        weight: $weight
      }
    ) {
      id
      name
      coupe
      horsePower
      weight
      model {
        id
        name
        brand {
          id
          name
        }
      }
    }
  }
`
export const DeleteCarModificationDocument = gql`
  mutation deleteCarModification($id: ID!) {
    deleteCarModification(id: $id)
  }
`
export const DeleteCarBrandDocument = gql`
  mutation deleteCarBrand($id: ID!) {
    deleteCarBrand(id: $id)
  }
`
export const DeleteCarModelDocument = gql`
  mutation deleteCarModel($id: ID!) {
    deleteCarModel(id: $id)
  }
`
export const GetCarModelsDocument = gql`
  query GetCarModels($brandId: ID!) {
    carModels(brandId: $brandId) {
      id
      name
    }
  }
`
export const GetCarModificationsDocument = gql`
  query GetCarModifications($modelId: ID!) {
    carModifications(modelId: $modelId) {
      horsePower
      id
      name
      weight
      coupe
    }
  }
`
export const GetAllCarBrandsDocument = gql`
  query GetAllCarBrands {
    carBrands {
      id
      name
    }
  }
`
export const GetAllCarModificationsDocument = gql`
  query GetAllCarModifications {
    allCarModifications {
      id
      name
      horsePower
      weight
      model {
        id
        name
        brand {
          id
          name
        }
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    postCarBrand(
      variables: PostCarBrandMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PostCarBrandMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PostCarBrandMutation>(
            PostCarBrandDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'postCarBrand',
        'mutation'
      )
    },
    postCarModel(
      variables: PostCarModelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PostCarModelMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PostCarModelMutation>(
            PostCarModelDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'postCarModel',
        'mutation'
      )
    },
    postCarModification(
      variables: PostCarModificationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PostCarModificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PostCarModificationMutation>(
            PostCarModificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'postCarModification',
        'mutation'
      )
    },
    EditCarBrand(
      variables: EditCarBrandMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<EditCarBrandMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditCarBrandMutation>(
            EditCarBrandDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'EditCarBrand',
        'mutation'
      )
    },
    EditCarModel(
      variables: EditCarModelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<EditCarModelMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditCarModelMutation>(
            EditCarModelDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'EditCarModel',
        'mutation'
      )
    },
    EditCarModificationName(
      variables: EditCarModificationNameMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<EditCarModificationNameMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditCarModificationNameMutation>(
            EditCarModificationNameDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'EditCarModificationName',
        'mutation'
      )
    },
    EditCarModification(
      variables: EditCarModificationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<EditCarModificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditCarModificationMutation>(
            EditCarModificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'EditCarModification',
        'mutation'
      )
    },
    deleteCarModification(
      variables: DeleteCarModificationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<DeleteCarModificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteCarModificationMutation>(
            DeleteCarModificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'deleteCarModification',
        'mutation'
      )
    },
    deleteCarBrand(
      variables: DeleteCarBrandMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<DeleteCarBrandMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteCarBrandMutation>(
            DeleteCarBrandDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'deleteCarBrand',
        'mutation'
      )
    },
    deleteCarModel(
      variables: DeleteCarModelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<DeleteCarModelMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteCarModelMutation>(
            DeleteCarModelDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'deleteCarModel',
        'mutation'
      )
    },
    GetCarModels(
      variables: GetCarModelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetCarModelsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCarModelsQuery>(GetCarModelsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetCarModels',
        'query'
      )
    },
    GetCarModifications(
      variables: GetCarModificationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetCarModificationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCarModificationsQuery>(
            GetCarModificationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetCarModifications',
        'query'
      )
    },
    GetAllCarBrands(
      variables?: GetAllCarBrandsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetAllCarBrandsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllCarBrandsQuery>(
            GetAllCarBrandsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetAllCarBrands',
        'query'
      )
    },
    GetAllCarModifications(
      variables?: GetAllCarModificationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetAllCarModificationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllCarModificationsQuery>(
            GetAllCarModificationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetAllCarModifications',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
