// graphql schema
import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

  type User {
    id: Int!
    name: String
    email: String!
    phone: String
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
    date: String!
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

  type Mutation {
    createUser(name: String!, email: String!, password: String!, role: Role!): User!
    updateUser(id: Int!, name: String, email: String, phone: String, password: String, role: Role): User!
    deleteUser(id: Int!): User!

    createTransaction(concept: String!, amount: Int!, date: String!, userId: Int!): Transaction!
    updateTransaction(id: Int!, concept: String, amount: Int!, date: String!,): Transaction!
    deleteTransaction(id: Int!): Transaction!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;