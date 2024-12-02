import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center bg-green-500  justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-4 ">
        <div className="text-3xl text-white">STOCKSAGE</div>
        <div className="text text-white">
          Fique a vontade para explorar como seremos no futuro
        </div>
        <a href="/app/dashboard">
          <Button variant="outline" className="">
            Confira aqui
          </Button>
        </a>
      </div>
    </div>
  );
}
