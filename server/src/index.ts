import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

interface Question {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: string[];
}

interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

interface Answer {
  questionId: string;
  value: string;
}

interface Response {
  id: string;
  formId: string;
  answers: Answer[];
  submittedAt: string;
}

const forms: Form[] = [];
const responses: Response[] = [];

const typeDefs = `#graphql
  enum QuestionType {
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
  }

  type Question {
    id: ID!
    type: QuestionType!
    title: String!
    required: Boolean!
    options: [String!]
  }

  input QuestionInput {
    type: QuestionType!
    title: String!
    required: Boolean!
    options: [String!]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Answer {
    questionId: ID!
    value: String!
  }

  input AnswerInput {
    questionId: ID!
    value: String!
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
    submittedAt: String!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput!]): Form!
    submitResponse(formId: ID!, answers: [AnswerInput!]): Response!
  }
`;

const resolvers = {
  Query: {
    forms: () => forms,
    form: (_: unknown, { id }: { id: string }) => forms.find(f => f.id === id),
    responses: (_: unknown, { formId }: { formId: string }) => responses.filter(r => r.formId === formId),
  },
  Mutation: {
    createForm: (_: unknown, { title, description, questions }: { title: string, description?: string, questions: Question[] }) => {
      const newForm: Form = {
        id: String(forms.length + 1),
        title,
        description,
        questions: questions.map((q, index) => ({ ...q, id: String(index + 1) })),
      };
      forms.push(newForm);
      return newForm;
    },
    submitResponse: (_: unknown, { formId, answers }: { formId: string, answers: Answer[] }) => {
      const newResponse: Response = {
        id: String(responses.length + 1),
        formId,
        answers,
        submittedAt: new Date().toISOString(),
      };
      responses.push(newResponse);
      return newResponse;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
