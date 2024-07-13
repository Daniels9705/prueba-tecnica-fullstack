// graphql schema
import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    id: Int!
    name: String
    email: String!
    password: String! 
    role: Role!
    transactions: [Transaction!]!
  }

  enum Role {
    USER
    ADMIN
  }

  type Transaction {
    id: Int!
    concept: String
    amount: Int!
    createdAt: String!
    userId: Int!
    user: User!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
    transactions: [Transaction!]!
    transaction(id: Int!): Transaction
  }

  schema {
    query: Query
  }
`;
