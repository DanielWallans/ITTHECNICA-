"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

const LINKS = [
  ["Serviços", "#solucoes"],
  ["IT DESK", "#desenvolvimento-web"],
  ["Como trabalhamos", "#sobre"],
  ["Contato", "#contato"],
];

export default function Footer() {
  const yearRef = useRef(null);
  // Ano atualizado no cliente (evita valor fixo do prerender)
  useEffect(() => {
    if (yearRef.current) yearRef.current.textContent = String(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-ink px-6 md:px-12 pt-20 pb-8 text-sand">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-16">
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {LINKS.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-cream transition-colors">
                {label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="self-start inline-flex items-center gap-2 text-sm hover:text-brand transition-colors cursor-pointer"
          >
            Voltar ao topo <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <p
          aria-hidden="true"
          className="font-heading font-semibold tracking-[-0.05em] leading-[0.8] text-[17vw] lg:text-[15rem] text-umber select-none"
        >
          IT THECNICA
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-dust border-t border-line pt-6">
          <span>© <span ref={yearRef}>2026</span> IT THECNICA. Todos os direitos reservados.</span>
          <span>
            Desenvolvido por <span className="text-cream">Daniel Wallans</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
