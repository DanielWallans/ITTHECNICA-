"use client";

import { ArrowUpRight } from "lucide-react";

const WHATSAPP_NUMBER = "5531998782969";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Conheci a IT THECNICA pelo site e gostaria de conversar sobre uma solução."
);
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/* Bloco de contato em creme — inverte o contraste do site para fechar forte */
export default function Contact() {
  return (
    <section id="contato" className="bg-cream text-ink px-6 md:px-12 py-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <h2 className="font-heading text-[2.6rem] leading-[1] sm:text-6xl lg:text-[6.5rem] font-medium tracking-[-0.04em]">
            Seu próximo passo começa com uma conversa.
          </h2>
          <p className="mt-8 max-w-xl text-lg text-[#4a3f37] leading-relaxed">
            Suporte técnico ou um projeto novo para o seu negócio — conte o que
            precisa e a gente responde direto, sem robô no meio.
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 bg-ink text-cream px-7 py-6 font-semibold text-lg shadow-[6px_6px_0_0_#ff7a1a] hover:shadow-[2px_2px_0_0_#ff7a1a] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
          >
            Chamar no WhatsApp
            <ArrowUpRight className="w-6 h-6 text-brand transition-transform group-hover:rotate-45" />
          </a>
          <dl className="grid grid-cols-2 gap-4 text-sm border-t border-ink/15 pt-6">
            <div>
              <dt className="font-mono text-xs text-[#6f645a]">WhatsApp</dt>
              <dd className="mt-1 font-medium">(31) 99878-2969</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-[#6f645a]">Atendimento</dt>
              <dd className="mt-1 font-medium">Presencial e remoto</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
