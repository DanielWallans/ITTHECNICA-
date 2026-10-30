"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    tag: "01 / HARDWARE",
    title: "Manutenção de computadores",
    desc: "Diagnóstico, manutenção preventiva e corretiva para desktops e notebooks, com foco em estabilidade e desempenho.",
    linkText: "Preciso de suporte",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 stroke-current">
        <rect x="7" y="8" width="34" height="24" rx="2" strokeWidth="1.6" />
        <path d="M3 38h42M18 32l-2 6m14-6 2 6M14 15h20M14 21h12" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    tag: "02 / IMPRESSORAS",
    title: "Manutenção de impressoras",
    desc: "Limpeza preventiva, troca e desobstrução de cabeçotes de impressão, pressurização em sistema de dampers e calibração para garantir alta qualidade e vida útil.",
    linkText: "Solicitar manutenção",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 stroke-current">
        <rect x="8" y="5" width="32" height="25" rx="2" strokeWidth="1.6" />
        <path d="M5 36h38l-3 5H8l-3-5ZM13 11h22M13 16h13" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    tag: "03 / DIGITAL",
    title: "Sites e desenvolvimento web",
    desc: "Experiências digitais responsivas de alta conversão para apresentar sua marca, seus serviços e produtos com autoridade.",
    linkText: "Criar meu projeto",
    featured: true,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 stroke-current">
        <rect x="5" y="7" width="38" height="34" rx="3" strokeWidth="1.6" />
        <path d="M5 15h38M12 11h.1M17 11h.1M22 11h.1M18 23l-5 5 5 5M30 23l5 5-5 5M27 21l-5 14" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    tag: "04 / GESTÃO",
    title: "Sistemas de gestão",
    desc: "Sistemas personalizados sob medida para organizar rotinas, centralizar informações e tornar processos ágeis e eficientes.",
    linkText: "Automatizar meu negócio",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 stroke-current">
        <rect x="6" y="7" width="36" height="34" rx="3" strokeWidth="1.6" />
        <path d="M6 16h36M13 12h.1M18 12h.1M14 23h8v11h-8zM27 23h7M27 28h7M27 33h7" strokeWidth="1.6" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="solucoes" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-[#ff7417] mb-3">
            <span>01</span> O QUE FAZEMOS
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight">
            Tecnologia pensada <br />
            para <span className="text-[#ff7417] italic">resolver.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-[#99999e] leading-relaxed">
          Atendimento próximo, soluções práticas e tecnologia alinhada à
          necessidade real de cada pessoa ou negócio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICES.map((s, idx) => (
          <ServiceCard key={idx} service={s} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative min-h-[350px] p-6 rounded-xl bg-gradient-to-b from-[#151619] to-[#0e0f11] border ${service.featured ? "border-[#ff7417]/40" : "border-white/10"
        } flex flex-col justify-between hover:border-[#ff7417]/60 transition-all duration-300 overflow-hidden shadow-xl`}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(280px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,116,23,0.15),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#8d8d92]">
        <span>{service.tag}</span>
        <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[#ff7417] group-hover:bg-[#ff7417] group-hover:text-black transition-all duration-300">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div className="my-6">
        <div className="text-[#ff7417] mb-5 transition-transform duration-300 group-hover:-translate-y-1">
          {service.icon}
        </div>
        <h3 className="font-heading text-lg font-semibold text-white mb-2 leading-snug">
          {service.title}
        </h3>
        <p className="text-xs text-[#96969b] leading-relaxed">
          {service.desc}
        </p>
      </div>

      <Link
        href="#contato"
        className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-[#d9d9da] group-hover:text-white"
      >
        <span>{service.linkText}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#ff7417]" />
      </Link>
    </motion.div>
  );
}
