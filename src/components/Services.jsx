"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    n: "01",
    title: "Computadores e notebooks",
    desc: "Diagnóstico, manutenção preventiva e corretiva, upgrade e limpeza. Foco em estabilidade e desempenho no dia a dia.",
    tags: ["Formatação", "Upgrade SSD/RAM", "Limpeza interna"],
  },
  {
    n: "02",
    title: "Impressoras",
    desc: "Limpeza preventiva, troca e desobstrução de cabeçotes, pressurização de dampers e calibração para impressão de qualidade.",
    tags: ["Jato de tinta", "Tanque de tinta", "Cabeçotes"],
  },
  {
    n: "03",
    title: "Sites",
    desc: "Sites rápidos e responsivos que apresentam sua marca, seus serviços e produtos com clareza — e trazem contato de verdade.",
    tags: ["Institucional", "Landing page", "Next.js"],
  },
  {
    n: "04",
    title: "Sistemas de gestão",
    desc: "Sistemas sob medida para organizar rotinas, centralizar informações e tirar o processo da planilha.",
    tags: ["Painel admin", "Portal do cliente", "Pix"],
  },
];

/* Lista editorial em linhas — sem cards */
export default function Services() {
  return (
    <section id="solucoes" className="bg-ink px-6 md:px-12 py-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] text-cream leading-[1.02]">
            O que fazemos
          </h2>
          <p className="max-w-sm text-sand leading-relaxed">
            Atendimento próximo e soluções práticas, do conserto de bancada ao
            sistema rodando na nuvem.
          </p>
        </div>

        <ul className="border-t border-line">
          {SERVICES.map((s) => (
            <li key={s.n} className="group relative border-b border-line">
              {/* preenchimento que sobe no hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-umber transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100"
              />
              <Link
                href="#contato"
                className="relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[80px_1.1fr_1.4fr_auto] gap-x-6 gap-y-3 items-start py-8 md:py-10 md:px-4"
              >
                <span className="font-mono text-sm text-brand pt-2">{s.n}</span>
                <h3 className="font-heading text-2xl md:text-4xl font-medium tracking-tight text-cream transition-transform duration-500 group-hover:translate-x-2">
                  {s.title}
                </h3>
                <div className="col-span-3 md:col-span-1 md:col-start-3 row-start-2 md:row-start-1">
                  <p className="text-sand leading-relaxed">{s.desc}</p>
                  <p className="mt-4 font-mono text-xs text-dust">
                    {s.tags.join("  ·  ")}
                  </p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-sand transition-all duration-300 group-hover:text-brand group-hover:rotate-45 col-start-3 md:col-start-4 row-start-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
