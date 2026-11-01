"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* Abertura editorial: texto grande alinhado à esquerda, sem selos nem brilhos */
export default function Statement() {
  return (
    <section id="apresentacao" className="bg-ink px-6 md:px-12 pt-32 pb-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
        <p className="lg:col-span-3 font-mono text-sm text-sand pt-3">
          Manutenção <span className="text-brand">/</span> Web <span className="text-brand">/</span> Gestão
        </p>

        <div className="lg:col-span-9">
          <h2 className="font-heading text-[2.4rem] leading-[1.05] sm:text-6xl lg:text-[5.2rem] font-medium tracking-[-0.03em] text-cream">
            Do equipamento ao sistema, a gente cuida da tecnologia
            <span className="text-sand"> para você cuidar do seu trabalho.</span>
          </h2>

          <div className="mt-14 grid sm:grid-cols-2 gap-10 border-t border-line pt-10">
            <p className="text-base md:text-lg text-sand leading-relaxed max-w-md">
              Computador lento, impressora parada ou um processo que ainda vive
              em planilha: resolvemos com diagnóstico honesto e entrega que
              dura.
            </p>
            <div className="flex flex-col items-start gap-5 sm:items-end sm:justify-end">
              <Link
                href="#contato"
                className="group inline-flex items-center gap-3 bg-brand text-ink px-7 py-4 font-semibold text-sm shadow-[5px_5px_0_0_#efe7de] hover:shadow-[2px_2px_0_0_#efe7de] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200"
              >
                Fale com um técnico
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#solucoes"
                className="text-sm text-cream underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand-soft transition-colors"
              >
                Ver o que fazemos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
