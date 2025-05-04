"use client";

// Removed useRouter import
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormEvent, useEffect, useState } from "react"; // Removed useEffect import
import { Select, SelectTrigger } from "../ui/select";
import { SelectContent, SelectItem, SelectValue } from "@radix-ui/react-select";

interface PredictionFormProps {
  onFormSubmit: (data: any) => void; // Callback function prop
}

const PredictionForm = ({ onFormSubmit }: PredictionFormProps) => {
  const [productsName, setProductsName] = useState<string[]>([
    "Ice Cream",
    "Milk",
    "Yogurt",
    "Cheese",
    "Buttermilk",
    "Curd",
    "Paneer",
    "Lassi",
    "Ghee",
    "Butter",
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Convert FormData to object
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        formDataObj[key] = value;
      }
    });

    onFormSubmit(formDataObj);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded-md"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="product_name">Product Name:</label> {/* Translated */}
        <select required name="product_name" className="w-32">
          {productsName.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity_before_sell">Quantity Purchased:</label>{" "}
        {/* Translated */}
        <Input
          required
          type="number"
          id="quantity_before_sell"
          name="quantity_before_sell"
        />
      </div>
      <div>
        <label htmlFor="quantity_sold">
          Quantity Sold to Date: {/* Translated */}
        </label>
        <Input required type="number" id="quantity_sold" name="quantity_sold" />
      </div>
      <div>
        <label htmlFor="price_per_unit">Price Paid:</label> {/* Translated */}
        <Input
          required
          type="number"
          step="0.01"
          id="price_per_unit"
          name="price_per_unit"
        />
      </div>
      <div>
        <label htmlFor="price_per_unit_sold">Price Sold:</label>{" "}
        {/* Translated */}
        <Input
          required
          type="number"
          step="0.01"
          id="price_per_unit_sold"
          name="price_per_unit_sold"
        />
      </div>
      <div>
        <label htmlFor="production_date">Production Date:</label>{" "}
        {/* Translated */}
        <Input
          required
          type="date"
          id="production_date"
          name="production_date"
        />
      </div>
      <div>
        <label htmlFor="expiration_date">Expiration Date:</label>{" "}
        {/* Translated */}
        <Input
          required
          type="date"
          id="expiration_date"
          name="expiration_date"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default PredictionForm;
