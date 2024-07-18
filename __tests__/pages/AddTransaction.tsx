import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_TRANSACTION } from '@/graphql/apollo-client/mutations';
import { Agregar } from '@/pages/ingresos-egresos/agregar';
import { useUser } from '@auth0/nextjs-auth0/client';

// Mock de useUser
jest.mock('@auth0/nextjs-auth0/client');

const mockedUseUser = useUser as jest.MockedFunction<typeof useUser>;

const mocks = [
  {
    request: {
      query: CREATE_TRANSACTION,
      variables: {
        concept: 'Venta',
        amount: 1000,
        date: '2023-07-01',
        userId: 100,
      },
    },
    result: {
      data: {
        createTransaction: {
          id: '1',
          concept: 'Venta',
          amount: 1000,
          date: '2023-07-01',
          user: { name: 'Daniel' },
        },
      },
    },
  },
];

describe('Agregar Page', () => {
  beforeEach(() => {
    mockedUseUser.mockReturnValue({
      isLoading: false,
      user: { userId: 100, role: 'ADMIN' },
      error: undefined,
    } as any);
  });

  it('debería renderizar el formulario de agregar transacción', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Agregar />
      </MockedProvider>
    );

    expect(screen.getByText('Nuevo movimiento')).toBeInTheDocument();
    expect(screen.getByLabelText('Concepto')).toBeInTheDocument();
    expect(screen.getByLabelText('Monto')).toBeInTheDocument();
    expect(screen.getByLabelText('Fecha')).toBeInTheDocument();
  });

  it('debería permitir crear una nueva transacción', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Agregar />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText('Concepto'), { target: { value: 'Venta' } });
    fireEvent.change(screen.getByLabelText('Monto'), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText('Fecha'), { target: { value: '2023-07-01' } });

    fireEvent.click(screen.getByText('Crear'));

    expect(await screen.findByText('Movimiento creado exitosamente')).toBeInTheDocument();
  });
});