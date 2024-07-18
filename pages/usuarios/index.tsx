import Link from "next/link";
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/apollo-client/querys";

import { withPageAuthRequired,  } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Home() {
  const { error, isLoading, user } = useUser();
  const { data, loading, error: errorApollo } = useQuery(GET_USERS);
  
  if (isLoading || loading || error || errorApollo) return null;

  const isAdmin = user?.role === 'ADMIN';
  const users = data.users
  
  
  return <>
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Sistema de gestión de Ingresos y Gastos</h1>

      <div className="mt-16 pb-6 flex justify-between items-center border-b border-[#717171]">
        <h1 className="text-2xl font-medium">Usuarios</h1>
      </div>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-start w-[20%] py-6">Nombre</th>
            <th className="text-start w-[20%]">Correo</th>
            <th className="text-start w-[20%]">Teléfono</th>
            <th className="text-start w-[20%]">Rol</th>
            <th className="text-center w-[20%]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          { users.map((user: any) => (
          <tr key={user.id} className="border-t border-[#717171] hover:bg-slate-200 hover:bg-opacity-30">
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.role}</td>
            <td>
              <div className="flex justify-end gap-4 py-2">
                <Link
                  href={"/usuarios/editar/" + user.id}
                  className="bg-black hover:bg-[#0070f3] text-white font-bold flex items-center gap-2 py-2 px-3 rounded"
                  >
                  <PencilSquareIcon className="w-6" />
                  <span>Editar</span>
                </Link>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  </>;
})
