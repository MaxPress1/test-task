import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
var QuestionType;
(function (QuestionType) {
    QuestionType["TEXT"] = "TEXT";
    QuestionType["MULTIPLE_CHOICE"] = "MULTIPLE_CHOICE";
    QuestionType["CHECKBOX"] = "CHECKBOX";
    QuestionType["DATE"] = "DATE";
})(QuestionType || (QuestionType = {}));
const forms = [];
const responses = [];
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
        form: (_, { id }) => forms.find(f => f.id === id),
        responses: (_, { formId }) => responses.filter(r => r.formId === formId),
    },
    Mutation: {
        createForm: (_, { title, description, questions }) => {
            const newForm = {
                id: String(forms.length + 1),
                title,
                description,
                questions: questions.map((q, index) => ({ ...q, id: String(index + 1) })),
            };
            forms.push(newForm);
            return newForm;
        },
        submitResponse: (_, { formId, answers }) => {
            const newResponse = {
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
//# sourceMappingURL=index.js.map