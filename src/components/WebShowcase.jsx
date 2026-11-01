"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* IT DESK na linguagem do hero: seção presa na tela enquanto um chamado
   percorre as 3 etapas da plataforma conforme o scroll. */

const STAGES = [
  {
    key: "abertura",
    label: "Chamado",
    title: "O cliente abre o chamado.",
    desc: "Pelo portal, responde um checklist rápido e já entra na fila, com prioridade e histórico.",
    status: "Na fila",
    color: "#a8998b",
  },
  {
    key: "remoto",
    label: "Acesso remoto",
    title: "A gente conecta e resolve.",
    desc: "Sessão AnyDesk direto do painel, com cronômetro registrando cada minuto de atendimento.",
    status: "Em atendimento",
    color: "#ff7a1a",
  },
  {
    key: "pix",
    label: "Financeiro",
    title: "Fecha com Pix na hora.",
    desc: "Valor calculado pelo tempo, QR Code gerado e baixa do pagamento em um clique.",
    status: "Pago",
    color: "#3ddc84",
  },
];

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function WebShowcase() {
  const rootRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });
  const P = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const bar = useTransform(P, [0.05, 0.95], ["0%", "100%"]);

  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);
  const [secs, setSecs] = useState(0);
  const [pct, setPct] = useState(0);

  useMotionValueEvent(P, "change", (v) => {
    const s = v < 0.36 ? 0 : v < 0.7 ? 1 : 2;
    if (stageRef.current !== s) {
      stageRef.current = s;
      setStage(s);
      // toque leve ao mudar de etapa (Android)
      if (navigator.vibrate) {
        try { navigator.vibrate(12); } catch {}
      }
    }
    // cronômetro "roda" durante a etapa de acesso remoto
    const t = Math.min(1, Math.max(0, (v - 0.36) / 0.34));
    setSecs(Math.round(t * 1395));
    setPct(Math.round(Math.min(1, Math.max(0, (v - 0.05) / 0.9)) * 100));
  });

  const cur = STAGES[stage];
  const valor = ((secs / 3600) * 120).toFixed(2).replace(".", ",");

  return (
    <section id="desenvolvimento-web" ref={rootRef} className="relative h-[300svh] bg-ink font-mono">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center px-5 md:px-[6.5vw] pt-20 pb-6 md:py-24">
        {/* luz quente igual ao hero */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_45%_40%_at_70%_50%,rgba(255,110,20,0.12),transparent_70%)]"
        />

        <div className="relative grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-center max-w-[1400px] w-full mx-auto">
          {/* Texto */}
          <div>
            <div className="flex items-center gap-4 mb-4 md:mb-8">
              <Image
                src="/assets/logo-it-desk.png"
                alt="IT DESK"
                width={160}
                height={42}
                unoptimized
                style={{ width: "auto" }}
                className="h-6 md:h-7 object-contain"
              />
              <span className="hidden sm:inline text-sm font-bold text-sand">{"// Feito pela IT Thecnica"}</span>
            </div>

            <h2 className="text-[clamp(28px,3.4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#f6efe7]">
              Um sistema nosso,
              <br />
              rodando de verdade<span className="text-brand">.</span>
            </h2>

            <div className="mt-5 md:mt-10 min-h-[96px] md:min-h-[130px]">
              <motion.div
                key={cur.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-sm font-bold text-sand">
                  <span className="text-brand">{"//"}</span> 0{stage + 1} {cur.label}
                </div>
                <p className="mt-3 text-[clamp(20px,1.9vw,28px)] font-extrabold leading-tight text-[#f6efe7]">
                  {cur.title}
                </p>
                <p className="mt-2 md:mt-3 max-w-md font-sans text-sm md:text-base text-sand leading-relaxed">{cur.desc}</p>
              </motion.div>
            </div>

            <div className="hidden lg:flex mt-10 flex-wrap gap-x-8 gap-y-4 text-sm font-bold">
              <a
                href="https://itdeskweb.vercel.app/atendimento"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#f6efe7] hover:text-brand transition-colors"
              >
                Abrir ao vivo <ArrowUpRight className="w-4 h-4 text-brand" />
              </a>
              <a
                href="https://wa.me/5531998782969?text=Ol%C3%A1!%20Vi%20o%20projeto%20IT%20DESK%20no%20site%20da%20IT%20THECNICA%20e%20quero%20conversar%20sobre%20um%20projeto%20web."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sand hover:text-[#f6efe7] transition-colors"
              >
                Quero um sistema assim <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Chamado "ao vivo" — tipográfico, sem print */}
          <div className="relative">
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <span className="text-sm font-bold text-sand">{"// Chamado"} #2481</span>
              <span className="flex items-center gap-2 text-sm font-bold" style={{ color: cur.color }}>
                <span
                  className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
                  style={{ background: cur.color, boxShadow: `0 0 12px ${cur.color}` }}
                />
                {cur.status}
              </span>
            </div>

            <dl className="divide-y divide-line">
              <Row k="Cliente" v="Escritório Contábil" />
              <Row k="Problema" v="Impressora não imprime" />
              <Row k="Conexão" v={stage === 0 ? "—" : "AnyDesk · 418 552 903"} dim={stage === 0} />
              <Row k="Tempo" v={fmt(secs)} big accent={stage === 1} />
              <Row
                k="Valor"
                v={stage === 2 ? `R$ ${valor}` : "—"}
                big
                dim={stage !== 2}
                extra={
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: stage === 2 ? 1 : 0, scale: stage === 2 ? 1 : 0.6, rotate: stage === 2 ? 0 : -12 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="block shrink-0"
                  >
                    <QrMark />
                  </motion.span>
                }
              />
            </dl>

          </div>
        </div>

        {/* Progresso — mesma linguagem do "ROLE PARA MONTAR" */}
        <div className="relative mt-6 md:mt-14 lg:mt-20 max-w-[1400px] w-full mx-auto">
          <div className="grid grid-cols-3 text-[10px] md:text-xs font-bold tracking-[0.12em] md:tracking-[0.18em] uppercase">
            {STAGES.map((s, i) => (
              <span key={s.key} className={i <= stage ? "text-[#f6efe7]" : "text-dust"}>
                0{i + 1} {s.label}
              </span>
            ))}
          </div>
          <div className="relative mt-3 h-[2px] bg-[rgba(239,231,222,.15)]">
            <motion.div style={{ width: bar }} className="absolute inset-y-0 left-0 bg-brand" />
          </div>
          <div className="mt-3 text-right text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.24em] text-sand">
            {pct > 98 ? "IT DESK // ATENDIMENTO CONCLUÍDO" : `ROLE PARA ATENDER · ${String(pct).padStart(2, "0")}%`}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, big, dim, accent, extra }) {
  return (
    <div className="flex items-center justify-between gap-6 py-2.5 md:py-4">
      <dt className="text-sm font-bold text-sand">{k}</dt>
      <dd className="flex items-center gap-4">
        {extra}
        <span
        className={`text-right font-extrabold tabular-nums transition-colors duration-500 ${
          big ? "text-[clamp(22px,2.4vw,36px)]" : "text-base"
        } ${dim ? "text-dust" : accent ? "text-brand" : "text-[#f6efe7]"}`}
      >
        {v}
        </span>
      </dd>
    </div>
  );
}

/* QR ilustrativo 21x21 com os três marcadores de canto */
function QrMark() {
  const N = 21;
  const finder = (x, y, ox, oy) => {
    const dx = x - ox, dy = y - oy;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
    const ring = Math.max(Math.abs(dx - 3), Math.abs(dy - 3));
    return ring === 3 || ring <= 1;
  };
  const cells = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      let on = finder(x, y, 0, 0) ?? finder(x, y, N - 7, 0) ?? finder(x, y, 0, N - 7);
      if (on === null) {
        if ((x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9)) on = false;
        else on = ((x * 7 + y * 13 + x * y) % 5) < 2;
      }
      if (on) cells.push(<rect key={x + "-" + y} x={x} y={y} width="1" height="1" />);
    }
  return (
    <svg viewBox="-2 -2 25 25" className="w-14 h-14 md:w-16 md:h-16 bg-[#f6efe7] fill-ink" shapeRendering="crispEdges">
      {cells}
    </svg>
  );
}
