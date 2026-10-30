"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shineCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState({ x: 0, y: 0, radial: "0.0°" });
  const [reticlePos, setReticlePos] = useState({ x: -100, y: -100, active: false });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [shockwaves, setShockwaves] = useState<number[]>([]);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.85]);
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);

  // Efeito ao interagir com a logo
  const triggerShockwave = () => {
    const id = Date.now();
    setShockwaves((prev) => [...prev, id]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((item) => item !== id));
    }, 1200);
  };

  useEffect(() => {
    let rawX = 0;
    let rawY = 0;
    let currentReticleX = -100;
    let currentReticleY = -100;

    const handlePointerMove = (e: PointerEvent) => {
      rawX = e.clientX;
      rawY = e.clientY;
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      const nx = (e.clientX / ww - 0.5) * 2;
      const ny = (e.clientY / wh - 0.5) * 2;

      setTilt({ rx: -ny * 14, ry: nx * 18 });

      const angleRad = Math.atan2(ny, nx);
      const angleDeg = Math.round(((angleRad * 180) / Math.PI + 360) % 360);
      setCoords({
        x: Math.round(nx * 320),
        y: Math.round(ny * 180),
        radial: `${angleDeg}.0°`,
      });
      setReticlePos((prev) => ({ ...prev, active: window.scrollY < wh * 0.9 }));
    };

    const handlePointerLeave = () => {
      setTilt({ rx: 0, ry: 0 });
      setReticlePos((prev) => ({ ...prev, active: false }));
      setIsHovered(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    let animId: number;
    const updateReticle = () => {
      currentReticleX += (rawX - currentReticleX) * 0.18;
      currentReticleY += (rawY - currentReticleY) * 0.18;
      setReticlePos((prev) => ({
        ...prev,
        x: currentReticleX,
        y: currentReticleY,
      }));
      animId = requestAnimationFrame(updateReticle);
    };
    animId = requestAnimationFrame(updateReticle);

    // Fundo dinâmico com partículas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      isOrange: boolean;
      pulse: number;
    }> = [];

    const count = width < 700 ? 30 : 55;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.45 + 0.15,
        isOrange: Math.random() > 0.35,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let gridOffset = 0;
    const renderCanvas = () => {
      if (window.scrollY > height * 1.2) {
        requestAnimationFrame(renderCanvas);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Grade 3D Cibernética
      gridOffset = (gridOffset + 0.6) % 36;
      const horizonY = height * 0.62;
      const mxRatio = (rawX / width - 0.5) * 2;
      const vpX = width * 0.5 + mxRatio * 25;
      const vpY = horizonY - 40;

      ctx.save();
      const gridGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      gridGrad.addColorStop(0, "rgba(255, 116, 23, 0)");
      gridGrad.addColorStop(0.3, "rgba(255, 116, 23, 0.05)");
      gridGrad.addColorStop(1, "rgba(255, 116, 23, 0.18)");
      ctx.strokeStyle = gridGrad;
      ctx.lineWidth = 1;

      const pLines = width < 700 ? 14 : 26;
      for (let i = -pLines; i <= pLines; i++) {
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(width * 0.5 + i * 54 + mxRatio * 40, height + 30);
        ctx.stroke();
      }

      for (let j = 0; j < 9; j++) {
        const prog = ((j * 36 + gridOffset) % 324) / 324;
        const y = horizonY + Math.pow(prog, 1.85) * (height - horizonY);
        ctx.strokeStyle = `rgba(255, 116, 23, ${Math.sin(prog * Math.PI) * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Partículas & Conexões neurais
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.025;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.strokeStyle = p.isOrange
              ? `rgba(255, 116, 23, ${(1 - dist / 110) * 0.16})`
              : `rgba(255, 255, 255, ${(1 - dist / 110) * 0.09})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = p.isOrange
          ? `rgba(255, 126, 30, ${p.alpha + Math.sin(p.pulse) * 0.12})`
          : `rgba(230, 235, 245, ${p.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(renderCanvas);
    };
    renderCanvas();

    // Brilho metálico na logo (Shine Gleam)
    const shineCanvas = shineCanvasRef.current;
    if (shineCanvas) {
      const sCtx = shineCanvas.getContext("2d");
      let shineProgress = -1;

      const runShine = () => {
        shineProgress = 0;
      };

      const shineInterval = setInterval(() => {
        if (window.scrollY < height * 0.8 && shineProgress < 0) {
          runShine();
        }
      }, 5500);

      const renderShine = () => {
        if (sCtx && shineProgress >= 0) {
          const sw = (shineCanvas.width = 520);
          const sh = (shineCanvas.height = 380);
          sCtx.clearRect(0, 0, sw, sh);

          shineProgress += 0.024;
          if (shineProgress > 1.3) {
            shineProgress = -1;
          } else {
            const bx = shineProgress * (sw + sh) - sh * 0.5;
            const grad = sCtx.createLinearGradient(bx - 60, 0, bx + 60, sh);
            grad.addColorStop(0, "rgba(255, 255, 255, 0)");
            grad.addColorStop(0.3, "rgba(255, 160, 60, 0.2)");
            grad.addColorStop(0.5, "rgba(255, 255, 255, 0.65)");
            grad.addColorStop(0.7, "rgba(255, 140, 40, 0.25)");
            grad.addColorStop(1, "rgba(255, 255, 255, 0)");

            sCtx.fillStyle = grad;
            sCtx.beginPath();
            sCtx.moveTo(bx - 80, 0);
            sCtx.lineTo(bx + 40, 0);
            sCtx.lineTo(bx - 40, sh);
            sCtx.lineTo(bx - 160, sh);
            sCtx.closePath();
            sCtx.fill();
          }
        }
        requestAnimationFrame(renderShine);
      };
      renderShine();

      return () => {
        clearInterval(shineInterval);
      };
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#08090b]"
    >
      {/* Canvas Cibernético do Fundo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Iluminação volumétrica contínua (Aurora sem cortes) */}
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,116,23,0.1)_0%,transparent_65%),radial-gradient(circle_at_50%_65%,rgba(255,155,53,0.06)_0%,transparent_55%)] animate-pulse"
        style={{ animationDuration: "7s" }}
        aria-hidden="true"
      />

      {/* Marcadores Táticos Cibernéticos nos 4 Cantos da Tela */}
      <div className="hidden lg:flex items-center gap-2 absolute top-28 left-12 font-mono text-[10px] tracking-widest text-[#a6a7ae] pointer-events-none z-10 select-none">
        <span className="text-[#ff7417] font-bold">┌</span>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
        <span>STATUS:</span>
        <span className="text-emerald-400 font-semibold">DISPONÍVEL PARA PROJETOS</span>
      </div>

      <div className="hidden lg:block absolute top-28 right-12 font-mono text-[10px] tracking-widest text-[#a6a7ae] pointer-events-none z-10 select-none text-right">
        <span>ESPECIALIDADE:</span>{" "}
        <span className="text-[#ff9b35] font-semibold">SOLUÇÕES EM TI & WEB</span>{" "}
        <span className="text-[#ff7417] font-bold">┐</span>
      </div>

      <div className="hidden lg:block absolute bottom-14 left-12 font-mono text-[9px] tracking-widest text-white/30 pointer-events-none z-10 select-none">
        <span className="text-[#ff7417]">└</span> ENGENHARIA DE SOFTWARE & SUPORTE
      </div>

      <div className="hidden lg:block absolute bottom-14 right-12 font-mono text-[9px] tracking-widest text-white/30 pointer-events-none z-10 select-none text-right">
        IT THECNICA // ALTA PERFORMANCE <span className="text-[#ff7417]">┘</span>
      </div>

      {/* Retículo Cibernético Interativo que segue o cursor */}
      <div
        className={`fixed top-0 left-0 w-11 h-11 pointer-events-none z-50 transition-opacity duration-300 ${reticlePos.active ? "opacity-100" : "opacity-0"
          }`}
        style={{
          transform: `translate3d(${reticlePos.x - 22}px, ${reticlePos.y - 22}px, 0)`,
        }}
        aria-hidden="true"
      >
        <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#ff7417]/80" />
        <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#ff7417]/80" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#ff7417]/80" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#ff7417]/80" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#ff7417] rounded-full shadow-[0_0_8px_#ff7417]" />
        <span className="absolute left-12 top-2 px-1.5 py-0.5 rounded bg-[#08090b]/90 border border-[#ff7417]/30 text-[9px] font-mono text-[#ff9b35] whitespace-nowrap shadow-lg">
          {coords.x >= 0 ? `+${coords.x}` : coords.x} {coords.y >= 0 ? `+${coords.y}` : coords.y}
        </span>
      </div>

      {/* Camada Principal da Logo 3D */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-20 flex flex-col items-center justify-center p-4"
      >
        {/* Emblema da Logo com perspectiva 3D e Ondas de Choque */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={triggerShockwave}
          className="relative transition-transform duration-200 ease-out cursor-pointer group"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          }}
        >
          {/* Ondas de Choque disparadas ao clique */}
          {shockwaves.map((id) => (
            <motion.div
              key={id}
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-[#ff7417] pointer-events-none z-30"
            />
          ))}

          {/* Órbitas 3D giratórias em perspectiva */}
          <div
            className={`absolute inset-0 -m-8 md:-m-14 rounded-full border border-white/5 pointer-events-none transition-all duration-500 ${isHovered ? "border-[#ff7417]/30 scale-105" : ""
              } animate-[spin_28s_linear_infinite]`}
          />
          <div
            className={`absolute inset-0 -m-14 md:-m-24 rounded-full border border-[#ff7417]/15 pointer-events-none transition-all duration-500 ${isHovered ? "border-[#ff9b35]/40 scale-105" : ""
              } animate-[spin_40s_linear_infinite_reverse]`}
          />

          {/* Halo de luz volumétrica traseira */}
          <div className="absolute inset-0 bg-[#ff7417]/25 blur-3xl rounded-full scale-110 pointer-events-none animate-pulse" />

          {/* Reflexo Espelhado do Piso */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-[#ff7417] rounded-full blur-2xl opacity-25 pointer-events-none"
            aria-hidden="true"
          />

          {/* Imagem da Logo com Varredura Especular Canvas */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Image
              src="/assets/logo-it-thecnica.png"
              alt="IT THECNICA"
              width={560}
              height={420}
              className="w-[72vw] max-w-[500px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter transition-all duration-300 group-hover:brightness-110 group-hover:scale-[1.02]"
              priority
            />

            {/* Canvas de Varredura de Brilho Metálico Especular */}
            <canvas
              ref={shineCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de rolagem */}
      <Link
        href="#apresentacao"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#7f8087] hover:text-white transition-colors group"
      >
        <span className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <ChevronDown className="w-3.5 h-3.5 text-[#ff7417] animate-bounce" />
        </span>
        <span className="text-[9px] font-mono tracking-[2px] font-semibold text-[#8e8f96] group-hover:text-[#ff7417] transition-colors">
          ROLE PARA EXPLORAR
        </span>
      </Link>
    </section>
  );
}
