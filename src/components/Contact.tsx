"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5531998782969";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Conheci a IT THECNICA pelo site e gostaria de conversar sobre uma solução."
);

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 650);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.45 + 0.15,
      });
    }

    let time = 0;
    let animId: number;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Aurora Cósmica centralizada integrada ao tom escuro da marca
      const cx = width * 0.5 + Math.sin(time * 0.8) * 40;
      const cy = height * 0.5 + Math.cos(time * 0.9) * 30;
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, width * 0.45);
      grad.addColorStop(0, "rgba(255, 116, 23, 0.14)");
      grad.addColorStop(0.5, "rgba(255, 155, 53, 0.04)");
      grad.addColorStop(1, "rgba(8, 9, 11, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 180, 110, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleWhatsappClick = (e: React.MouseEvent) => {
    if (!WHATSAPP_NUMBER || (WHATSAPP_NUMBER as string) === "5500000000000") {
      e.preventDefault();
      alert(
        "Antes de publicar, configure o número comercial da IT THECNICA no arquivo Contact.tsx."
      );
    }
  };

  return (
    <section
      id="contato"
      className="relative min-h-[580px] py-32 px-6 md:px-12 bg-[#08090b] overflow-hidden flex items-center justify-center border-t border-white/5"
    >
      {/* Fundo dinâmico */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Marca d'água de fundo */}
      <div
        className="absolute right-[8%] top-1/2 -translate-y-1/2 -rotate-12 font-heading font-bold text-[clamp(180px,28vw,420px)] text-white/[0.02] tracking-tighter leading-none select-none pointer-events-none z-0"
        aria-hidden="true"
      >
        IT<span className="text-[#ff7417]/10">.</span>
      </div>

      {/* Órbitas 3D de ressonância ao redor da chamada (como na Hero) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[360px] md:w-[540px] h-[360px] md:h-[540px] rounded-full border border-white/[0.04] animate-[spin_50s_linear_infinite]" />
        <div className="absolute w-[460px] md:w-[680px] h-[460px] md:h-[680px] rounded-full border border-[#ff7417]/[0.08] animate-[spin_65s_linear_infinite_reverse]" />
        <div className="absolute w-[240px] md:w-[380px] h-[240px] md:h-[380px] rounded-full bg-[#ff7417]/[0.06] blur-3xl animate-pulse" />
      </div>

      {/* Conteúdo Central Monumental e Aberto (Sem Card) */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow oficial com número */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-[#ff7417] mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7417]" />
          <span>03</span> VAMOS TIRAR A IDEIA DO PAPEL?
        </motion.div>

        {/* Título Monumental no padrão de toda a Landing Page */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08] mb-6"
        >
          Seu próximo passo <br />
          começa com uma <span className="text-[#ff7417] italic">conversa.</span>
        </motion.h2>

        {/* Parágrafo de apoio fiel ao estilo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl text-sm sm:text-base md:text-lg text-[#9fa0a6] leading-relaxed mb-10"
        >
          Precisa de suporte técnico especializado ou quer desenvolver uma solução
          para o seu negócio? Vamos conversar sobre o que faz sentido para você.
        </motion.p>

        {/* Botão Oficial IT THECNICA (Botão com luz âmbar e magnetismo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative group"
        >
          {/* Glow de atração atrás do botão */}
          <div className="absolute -inset-1 rounded-full bg-[#ff7417]/50 blur-lg opacity-40 group-hover:opacity-90 group-hover:blur-xl transition-all duration-300" />

          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
            className="relative inline-flex items-center gap-3 px-9 py-4 md:py-4.5 rounded-full bg-[#ff7417] text-black font-heading font-semibold text-sm md:text-base tracking-wide hover:bg-[#ff9b35] transition-all duration-300 shadow-[0_12px_32px_-4px_rgba(255,116,23,0.45)]"
          >
            <span>Chamar no WhatsApp</span>
            <div className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
          </Link>
        </motion.div>

        {/* Nota clássica discreta de rodapé de contato */}
        <motion.small
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-xs text-[#75767d] tracking-wide"
        >
          Atendimento direto e sem complicação.
        </motion.small>
      </div>
    </section>
  );
}
