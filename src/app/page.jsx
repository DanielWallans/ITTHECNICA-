"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import WebShowcase from "@/components/WebShowcase";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Assemble from "@/components/Assemble";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setScrollProgress(window.scrollY / docHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-[100svh] bg-ink overflow-x-clip">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <Hero />
      <Assemble><Statement /></Assemble>
      <Ticker />
      <Assemble from="left"><Services /></Assemble>
      <WebShowcase />
      <Approach />
      <Assemble><Contact /></Assemble>
      <Footer />
    </main>
  );
}
