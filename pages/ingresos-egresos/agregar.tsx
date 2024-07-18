import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@auth0/nextjs-auth0/client";

// apollo client
import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { CREATE_TRANSACTION } from '@/graphql/apollo-client/mutations';

import { withPageAuthRequired,  } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired( function Agregar() {
  
  // obtener datos del usuario
  const { error, isLoading, user } = useUser();
  if (isLoading) return null;
  if (error) return null;
  
  // estados para el formulario
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('' as any as Number);
  const [date, setDate] = useState('');

  // estatus del formulario para mostrar notificaciones al cliente
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
    success: false
  })
  
  // apollo client
  const [createTransaction] = useMutation(CREATE_TRANSACTION);

  // submit del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();   
    
    setFormStatus({ loading: true, error: false, success: false });

    try {
      await createTransaction({ variables: { concept, amount, date, userId: user?.userId } });
      setFormStatus({ loading: false, error: false, success: true });
      setTimeout(() => {
        window.location.replace('/ingresos-egresos');
      }, 500);
    } catch (error) {
      console.error('Error creating transaction', error);
      setFormStatus({ loading: false, error: true, success: false });
    }
  };

  return (
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Sistema de gestión de Ingresos y Gastos</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center gap-4 mt-8">
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>Nuevo movimiento</CardTitle>
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
                <span>Error al crear el movimiento</span>
              </div>
            )            
          }
          {
            formStatus.success && (
              <div className="w-full text-center text-green-500 text-sm">
                <span>Movimiento creado exitosamente</span>                
              </div>
            )
          }
          <CardFooter className="flex justify-end mt-4">
            <Button type="submit">Crear</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
})