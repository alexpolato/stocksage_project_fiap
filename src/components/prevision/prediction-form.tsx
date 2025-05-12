"use client";

// Removed useRouter import
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react"; // Removed useEffect import
import Cookies from "js-cookie";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface PredictionFormProps {
  onFormSubmitSuccess: () => void; // Callback function prop
}

const PredictionForm = ({ onFormSubmitSuccess }: PredictionFormProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (selectedProduct) {
      formData.append("product_name", selectedProduct);
    }
    // Convert FormData to object
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        formDataObj[key] = value;
      }
    });
    if (
      Number(formDataObj.quantity_before_sell) <
      Number(formDataObj.quantity_sold)
    ) {
      alert(
        "ERRO: \nA quantidade vendida não pode ser maior que a quantidade comprada!"
      );
      return;
    } else if (formDataObj.production_date > formDataObj.expiration_date) {
      alert(
        "ERRO: \nA data de produção deve ser menor que a data de expiração!"
      );
      return;
    } else if (
      new Date() <= new Date(formDataObj.production_date) ||
      new Date() >= new Date(formDataObj.expiration_date)
    ) {
      alert(
        "ERRO: \nComo estamos fazendo um calculo de previsão, a data atual deve estar entre as datas de produção e de expiração!"
      );
      return;
    }

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
    <Card className="">
      <CardHeader>
        <CardTitle>Fazer Predição</CardTitle>
        <CardDescription>
          Insira como estão indo suas vendas atualmente (de um produto
          especifico) e execute para ver a previsão de vendas para os próximos
          dias.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 p-2 ">
          <div>
            {/* Translated */}
            <Label htmlFor="product_name">Produto</Label>
            <Select
              required
              onValueChange={(value) => setSelectedProduct(value)}
              value={selectedProduct}
            >
              <SelectTrigger id="product_name" name="product_name">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]" position="popper">
                {[
                  { name: "Sorvete", value: "Ice Cream" },
                  { name: "Leite", value: "Milk" },
                  { name: "Iogurt", value: "Yogurt" },
                  { name: "Queijo", value: "Cheese" },
                  { name: "Leitelho", value: "Buttermilk" },
                  { name: "Coalhada", value: "Curd" },
                  { name: "Queijo (Paneer)", value: "Paneer" },
                  { name: "Lassi", value: "Lassi" },
                  { name: "Manteiga Clarificada (Ghee)", value: "Ghee" },
                  { name: "Manteiga", value: "Butter" },
                ].map((product, index) => (
                  <SelectItem key={index} value={product.value}>
                    {product.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>{" "}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="production_date">Data de Produção</Label>{" "}
              {/* Translated */}
              <Input
                required
                type="date"
                id="production_date"
                name="production_date"
              />
            </div>
            <div>
              <Label htmlFor="expiration_date">Data de Expiração</Label>{" "}
              {/* Translated */}
              <Input
                required
                type="date"
                id="expiration_date"
                name="expiration_date"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity_before_sell">Quantidade Comprada</Label>{" "}
              {/* Translated */}
              <Input
                required
                type="number"
                id="quantity_before_sell"
                name="quantity_before_sell"
              />
            </div>
            <div>
              <Label htmlFor="quantity_sold">
                Quantidade Vendida até hoje {/* Translated */}
              </Label>
              <Input
                required
                type="number"
                id="quantity_sold"
                name="quantity_sold"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Label htmlFor="price_per_unit">Preço de Compra</Label>{" "}
              {/* Translated */}
              <Input
                required
                type="number"
                step="0.01"
                id="price_per_unit"
                name="price_per_unit"
              />
            </div>

            <div>
              <Label htmlFor="price_per_unit_sold">Preço de Venda</Label>{" "}
              {/* Translated */}
              <Input
                required
                type="number"
                step="0.01"
                id="price_per_unit_sold"
                name="price_per_unit_sold"
              />
            </div>
          </div>

          <Button type="submit">Executar</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
