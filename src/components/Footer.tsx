"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Activity } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-[#08090b] text-[#8e8f96] text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <Link href="#home" className="font-heading font-bold text-sm tracking-wider text-white">
          IT <span className="text-[#a1a1a5]">THECNICA</span>
        </Link>

        <span className="text-center">Tecnologia que impulsiona.</span>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[#a1a1a5] hover:text-[#ff7417] transition-colors"
        >
          VOLTAR AO TOPO <ArrowUp className="w-3 h-3" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6b6c72]">
        <span>© {currentYear} IT THECNICA. Todos os direitos reservados.</span>
        <span>
          Desenvolvido por <strong className="text-white">Daniel Wallans</strong>
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-[#ff7417]">
          FEITO COM INTENÇÃO <Activity className="w-3 h-3 text-[#ff7417]" />
        </span>
      </div>
    </footer>
  );
}
