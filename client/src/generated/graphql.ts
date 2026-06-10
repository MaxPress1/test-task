/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { baseApi as api } from '../app/api/baseApi';
export type Maybe<T> = T | null;
export class TypedDocumentString<TResult, TVariables> extends String {
  private __apiType?: (variables: TVariables) => TResult;
  constructor(private value: string, public __name?: string) {
    super(value);
  }
  toString(): string {
    return this.value;
  }
}
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = {
  __typename?: 'Answer';
  questionId: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type AnswerInput = {
  questionId: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};

export type Form = {
  __typename?: 'Form';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: Form;
  submitResponse: Response;
};


export type MutationCreateFormArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<QuestionInput>>;
  title: Scalars['String']['input'];
};


export type MutationSubmitResponseArgs = {
  answers?: InputMaybe<Array<AnswerInput>>;
  formId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  form?: Maybe<Form>;
  forms: Array<Form>;
  responses: Array<Response>;
};


export type QueryFormArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResponsesArgs = {
  formId: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  required: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  type: QuestionType;
};

export type QuestionInput = {
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  required: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  type: QuestionType;
};

export enum QuestionType {
  Checkbox = 'CHECKBOX',
  Date = 'DATE',
  MultipleChoice = 'MULTIPLE_CHOICE',
  Text = 'TEXT'
}

export type Response = {
  __typename?: 'Response';
  answers: Array<Answer>;
  formId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  submittedAt: Scalars['String']['output'];
};

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { forms: Array<{ id: string, title: string, description: string | null }> };

export type GetFormQueryVariables = Exact<{
  id: string | number;
}>;


export type GetFormQuery = { form: { id: string, title: string, description: string | null, questions: Array<{ id: string, type: QuestionType, title: string, required: boolean, options: Array<string> | null }> } | null };

export type GetResponsesQueryVariables = Exact<{
  formId: string | number;
}>;


export type GetResponsesQuery = { responses: Array<{ id: string, formId: string, submittedAt: string, answers: Array<{ questionId: string, value: string }> }> };

export type CreateFormMutationVariables = Exact<{
  title: string;
  description?: string | null | undefined;
  questions?: Array<QuestionInput> | QuestionInput | null | undefined;
}>;


export type CreateFormMutation = { createForm: { id: string, title: string } };

export type SubmitResponseMutationVariables = Exact<{
  formId: string | number;
  answers?: Array<AnswerInput> | AnswerInput | null | undefined;
}>;


export type SubmitResponseMutation = { submitResponse: { id: string, submittedAt: string } };


export const GetFormsDocument = new TypedDocumentString(`
    query GetForms {
  forms {
    id
    title
    description
  }
}
    `);
export const GetFormDocument = new TypedDocumentString(`
    query GetForm($id: ID!) {
  form(id: $id) {
    id
    title
    description
    questions {
      id
      type
      title
      required
      options
    }
  }
}
    `);
export const GetResponsesDocument = new TypedDocumentString(`
    query GetResponses($formId: ID!) {
  responses(formId: $formId) {
    id
    formId
    answers {
      questionId
      value
    }
    submittedAt
  }
}
    `);
export const CreateFormDocument = new TypedDocumentString(`
    mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {
  createForm(title: $title, description: $description, questions: $questions) {
    id
    title
  }
}
    `);
export const SubmitResponseDocument = new TypedDocumentString(`
    mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]) {
  submitResponse(formId: $formId, answers: $answers) {
    id
    submittedAt
  }
}
    `);

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetForms: build.query<GetFormsQuery, GetFormsQueryVariables | void>({
      query: (variables) => ({ document: GetFormsDocument.toString(), variables })
    }),
    GetForm: build.query<GetFormQuery, GetFormQueryVariables>({
      query: (variables) => ({ document: GetFormDocument.toString(), variables })
    }),
    GetResponses: build.query<GetResponsesQuery, GetResponsesQueryVariables>({
      query: (variables) => ({ document: GetResponsesDocument.toString(), variables })
    }),
    CreateForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>({
      query: (variables) => ({ document: CreateFormDocument.toString(), variables })
    }),
    SubmitResponse: build.mutation<SubmitResponseMutation, SubmitResponseMutationVariables>({
      query: (variables) => ({ document: SubmitResponseDocument.toString(), variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetFormsQuery, useLazyGetFormsQuery, useGetFormQuery, useLazyGetFormQuery, useGetResponsesQuery, useLazyGetResponsesQuery, useCreateFormMutation, useSubmitResponseMutation } = injectedRtkApi;

