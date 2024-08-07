import ChartData from "@/components/ChartData";

import { withPageAuthRequired,  } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired( function ReportsPage() {

  return <>
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Sistema de gestión de Ingresos y Gastos</h1>

      <div className="mt-16 pb-6 flex justify-between items-center border-b border-[#717171]">
        <h1 className="text-2xl font-medium">Reportes</h1>
      </div>       
      <ChartData />        
    </div>
  </>;
})
