/**
 * Kaléidoscope calme.
 * Une seule toile. La boucle s'arrête si l'onglet est caché, si tu mets pause,
 * ou si le mouvement est coupé. Les formes ne clignotent pas : seul l'angle tourne.
 */
import { useEffect, useRef } from "react";

const COLORS = ["#8fbfa8", "#e0a36a", "#7ab8c8", "#d7ebe3", "#c4a87a", "#6b9b7e"];

type Controls = {
  paused: boolean;
  speed: number;
  segments: number;
};

export function KaleidoscopeCanvas({ paused, speed, segments }: Controls) {
  const ref = useRef<HTMLCanvasElement>(null);
  const controls = useRef<Controls>({ paused, speed, segments });
  const kickRef = useRef<() => void>(() => {});
  controls.current = { paused, speed, segments };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let alive = true;
    let running = false;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const drawMotif = (slice: number, radius: number, phase: number) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius * 0.96, 0, slice);
      ctx.closePath();
      ctx.fillStyle = "#12343c";
      ctx.globalAlpha = 0.45;
      ctx.fill();

      for (let i = 0; i < 16; i += 1) {
        const t = (i * 0.618033) % 1;
        const u = (i * 0.414213) % 1;
        const ang = slice * (0.05 + 0.9 * t);
        const rad = radius * (0.14 + 0.74 * u);
        const bob = 1 + 0.04 * Math.sin(phase * 0.5 + i * 0.7);
        const x = Math.cos(ang) * rad;
        const y = Math.sin(ang) * rad;
        const size = radius * (0.028 + (i % 5) * 0.012) * bob;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang + phase * 0.12);
        ctx.beginPath();
        ctx.fillStyle = COLORS[i % COLORS.length] ?? "#8fbfa8";
        ctx.globalAlpha = i % 3 === 0 ? 0.72 : 0.42;
        if (i % 4 === 0) {
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.72, size * 0.85);
          ctx.lineTo(-size * 0.72, size * 0.85);
          ctx.closePath();
        } else {
          ctx.ellipse(0, 0, size, size * (i % 2 === 0 ? 0.45 : 0.72), 0, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = "#d7ebe3";
      ctx.lineWidth = Math.max(1.25, radius * 0.006);
      for (const band of [0.33, 0.55, 0.78]) {
        ctx.beginPath();
        ctx.arc(0, 0, radius * band, slice * 0.05, slice * 0.9);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.8;
      for (let i = 0; i < 9; i += 1) {
        const ang = slice * (0.1 + i * 0.09);
        const rad = radius * (0.33 + (i % 3) * 0.18);
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? "#e0a36a" : "#d7ebe3";
        ctx.arc(Math.cos(ang) * rad, Math.sin(ang) * rad, Math.max(1.5, radius * 0.012), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const paint = (angle: number) => {
      resize();
      const segs = controls.current.segments;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.46;
      const slice = (Math.PI * 2) / segs;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#0b2830";
      ctx.fillRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(cx, cy - radius * 0.15, radius * 0.05, cx, cy, radius);
      glow.addColorStop(0, "rgba(224, 163, 106, 0.18)");
      glow.addColorStop(0.45, "rgba(111, 155, 126, 0.08)");
      glow.addColorStop(1, "rgba(11, 40, 48, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      for (let i = 0; i < segs; i += 1) {
        ctx.save();
        ctx.rotate(i * slice);
        if (i % 2 === 1) ctx.scale(1, -1);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, slice);
        ctx.closePath();
        ctx.clip();
        drawMotif(slice, radius, angle);
        ctx.restore();
      }
      ctx.beginPath();
      ctx.fillStyle = "#0f3038";
      ctx.arc(0, 0, radius * 0.11, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = Math.max(1.5, radius * 0.012);
      ctx.strokeStyle = "#e0a36a";
      ctx.globalAlpha = 0.85;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const loop = (now: number) => {
      if (!alive) return;
      running = false;
      const c = controls.current;
      const hidden = document.visibilityState === "hidden";
      if (c.paused || hidden) {
        paint(last);
        return;
      }
      void now;
      last += 0.004 * c.speed;
      paint(last);
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!alive || running) return;
      raf = requestAnimationFrame(loop);
    };
    kickRef.current = kick;

    const onVis = () => kick();
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => paint(last));
    ro.observe(canvas);
    paint(0);
    kick();

    return () => {
      alive = false;
      running = false;
      kickRef.current = () => {};
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    kickRef.current();
  }, [paused, speed, segments]);

  return <canvas ref={ref} className="block h-full w-full" aria-hidden />;
}
