import Link from "next/link";
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return <>
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Sistema de gestión de Ingresos y Gastos</h1>

      <div className="mt-16 pb-6 flex justify-between items-center border-b border-[#717171]">
        <h1 className="text-2xl font-medium">Usuarios</h1>
        <Link 
          href={"/ingresos-egresos/agregar"}
          className="bg-black hover:bg-[#0070f3] text-white font-bold flex items-center gap-4 py-3 px-4 rounded"
          >
          <PlusIcon className="w-8" />
          <span>Agregar</span>
        </Link>
      </div>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-start w-[20%] py-6">Nombre</th>
            <th className="text-start w-[20%]">Correo</th>
            <th className="text-start w-[20%]">Teléfono</th>
            <th className="text-center w-[20%]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-[#717171] hover:bg-slate-200">
            <td>Daniel</td>
            <td>daniel@test.com</td>
            <td>313313313</td>
            <td>
              <div className="flex justify-end gap-4 py-2">
                <Link
                  href={"/ingresos-egresos/editar"}
                  className="bg-black hover:bg-[#0070f3] text-white font-bold flex items-center gap-2 py-2 px-3 rounded"
                  >
                  <PencilSquareIcon className="w-6" />
                  <span>Editar</span>
                </Link>
                <button                
                  className="bg-black hover:bg-[#a52e2e] text-white font-bold flex items-center gap-2 py-2 px-3 rounded"
                  >
                  <TrashIcon className="w-6" />
                  <span>Eliminar</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* total */}
      <div className="mt-8 pt-4 flex justify-end border-t border-[#717171]">
        <span className="text-xl font-medium"> Total: 3000 COP</span>
      </div>
      
    </div>
  </>;
}
