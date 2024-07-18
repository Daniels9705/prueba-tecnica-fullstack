import Link from "next/link";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/apollo-client/querys";

import { withPageAuthRequired,  } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired( function Home() {
  //obtener datos del usuario
  const { isLoading, user } = useUser();
  const { data, loading, error: errorApollo } = useQuery(GET_TRANSACTIONS);
  
  if (isLoading || loading || errorApollo) return null;

  const isAdmin = user?.role === 'ADMIN';
  const transactions = data.transactions;

  // sumar los movimientos
  const totalAmount = transactions.reduce((total: number, transaction: any) => {
    return total + transaction.amount;
  }, 0);

  return <>
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Sistema de gestión de Ingresos y Gastos</h1>

      <div className="mt-16 pb-6 flex justify-between items-center border-b border-[#717171]">
        <h1 className="text-2xl font-medium">Ingresos y egresos</h1>
        {
          isAdmin && (
            <Link 
              href={"/ingresos-egresos/agregar"}
              className="bg-black hover:bg-[#0070f3] text-white font-bold flex items-center gap-4 py-3 px-4 rounded"
              >
              <PlusIcon className="w-8" />
              <span>Agregar</span>
            </Link>
          )
        } 
      </div>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-start w-[20%] py-6">Concepto</th>
            <th className="text-start w-[20%]">Monto</th>
            <th className="text-start w-[20%]">Fecha</th>
            <th className={`${!isAdmin ? 'text-end': 'text-start'} w-[20%]`}>Usuario</th>
            { isAdmin && <th className="text-center w-[20%]">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          { transactions.map((transaction: any) => (
            <tr key={transaction.id} className="border-t border-[#717171] hover:bg-slate-200 hover:bg-opacity-30">
              <td>{transaction.concept}</td>
              <td>{transaction.amount} COP</td>
              <td>{transaction.date}</td>
              <td className={`${!isAdmin && 'text-end py-4'}`}>{transaction.user.name}</td>
              { isAdmin && (
                <td>
                  <div className="flex justify-end gap-4 py-2">
                    <Link
                      href={"/ingresos-egresos/editar/" + transaction.id}
                      className="bg-black hover:bg-[#0070f3] text-white font-bold flex items-center gap-2 py-2 px-3 rounded"
                      >
                      <PencilSquareIcon className="w-6" />
                      <span>Editar</span>
                    </Link>
                  </div>
                </td>
              )}
            </tr>            
          ))}          
        </tbody>
      </table>

      {/* total */}
      <div className="mt-8 pt-4 flex justify-end border-t border-[#717171]">
        <span className="text-xl font-medium"> Total: {totalAmount} COP</span>
      </div>      
    </div>
  </>;
})
