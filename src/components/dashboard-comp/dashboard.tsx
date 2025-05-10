"use client";
import React, { useEffect, useState } from "react";
import fetchData from "@/components/dashboard-comp/fetch-data";
import { DairyData, DataTableDash, DataTableDashProps } from "./data-table";
import { Analysis } from "./analisys";

export default function Dashboard() {
  const [data, setData] = useState<DataTableDashProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const result = await fetchData();
      setData(result); // Store the fetched data in state
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }
  // Adicione esta verificação antes de renderizar a tabela
  if (!data || !data.data || !Array.isArray(data.data)) {
    return <div>No data available or data is in wrong format</div>;
  }
  return (
    <div>
      <div>
        <div className="grid mt-5 w-full">
          {" "}
          <Analysis data={data.data as DairyData[]} />
        </div>
      </div>
      <div>
        <h1 className="mt-10 font-medium text-xl">Dashboard Data</h1>
        <div>
          <DataTableDash data={data.data as DairyData[]} />
        </div>
      </div>
    </div>
  );
}
