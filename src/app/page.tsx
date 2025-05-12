"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN UI setup
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For team section
import { Input } from "@/components/ui/input"; // For contact form
import { Textarea } from "@/components/ui/textarea"; // For contact form
import {
  ChevronRight,
  BarChart,
  AlertTriangle,
  Users,
  Cpu,
  ShieldCheck,
  Target,
  FileText,
  Briefcase,
  Lightbulb,
  TrendingUp,
  // UsersRound,
} from "lucide-react"; // Example icons
import { HeaderComp } from "@/components/header";
import Image from "next/image";
import Dash01 from "../../assets/dash01.png"; // Adjust the import path as necessary
import Dash02 from "../../assets/dash02.png"; // Adjust the import path as necessary
import DesenhoArquitetura from "../../assets/arquitetura.png"; // Adjust the import path as necessary

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { LossesOverTime } from "@/components/losses-over-time-call";
import { SalesOverTime } from "@/components/sales-over-time-call";

// Placeholder for images - in a real scenario, these would be actual image paths or components
const PlaceholderImage = ({
  alt,
  className,
}: {
  alt: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-300 flex items-center justify-center text-gray-500 ${
      className || "h-64 w-full"
    }`}
  >
    {alt}
  </div>
);

const teamMembers = [
  {
    name: "Alexandre Polato",
    rm: "RM553422",
    avatar: "/avatars/alexandre.png",
  },
  { name: "André Galdino", rm: "RM552761", avatar: "/avatars/andre.png" },
  { name: "Matheus Diniz", rm: "RM553525", avatar: "/avatars/matheus_d.png" },
  { name: "Matheus Nagano", rm: "RM552864", avatar: "/avatars/matheus_n.png" },
  { name: "Thays Silva", rm: "RM554229", avatar: "/avatars/thays.png" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <HeaderComp />

      {/* Main Content */}
      <main className="flex-1  ">
        {/* Hero Section */}
        <section className="py-8 mx-5 md:py-14 lg:py-22 bg-gradient from-primary/10 via-background to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-semibold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-600">
                    STOCKSAGE
                  </h1>
                  <div className="text-4xl">
                    Diga Adeus às Perdas por Vencimento e Otimize seu Estoque!
                  </div>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A solução inteligente para gestão preventiva de produtos
                    perecíveis na Leroy Merlin, transformando dados em economia
                    e sustentabilidade.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-green-600" size="lg" asChild>
                    <Link href="/app/dashboard">
                      Descubra como Reduzir Perdas{" "}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Carousel>
                <CarouselContent>
                  <CarouselItem>
                    <Image
                      src={Dash01}
                      alt="Mockup do Dashboard StockSage"
                      className="shadow-lg overflow-hidden object-cover sm:w-full lg:order-last "
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src={Dash02}
                      alt="Mockup do Dashboard StockSage"
                      className="shadow-lg overflow-hidden object-cover sm:w-full lg:order-last "
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>
        {/* O Problema Section */}
        <section id="problema" className="py-8 md:py-14 lg:py-22 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center  items-center text-center space-y-4 ">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  O Desafio
                </div>
                <h2 className="text-3xl font-bold  tracking-tighter sm:text-5xl">
                  Perdas Milionárias com Produtos Vencidos?
                  <p>Chega de Desperdício!</p>
                </h2>
                <p className=" max-w-[900px]  text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A Leroy Merlin enfrenta um desafio crítico: perdas financeiras
                  anuais de aproximadamente R$33 milhões devido ao vencimento de
                  produtos perecíveis. Os modelos de previsão atuais possui uma
                  falta de tempo para tomada de decisão, com relação ao
                  vencimento de produtos, e a falta de registro sistemático das
                  datas de vencimento agrava o problema, resultando em alto
                  índice de desperdício e custos operacionais elevados.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="mx-auto aspect-video  rounded-xl object-cover object-center sm:w-full lg:order-last">
                <LossesOverTime />
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-green-700">
                        Prejuízo Direto à Lucratividade
                      </h3>
                      <p className="text-muted-foreground">
                        O descarte de produtos vencidos impacta diretamente os
                        resultados financeiros da empresa.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-green-700">
                        Custos Operacionais Elevados
                      </h3>
                      <p className="text-muted-foreground">
                        A gestão de resíduos e o desperdício de recursos
                        aumentam os custos da operação.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-green-700">
                        Impacto na Imagem e Sustentabilidade
                      </h3>
                      <p className="text-muted-foreground">
                        O desperdício afeta a percepção da marca em um mercado
                        cada vez mais consciente.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Solução Section */}
        <section id="solucao" className="py-8 md:py-14 lg:py-22">
          <div className="container px-4 md:px-6">
            <div className="space-y-3 text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm">
                Nossa Solução
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                STOCKSAGE: A Inteligência que Previne o Vencimento
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Apresentamos o StockSage, um sistema de gestão preventiva de
                vencimento. Nossa plataforma integra-se às tecnologias
                existentes, utilizando análise de dados avançada e dashboards
                interativos para fornecer insights. Para ilustrar a nossa
                solução, utilizamos uma{" "}
                <Link
                  className="font-semibold text-primary underline"
                  href="https://www.kaggle.com/datasets/suraj520/dairy-goods-sales-dataset"
                >
                  base de dados sobre vendas de produtos laticínios
                </Link>
                , no qual possui uma data de expiração curta, que deixa mais
                claro essa problemática de perdas.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Coleta e Integração de Dados
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Conexão com ERP, bancos de dados e digitalização automática
                    de datas de validade (OCR).
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Análise Preditiva de Vencimento
                  </CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Uso de Machine Learning para prever produtos próximos do
                    vencimento com alta precisão.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Alertas e Ações Preventivas
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Notificações automáticas para a equipe com sugestões de
                    ações (promoções, redistribuição).
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Dashboards Interativos
                  </CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Visualização clara de produtos em risco, resultados de ações
                    e KPIs de desempenho em tempo real.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Relatórios Estratégicos
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Informações consolidadas sobre perdas evitadas e otimização
                    de estoque para decisões.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="m-12 text-center">
              <SalesOverTime />
            </div>
          </div>
        </section>
        {/* Benefícios Section */}
        <section id="beneficios" className="py-8 md:py-14 lg:py-22 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="space-y-3 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Vantagens
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Transforme a Gestão de Perecíveis e Colha os Benefícios
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <TrendingUp className="inline mr-2 text-primary" />
                    Redução Drástica de Perdas
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Minimize o desperdício de produtos e evite prejuízos
                    financeiros significativos.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <Lightbulb className="inline mr-2 text-primary" />
                    Otimização de Estoque e Compras
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Ajuste seus pedidos com base em previsões de validade,
                    evitando excessos.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <Users className="inline mr-2 text-primary" />
                    Aumento da Satisfação do Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Ofereça sempre produtos frescos e de qualidade, fortalecendo
                    a confiança na marca.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <ShieldCheck className="inline mr-2 text-primary" />
                    Fortalecimento da Sustentabilidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Reduza o descarte, alinhe-se às melhores práticas ambientais
                    e melhore a imagem da empresa.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <Target className="inline mr-2 text-primary" />
                    Decisões Baseadas em Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Tenha acesso a informações claras e precisas para uma gestão
                    mais estratégica e eficaz.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Arquitetura Section (Simplified) */}
        <section id="arquitetura" className="py-8 md:py-14 lg:py-22">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Tecnologia
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tecnologia de Ponta para uma Gestão Eficiente
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A StockSage é construída sobre uma arquitetura moderna e
                  robusta, utilizando tecnologias como Azure, Snowflake, Apache
                  Kafka e Machine Learning para garantir integração,
                  escalabilidade e performance superior.
                </p>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-md/relaxed">
                  (Obs: nosso projeto atual está bem mais simplificado, o
                  desenho é de como deveria ser em escala de produção real)
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Image
                src={DesenhoArquitetura}
                alt="Diagrama simplificado da arquitetura"
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
        {/* Resultados e Projeções Section */}
        {/* <section
          id="resultados"
          className="py-8 md:py-14 lg:py-22 bg-green-600 text-primary-foreground"
        >
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Resultados que Falam por Si
          </h2>
          <p className="mx-auto max-w-[700px] md:text-xl mb-8">
            Em simulações, identificamos que até 60% dos produtos poderiam ser
            vendidos fora da validade sem uma gestão adequada. StockSage atua
            diretamente para reverter este quadro. Com StockSage, projetamos uma
            redução significativa dos R$33 milhões em perdas anuais.
          </p>
          Link para o dashboard, se existir e for público
          <Button variant="secondary" size="lg" asChild>
              <a href="/dashboard-link">Explore nosso dashboard <ChevronRight className="ml-2 h-5 w-5" /></a>
            </Button>
        </div>
        </section> */}
        {/* Equipe Section */}
        <section
          id="equipe"
          className="py-8 md:py-14 lg:py-22 bg-green-600 text-primary"
        >
          <div className="container px-4 md:px-6">
            <div className="space-y-3 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Nosso Time
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Conheça os Criadores da StockSage
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.rm} className="text-center">
                  <CardContent className="p-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.rm}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Contato Section */}
        <section id="contato" className="py-8 md:py-14 lg:py-22 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-xl space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm">
                Entre em Contato
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pronto para Revolucionar sua Gestão?
              </h2>
              <p className="text-muted-foreground">
                Entre em contato conosco para uma demonstração personalizada e
                descubra como a StockSage pode ajudar sua empresa a economizar
                milhões e operar de forma mais sustentável.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-xl">
              <form className="space-y-4">
                <Input type="text" placeholder="Seu Nome" required />
                <Input type="email" placeholder="Seu Email" required />
                <Textarea placeholder="Sua Mensagem" required />
              </form>
              <Button
                type="submit"
                className="w-full mt-3 bg-green-600"
                size="lg"
              >
                <Link href="/app/dashboard">Analisar Demonstração</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Lightbulb className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} StockSage. Todos os direitos
              reservados.
            </p>
          </div>
          {/* <p className="text-center text-sm text-muted-foreground md:text-right">
            Um projeto para o desafio Leroy Merlin.
          </p> */}
        </div>
      </footer>
    </div>
  );
}
