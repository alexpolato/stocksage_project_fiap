'use client";';
import { Lightbulb } from "lucide-react";
import { Button } from "./ui/button";

export function HeaderComp() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mx-6 flex items-center space-x-2" href="/">
            <Lightbulb className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-green-600">
              STOCKSAGE
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/#problema"
            >
              O Problema
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/#solucao"
            >
              Solução
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/beneficios"
            >
              Benefícios
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/#equipe"
            >
              Equipe
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button className="bg-green-600" asChild>
            <a href="/app/dashboard">Analisar Solução</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
