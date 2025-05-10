"use client";

import * as React from "react";
import {
  Area,
  Bar,
  Cell,
  AreaChart,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { addDays, format, parseISO, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";

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
import { Button } from "@/components/ui/button"; // For potential future use
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility from shadcn/ui
import { CalendarIcon } from "lucide-react"; // Assuming lucide-react is installed
import { DairyData } from "./data-table";

// Define the structure of a single data record from your API/CSV
// interface DataRecord {
//   "Approx. Total Revenue(INR)": number;
//   Brand: string;
//   Capacity_Utilization: number;
//   "Customer Location": string;
//   Date: string; // General record date
//   Date_Sell: string; // Actual sell date, crucial for time-series
//   Day: number;
//   DayOfWeek: number;
//   Days_to_Expire: number;
//   Days_to_Sell: number;
//   "Expiration Date": string;
//   Expire: number;
//   "Farm Size": string;
//   Location: string;
//   "Minimum Stock Threshold (liters/kg)": number;
//   Month: number;
//   "Number of Cows": number;
//   "Price per Unit": number;
//   "Price per Unit (sold)": number;
//   "Product ID": number;
//   "Product Name": string;
//   "Production Date": string;
//   "Quantity (liters/kg)": number;
//   "Quantity Sold (liters/kg)": number;
//   "Quantity in Stock (liters/kg)": number;
//   Quantity_Lost: number;
//   Quantity_Sold_Before_Expire: number;
//   Quantity_Sold_Hist_Mean: number;
//   Quarter: number;
//   Real_Revenue: number;
//   "Reorder Quantity (liters/kg)": number;
//   Revenue_Before_Losses: number;
//   "Sales Channel": string;
//   Sales_Trend_7d: number;
//   Sales_Velocity: number;
//   Sales_Velocity_Hist_Mean: number;
//   Sales_Volatility_Hist: number;
//   Seasonal_Volatility: number;
//   "Shelf Life (days)": number;
//   Stock_Efficiency: number;
//   "Storage Condition": string;
//   "Total Land Area (acres)": number;
//   "Total Value": number;
//   Value_Lost: number;
//   Year: number;
// }

interface AnalysisProps {
  data: DairyData[]; // This data comes from your fetch-data.tsx or similar
}

const ALL_PRODUCTS = "all_products";
const PIE_CHART_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#A4DE6C",
  "#D0ED57",
  "#FFC658",
];

export function Analysis({ data: initialData }: AnalysisProps) {
  const [selectedProduct, setSelectedProduct] =
    React.useState<string>(ALL_PRODUCTS);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: addDays(new Date("2022-12-27"), -90),
    to: new Date("2022-12-27"),
  });

  const productNames = React.useMemo(() => {
    if (!initialData) return [];
    const names = new Set(initialData.map((item) => item["Product Name"]));
    return [ALL_PRODUCTS, ...Array.from(names).sort()];
  }, [initialData]);

  const filteredData = React.useMemo(() => {
    if (!initialData) return [];
    return initialData.filter((item) => {
      const itemDateSell = parseISO(item.Date_Sell); // Ensure Date_Sell is in ISO format or parse accordingly
      const isProductMatch =
        selectedProduct === ALL_PRODUCTS ||
        item["Product Name"] === selectedProduct;
      const isDateInRange =
        dateRange?.from && dateRange?.to
          ? itemDateSell >= startOfDay(dateRange.from) &&
            itemDateSell <= startOfDay(dateRange.to)
          : true; // If no date range, include all
      return isProductMatch && isDateInRange;
    });
  }, [initialData, selectedProduct, dateRange]);

  // 1. Sales Over Time (Line Chart)
  const salesOverTimeData = React.useMemo(() => {
    const grouped = filteredData.reduce((acc, item) => {
      const date = format(parseISO(item.Date_Sell), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = { date, totalRevenue: 0, totalQuantitySold: 0 };
      }
      acc[date].totalRevenue += item.Real_Revenue || 0;
      acc[date].totalQuantitySold += item["Quantity Sold (liters/kg)"] || 0;
      return acc;
    }, {} as Record<string, { date: string; totalRevenue: number; totalQuantitySold: number }>);
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [filteredData]);

  // 2. Product Performance Comparison (Bar Chart)
  const productPerformanceData = React.useMemo(() => {
    const groupedByProduct = filteredData.reduce((acc, item) => {
      const productName = item["Product Name"];
      if (!acc[productName]) {
        acc[productName] = {
          name: productName,
          totalRevenue: 0,
          totalQuantitySold: 0,
        };
      }
      acc[productName].totalRevenue += item.Real_Revenue || 0;
      acc[productName].totalQuantitySold +=
        item["Quantity Sold (liters/kg)"] || 0;
      return acc;
    }, {} as Record<string, { name: string; totalRevenue: number; totalQuantitySold: number }>);
    return Object.values(groupedByProduct).sort(
      (a, b) => b.totalRevenue - a.totalRevenue
    ); // Sort by revenue desc
  }, [filteredData]);

  // 3. Losses Due to Expiration (Pie Chart for distribution by product, Bar chart for trend)
  const lossesByProductData = React.useMemo(() => {
    const grouped = filteredData.reduce((acc, item) => {
      const productName = item["Product Name"];
      if (!acc[productName]) {
        acc[productName] = { name: productName, totalQuantityLost: 0 };
      }
      acc[productName].totalQuantityLost += item.Quantity_Lost || 0;
      return acc;
    }, {} as Record<string, { name: string; totalQuantityLost: number }>);
    return Object.values(grouped)
      .filter((item) => item.totalQuantityLost > 0)
      .sort((a, b) => b.totalQuantityLost - a.totalQuantityLost);
  }, [filteredData]);

  const lossesOverTimeData = React.useMemo(() => {
    const grouped = filteredData.reduce((acc, item) => {
      const date = format(parseISO(item.Date_Sell), "yyyy-MM-dd"); // Group by sell date, or production/expiration date if more relevant
      if (!acc[date]) {
        acc[date] = { date, totalQuantityLost: 0 };
      }
      acc[date].totalQuantityLost += item.Quantity_Lost || 0;
      return acc;
    }, {} as Record<string, { date: string; totalQuantityLost: number }>);
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [filteredData]);

  // 4. Stock Efficiency Overview (Bar Chart by Product)
  //   const stockEfficiencyData = React.useMemo(() => {
  //     const groupedByProduct = filteredData.reduce((acc, item) => {
  //       const productName = item["Product Name"];
  //       if (!acc[productName]) {
  //         acc[productName] = {
  //           name: productName,
  //           totalStockEfficiency: 0,
  //           count: 0,
  //         };
  //       }
  //       acc[productName].totalStockEfficiency += item.Stock_Efficiency || 0;
  //       acc[productName].count += 1;
  //       return acc;
  //     }, {} as Record<string, { name: string; totalStockEfficiency: number; count: number }>);
  //     return Object.values(groupedByProduct)
  //       .map((item) => ({
  //         name: item.name,
  //         averageStockEfficiency:
  //           item.count > 0 ? (item.totalStockEfficiency / item.count) * 100 : 0, // As percentage
  //       }))
  //       .sort((a, b) => b.averageStockEfficiency - a.averageStockEfficiency);
  //   }, [filteredData]);

  if (!initialData || initialData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sem dados</CardTitle>
          <CardDescription>
            Sem dados disponivéis para mostrar as análises.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Filtro</CardTitle>
            <CardDescription>
              Selecione o produto e o intervalo de datas para analisar os dados.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col  gap-4">
            <div className="flex-1">
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger className="w-full sm:w-[280px]">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {productNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name === ALL_PRODUCTS ? "All Products" : name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full sm:w-[300px] justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Selecione um intervalo de datas</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
        {/* Losses by Product (Pie Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Perdas por Produto (Quantidade)</CardTitle>
            <CardDescription>
              Distribuição da quantidade perdida devido à expiração por produto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {lossesByProductData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={lossesByProductData}
                    dataKey="totalQuantityLost"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {lossesByProductData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) =>
                      value.toLocaleString() + " kg/ltr"
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>Sem dados de perdas para este período/produto.</p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Over Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas ao decorrer do tempo</CardTitle>
            <CardDescription>
              Receita total e quantidade vendida durante o período selecionado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {salesOverTimeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(val) => format(parseISO(val), "MMM dd")}
                  />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name,
                    ]}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="totalRevenue"
                    stroke="#8884d8"
                    name="Receita Total (INR)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="totalQuantitySold"
                    stroke="#82ca9d"
                    name="Quantidade Total Vendida"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>Sem dados de vendas para este período/produto.</p>
            )}
          </CardContent>
        </Card>

        {/* Product Performance Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance do Produto</CardTitle>
            <CardDescription>
              Comparação de produtos por receita total e quantidade vendida.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {productPerformanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip
                    formatter={(value: number) => value.toLocaleString()}
                  />
                  <Legend />
                  <Bar
                    dataKey="totalRevenue"
                    fill="#8884d8"
                    name="Receita Total (INR)"
                  />
                  <Bar
                    dataKey="totalQuantitySold"
                    fill="#82ca9d"
                    name="Quantidade Total Vendida"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>
                Sem dados de desempenho do produto para este período/produto.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Losses Over Time Chart (Optional - if needed) */}
        <Card className="lg:col-span-2">
          {" "}
          {/* Spans two columns on large screens */}
          <CardHeader>
            <CardTitle>Perdas aos decorrer do tempo</CardTitle>
            <CardDescription>
              Quantidade perdida total durante o periodo selecionado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {lossesOverTimeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={lossesOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(val) => format(parseISO(val), "MMM dd")}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [
                      value.toLocaleString() + " kg/ltr",
                      "Quantidade Perdida",
                    ]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="totalQuantityLost"
                    stroke="#FF8042"
                    fill="#FF8042"
                    fillOpacity={0.3}
                    name="Quantidade Total Perdida"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p>
                Sem dados de perdas ao decorrer do tempo para este
                período/produto.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function to ensure cn is available if not globally defined or part of a specific setup
// You would typically have this in your project's utils or lib folder
// For this self-contained example, it's included here.
// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }
// Ensure you have `clsx` and `tailwind-merge` installed if you use this `cn` function.
// For ShadCN UI, `cn` is usually provided in `src/lib/utils.ts`
