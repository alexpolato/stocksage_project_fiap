import { BarChartComponent } from "@/components/bar-chart";
import { CircleChart } from "@/components/circle-chart";
import { DataTableDemo } from "@/components/data-table";
import { RadialChartComponent } from "@/components/radial-chart";

export default function Dashboard() {
  return (
    <div>
      <div className="p-4">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="">
          <h1 className="text-xl font-semibold mt-5">Gráficos</h1>

          <div className="grid grid-cols-3 w-full  gap-4">
            <div className="bg-red-50 ">
              <CircleChart />
            </div>
            <div className="bg-red-50 ">
              <RadialChartComponent />
            </div>
            <div className="bg-red-50 ">
              <BarChartComponent />
            </div>
          </div>
          <div className="mt-10">
            <h1 className="font-semibold text-xl">Tabela de Prioridade</h1>
            <DataTableDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
