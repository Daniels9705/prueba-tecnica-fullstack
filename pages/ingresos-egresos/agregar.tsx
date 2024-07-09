import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function agregar() {
  return <>
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Sistema de gestión de Ingresos y Gastos</h1>

      <div className="mt-16 pb-6 flex justify-between items-center border-b border-[#717171]">
        <h1 className="text-2xl font-medium">Ingresos y egresos</h1>      
      </div>

      <form 
        action=""
        className="w-full flex flex-col justify-center items-center gap-4 mt-8 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] p-12"
        >
        <h1 className="text-2xl font-medium">Nuevo Movimiento de Dinero</h1>

        <div className="w-1/2 flex flex-col">
            <label className="mt-6 mb-1 font-medium" htmlFor="monto">Monto</label>
            <input className="p-2 bg-white border border-[#717171]" id="monto" type="text" />
            
            <label className="mt-6 mb-1 font-medium" htmlFor="concepto">Concepto</label>
            <input className="p-2 bg-white border border-[#717171]" id="concepto" type="text" />
            
            <label className="mt-6 mb-1 font-medium" htmlFor="fecha">Fecha</label>
            <input className="p-2 bg-white border border-[#717171]" id="fecha" type="date" />

            <input className="bg-black hover:bg-[#0070f3] text-white font-bold mt-6 py-3 px-4 rounded cursor-pointer" type="submit" value={"Agregar"} />
        </div>
      </form>
      
    </div>
  </>;
}
