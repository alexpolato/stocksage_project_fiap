import { BarChartComponent } from "@/components/bar-chart";
import { CircleChart } from "@/components/circle-chart";
import { DataTableDemo } from "@/components/data-table";
import PredictionForm from "@/components/prevision/prediction-form";
import { RadialChartComponent } from "@/components/radial-chart";
import { useEffect, useState } from "react";

interface DataProps {
  product_name: string;
  quantity_before_sell: string;
  quantity_sold: string;
  price_per_unit: string;
  price_per_unit_sold: string;
  production_date: string;
  expiration_date: string;
}

export default async function Previsions() {
  const [data, setData] = useState<DataProps | null>();
  const [fetchData, setFetchData] = useState("Loading");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Set the current date on the client side
    setCurrentDate(new Date().toLocaleDateString());
    handleFetch;
  }, []);

  const handleFetch = async () => {
    fetch("http://localhost:8080/api/home").then((response) =>
      response.json().then((data) => {
        const data_from_fetch = data.message;
        setFetchData(data_from_fetch);
        console.log("fetching data -> ", data);
      })
    );
  };
  // const fetchData = await fetch("http://localhost:8080/api/home").then((res) =>
  //   res.json()
  // );

  const handleFormSubmit = async (formData: DataProps) => {
    console.log("Dados do formulário no componente pai:", formData);

    try {
      const response = await fetch("http://localhost:8080/api/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Response from backend:", result);

      return result;
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="">
        <h1 className="text-xl font-semibold mt-5 ">Formulário</h1>

        <div className="grid w-full  gap-4">
          {fetchData}
          <PredictionForm onSubmit={handleFormSubmit} />
          <div className="flex flex-col gap-4">
            {data && (
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Dados do Formulário</h1>
                <div className="flex flex-col gap-2">
                  <p>Data de Hoje: {currentDate}</p>
                  <p>Data de Produção: {data.production_date}</p>
                  <p>Data de Validade: {data.expiration_date}</p>
                  <p>Nome do Produto: {data.product_name}</p>
                  <p>Quantidade Real: {data.quantity_before_sell}</p>
                  <p>Quantidade Vendida: {data.quantity_sold}</p>
                  <p>Preço Pago: {data.price_per_unit}</p>
                  <p>Preço Vendido: {data.price_per_unit_sold}</p>
                </div>
              </div>
            )}
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
