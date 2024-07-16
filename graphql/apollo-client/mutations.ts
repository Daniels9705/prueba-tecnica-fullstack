import { gql } from '@apollo/client';

// Mutación para crear un nuevo usuario
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!, $role: String!) {
    createUser(name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;

// Mutación para actualizar un usuario existente
export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $name: String, $email: String, $password: String, $role: String) {
    updateUser(id: $id, name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;

// Mutación para eliminar un usuario
export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

// Mutación para crear una nueva transacción
export const CREATE_TRANSACTION = gql`
  mutation Mutation($concept: String!, $amount: Int!, $date: String!, $userId: Int!) {
    createTransaction(concept: $concept, amount: $amount, date: $date, userId: $userId) {
      id
      concept
      amount
      date
      userId
    }
  }
`;

// Mutación para actualizar una transacción existente
export const UPDATE_TRANSACTION = gql`
  mutation Mutation($updateTransactionId: Int!, $amount: Int!, $date: String!, $concept: String) {
    updateTransaction(id: $updateTransactionId, amount: $amount, date: $date, concept: $concept) {
      id
      concept
      amount
      date
      createdAt
      userId
    }
  }
`;

// Mutación para eliminar una transacción
export const DELETE_TRANSACTION = gql`
  mutation Mutation($deleteTransactionId: Int!) {
    deleteTransaction(id: $deleteTransactionId) {
      id
      concept
      amount
      date
      userId
      createdAt
    }
  }
`;
