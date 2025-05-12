'use client";';
import { Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function HeaderComp() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mx-6 flex items-center space-x-2" href="/">
            <Lightbulb className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-green-600">
              STOCKSAGE
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/#problema"
            >
              O Problema
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/#solucao"
            >
              Solução
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/beneficios"
            >
              Benefícios
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/#equipe"
            >
              Equipe
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button className="bg-green-600" asChild>
            <Link href="/app/dashboard">Analisar Solução</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
