"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";

interface DataProps {
  product_name: string;
  quantity_before_sell: string;
  quantity_sold: string;
  price_per_unit: string;
  price_per_unit_sold: string;
  production_date: string;
  expiration_date: string;
}

interface PredictionFormProps {
  onSubmit: (data: any) => void;
}
const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit }) => {
  const [data, setData] = useState<DataProps>({
    product_name: "",
    quantity_before_sell: "",
    quantity_sold: "",
    price_per_unit: "",
    price_per_unit_sold: "",
    production_date: "",
    expiration_date: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", data);
    onSubmit(data); // Chama a função passada pelo pai
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded-md "
    >
      <div>
        <label htmlFor="productName">Product Name:</label>
        <Input
          type="text"
          id="productName"
          name="productName"
          value={data.product_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="actualQuantity">Actual Quantity:</label>
        <Input
          type="number"
          id="actualQuantity"
          name="actualQuantity"
          value={data.quantity_before_sell}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="quantitySold">Quantity Sold:</label>
        <Input
          type="number"
          id="quantitySold"
          name="quantitySold"
          value={data.quantity_sold}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="pricePaid">Price Paid:</label>
        <Input
          type="number"
          step="0.01"
          id="pricePaid"
          name="pricePaid"
          value={data.price_per_unit}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="priceSold">Price Sold:</label>
        <Input
          type="number"
          step="0.01"
          id="priceSold"
          name="priceSold"
          value={data.price_per_unit_sold}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="productionDate">Production Date:</label>
        <Input
          type="date"
          id="productionDate"
          name="productionDate"
          value={data.production_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="expirationDate">Expiration Date:</label>
        <Input
          type="date"
          id="expirationDate"
          name="expirationDate"
          value={data.expiration_date}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PredictionForm;
