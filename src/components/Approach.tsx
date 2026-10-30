"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  SearchCheck,
  Layers,
  Cpu,
  ShieldCheck,
  ArrowUpRight,
  ArrowUpLeft,
  ArrowDownRight,
  ArrowDownLeft,
  Sparkles,
} from "lucide-react";

const NODES = [
  {
    step: "01 / ENTRADA",
    icon: <SearchCheck className="w-5 h-5 text-[#ff7417]" />,
    title: "Diagnóstico & Escuta Ativa",
    desc: "Avaliamos o contexto real do seu negócio ou equipamento. Identificamos a causa raiz sem rodeios ou custos desnecessários.",
    tag: "Transparência desde o 1º contato",
    position: "md:top-2 md:left-4 lg:top-6 lg:left-6",
    tailPosition: "bottom-right",
    arrowIcon: <ArrowUpRight className="w-3.5 h-3.5 text-[#ff7417]" />,
  },
  {
    step: "02 / PLANEJAMENTO",
    icon: <Layers className="w-5 h-5 text-[#ff7417]" />,
    title: "Arquitetura Sob Medida",
    desc: "Seja trocando peças de hardware ou criando um sistema web completo, desenhamos a solução exata para a sua demanda.",
    tag: "Sem desperdício ou exagero",
    position: "md:top-2 md:right-4 lg:top-6 lg:right-6",
    tailPosition: "bottom-left",
    arrowIcon: <ArrowUpLeft className="w-3.5 h-3.5 text-[#ff7417]" />,
  },
  {
    step: "03 / IMPLEMENTAÇÃO",
    icon: <Cpu className="w-5 h-5 text-[#ff7417]" />,
    title: "Execução Técnica Rigorosa",
    desc: "Manutenção preventiva e corretiva com peças de procedência e código limpo. Cada detalhe é testado em bancada para durar.",
    tag: "Confiabilidade & Segurança",
    position: "md:bottom-2 md:left-4 lg:bottom-6 lg:left-6",
    tailPosition: "top-right",
    arrowIcon: <ArrowDownRight className="w-3.5 h-3.5 text-[#ff7417]" />,
  },
  {
    step: "04 / SUCESSO",
    icon: <ShieldCheck className="w-5 h-5 text-[#ff7417]" />,
    title: "Suporte & Continuidade",
    desc: "Acompanhamento contínuo e parceria técnica de longo prazo para que seus computadores e sistemas nunca parem.",
    tag: "Sua operação protegida",
    position: "md:bottom-2 md:right-4 lg:bottom-6 lg:right-6",
    tailPosition: "top-left",
    arrowIcon: <ArrowDownLeft className="w-3.5 h-3.5 text-[#ff7417]" />,
  },
];

