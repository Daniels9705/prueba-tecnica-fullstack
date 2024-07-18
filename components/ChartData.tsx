import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "@/graphql/apollo-client/querys";
import * as XLSX from "xlsx";
import { Button } from "./ui/button";

interface Transaction {
  id: number;
  concept: string;
  amount: number;
  date: string;
  user: {
    name: string;
  };
}

const chartConfig = {
  amount: {
    label: "amount",
  },
} satisfies ChartConfig;

export default function ChartData() {
  // Obtener movimientos
  const { data, loading, error: errorApollo } = useQuery(GET_TRANSACTIONS);
  if (loading || errorApollo) return null;

  // Ordenar por fecha
  const transactions = [...data.transactions].sort(
    (a: Transaction, b: Transaction) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // sumar los movimientos
  const totalAmount = transactions.reduce((total: number, transaction: any) => {
    return total + transaction.amount;
  }, 0);

  // Exportar transacciones a Excel
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      transactions.map(({ concept, amount, date, user }) => ({
        concept,
        amount,
        date,
        user: user.name,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  return (
    <div className="w-full flex mt-8">
      <div className="w-[60%]">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={transactions}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="amount">
              <LabelList position="top" dataKey="concept" fillOpacity={1} />
              {transactions.map((item: Transaction) => (
                <Cell
                  key={item.id}
                  fill={
                    item.amount < 0
                      ? "hsl(var(--chart-1))"
                      : "hsl(var(--chart-2))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
      <div className="w-[40%] flex flex-col justify-center items-center gap-8">
        <div className="flex gap-2 text-xl font-medium">
          <span>Total: </span>
          <span className={`${totalAmount < 0 ? "text-red-500" : "text-green-500"}`}>{totalAmount} COP</span>          
        </div>
        <Button onClick={handleDownload}>Descargar Excel</Button>
      </div>
    </div>
  );
}
