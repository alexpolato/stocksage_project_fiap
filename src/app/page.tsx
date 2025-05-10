import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center bg-green-500  justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-4 ">
        <div className="text-3xl text-white">STOCKSAGE</div>
        <div className="text text-white">
          Fique a vontade para explorar como seremos no futuro
        </div>
        <p className="text-xl font-medium">
          Estas informações são de uma base de dados referente a vendas de
          produtos lácteos. Estamos utilizando como exemplo, para a solução do
          Enterprise Challenge da FIAP, visando uma solução para minimizar as
          perdas, por expiração de produtos, da Leroy Merlim.
        </p>
        <a href="/app/dashboard">
          <Button variant="outline" className="">
            Confira aqui
          </Button>
        </a>
      </div>
    </div>
  );
}
