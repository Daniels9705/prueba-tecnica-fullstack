import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { TransactionsPage }  from '@/pages/ingresos-egresos/index';
import { GET_TRANSACTIONS } from '../../graphql/apollo-client/querys';
import { useUser } from '@auth0/nextjs-auth0/client';

// Mock de useUser
jest.mock('@auth0/nextjs-auth0/client');

const mockedUseUser = useUser as jest.MockedFunction<typeof useUser>;

// Datos de prueba
const transactionsMock = [
  {
    id: '1',
    concept: 'Venta',
    amount: 1000,
    date: '2023-07-01',
    user: { name: 'Juan' },
  },
];

const mocks = [
  {
    request: {
      query: GET_TRANSACTIONS,
    },
    result: {
      data: {
        transactions: transactionsMock,
      },
    },
  },
];

describe('TransactionsPage', () => {
  beforeEach(() => {
    mockedUseUser.mockReturnValue({
      isLoading: false,
      user: { role: 'ADMIN' },
      error: undefined,
    } as any);
  });

  it('debería renderizar la lista de transacciones', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TransactionsPage />
      </MockedProvider>
    );

    expect(await screen.findByText('Sistema de gestión de Ingresos y Gastos')).toBeInTheDocument();
    expect(screen.getByText('Venta')).toBeInTheDocument();
    expect(screen.getByText('1000 COP')).toBeInTheDocument();
    expect(screen.getByText('Juan')).toBeInTheDocument();
  });

  it('debería mostrar el botón "Agregar" para administradores', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TransactionsPage />
      </MockedProvider>
    );

    expect(await screen.findByText('Agregar')).toBeInTheDocument();
  });

  it('debería mostrar el botón "Editar" transacciones para administradores', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TransactionsPage />
      </MockedProvider>
    );

    expect(await screen.findByText('Editar')).toBeInTheDocument();
  });
});
