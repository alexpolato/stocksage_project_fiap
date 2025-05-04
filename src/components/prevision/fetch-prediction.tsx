"use client";

import { useState, useEffect } from "react";
import { DataProps } from "@/app/app/previsions/page"; // Assuming this path is correct

interface FetchPredictionProps {
  formData: DataProps;
}

export function FetchPrediction({ formData }: FetchPredictionProps) {
  const [predictionResult, setPredictionResult] = useState<string | null>(null);
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

        if (result && result.prediction && result.prediction.length > 0) {
          setPredictionResult(result.prediction[0]);
        } else {
          throw new Error("Prediction data not found in response.");
        }
      } catch (err: unknown) {
        console.error("Error fetching prediction:", err);
        setError(
          err.message ||
            "An unknown error occurred while fetching the prediction."
        );
        setPredictionResult(null); // Clear previous results on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictionData();
  }, [formData]); // Re-run effect if formData changes

  if (isLoading) {
    return <div>Loading prediction...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (predictionResult !== null) {
    return (
      <div>
        Prediction Result: {predictionResult} (liters/kg) {/* Assuming unit */}
      </div>
    );
  }

  // Fallback if no result, no error, and not loading (should ideally not happen if API guarantees response)
  return <div>No prediction available.</div>;
}
