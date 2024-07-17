import { gql } from '@apollo/client';

// Mutación para actualizar un usuario existente
export const UPDATE_USER = gql`
  mutation Mutation($updateUserId: Int!, $name: String, $email: String, $phone: String, $role: Role) {
    updateUser(id: $updateUserId, name: $name, email: $email, phone: $phone, role: $role) {
      id
      name
      email
      phone
      role
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
