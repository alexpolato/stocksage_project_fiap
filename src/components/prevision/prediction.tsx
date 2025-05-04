"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { DataProps } from "@/app/app/previsions/page"; // Assuming this path is correct relative to the new location or alias
import PredictionForm from "./prediction-form";
import { FetchPrediction } from "./fetch-prediction";
import { Button } from "../ui/button";

export function Prediction() {
  const predictionKey = "predictionFormData";
  const [formData, setFormData] = useState<DataProps | null>(null);
  const [hasFormData, setHasFormData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const formDataCookie = Cookies.get(predictionKey);
    let parsedData: DataProps = {};
    let dataFound = false;

    if (formDataCookie) {
      try {
        parsedData = JSON.parse(formDataCookie);
        // Check if the parsed data actually contains relevant fields
        if (
          Object.values(parsedData).some(
            (param) => param !== undefined && param !== null && param !== ""
          )
        ) {
          dataFound = true;
        }
      } catch (error) {
        console.error("Error parsing cookie data", error);
        Cookies.remove(predictionKey);
      }
    }

    setFormData(dataFound ? parsedData : null);
    setHasFormData(dataFound);
    setIsLoading(false); // Set loading to false after checking cookie
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to handle updates after form submission or deletion
  const refreshPredictionState = () => {
    setIsLoading(true); // Set loading true while re-checking
    const formDataCookie = Cookies.get(predictionKey);
    let parsedData: DataProps = {};
    let dataFound = false;
    if (formDataCookie) {
      try {
        parsedData = JSON.parse(formDataCookie);
        if (
          Object.values(parsedData).some(
            (param) => param !== undefined && param !== null && param !== ""
          )
        ) {
          dataFound = true;
        }
      } catch (error) {
        console.error("Error parsing cookie data during refresh", error);
        Cookies.remove(predictionKey);
      }
    }
    setFormData(dataFound ? parsedData : null);
    setHasFormData(dataFound);
    setIsLoading(false);
  };

  if (isLoading) {
    // Optional: Render a loading indicator while checking cookie
    return <div>Loading...</div>;
  }

  if (!hasFormData || !formData) {
    // Pass refresh function to the form
    return <PredictionForm onFormSubmitSuccess={refreshPredictionState} />;
  } else {
    return (
      <div>
        {/* Pass formData to FetchPrediction */}
        <FetchPrediction formData={formData} />
        <Button
          className="mt-2"
          onClick={() => {
            Cookies.remove(predictionKey);
            refreshPredictionState();
          }}
        >
          Make another prediction
        </Button>
      </div>
    );
  }
}
