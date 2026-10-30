"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkle } from "lucide-react";

const ITEMS = [
  "MANUTENÇÃO",
  "DESENVOLVIMENTO WEB",
  "SISTEMAS DE GESTÃO",
  "SUPORTE TÉCNICO",
  "AUTOMAÇÃO",
];

export default function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let offset = 0;
    const baseSpeed = 0.95;
    let currentSpeed = baseSpeed;
    let lastScrollY = window.scrollY;
    let animId: number;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      if (delta > 2) {
        currentSpeed = Math.min(6.5, currentSpeed + delta * 0.09);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      const targetSpeed = isHovered ? 0.3 : baseSpeed;
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;
      offset += currentSpeed;

      if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2 || 1000;
        if (offset >= halfWidth) {
          offset = 0;
        }
        trackRef.current.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHovered]);

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden py-5 bg-[#090a0d] border-y border-white/10 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] select-none"
      aria-label="Serviços IT THECNICA"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-10 w-max will-change-transform cursor-grab"
      >
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-10">
            <span className="font-heading text-xs font-semibold tracking-[2.6px] text-[#c5c5c7] hover:text-[#ff7417] transition-colors duration-200">
              {item}
            </span>
            <Sparkle className="w-3.5 h-3.5 text-[#ff7417] animate-[spin_10s_linear_infinite]" />
          </div>
        ))}
      </div>
    </section>
  );
}
