"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y > 60);
      setScrolled(y > 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[84px] px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
        } ${scrolled
          ? "bg-[#08090b]/80 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <Link href="#home" className="flex items-center gap-2 group">
        <Image
          src="/assets/logo-header.png"
          alt="IT THECNICA"
          width={160}
          height={48}
          style={{ width: "auto" }}
          className="h-10 md:h-12 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(255,116,23,0.3)]"
          priority
        />
      </Link>

      {/* Navegação Desktop */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-[#a1a1a5]">
        <Link
          href="#solucoes"
          className="hover:text-[#ff7417] transition-colors duration-200"
        >
          Soluções
        </Link>
        <Link
          href="#desenvolvimento-web"
          className="hover:text-[#ff7417] transition-colors duration-200"
        >
          Desenvolvimento Web
        </Link>
        <Link
          href="#sobre"
          className="hover:text-[#ff7417] transition-colors duration-200"
        >
          Abordagem
        </Link>
        <Link
          href="#contato"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#ff7417]/30 bg-[#ff7417]/10 text-[#f5f5f2] hover:bg-[#ff7417] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,116,23,0.15)] group"
        >
          Vamos conversar
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </nav>

      {/* Botão Menu Mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg border border-white/10 bg-[#101114] text-white"
        aria-label="Abrir menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="absolute top-[84px] left-0 right-0 bg-[#0c0d10] border-b border-white/10 p-6 flex flex-col gap-4 text-sm md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <Link
            href="#solucoes"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-white/5 hover:text-[#ff7417]"
          >
            Soluções
          </Link>
          <Link
            href="#desenvolvimento-web"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-white/5 hover:text-[#ff7417]"
          >
            Desenvolvimento Web
          </Link>
          <Link
            href="#sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-white/5 hover:text-[#ff7417]"
          >
            Abordagem
          </Link>
          <Link
            href="#contato"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#ff7417] text-black font-semibold mt-2"
          >
            Vamos conversar <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
