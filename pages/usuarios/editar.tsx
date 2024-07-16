import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUser } from "@auth0/nextjs-auth0/client";

// apollo client
import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

import { CREATE_TRANSACTION } from '@/graphql/apollo-client/mutations';

export default function Agregar() {

  // obtener datos del usuario
  const { error, isLoading, user } = useUser();
  if (isLoading) return null;
  if (error) return null;
  
  const [formData, setFormData] = useState({
    concept: '',
    amount: '',
    date: '',
    userId: null,
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
    
    // Convertir `amount` a número
    const amount = parseFloat(formData.amount);

    if (isNaN(amount)) {
      console.error('El monto debe ser un número');
      return;
    }

    const input = {
      ...formData,
      amount,
      userId: user?.userId,
    };

    try {
      await createTransaction({ variables: { input } });
      console.log('Transaction created successfully');
    } catch (error) {
      console.error('Error creating transaction', error);
    }
  };

  return (
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
                <Input 
                  value={formData.concept}
                  onChange={handleChange} 
                  id="concept" 
                  name="concept" 
                  placeholder="Concepto" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Monto</Label>
                <Input 
                  value={formData.amount}
                  onChange={handleChange}
                  id="amount" 
                  name="amount" 
                  type="number" 
                  placeholder="Monto" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Fecha</Label>
                <Input 
                  value={formData.date}
                  onChange={handleChange}
                  id="date" 
                  name="date" 
                  type="date" 
                  placeholder="Fecha" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end mt-4">
            <Button type="submit">Crear</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}