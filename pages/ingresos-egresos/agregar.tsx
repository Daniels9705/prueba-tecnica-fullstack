import * as React from "react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function agregar() {
  return <>
    <div className="w-full h-full p-24">
      <h1 className="text-3xl">Sistema de gestión de Ingresos y Gastos</h1>

      <div className="mt-16 pb-6 flex justify-between items-center border-b border-[#717171]">
        <h1 className="text-2xl font-medium">Ingresos y egresos</h1>      
      </div>

      {/* <form 
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
      </form> */}

      <form className="w-full flex flex-col justify-center items-center gap-4 mt-8">
        <Card className="w-[650px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    
                  </Select>
                </div>
              </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Deploy</Button>
          </CardFooter>
        </Card>
      </form>
      
    </div>
  </>;
}

