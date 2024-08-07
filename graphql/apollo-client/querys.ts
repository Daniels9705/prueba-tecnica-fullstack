import { gql } from '@apollo/client';

// Query para obtener todos los usuarios
export const GET_USERS = gql`
  query Query {
        users {
            email
            id
            name
            phone
            role
        }
    }
`;

// Query para obtener un solo usuario por ID
export const GET_USER = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      id
      name
      email
      role
      phone
    }
  }
`;

// Query para obtener todas las transacciones
export const GET_TRANSACTIONS = gql`
  query Transactions {
    transactions {
      amount
      concept
      createdAt
      date
      id
      user {
        name
      }
    }
  }
`;

// Query para obtener una sola transacción por ID
export const GET_TRANSACTION = gql`
  query Query($transactionId: Int!) {
    transaction(id: $transactionId) {
      amount
      concept
      createdAt
      date
      id
      userId
    }
  }
`;
