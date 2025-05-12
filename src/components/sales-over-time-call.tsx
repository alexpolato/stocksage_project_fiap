"use-client";
import React, { useEffect, useState } from "react";

import { format, parseISO, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import fetchData from "./dashboard-comp/fetch-data";
import { DairyData } from "./dashboard-comp/data-table";
import { SalesOverTimeChart } from "./SalesOverTimeChart";

export function SalesOverTime() {
  const [data, setData] = useState<DairyData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const result = await fetchData();
      console.log("Fetched data lossesovertime---:", result);
      setData(result.data); // Store the fetched data in state
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const ALL_PRODUCTS = "all_products";
  const selectedProduct = ALL_PRODUCTS;

  const filteredData = React.useMemo(() => {
    const dateRange: DateRange = {
      from: new Date("2021-11-13"),
      to: new Date("2022-12-27"),
    };
    if (!data) return [];
    return data.filter((item: DairyData) => {
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
  }, [data, selectedProduct]);

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
    return Object.values(grouped)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((item) => ({
        ...item,
        totalRevenue: parseFloat(item.totalRevenue.toFixed(2)),
        totalQuantitySold: parseFloat(item.totalQuantitySold.toFixed(2)),
      }));
  }, [filteredData]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Algo deu errado: {error}</div>;
  }
  return (
    <div>
      <SalesOverTimeChart data={salesOverTimeData} />
    </div>
  );
}
