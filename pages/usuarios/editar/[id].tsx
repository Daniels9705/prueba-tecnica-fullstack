import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Apollo Client
import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
// Queries & Mutations
import { GET_USER } from '@/graphql/apollo-client/querys';
import { UPDATE_USER } from '@/graphql/apollo-client/mutations';

import { withPageAuthRequired,  } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Agregar() {
  // Obtener datos del usuario
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id as string, 10);

  // Estados para el formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  // Estatus del formulario para mostrar notificaciones al cliente
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
    success: false
  });

  // Apollo Client hooks
  const [updateTransaction] = useMutation(UPDATE_USER);
  const { data, loading: queryLoading, error: queryError } = useQuery(GET_USER, {
    variables: { userId: userId },
    skip: !id, // Omitir la consulta si no hay id
  });

  // Manejar la actualización del formulario cuando los datos están cargados
  useEffect(() => {
    if (data) {
      setName(data.user.name);
      setEmail(data.user.email);
      setPhone(data.user.phone);
      setRole(data.user.role);      
    }
  }, [data]);

  // Verificar si hay errores en la autenticación o en la consulta
  if (queryLoading) return <p>Cargando...</p>;
  if (queryError) return <p>Error al cargar el usuario: {queryError.message}</p>;

  // Submit del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!confirm('¿Estás seguro de editar este usuario?')) return;
    setFormStatus({ loading: true, error: false, success: false });
    try {
      if (id) {
        // Actualizar la transacción existente
        await updateTransaction({ variables: { updateUserId: userId, name, email, phone, role } });
      }
      setFormStatus({ loading: false, error: false, success: true });
      setTimeout(() => {
        window.location.replace('/usuarios');
      }, 100);
    } catch (error) {
      console.error('Error al editar usuario', error);
      setFormStatus({ loading: false, error: true, success: false });
    }
  };

  return (
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Gestión Usuarios</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center gap-4 mt-8">
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>Editar usuario</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="concept">Nombre</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="amount"
                  type="email"
                  value={email}
                  readOnly
                  placeholder="E-mail" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Teléfono</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="Teléfono" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Teléfono</Label>
                <Select value={role} onValueChange={(value) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">Usuario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          {
            formStatus.error && (
              <div className="w-full text-center text-red-500 text-sm">
                <span>Error al editar el usuario</span>
              </div>
            )            
          }
          {
            formStatus.success && (
              <div className="w-full text-center text-green-500 text-sm">
                <span>Usuario editado exitosamente</span>   
              </div>
            )
          }
          <CardFooter className="flex justify-end mt-4">
            <Button type="submit">Guardar cambios</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
})