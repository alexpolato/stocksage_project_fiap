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
      <div className="">
        <h1 className="text-xl font-semibold mt-5">Formulário</h1>
        <div className="grid w-full gap-4">
          <div className="flex flex-col gap-4">
            <Prediction />
          </div>
          <div className="mt-10">
            <h1 className="font-semibold text-xl">Tabela de Prioridade</h1>
            {/* <DataTableDemo /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