export default function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Animações de progresso no scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  // Linhas de ligação desenhadas com o scroll
  const lineProgress1 = useTransform(scrollYProgress, [0.08, 0.28], [650, 0]);
  const lineProgress2 = useTransform(scrollYProgress, [0.22, 0.42], [650, 0]);
  const lineProgress3 = useTransform(scrollYProgress, [0.36, 0.56], [650, 0]);
  const lineProgress4 = useTransform(scrollYProgress, [0.48, 0.68], [650, 0]);

  // Transição de escala e opacidade de cada etapa
  const scaleNode1 = useTransform(scrollYProgress, [0.12, 0.3], [0.85, 1]);
  const opacityNode1 = useTransform(scrollYProgress, [0.12, 0.3], [0.15, 1]);

  const scaleNode2 = useTransform(scrollYProgress, [0.26, 0.44], [0.85, 1]);
  const opacityNode2 = useTransform(scrollYProgress, [0.26, 0.44], [0.15, 1]);

  const scaleNode3 = useTransform(scrollYProgress, [0.4, 0.58], [0.85, 1]);
  const opacityNode3 = useTransform(scrollYProgress, [0.4, 0.58], [0.15, 1]);

  const scaleNode4 = useTransform(scrollYProgress, [0.52, 0.7], [0.85, 1]);
  const opacityNode4 = useTransform(scrollYProgress, [0.52, 0.7], [0.15, 1]);

  const nodeScales = [scaleNode1, scaleNode2, scaleNode3, scaleNode4];
  const nodeOpacities = [opacityNode1, opacityNode2, opacityNode3, opacityNode4];

  return (
    <section
      ref={containerRef}
      id="sobre"
      className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-visible"
    >
      {/* Heading */}
      <div className="text-center flex flex-col items-center mb-16">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-[#ff7417] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>02</span> NOSSA ABORDAGEM
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight mb-4">
          Como a IT THECNICA <br />
          <span className="text-[#ff7417] italic">resolve o seu desafio.</span>
        </h2>
        <p className="max-w-md text-sm text-[#99999e] leading-relaxed">
          Role a página para ver nosso ecossistema técnico em ação: as etapas se
          desdobram da logo central diretamente para a solução.
        </p>
      </div>

      {/* Stage Container */}
      <div className="relative min-h-[720px] w-full flex items-center justify-center">
        {/* Linhas de conexão vetoriais (Desktop) */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1000 660"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradPath1" x1="50%" y1="50%" x2="20%" y2="15%">
              <stop offset="0%" stopColor="#ff7417" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ff9b35" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="gradPath2" x1="50%" y1="50%" x2="80%" y2="15%">
              <stop offset="0%" stopColor="#ff7417" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ff9b35" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="gradPath3" x1="50%" y1="50%" x2="20%" y2="85%">
              <stop offset="0%" stopColor="#ff7417" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ff9b35" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="gradPath4" x1="50%" y1="50%" x2="80%" y2="85%">
              <stop offset="0%" stopColor="#ff7417" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ff9b35" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* 4 conexões até o núcleo central */}
          <motion.path
            d="M 500 330 C 370 330, 260 210, 210 135"
            stroke="url(#gradPath1)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="650"
            style={{ strokeDashoffset: lineProgress1 }}
            className="filter drop-shadow-[0_0_10px_rgba(255,116,23,0.7)]"
          />
          <motion.path
            d="M 500 330 C 630 330, 740 210, 790 135"
            stroke="url(#gradPath2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="650"
            style={{ strokeDashoffset: lineProgress2 }}
            className="filter drop-shadow-[0_0_10px_rgba(255,116,23,0.7)]"
          />
          <motion.path
            d="M 500 330 C 370 330, 260 450, 210 525"
            stroke="url(#gradPath3)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="650"
            style={{ strokeDashoffset: lineProgress3 }}
            className="filter drop-shadow-[0_0_10px_rgba(255,116,23,0.7)]"
          />
          <motion.path
            d="M 500 330 C 630 330, 740 450, 790 525"
            stroke="url(#gradPath4)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="650"
            style={{ strokeDashoffset: lineProgress4 }}
            className="filter drop-shadow-[0_0_10px_rgba(255,116,23,0.7)]"
          />
        </svg>

        {/* NÚCLEO CENTRAL COM A LOGO DA IT THECNICA */}
        <div className="relative z-20 flex flex-col items-center justify-center my-8 md:my-0 group cursor-pointer">
          {/* Ondas de choque periódicas expandindo */}
          <div className="absolute -inset-10 rounded-full border border-dashed border-[#ff7417]/40 animate-[spin_24s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-16 rounded-full border border-white/5 animate-[spin_38s_linear_infinite_reverse] pointer-events-none" />
          <div className="absolute -inset-12 rounded-full bg-[#ff7417]/25 blur-3xl animate-pulse pointer-events-none" />

          {/* Emblema Central */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-b from-[#1c1e27] to-[#0c0d12] border-2 border-[#ff7417]/60 flex flex-col items-center justify-center shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_0_40px_rgba(255,116,23,0.35)] group-hover:scale-105 group-hover:border-[#ff9b35] transition-all duration-300">
            <Image
              src="/assets/logo-it-thecnica.png"
              alt="Núcleo IT THECNICA"
              width={120}
              height={100}
              className="w-24 md:w-32 h-auto object-contain drop-shadow-[0_0_14px_rgba(255,116,23,0.45)]"
            />
            <span className="absolute -bottom-3.5 px-3.5 py-1 rounded-full bg-[#0d0f14] border border-[#ff7417]/50 text-[9px] font-mono font-bold tracking-wider text-[#ff9b35] whitespace-nowrap shadow-xl">
              NÚCLEO DE SOLUÇÕES
            </span>
          </div>
        </div>

        {/* 4 etapas da abordagem */}
        <div className="w-full md:absolute md:inset-0 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 pointer-events-auto md:pointer-events-none z-20">
          {NODES.map((node, idx) => (
            <motion.div
              key={idx}
              onClick={() => setActiveNode(activeNode === idx ? null : idx)}
              style={{
                scale: nodeScales[idx],
                opacity: nodeOpacities[idx],
              }}
              className={`md:absolute ${node.position} w-full md:w-[325px] p-6 rounded-[28px] bg-[#12141c]/95 border ${activeNode === idx
                  ? "border-[#ff7417] shadow-[0_0_40px_rgba(255,116,23,0.4)]"
                  : "border-[#ff7417]/25 hover:border-[#ff7417]/60"
                } backdrop-blur-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_24px_rgba(255,116,23,0.12)] pointer-events-auto transition-all duration-300 cursor-pointer group relative`}
            >
              {/* Indicador apontando para o centro */}
              {node.tailPosition === "bottom-right" && (
                <div className="hidden md:block absolute -bottom-3 right-10 w-6 h-6 bg-[#12141c] border-r border-b border-[#ff7417]/30 transform rotate-45 pointer-events-none" />
              )}
              {node.tailPosition === "bottom-left" && (
                <div className="hidden md:block absolute -bottom-3 left-10 w-6 h-6 bg-[#12141c] border-l border-b border-[#ff7417]/30 transform -rotate-45 pointer-events-none" />
              )}
              {node.tailPosition === "top-right" && (
                <div className="hidden md:block absolute -top-3 right-10 w-6 h-6 bg-[#12141c] border-r border-t border-[#ff7417]/30 transform -rotate-45 pointer-events-none" />
              )}
              {node.tailPosition === "top-left" && (
                <div className="hidden md:block absolute -top-3 left-10 w-6 h-6 bg-[#12141c] border-l border-t border-[#ff7417]/30 transform rotate-45 pointer-events-none" />
              )}

              {/* Top tag & Direction arrow */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff9b35] bg-[#ff7417]/10 px-2.5 py-0.5 rounded-full border border-[#ff7417]/25">
                  {node.step}
                </span>
                <div className="w-7 h-7 rounded-full bg-[#ff7417]/10 border border-[#ff7417]/30 flex items-center justify-center text-[#ff7417] group-hover:bg-[#ff7417] group-hover:text-black transition-all duration-200">
                  {node.arrowIcon}
                </div>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  {node.icon}
                </div>
                <h3 className="font-heading text-base lg:text-lg font-semibold text-white leading-snug">
                  {node.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-[#a4a5ac] leading-relaxed mb-4">
                {node.desc}
              </p>

              {/* Footer info pill */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-semibold tracking-wide text-[#8b8c94]">
                <span>{node.tag}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff7417]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
