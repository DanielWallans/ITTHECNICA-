"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* Faz uma seção "se montar" conforme entra na tela: vem inclinada em
   perspectiva, deslocada e desfocada, e encaixa no lugar acompanhando o scroll
   (mesma linguagem da logo montada por peças no hero). */
export default function Assemble({
  children,
  from = "bottom",
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  const side = from === "left" ? -1 : from === "right" ? 1 : 0;
  const rotateX = useTransform(p, [0, 1], [side ? 0 : 28, 0]);
  const rotateY = useTransform(p, [0, 1], [side * 22, 0]);
  const x = useTransform(p, [0, 1], [side * 140, 0]);
  const y = useTransform(p, [0, 1], [side ? 40 : 160, 0]);
  const scale = useTransform(p, [0, 1], [0.86, 1]);
  const opacity = useTransform(p, [0, 0.55], [0, 1]);
  const blur = useTransform(p, [0, 0.7], [10, 0]);
  const filter = useTransform(blur, (b) => (b < 0.1 ? "none" : `blur(${b}px)`));

  if (reduce) return <div>{children}</div>;

  return (
    <div ref={ref} className="[perspective:1400px]">
      <motion.div
        style={{ rotateX, rotateY, x, y, scale, opacity, filter, transformOrigin: "50% 0%" }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
