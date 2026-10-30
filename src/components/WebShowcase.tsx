"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const SCREENS = [
  {
    id: "admin",
    label: "01 · Central Operacional (Admin)",
    route: "itdeskweb.vercel.app",
    image: "/assets/itdesk-admin-preview.png",
    alt: "Central Operacional IT DESK — Painel Administrativo",
    caption:
      "Visão geral do especialista: controle de fila de espera em tempo real, monitoramento de sessões AnyDesk, cronometragem auditada e fluxo financeiro Pix.",
  },
  {
    id: "portal",
    label: "02 · Portal do Cliente (/atendimento)",
    route: "itdeskweb.vercel.app/atendimento",
    image: "/assets/itdesk-portal-preview.png",
    alt: "Portal do Cliente IT DESK — Solicitação de Suporte Remoto",
    caption:
      "Interface direta do cliente: abertura ágil de chamado, triagem com checklist inteligente, acompanhamento de status ao vivo e liquidação Pix.",
  },
];

export default function WebShowcase() {
  const [activeTab, setActiveTab] = useState<"admin" | "portal">("admin");
  const current = SCREENS.find((s) => s.id === activeTab) || SCREENS[0];

  return (
    <section
      id="desenvolvimento-web"
      className="relative w-full py-28 bg-[#000000]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Cabeçalho de Desenvolvimento Web */}
        <div className="relative pb-6 border-b border-[#1f1f1f] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#ff6b00] mb-2">
              DESENVOLVIMENTO WEB • IT THECNICA
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Sistemas e portais sob medida.
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#8a8a8a] leading-relaxed">
            Criamos plataformas proprietárias focadas em operação real:
            arquitetura enxuta, alta performance e pensada para o uso diário sem
            fórmulas prontas de IA.
          </p>

          <div className="absolute bottom-[-1px] left-0 w-[120px] h-[2px] bg-[#ff6b00]" />
        </div>

        {/* O que é o IT DESK — Explicação em Texto Editorial (Sem Cards) */}
        <div className="py-10 border-b border-[#1f1f1f]">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <Image
                src="/assets/logo-it-desk.png"
                alt="IT DESK — Plataforma de Gestão de Suporte"
                width={160}
                height={42}
                unoptimized
                style={{ width: "auto" }}
                className="h-8 sm:h-9 object-contain object-left shrink-0"
              />
              <span className="hidden sm:block h-8 w-[1px] bg-[#1f1f1f]" />
              <div>
                <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff6b00]">
                  CASE REAL EM PRODUÇÃO • DESENVOLVIDO PELA IT THECNICA
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  O que é o IT DESK?
                </h3>
              </div>
            </div>

            <p className="max-w-xl text-xs sm:text-sm text-[#9a9a9a] leading-relaxed">
              Plataforma completa para gestão, organização e controle de
              atendimentos de TI em um só lugar. Centraliza chamados, conexões
              remotas via AnyDesk e recebimentos Pix de ponta a ponta.
            </p>
          </div>

          {/* 3 Linhas Diretas de Capacidades — Linhas Retas sem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#1f1f1f] pt-6">
            <div className="py-4 md:pr-8 border-b md:border-b-0 md:border-r border-[#1f1f1f]">
              <span className="block font-mono text-[10px] font-bold text-[#ff6b00] tracking-[0.12em] mb-1">
                01 · CONTROLE DE CHAMADOS
              </span>
              <p className="text-xs text-[#8a8a8a] leading-relaxed">
                Gerenciamento de fila em tempo real, novos chamados,
                históricos de atendimento e auditoria por cliente.
              </p>
            </div>

            <div className="py-4 md:px-8 border-b md:border-b-0 md:border-r border-[#1f1f1f]">
              <span className="block font-mono text-[10px] font-bold text-[#ff6b00] tracking-[0.12em] mb-1">
                02 · CONEXÕES RÁPIDAS
              </span>
              <p className="text-xs text-[#8a8a8a] leading-relaxed">
                Integração ágil para suporte e acesso remoto AnyDesk imediato
                aos clientes, com cronômetro de sessão sincronizado.
              </p>
            </div>

            <div className="py-4 md:pl-8">
              <span className="block font-mono text-[10px] font-bold text-[#ff6b00] tracking-[0.12em] mb-1">
                03 · MÉTRICAS E FINANCEIRO
              </span>
              <p className="text-xs text-[#8a8a8a] leading-relaxed">
                Monitoramento de horas técnicas, faturamento, cobranças via
                QR Code Pix e baixa de pagamento com um clique.
              </p>
            </div>
          </div>
        </div>

        {/* Seletor de Telas (Abas Retas, Arquiteturais) */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex border border-[#1f1f1f]">
            <button
              type="button"
              onClick={() => setActiveTab("admin")}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "admin"
                  ? "bg-[#ff6b00] text-black"
                  : "bg-black text-[#8a8a8a] hover:text-white"
              }`}
            >
              Central Operacional (Admin)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("portal")}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border-l border-[#1f1f1f] ${
                activeTab === "portal"
                  ? "bg-[#ff6b00] text-black"
                  : "bg-black text-[#8a8a8a] hover:text-white"
              }`}
            >
              Portal do Cliente (/atendimento)
            </button>
          </div>

          <a
            href="https://itdeskweb.vercel.app/atendimento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#ff6b00] hover:bg-[#ff7b1a] text-black font-extrabold text-xs uppercase tracking-[0.06em] px-5 py-2.5 rounded-[2px] transition-colors self-start sm:self-auto shrink-0"
          >
            <span>Acessar Projeto ao Vivo</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* O Print Real — Direto no Fundo Preto Sem Textura Nem Mockup Artificial */}
        <div className="border border-[#1f1f1f] bg-black">
          <Image
            key={current.id}
            src={current.image}
            alt={current.alt}
            width={1024}
            height={511}
            unoptimized
            priority
            className="w-full h-auto block"
          />
        </div>

        {/* Legenda do Print e Chamada de Contato */}
        <div className="py-5 border-b border-[#1f1f1f] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-xs text-[#8a8a8a]">
            {current.caption}
          </p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#ff6b00] shrink-0">
            {current.route}
          </span>
        </div>

        {/* Chamada Final Direta */}
        <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-[#8a8a8a]">
            Quer desenvolver um sistema ou portal próprio para a sua empresa?
          </span>
          <a
            href="https://wa.me/5531998782969?text=Ol%C3%A1!%20Vi%20o%20projeto%20IT%20DESK%20no%20site%20da%20IT%20THECNICA%20e%20quero%20conversar%20sobre%20um%20projeto%20web."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#ff6b00] hover:text-white transition-colors cursor-pointer"
          >
            <span>Falar com a IT THECNICA sobre meu projeto</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
