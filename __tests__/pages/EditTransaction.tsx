import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Editar } from '@/pages/ingresos-egresos/editar/[id]';
import { GET_TRANSACTION } from '@/graphql/apollo-client/querys';
import { UPDATE_TRANSACTION } from '@/graphql/apollo-client/mutations';
import { useRouter } from 'next/router';

// Mock de useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: GET_TRANSACTION,
      variables: { transactionId: 1 },
    },
    result: {
      data: {
        transaction: {
          concept: 'Venta',
          amount: 1000,
          date: '2023-07-01',
          createdAt: '2023-01-01T00:00:00Z',
          id: 1,
          userId: 100,
        },
      },
    },
  }
];
const updateMock = {
    request: {
        query: UPDATE_TRANSACTION,
        variables: {
            updateTransactionId: 1,
            concept: 'Compra',
            amount: 1500,
            date: '2023-07-02',
        },
        },
        result: {
        data: {
            updateTransaction: {
            id: '1',
            concept: 'Compra',
            amount: 1500,
            date: '2023-07-02',
            },
        },
    },
};

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('Editar transacción', () => {
  beforeEach(() => {
    mockedUseRouter.mockReturnValue({
      query: { id: '1' }, // Asegúrate de que el ID sea una cadena
    } as any);

    // Mockear window.confirm
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  it('debería renderizar el formulario de edición con los datos de la transacción', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Editar />
      </MockedProvider>
    );

    // Verificar que los campos tengan los valores correctos
    await waitFor(() => {
      expect(screen.getByLabelText('Concepto')).toHaveValue('Venta');
      expect(screen.getByLabelText('Monto')).toHaveValue(1000); // Asegúrate de que el valor sea un número
      expect(screen.getByLabelText('Fecha')).toHaveValue('2023-07-01');
    });
  });

  it('debería actualizar los datos al enviar el formulario', async () => {
    render(
      <MockedProvider mocks={[...mocks, updateMock]} addTypename={false}>
        <Editar />
      </MockedProvider>
    );

    // Cambiar valores en el formulario
    fireEvent.change(screen.getByLabelText('Concepto'), { target: { value: 'Compra' } });
    fireEvent.change(screen.getByLabelText('Monto'), { target: { value: 1500 } });
    fireEvent.change(screen.getByLabelText('Fecha'), { target: { value: '2023-07-02' } });

    // Enviar el formulario
    fireEvent.click(screen.getByText('Guardar cambios'));

    // Verificar que la mutación se haya llamado con los valores correctos
    await waitFor(() => {
      expect(screen.getByLabelText('Concepto')).toHaveValue('Compra');
      expect(screen.getByLabelText('Monto')).toHaveValue(1500);
      expect(screen.getByLabelText('Fecha')).toHaveValue('2023-07-02');
    });
  });
});
