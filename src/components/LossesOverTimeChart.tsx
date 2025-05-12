"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
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
interface LossesOverTimeDataPoint {
  date: string;
  totalQuantityLost: number;
}

interface LossesOverTimeChartProps {
  data: LossesOverTimeDataPoint[];
  title?: string;
  description?: string;
}

export function LossesOverTimeChart({
  data,
  title = "Quantidade Perdida ao Longo do Tempo ",
  description = "Quantidade total perdida por expiração no periodo de um ano (ultimo semestre do dataset).",
}: LossesOverTimeChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>No loss data over time available for this period/product.</p>
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
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(val) => format(parseISO(val), "MMM dd")}
            />
            <YAxis tickFormatter={(value) => value.toLocaleString()} />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString() + " kg/ltr",
                "Quantidade Perdida",
              ]}
              labelFormatter={(label) =>
                format(parseISO(label), "PPp", {
                  useAdditionalWeekYearTokens: false,
                  useAdditionalDayOfYearTokens: false,
                })
              }
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="totalQuantityLost"
              stroke="#FF8042"
              fill="#FF8042"
              fillOpacity={0.3}
              name="Quantidade Total Perdida"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
