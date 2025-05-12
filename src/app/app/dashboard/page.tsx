// import { BarChartComponent } from "@/components/bar-chart";
// import { CircleChart } from "@/components/circle-chart";
import DashboardComp from "@/components/dashboard-comp/dashboard";
import { HeaderComp } from "@/components/header";
// import { DataTableDemo } from "@/components/data-table";
// import { RadialChartComponent } from "@/components/radial-chart";

export default function Dashboard() {
  return (
    <div>
      <div>
        <HeaderComp />
      </div>
      <div className="p-10">
        <h1 className="text-3xl font-semibold">Bem vindo!</h1>
        <p className="text-xl font-medium">
          Segue o painel de controle com as informações que você precisa para
          tomar decisões mais assertivas.
        </p>
        {/* <p className="text-lg font-medium text-gray-700">
          Os filtros são para os gráficos do dataset. A área de predição é o
          resultado do machine learning criado e desenvolvido pela equipe da
          Stocksage, para minimizar as perdas e ter maior controle de estoque. O
          funcionamento da predição é simples, você coloca suas informações da
          atualidade: data de produção, data de validade, preço de venda, preço
          de custo, quantidade vendida e quantidade comprada (tenha em mente que
          a data de produção deve ser menor ou igual que a data de hoje, assim
          como a data de expiração maior ou igual, pois estamos considerando que
          a quantidade vendida é da data de produção até a data atual). Após
          isso, você clica em Executar e o sistema irá te mostrar a previsão de
          vendas para os próximos dias.
        </p> */}
        <div>
          <div>
            <DashboardComp />
          </div>

          {/* <div className="grid grid-cols-3 w-full  gap-4">
            <div className="bg-red-50 ">
              <CircleChart />
            </div>
            <div className="bg-red-50 ">
              <RadialChartComponent />
            </div>
            <div className="bg-red-50 ">
              <BarChartComponent />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
