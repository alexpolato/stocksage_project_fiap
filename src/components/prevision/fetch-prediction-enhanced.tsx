"use client";

import { useState, useEffect } from "react";
import { DataProps } from "@/app/app/previsions/page"; // Assuming this path is correct
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface FetchPredictionProps {
  formData: DataProps;
}

// Interface for the data_prepared object
interface PreparedData {
  product_name: string;
  price_per_unit: number;
  price_per_unit_sold: number;
  shelf_life: number;
  days_to_expire: number;
  days_to_sell: number;
  quantity_in_stock: number;
  sales_velocity: number;
  Quantity_Sold_Hist_Mean: number;
  Sales_Velocity_Hist_Mean: number;
  Sales_Volatility_Hist: number;
  Capacity_Utilization: number;
  Sales_Trend_7d: number;
  Seasonal_Volatility: number;
  stock_efficiency: number;
  total_value: number;
}

// Small chart for Sales Velocity Comparison
const SalesVelocityComparisonChart = ({
  current,
  historical,
}: {
  current: number;
  historical: number;
}) => {
  const data = [
    { name: "Atual", value: current },
    { name: "Média Hist.", value: historical },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Velocidade de Venda</CardTitle>
        <CardDescription className="text-xs">
          Atual vs. Média Histórica (kg/L/dia)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 5, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              fontSize={10}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <YAxis
              type="category"
              dataKey="name"
              fontSize={10}
              width={70}
              interval={0}
            />
            <Tooltip
              formatter={(value: number) => value.toFixed(2)}
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Bar dataKey="value" barSize={20}>
              <Cell fill="#8884d8" />
              <Cell fill="#82ca9d" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Small chart for Stock Efficiency
const StockEfficiencyGauge = ({ efficiency }: { efficiency: number }) => {
  const efficiencyPercentage = efficiency * 100;
  const data = [{ name: "Eficiência", value: efficiencyPercentage }];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Eficiência do Estoque</CardTitle>
        <CardDescription className="text-xs">
          Nível atual de eficiência (%)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              fontSize={10}
              unit="%"
            />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip
              formatter={(value: number) => value.toFixed(1) + "%"}
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Bar dataKey="value" barSize={20} background={{ fill: "#eee" }}>
              <Cell
                fill={
                  efficiencyPercentage > 75
                    ? "#82ca9d"
                    : efficiencyPercentage > 40
                    ? "#ffc658"
                    : "#ff8042"
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export function FetchPredictionEnhanced({ formData }: FetchPredictionProps) {
  const [predictionResult, setPredictionResult] = useState<string | null>(null);
  const [dataPrepared, setDataPrepared] = useState<PreparedData | null>(null); // Typed state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0) {
      setIsLoading(false);
      setError("Nenhum dado de formulário fornecido para predição.");
      return;
    }

    const fetchPredictionData = async () => {
      setIsLoading(true);
      setError(null);
      const formattedData = {
        ...formData,
        quantity_before_sell: Number(formData.quantity_before_sell),
        quantity_sold: Number(formData.quantity_sold),
        price_per_unit: Number(formData.price_per_unit),
        price_per_unit_sold: Number(formData.price_per_unit_sold),
      };
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_PREDICTION_URL!,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({})); // Try to parse error response
          throw new Error(
            `Falha ao buscar predição: ${response.statusText} (${
              response.status
            }) - ${errorData.message || ""}`
          );
        }

        const result = await response.json();

        if (result && result.data_prepared) {
          result.data_prepared.stock_efficiency =
            Number(result.prediction[0]) /
            Number(result.data_prepared.days_to_expire) /
            (Number(result.data_prepared.quantity_in_stock) /
              result.data_prepared.days_to_expire);
          setDataPrepared(result.data_prepared as PreparedData);
        } else {
          console.warn("data_prepared não encontrado na resposta da API.");
        }

        if (result && result.prediction && result.prediction.length > 0) {
          setPredictionResult(result.prediction[0]);
        } else {
          throw new Error("Dados de predição não encontrados na resposta.");
        }
      } catch (err) {
        console.error("Erro ao buscar predição:", err);
        setError(
          (err instanceof Error && err.message) ||
            "Ocorreu um erro desconhecido ao buscar a predição."
        );
        setPredictionResult(null);
        setDataPrepared(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictionData();
  }, [formData]);

  if (isLoading) {
    return <div>Carregando predição e dados...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Algo deu errado: {error}</div>;
  }

  //   const current_stock =
  //     Number(formData.quantity_before_sell) - Number(formData.quantity_sold);
  const predicted_sell_amount = Number(predictionResult);
  //   const quantity_lost = current_stock - predicted_sell_amount;

  return (
    <div className="space-y-6">
      {/* {predictionResult !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Resultado da Predição</CardTitle>
          </CardHeader>
          <CardContent className="text-lg space-y-2">
            <p>
              Com base nas informações das vendas do produto{" "}
              <strong>{formData.product_name}</strong> que você forneceu, até{" "}
              <strong>
                {formData.expiration_date &&
                  new Date(formData.expiration_date).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
              </strong>
              , você venderá em torno de:{" "}
              <span className="font-semibold text-blue-600">
                {predicted_sell_amount.toFixed(2)} (liters/kg).
              </span>
            </p>
            <p>
              Sendo assim, com um estoque atual de{" "}
              <strong>{current_stock.toFixed(2)} (liters/kg)</strong>, você terá
              uma possível perda de{" "}
              <strong
                className={
                  quantity_lost > 0 ? "text-red-600" : "text-green-600"
                }
              >
                {quantity_lost.toFixed(2)} (liters/kg)
              </strong>
              , resultando em uma perda financeira estimada de{" "}
              <strong
                className={
                  quantity_lost > 0 ? "text-red-600" : "text-green-600"
                }
              >
                R${" "}
                {(quantity_lost * Number(formData.price_per_unit)).toFixed(2)}
              </strong>
              .
            </p>
          </CardContent>
        </Card>
      )} */}

      {dataPrepared && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes Adicionais do Produto e Estoque</CardTitle>
            <CardDescription>
              Informações contextuais baseadas nos dados fornecidos e histórico.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Dias p/ Expirar</TableHead>
                  <TableHead>Vida Útil</TableHead>
                  <TableHead>Valor Estoque</TableHead>
                  <TableHead>Eficiência</TableHead>
                  <TableHead>Velocidade Venda</TableHead>
                  <TableHead>Predição</TableHead>
                  <TableHead className="text-center">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{dataPrepared.product_name}</TableCell>
                  <TableCell>
                    {dataPrepared.quantity_in_stock.toFixed(2)} kg/L
                  </TableCell>
                  <TableCell>{dataPrepared.days_to_expire}</TableCell>
                  <TableCell>{dataPrepared.shelf_life}</TableCell>
                  <TableCell>
                    R$ {dataPrepared.total_value.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {(dataPrepared.stock_efficiency * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    {dataPrepared.sales_velocity.toFixed(2)} kg/L/dia
                  </TableCell>
                  <TableCell
                    className={
                      predicted_sell_amount < dataPrepared.quantity_in_stock
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {predicted_sell_amount.toFixed(2)} (liters/kg)
                  </TableCell>
                  <TableCell className="text-center">
                    {predicted_sell_amount < dataPrepared.quantity_in_stock
                      ? "Pela previsão ser menor do que o estoque atual, é necessário tomar alguma atitude, senão você terá produtos expirados."
                      : "Pela previsão ser maior do que o estoque atual, você pode aumentar a produção ou comprar mais produtos."}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <SalesVelocityComparisonChart
                current={dataPrepared.sales_velocity}
                historical={dataPrepared.Sales_Velocity_Hist_Mean}
              />
              <StockEfficiencyGauge
                efficiency={dataPrepared.stock_efficiency}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {!isLoading && predictionResult === null && !error && (
        <Card>
          <CardHeader>
            <CardTitle>Predição Não Disponível</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Não foi possível gerar uma predição com os dados fornecidos.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
