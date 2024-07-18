import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@auth0/nextjs-auth0/client";
import DeleteButton from '@/components/DeleteTransactionButton';

// Apollo Client
import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
// Queries & Mutations
import { GET_TRANSACTION } from '@/graphql/apollo-client/querys';
import { UPDATE_TRANSACTION } from '@/graphql/apollo-client/mutations';

import { withPageAuthRequired,  } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired( function Agregar() {
  // Obtener datos del usuario
  const { error: authError, isLoading: authLoading, user } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const transactionId = parseInt(id as string, 10);

  // Estados para el formulario
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState('');

  // Estatus del formulario para mostrar notificaciones al cliente
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
    success: false
  });

  // Apollo Client hooks
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);
  const { data, loading: queryLoading, error: queryError } = useQuery(GET_TRANSACTION, {
    variables: { transactionId: transactionId },
    skip: !id, // Omitir la consulta si no hay id
  });

  // Manejar la actualización del formulario cuando los datos están cargados
  useEffect(() => {
    if (data) {
      setConcept(data.transaction.concept);
      setAmount(data.transaction.amount); 
      setDate(data.transaction.date);
    }
  }, [data]);

  // Verificar si hay errores en la autenticación o en la consulta
  if (authLoading || queryLoading) return <p>Cargando...</p>;
  if (authError) return <p>Error al cargar el usuario: {authError.message}</p>;
  if (queryError) return <p>Error al cargar la transacción: {queryError.message}</p>;

  // Submit del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!confirm('¿Estás seguro de editar esta transacción?')) return;
    setFormStatus({ loading: true, error: false, success: false });
    try {
      if (id) {
        // Actualizar la transacción existente
        await updateTransaction({ variables: { updateTransactionId: transactionId, concept, amount, date } });
      }
      setFormStatus({ loading: false, error: false, success: true });
      setTimeout(() => {
        window.location.replace('/ingresos-egresos');
      }, 100);
    } catch (error) {
      console.error('Error al procesar la transacción', error);
      setFormStatus({ loading: false, error: true, success: false });
    }
  };

  return (
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Sistema de gestión de Ingresos y Gastos</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center gap-4 mt-8">
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>Editar movimiento</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="concept">Concepto</Label>
                <Input
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  id="concept"
                  name="concept"
                  type="text"
                  placeholder="Concepto" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Monto</Label>
                <Input
                  value={amount as any as string}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Monto" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  id="date"
                  name="date"
                  type="date"
                  placeholder="Fecha" />
              </div>
            </div>
          </CardContent>
          {
            formStatus.error && (
              <div className="w-full text-center text-red-500 text-sm">
                <span>Error al editar el movimiento</span>
              </div>
            )            
          }
          {
            formStatus.success && (
              <div className="w-full text-center text-green-500 text-sm">
                <span>Movimiento editado exitosamente</span>   
              </div>
            )
          }
          <CardFooter className="flex justify-between mt-4">
            <DeleteButton id={transactionId}/>
            <Button type="submit">Guardar cambios</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
})