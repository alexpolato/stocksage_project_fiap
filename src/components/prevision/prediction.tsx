"use client";
import { DataProps } from "@/app/app/previsions/page";
import PredictionForm from "./prediction-form";
import { FetchPrediction } from "./fetch-prediction";
import { useState } from "react";
import { Button } from "../ui/button";

export function Prediction() {
  const [formData, setFormData] = useState<DataProps | null>(null);

  const onFormSubmitData = (data: DataProps) => {
    console.log("data in prevision.tsx", data);
    setFormData(data);
  };

  if (!formData) {
    return <PredictionForm onFormSubmit={onFormSubmitData} />;
  } else {
    return (
      <div>
        <FetchPrediction formData={formData} />
        <Button onClick={() => setFormData(null)} className="text-xl my-3">
          {" "}
          Faça outra predição
        </Button>
      </div>
    );
  }
}
