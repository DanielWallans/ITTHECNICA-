"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const STEPS = [
  {
    title: "Diagnóstico",
    desc: "Ouvimos o problema e avaliamos o equipamento ou o processo. Você sabe a causa e o custo antes de qualquer coisa.",
  },
  {
    title: "Proposta sob medida",
    desc: "Da troca de uma peça a um sistema completo: só o que resolve, sem exagero e sem empurrar serviço.",
  },
  {
    title: "Execução",
    desc: "Peças de procedência e código limpo. Tudo testado em bancada antes de voltar para você.",
  },
  {
    title: "Acompanhamento",
    desc: "Depois da entrega, continuamos por perto para que nada pare.",
  },
];

/* Linha do tempo que se desenha com o scroll; cada etapa encaixa quando a
   linha chega nela. */
export default function Approach() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });
  const line = useTransform(p, [0, 1], [0, 1]);

  return (
    <section id="sobre" ref={ref} className="bg-ink px-6 md:px-12 py-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
          <h2 className="font-heading text-4xl sm:text-5xl font-medium tracking-[-0.03em] text-cream leading-[1.02]">
            Como trabalhamos
          </h2>
          <p className="mt-6 text-sand leading-relaxed max-w-sm">
            Quatro etapas simples, as mesmas para um notebook na bancada ou
            para um sistema novo.
          </p>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6 relative pl-10">
          <span aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: line }}
            className="absolute left-[7px] top-2 bottom-2 w-px bg-brand origin-top"
          />
          {STEPS.map((s, i) => (
            <Step key={s.title} step={s} index={i} progress={p} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({ step, index, progress }) {
  const start = index / STEPS.length;
  const end = start + 0.18;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const x = useTransform(progress, [start, end], [40, 0]);
  const dot = useTransform(progress, [start, start + 0.05], ["#3a302a", "#ff7a1a"]);

  return (
    <motion.li style={{ opacity, x }} className="relative pb-16 last:pb-0">
      <motion.span
        aria-hidden="true"
        style={{ backgroundColor: dot }}
        className="absolute -left-10 top-2 w-[15px] h-[15px] rounded-full ring-4 ring-ink"
      />
      <span className="font-mono text-sm text-sand">Etapa {index + 1}</span>
      <h3 className="mt-2 font-heading text-3xl md:text-4xl font-medium tracking-tight text-cream">
        {step.title}
      </h3>
      <p className="mt-3 text-lg text-sand leading-relaxed max-w-xl">{step.desc}</p>
    </motion.li>
  );
}
