"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* Hero "Igloo inspired" — portado do Claude Design (Hero ITTHECNICA.dc.html).
   Terreno 3D com névoa + partículas em Three.js; a logo se monta a partir de
   peças conforme o scroll. */

const COLS = 12;
const ROWS = 8;
const PARTICLES = 4000;
const PALETTE = { bg: 0x0b0908, ground: 0x2a2420, rim: 0xff6a10, hemi: 0x3a2a20, fog: 0.032 };
const FOG_DENSITY = 0.3;

function makeSeeds() {
  const seeds = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const cx = (c + 0.5) / COLS - 0.5;
      const cy = (r + 0.5) / ROWS - 0.5;
      const ang = Math.atan2(cy, cx) + (Math.random() - 0.5) * 1.2;
      const dist = 260 + Math.random() * 520;
      seeds.push({
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist * 0.7 - 120 - Math.random() * 200,
        z: Math.random() * 600 - 200,
        rx: (Math.random() - 0.5) * 220,
        ry: (Math.random() - 0.5) * 220,
        rz: (Math.random() - 0.5) * 180,
        delay: (1 - Math.hypot(cx, cy) * 1.4) * 0.45 + Math.random() * 0.15,
        ph: Math.random() * 6.28,
      });
    }
  return seeds;
}

