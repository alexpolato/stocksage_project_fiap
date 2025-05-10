"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DairyData } from "./dashboard-comp/data-table";

// Configuração dos gráficos
const chartConfig = {
  quantitySold: {
    label: "Quantidade Vendida",
    color: "#8884d8", // Cor fixa para teste
  },
  quantityLost: {
    label: "Quantidade Perdida",
    color: "#82ca9d", // Cor fixa para teste
  },
  revenue: {
    label: "Receita",
    color: "#ffc658", // Cor fixa para teste
  },
} as const;

interface CompAreaChartProps {
  data: DairyData[];
}
const last_sell = new Date("2022-12-27");

export function CompAreaChart({ data }: { data: DairyData[] }) {
  const [metric, setMetric] = React.useState<"quantity" | "revenue">(
    "quantity"
  );
  const [timeRange, setTimeRange] = React.useState("90d");

  // DEBUG: Mostrar dados quando o componente renderizar
  React.useEffect(() => {
    console.log(
      "Dados do gráfico (metric=" + metric + "):",
      processChartData()
    );
  }, [data, metric, timeRange]);

  const processChartData = () => {
    let daysToSubtract = 90;

    if (timeRange === "360d") daysToSubtract = 360;
    else if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(last_sell);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    const filteredData = data.filter((item) => {
      try {
        const itemDate = new Date(item.Date_Sell);
        return itemDate >= startDate;
      } catch {
        return false;
      }
    });

    // DEBUG: Verificar dados filtrados
    console.log("Dados filtrados:", filteredData);

    const groupedData = filteredData.reduce((acc, item) => {
      const date = item.Date_Sell;
      if (!acc[date]) {
        acc[date] = {
          date,
          quantitySold: 0,
          quantityLost: 0,
          revenue: 0,
        };
      }

      // DEBUG: Verificar valores antes de somar
      const sold = Number(item["Quantity Sold (liters/kg)"]) || 0;
      const lost = Number(item.Quantity_Lost) || 0;
      const rev = Number(item.Real_Revenue) || 0;

      console.log(
        `Processando ${date}: sold=${sold}, lost=${lost}, revenue=${rev}`
      );

      acc[date].quantitySold += sold;
      acc[date].quantityLost += lost;
      acc[date].revenue += rev;

      return acc;
    }, {} as Record<string, { date: string; quantitySold: number; quantityLost: number; revenue: number }>);

    const result = Object.values(groupedData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // DEBUG: Verificar resultado final
    console.log("Dados agrupados:", result);
    return result;
  };

  const chartData = processChartData();

  // Verificar se há dados para mostrar
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Análise de Vendas</CardTitle>
          <CardDescription>
            Nenhum dado disponível para o período selecionado
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // DEBUG: Verificar valores extremos
  const quantityValues = chartData.flatMap((d) => [
    d.quantitySold,
    d.quantityLost,
  ]);
  console.log("Valores de quantidade:", {
    min: Math.min(...quantityValues),
    max: Math.max(...quantityValues),
    hasNegative: quantityValues.some((v) => v < 0),
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Análise de Vendas</CardTitle>
          <CardDescription>
            Dados de vendas e perdas dos produtos lácteos
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Select
            value={metric}
            onValueChange={(value: "quantity" | "revenue") => setMetric(value)}
          >
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue placeholder="Métrica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quantity">Quantidade</SelectItem>
              <SelectItem value="revenue">Receita</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="360d">Último ano</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="aspect-auto h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                  })
                }
              />
              <YAxis
                domain={["auto", "auto"]} // Deixa o Recharts calcular automaticamente
              />
              <Tooltip
                formatter={(value) => [
                  Number(value).toLocaleString("pt-BR"),
                  metric === "quantity" ? "kg/lt" : "USD",
                ]}
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                }
              />

              {metric === "quantity" ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="quantitySold"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.4}
                    name="Vendido"
                    isAnimationActive={false} // Desativa animação para debug
                  />
                  <Area
                    type="monotone"
                    dataKey="quantityLost"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.4}
                    name="Perdido"
                    isAnimationActive={false} // Desativa animação para debug
                  />
                </>
              ) : (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.4}
                  name="Receita"
                  isAnimationActive={false} // Desativa animação para debug
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
