import { Prediction } from "@/components/prevision/prediction";

export interface DataProps {
  product_name?: string;
  quantity_before_sell?: string;
  quantity_sold?: string;
  price_per_unit?: string;
  price_per_unit_sold?: string;
  production_date?: string;
  expiration_date?: string;
}

export default function Previsions() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Área de Predição</h1>
      <div className="mt-10 ">
        <div className="grid grid-cols-2 w-full ">
          <div className="">
            <h1 className="font-semibold text-xl">Tabela de Prioridade</h1>
            {/* <DataTableDemo /> */}
          </div>
          <div className="flex flex-col gap-4">
            <Prediction />
          </div>
        </div>
      </div>
    </div>
  );
}
