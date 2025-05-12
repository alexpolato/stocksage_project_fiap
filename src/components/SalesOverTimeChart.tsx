"use client";

import * as React from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the structure of the data expected by this chart
interface SalesDataPoint {
  date: string;
  totalRevenue: number;
  totalQuantitySold: number;
}

interface SalesOverTimeChartProps {
  data: SalesDataPoint[];
  title?: string;
  description?: string;
}

export function SalesOverTimeChart({
  data,
  title = "Vendas ao Longo do Tempo",
  description = "Vendas totais por produto e receita total (INR) ao longo do tempo (periodo um ano de vendas).",
}: SalesOverTimeChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>No sales data available for this period/product.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(val) => format(parseISO(val), "MMM dd")}
              // Ensure XAxis type is category if dates are not strictly linear or have gaps
              // type="category" // Uncomment if experiencing issues with date display
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#82ca9d"
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                const formattedValue = value.toLocaleString();
                if (name === "totalRevenue")
                  return [formattedValue, "Receita (INR)"];
                if (name === "totalQuantitySold")
                  return [formattedValue, "Quantidade Vendida (kg/ltr)"];
                return [formattedValue, name];
              }}
              labelFormatter={(label) =>
                format(parseISO(label), "PPp", {
                  useAdditionalWeekYearTokens: false,
                  useAdditionalDayOfYearTokens: false,
                })
              }
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="totalRevenue"
              stroke="#8884d8"
              name="Receita Total (INR)"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalQuantitySold"
              stroke="#82ca9d"
              name="Quantity Total Vendida (kg/ltr)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
