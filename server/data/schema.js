import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
const { transpileSchema } = require('graphql-s2s').graphqls2s
// import mocks from './mocks';
import resolvers from './resolvers';

const typeDefs = `
type Query {
  userById(_id: ID!): User
  allUsers: [User]
  leavesByUserId(user_id: ID!): [Leave]
  allLeaves: [Leave]
}

type Mutation {
  createUser(
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
    roles: [String]
    avatar: String
  ): User,
  createLeave(
    fromDate: String!
    toDate: String!
    reason: String!
    type: String!
    user_id: ID!
  ): Leave
}

type Entity {
  _id: ID!
  createdDate: String!
  updatedDate: String!
}

type User inherits Entity {
  firstName: String!
  lastName: String!
  email: String!
  username: String!
  password: String!
  roles: [String]
  avatar: String
  leaves: [Leave]
}

type Leave inherits Entity {
  fromDate: String!
  toDate: String!
  reason: String!
  type: String!
  user: User
}
`;


const schema = makeExecutableSchema({
  typeDefs: [transpileSchema(typeDefs)],
  resolvers
})

// addMockFunctionsToSchema({ schema, mocks });

export default schema;