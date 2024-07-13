import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// apollo client
import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: TransactionInput!) {
    createTransaction(input: $input) {
      concept
      amount
      userId
    }
  }
`;
//

export default function agregar() {

  const [formData, setFormData] = useState({
    concept: '',
    amount: '',
    userId: 1, // Aquí deberías obtener el userId de alguna manera, por ejemplo del contexto del usuario logueado
  });

  const [createTransaction] = useMutation(CREATE_TRANSACTION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTransaction({ variables: { input: formData } });
      console.log('Transaction created successfully');
    } catch (error) {
      console.error('Error creating transaction', error);
    }
  };

  return <>
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Sistema de gestión de Ingresos y Gastos</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center gap-4 mt-8">
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>Nuevo Movimiento de Dinero</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="concept">Concepto</Label>
                  <Input id="concept" name="concept" placeholder="Concepto" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amount">Name</Label>
                  <Input id="amount" name="amount" type="number" placeholder="Monto" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="date">Fecha</Label>
                  <Input id="date" name="date" type="date" placeholder="Fecha" />
                </div>
              </div>
          </CardContent>
          <CardFooter className="flex justify-end mt-4">
            <Button type="submit">Crear</Button>
          </CardFooter>
        </Card>
      </form>
      
    </div>
  </>;
}

