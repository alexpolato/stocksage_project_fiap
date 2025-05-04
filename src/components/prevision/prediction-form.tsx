"use client";

// Removed useRouter import
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormEvent } from "react"; // Removed useEffect import
import Cookies from "js-cookie";

interface FormDataProps {
  product_name: string;
  quantity_before_sell: string;
  quantity_sold: string;
  price_per_unit: string;
  price_per_unit_sold: string;
  production_date: string;
  expiration_date: string;
}

interface PredictionFormProps {
  onFormSubmitSuccess: () => void; // Callback function prop
}

const PredictionForm = ({ onFormSubmitSuccess }: PredictionFormProps) => {
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

    // Store data in cookies
    Cookies.set("predictionFormData", JSON.stringify(formDataObj), {
      expires: 1, // Expires in 1 day
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // Call the callback function passed from the parent component
    onFormSubmitSuccess();
    // Removed router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded-md"
    >
      <div>
        <label htmlFor="product_name">Product Name:</label> {/* Translated */}
        <Input required type="text" id="product_name" name="product_name" />
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
