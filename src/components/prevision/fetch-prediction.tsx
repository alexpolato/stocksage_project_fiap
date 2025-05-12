"use client";

import { useState, useEffect } from "react";
import { DataProps } from "@/app/app/previsions/page"; // Assuming this path is correct

interface FetchPredictionProps {
  formData: DataProps;
}

export function FetchPrediction({ formData }: FetchPredictionProps) {
  const [predictionResult, setPredictionResult] = useState<string | null>(null);
  // const [dataPrepared, setDataPrepared] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure formData is not null or empty before fetching
    if (!formData || Object.keys(formData).length === 0) {
      setIsLoading(false);
      setError("No form data provided for prediction.");
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
          throw new Error(
            `Failed to fetch prediction: ${response.statusText} (${response.status})`
          );
        }

        const result = await response.json();

        // setDataPrepared(result.data_prepared);

        if (result && result.prediction && result.prediction.length > 0) {
          setPredictionResult(result.prediction[0]);
        } else {
          throw new Error("Prediction data not found in response.");
        }
      } catch (err) {
        console.error("Error fetching prediction:", err);
        setError(
          (err instanceof Error && err.message) ||
            "An unknown error occurred while fetching the prediction."
        );
        setPredictionResult(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictionData();
  }, [formData]); // Re-run effect if formData changes

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Algo deu errado: {error}</div>;
  }

  const current_stock =
    Number(formData.quantity_before_sell) - Number(formData.quantity_sold);

  const quantity_lost = current_stock - Number(predictionResult);

  // const margin =
  //   Number(formData.price_per_unit_sold) - Number(formData.price_per_unit);
  if (predictionResult !== null) {
    return (
      <div className="text-lg">
        <div className="text-lg">
          Com base nas informações das vendas do produto {formData.product_name}{" "}
          que você forneceu, até{" "}
          {formData.expiration_date &&
            new Date(formData.expiration_date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          , você venderá em torno de:{" "}
          <span className="font-semibold">
            {Number(predictionResult).toFixed(2)}{" "}
          </span>
          (liters/kg).{" "}
        </div>
        <div className="mt-2">
          Sendo assim, com um estoque atual de {current_stock.toFixed(2)}{" "}
          (liters/kg) você terá uma possivel perda de {quantity_lost.toFixed(2)}{" "}
          (liters/kg), resultando em uma perda de $
          {(quantity_lost * Number(formData.price_per_unit)).toFixed(2)}.
        </div>
        {/* <div className="mt-4">
          <h3 className="font-semibold">Informações fornecidas:</h3>
          <div>{JSON.stringify(dataPrepared)}</div>
        </div> */}
      </div>
    );
  }

  // Fallback if no result, no error, and not loading (should ideally not happen if API guarantees response)
  return <div>No prediction available.</div>;
}