function noise(x, y) {
  const h = (a, b) => {
    const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y) {
  let t = 0, a = 1, f = 1;
  for (let i = 0; i < 5; i++) { t += a * noise(x * f, y * f); a *= 0.5; f *= 2.03; }
  return t;
}

export default function Hero() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const tilesRef = useRef(null);
  const glowRef = useRef(null);
  const barRef = useRef(null);
  const labelRef = useRef(null);

  const tiles = useMemo(() => {
    const out = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        out.push({
          key: `${r}-${c}`,
          left: `${(c / COLS) * 100}%`,
          top: `${(r / ROWS) * 100}%`,
          width: `calc(${100 / COLS}% + 0.5px)`,
          height: `calc(${100 / ROWS}% + 0.5px)`,
          backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
          backgroundPosition: `${(c / (COLS - 1)) * 100}% ${(r / (ROWS - 1)) * 100}%`,
        });
    return out;
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    const root = rootRef.current;
    if (!el || !root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seeds = makeSeeds();
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let prog = 0;
    let target = 0;

    const onScroll = () => {
      const b = root.getBoundingClientRect();
      const span = root.offsetHeight - window.innerHeight;
      target = Math.min(1, Math.max(0, -b.top / span));
    };
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);

    // Celular: arrastar o dedo move a câmera; o giroscópio inclina a cena
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.tx = (t.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = ((t.clientY / window.innerHeight) * 2 - 1) * 0.6;
    };
    let baseBeta = null;
    const onTilt = (e) => {
      if (e.gamma == null || e.beta == null) return;
      if (baseBeta === null) baseBeta = e.beta;
      mouse.tx = Math.max(-1, Math.min(1, e.gamma / 25));
      mouse.ty = Math.max(-1, Math.min(1, (e.beta - baseBeta) / 25));
    };
    const enableTilt = () => {
      const DOE = window.DeviceOrientationEvent;
      if (DOE && typeof DOE.requestPermission === "function") {
        // iOS pede permissão no primeiro toque
        DOE.requestPermission()
          .then((r) => r === "granted" && window.addEventListener("deviceorientation", onTilt))
          .catch(() => {});
      }
    };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse && !reduce) {
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("deviceorientation", onTilt);
      window.addEventListener("touchend", enableTilt, { once: true });
    }
    onScroll();

    // Cena
    const mobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ antialias: !mobile });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(PALETTE.bg);
    scene.fog = new THREE.FogExp2(PALETTE.bg, FOG_DENSITY * PALETTE.fog);
    const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 300);

    // Terreno procedural
    const seg = mobile ? 120 : 220;
    const g = new THREE.PlaneGeometry(220, 220, seg, seg);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), d = Math.hypot(x, z);
      let y = (fbm(x * 0.035 + 3, z * 0.035 + 7) - 0.9) * 9;
      y += Math.max(0, d - 18) * 0.12 * fbm(x * 0.02, z * 0.02);
      y = y * Math.min(1, d / 14) + Math.exp(-(d * d) / 60) * 2.2 - 1.5;
      p.setY(i, y);
    }
    g.computeVertexNormals();
    const groundMat = new THREE.MeshStandardMaterial({ roughness: 1, metalness: 0, color: PALETTE.ground });
    scene.add(new THREE.Mesh(g, groundMat));

    const hemi = new THREE.HemisphereLight(PALETTE.hemi, 0x000000, 0.6);
    scene.add(hemi);
    const rim = new THREE.DirectionalLight(PALETTE.rim, 2.2);
    rim.position.set(-10, 8, -30);
    scene.add(rim);
    const key = new THREE.PointLight(0xff6a10, 10, 30, 1.6);
    key.position.set(0, 4, 4);
    scene.add(key);

    // Partículas (poeira/neve quente)
    const n = mobile ? 1500 : PARTICLES;
    const pos = new Float32Array(n * 3);
    const speeds = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 24 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      speeds[i] = 0.008 + Math.random() * 0.03;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const cv = document.createElement("canvas");
    cv.width = cv.height = 32;
    const cx = cv.getContext("2d");
    const gr = cx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, "rgba(255,255,255,1)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
    cx.fillStyle = gr;
    cx.fillRect(0, 0, 32, 32);
    const pTex = new THREE.CanvasTexture(cv);
    const pMat = new THREE.PointsMaterial({
      size: 0.14, map: pTex, transparent: true, depthWrite: false, color: 0xffd2b0, opacity: 0.8,
    });
    const points = new THREE.Points(pg, pMat);
    scene.add(points);

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    onResize();
    window.addEventListener("resize", onResize);

    if (logoRef.current) logoRef.current.style.transformStyle = "preserve-3d";
    if (tilesRef.current) tilesRef.current.style.transformStyle = "preserve-3d";

    const clock = new THREE.Clock();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(root);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = clock.getElapsedTime();
      prog += (target - prog) * 0.08;
      const P = prog;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      cam.position.set(mouse.x * 2.4, 7 - P * 1.5 - mouse.y * 1.2, 30 - P * 7);
      cam.lookAt(0, 2.6, 0);
      key.intensity = 10 + P * 50;

      if (!reduce) {
        const a = pg.attributes.position;
        for (let i = 0; i < a.count; i++) {
          let y = a.getY(i) - speeds[i];
          let x = a.getX(i) + Math.sin(t * 0.6 + i) * 0.01 + 0.02;
          if (y < -2) y = 22;
          if (x > 40) x = -40;
          a.setXY(i, x, y);
        }
        a.needsUpdate = true;
      }

      const tl = tilesRef.current?.children;
      if (tl)
        for (let i = 0; i < tl.length && i < seeds.length; i++) {
          const sd = seeds[i];
          const k = ease(Math.min(1, Math.max(0, (P * 1.25 - sd.delay * 0.5) / 0.75)));
          const inv = 1 - k;
          const fl = reduce ? 0 : Math.sin(t * 0.9 + sd.ph) * 10 * inv;
          const s = tl[i].style;
          s.transform = `translate3d(${sd.x * inv}px,${sd.y * inv + fl}px,${sd.z * inv}px) rotateX(${sd.rx * inv}deg) rotateY(${sd.ry * inv}deg) rotateZ(${sd.rz * inv}deg) scale(${1 - inv * 0.25})`;
          s.opacity = (0.25 + 0.75 * Math.min(1, k * 1.6)).toFixed(3);
        }

      if (logoRef.current) {
        const bob = reduce ? 0 : Math.sin(t * 1.1) * 8 * P;
        logoRef.current.style.transform = `translate(-50%,-56%) translate3d(${-mouse.x * 14}px,${bob + mouse.y * 8}px,0) perspective(1000px) rotateY(${mouse.x * 8}deg) rotateX(${-mouse.y * 6}deg)`;
      }
      if (glowRef.current) glowRef.current.style.opacity = (0.3 + P * 0.7).toFixed(3);
      if (barRef.current) barRef.current.style.width = `${(P * 100).toFixed(1)}%`;
      if (labelRef.current) {
        const txt =
          P > 0.985
            ? "IT THECNICA // MONTADO"
            : `ROLE PARA MONTAR · ${String(Math.round(P * 100)).padStart(2, "0")}%`;
        if (labelRef.current.textContent !== txt) labelRef.current.textContent = txt;
      }
      renderer.render(scene, cam);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("deviceorientation", onTilt);
      window.removeEventListener("touchend", enableTilt);
      g.dispose(); groundMat.dispose(); pg.dispose(); pMat.dispose(); pTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const muted = "text-[#a8998b]";
  const strong = "text-[#f6efe7]";

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative h-[260svh] bg-[#0b0908] font-mono text-[#efe7de]"
    >
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden">
        <div ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_42%_38%_at_50%_50%,rgba(255,110,20,0.22),transparent_70%)]"
        />

        {/* Logo montada por peças */}
        <div
          ref={logoRef}
          className="absolute left-1/2 top-1/2 w-[min(78vw,620px)] md:w-[min(46vw,620px)] aspect-[550/340] pointer-events-none will-change-transform drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
          style={{ transform: "translate(-50%,-56%)" }}
          role="img"
          aria-label="IT THECNICA"
        >
          <div ref={tilesRef} className="absolute inset-0">
            {tiles.map(({ key, ...st }) => (
              <div
                key={key}
                className="absolute will-change-[transform,opacity]"
                style={{ ...st, backgroundImage: "url(/assets/it-logo-alpha.png)", opacity: 0.25 }}
              />
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(11,9,8,.6)_0%,transparent_24%,transparent_68%,rgba(11,9,8,.9)_100%)]"
        />

        <div className="absolute left-6 md:left-[6.5vw] top-[13svh] md:top-[12vh] flex flex-col gap-3 md:gap-4 max-w-[340px]">
          <div className={`text-sm md:text-base font-bold ${muted}`}>{"// Status"}</div>
          <div className={`flex items-center gap-3.5 text-[clamp(20px,2.2vw,34px)] font-extrabold leading-[1.05] tracking-tight ${strong}`}>
            <span className="flex-none w-3 h-3 rounded-full bg-[#3ddc84] shadow-[0_0_14px_#3ddc84]" />
            <span>Disponível<br />para projetos.</span>
          </div>
        </div>

        <div className="hidden sm:flex absolute right-[6.5vw] top-[12vh] flex-col items-end gap-4 max-w-[340px] text-right">
          <div className={`text-base font-bold ${muted}`}>
            <span className="text-[#ff7a1a]">{"//////"}</span> Especialidade
          </div>
          <div className={`text-[clamp(20px,2.2vw,34px)] font-extrabold leading-[1.05] tracking-tight ${strong}`}>
            Soluções<br />em TI <span className="text-[#ff7a1a]">&amp;</span> Web.
          </div>
        </div>

        <div className="hidden md:flex absolute left-[6.5vw] bottom-[9vh] flex-col gap-3 text-base font-bold leading-snug">
          <div className={muted}>{"// Engenharia de software & suporte"}</div>
          <div className={strong}>Manutenção.<br />Web.<br />Sistemas de gestão.</div>
        </div>

        <div className="absolute left-1/2 bottom-[6vh] -translate-x-1/2 flex flex-col items-center gap-3 text-[11px] md:text-xs font-bold tracking-[0.24em] text-[#a8998b] whitespace-nowrap">
          <div className="relative w-40 h-[2px] bg-[rgba(239,231,222,.15)]">
            <div ref={barRef} className="absolute inset-y-0 left-0 w-0 bg-[#ff7a1a]" />
          </div>
          <div ref={labelRef}>ROLE PARA MONTAR</div>
        </div>

        <div className="hidden md:flex absolute right-[6.5vw] bottom-[9vh] flex-col items-end gap-3 text-base font-bold leading-snug text-right">
          <div className={muted}>IT Thecnica <span className="text-[#ff7a1a]">{"//"}</span></div>
          <div className={strong}>Alta<br />performance.</div>
        </div>
      </div>
    </section>
  );
}
