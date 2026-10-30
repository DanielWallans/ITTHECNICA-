"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Statement() {
  return (
    <section
      id="apresentacao"
      className="relative py-28 px-6 md:px-12 bg-[#08090b] flex justify-center border-t border-white/5"
    >
      <div className="max-w-3xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 text-[10px] md:text-xs font-mono font-semibold tracking-widest text-[#ff9b35] mb-6"
        >
          <span className="w-6 h-[1px] bg-[#ff7417]" />
          TECNOLOGIA • SUPORTE • DESENVOLVIMENTO
          <span className="w-6 h-[1px] bg-[#ff7417]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.08] text-white mb-6"
        >
          Tecnologia que move <br className="hidden sm:inline" />
          o seu <span className="text-[#ff7417] italic">próximo nível.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl text-[#a8a8ad] text-base md:text-lg leading-relaxed mb-8"
        >
          Do equipamento ao sistema, soluções inteligentes para manter tudo
          funcionando e transformar ideias em resultados concretos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#contato"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ff7417] text-black font-semibold text-sm hover:bg-[#ff9b35] transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(255,116,23,0.4)] group"
          >
            Fale com um especialista
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="#solucoes"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-all duration-300"
          >
            Conheça as soluções
            <ArrowDown className="w-4 h-4 text-[#ff7417]" />
          </Link>
        </motion.div>

        <div className="mt-10 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#77787d]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7417] animate-pulse" />
          MANUTENÇÃO • WEB • SISTEMAS DE GESTÃO
        </div>
      </div>
    </section>
  );
}
