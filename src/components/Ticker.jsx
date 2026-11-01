"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  "Manutenção de computadores",
  "Impressoras",
  "Sites",
  "Sistemas de gestão",
  "Suporte remoto",
];

/* Faixa laranja chapada — acelera com o scroll */
export default function Ticker() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let offset = 0;
    let speed = 0.8;
    let lastY = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      const d = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      speed = Math.min(6, speed + d * 0.08);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      speed += (0.8 - speed) * 0.05;
      offset += speed;
      const el = trackRef.current;
      if (el) {
        const half = el.scrollWidth / 2 || 1000;
        if (offset >= half) offset -= half;
        el.style.transform = `translate3d(${-offset}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      aria-label="Serviços IT THECNICA"
      className="relative overflow-hidden bg-brand text-ink py-4 -rotate-[1.2deg] scale-[1.03] my-10 select-none"
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center font-heading text-xl md:text-2xl font-semibold tracking-tight">
            <span className="px-6">{item}</span>
            <span className="font-mono text-base opacity-60">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}
