//app/components/CircuitCanvas.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

type Pt = { x: number; y: number };

type Trace = {
  pts: Pt[];
  totalLen: number;
  segLens: number[];
  width: number;
  pulses: { t: number; speed: number }[];
  nextLaunch: number;
  dir: 1 | -1;
};

type Pad = {
  x: number;
  y: number;
  r: number;
  kind: "via" | "pad" | "smd";
  angle?: number;
  w?: number;
  h?: number;
};

export default function CircuitCanvas({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- palette ---------- */
    const BASE = "#06162b";
    const COPPER = "rgba(217, 185, 140, 0.72)";
    const COPPER_DIM = "rgba(217, 185, 140, 0.3)";
    const COPPER_FAINT = "rgba(217, 185, 140, 0.12)";
    const SOLDER = "rgba(230, 201, 162, 0.85)";
    const SOLDER_RING = "rgba(230, 201, 162, 0.35)";

    /* ---------- state ---------- */
    let width = 0;
    let height = 0;
    let dpr = 1;
    let traces: Trace[] = [];
    let pads: Pad[] = [];
    let gridUnit = 20;

    /* ---------- helpers ---------- */
    const rand = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const snap = (v: number) => Math.round(v / gridUnit) * gridUnit;

    const roundRect = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      const rr = Math.min(r, w / 2, h / 2);
      c.beginPath();
      c.moveTo(x + rr, y);
      c.arcTo(x + w, y, x + w, y + h, rr);
      c.arcTo(x + w, y + h, x, y + h, rr);
      c.arcTo(x, y + h, x, y, rr);
      c.arcTo(x, y, x + w, y, rr);
      c.closePath();
    };

    const makeTrace = (start: Pt, end: Pt, bendBias = 0.5): Pt[] => {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      const sx = Math.sign(dx) || 1;
      const sy = Math.sign(dy) || 1;

      const pts: Pt[] = [{ x: start.x, y: start.y }];

      if (adx < 2 || ady < 2) {
        pts.push({ x: end.x, y: end.y });
        return pts;
      }

      const diagonalFirst = Math.random() < bendBias;

      if (diagonalFirst) {
        const diag = Math.min(adx, ady);
        const mx = start.x + sx * diag;
        const my = start.y + sy * diag;
        pts.push({ x: mx, y: my });
        if (adx > ady) {
          pts.push({ x: end.x, y: my });
        } else {
          pts.push({ x: mx, y: end.y });
        }
      } else {
        const chamfer = Math.min(gridUnit * 0.9, adx / 2, ady / 2);
        if (adx > ady) {
          pts.push({ x: start.x + sx * (adx - chamfer), y: start.y });
          pts.push({ x: end.x, y: start.y + sy * chamfer });
        } else {
          pts.push({ x: start.x, y: start.y + sy * (ady - chamfer) });
          pts.push({ x: start.x + sx * chamfer, y: end.y });
        }
      }

      pts.push({ x: end.x, y: end.y });
      return pts;
    };

    const polylineLength = (pts: Pt[]) => {
      let total = 0;
      const segs: number[] = [];
      for (let i = 1; i < pts.length; i++) {
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        const len = Math.hypot(dx, dy);
        segs.push(len);
        total += len;
      }
      return { total, segs };
    };

    /* ---------- build board ---------- */
    const buildBoard = () => {
      const targetPitch = Math.max(14, Math.min(width, height) / 26);
      gridUnit = targetPitch;

      traces = [];
      pads = [];

      const cols = Math.floor(width / gridUnit);
      const rows = Math.floor(height / gridUnit);

      const occupied = new Set<string>();
      const keyOf = (c: number, r: number) => `${c}:${r}`;

      // Chips (ICs)
      const chipCount = Math.round((cols * rows) / 120);
      const chips: { c: number; r: number; w: number; h: number }[] = [];
      for (let i = 0; i < chipCount; i++) {
        const w = Math.round(rand(3, 6));
        const h = Math.round(rand(2, 4));
        const c = Math.round(rand(1, Math.max(1, cols - w - 1)));
        const r = Math.round(rand(1, Math.max(1, rows - h - 1)));

        let ok = true;
        for (const ch of chips) {
          if (
            Math.abs(ch.c - c) < ch.w + w + 1 &&
            Math.abs(ch.r - r) < ch.h + h + 1
          ) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
        chips.push({ c, r, w, h });

        const x = c * gridUnit;
        const y = r * gridUnit;
        const cw = (w - 1) * gridUnit;
        const chh = (h - 1) * gridUnit;

        // IC body
        pads.push({
          x: x + cw / 2,
          y: y + chh / 2,
          r: 0,
          kind: "smd",
          angle: 0,
          w: cw,
          h: chh,
        });

        const pinCount = Math.max(2, Math.floor(w));
        for (let p = 0; p < pinCount; p++) {
          const px = x + ((p + 0.5) / pinCount) * cw;
          pads.push({
            x: px,
            y: y - gridUnit * 0.32,
            r: 0,
            kind: "smd",
            angle: 0,
            w: gridUnit * 0.5,
            h: gridUnit * 0.28,
          });
          pads.push({
            x: px,
            y: y + chh + gridUnit * 0.32,
            r: 0,
            kind: "smd",
            angle: 0,
            w: gridUnit * 0.5,
            h: gridUnit * 0.28,
          });
          occupied.add(
            keyOf(c + Math.round(((p + 0.5) / pinCount) * (w - 1)), r - 1)
          );
          occupied.add(
            keyOf(c + Math.round(((p + 0.5) / pinCount) * (w - 1)), r + h)
          );
        }
      }

      // Vias
      const viaCount = Math.round((cols * rows) / 8);
      for (let i = 0; i < viaCount; i++) {
        const c = Math.floor(rand(0, cols));
        const r = Math.floor(rand(0, rows));
        if (occupied.has(keyOf(c, r))) continue;
        occupied.add(keyOf(c, r));
        pads.push({
          x: c * gridUnit + gridUnit / 2,
          y: r * gridUnit + gridUnit / 2,
          r: gridUnit * 0.14,
          kind: "via",
        });
      }

      // Traces between vias
      const viaPads = pads.filter((p) => p.kind === "via");
      const maxTraces = Math.round(viaPads.length * 0.9);
      const usedPairs = new Set<string>();

      for (let i = 0; i < maxTraces; i++) {
        const a = viaPads[Math.floor(rand(0, viaPads.length))];
        if (!a) break;

        let b: Pad | undefined;
        let best = Infinity;
        for (let k = 0; k < 6; k++) {
          const cand = viaPads[Math.floor(rand(0, viaPads.length))];
          if (!cand || cand === a) continue;
          const d = Math.hypot(cand.x - a.x, cand.y - a.y);
          if (d > gridUnit * 1.5 && d < gridUnit * 7 && d < best) {
            best = d;
            b = cand;
          }
        }
        if (!b) continue;

        const pairKey =
          a.x < b.x || (a.x === b.x && a.y < b.y)
            ? `${a.x},${a.y}-${b.x},${b.y}`
            : `${b.x},${b.y}-${a.x},${a.y}`;
        if (usedPairs.has(pairKey)) continue;
        usedPairs.add(pairKey);

        const startSnap = { x: snap(a.x), y: snap(a.y) };
        const endSnap = { x: snap(b.x), y: snap(b.y) };
        if (startSnap.x === endSnap.x && startSnap.y === endSnap.y) continue;

        const pts = makeTrace(startSnap, endSnap, 0.6);
        const { total, segs } = polylineLength(pts);
        if (total < gridUnit * 1.5) continue;

        traces.push({
          pts,
          totalLen: total,
          segLens: segs,
          width: Math.random() < 0.15 ? 2 : 1.2,
          pulses: [],
          nextLaunch: Math.floor(rand(0, 200)),
          dir: Math.random() < 0.5 ? 1 : -1,
        });
      }
    };

    /* ---------- resize ---------- */
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildBoard();
    };

    /* ---------- draw ---------- */
    const drawBackground = () => {
      // Very dark near-black navy base — reads as a PCB panel, not a blue wall
      ctx.fillStyle = BASE;
      ctx.fillRect(0, 0, width, height);

      // Soft radial "light" so the board feels lit from center
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.9
      );
      g.addColorStop(0, "rgba(14, 34, 60, 0.85)");
      g.addColorStop(0.6, "rgba(8, 22, 42, 0.55)");
      g.addColorStop(1, "rgba(3, 10, 20, 1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Faint silk-screen reference grid
      ctx.strokeStyle = COPPER_FAINT;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      const gPitch = gridUnit * 4;
      for (let x = 0; x < width; x += gPitch) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gPitch) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const drawTracePath = (
      trace: Trace,
      alpha: number,
      color: string,
      lw?: number
    ) => {
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lw ?? trace.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(trace.pts[0].x, trace.pts[0].y);
      for (let i = 1; i < trace.pts.length; i++) {
        ctx.lineTo(trace.pts[i].x, trace.pts[i].y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawCopper = () => {
      for (const t of traces) {
        drawTracePath(t, 0.1, COPPER_DIM, t.width + 3);
        drawTracePath(t, 1, COPPER_DIM);
      }
    };

    const drawPads = () => {
      for (const p of pads) {
        if (p.kind === "via") {
          ctx.fillStyle = BASE;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = COPPER;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 1, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "#04101e";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.55, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = SOLDER_RING;
          ctx.beginPath();
          ctx.arc(
            p.x - p.r * 0.35,
            p.y - p.r * 0.35,
            p.r * 0.28,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else if (p.kind === "smd" && p.w && p.h) {
          const rx = 3;
          ctx.fillStyle = "rgba(6, 18, 34, 1)";
          roundRect(ctx, p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, rx);
          ctx.fill();

          ctx.strokeStyle = COPPER_DIM;
          ctx.lineWidth = 1;
          roundRect(ctx, p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, rx);
          ctx.stroke();

          ctx.fillStyle = SOLDER;
          ctx.beginPath();
          ctx.arc(
            p.x - p.w / 2 + 6,
            p.y - p.h / 2 + 6,
            1.6,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else if (p.kind === "smd") {
          const w = p.w ?? gridUnit * 0.5;
          const h = p.h ?? gridUnit * 0.3;
          ctx.fillStyle = SOLDER;
          roundRect(ctx, p.x - w / 2, p.y - h / 2, w, h, 1);
          ctx.fill();

          ctx.strokeStyle = "rgba(230, 201, 162, 0.55)";
          ctx.lineWidth = 0.6;
          roundRect(ctx, p.x - w / 2, p.y - h / 2, w, h, 1);
          ctx.stroke();
        }
      }
    };

    const pointAt = (trace: Trace, t: number): { p: Pt; angle: number } => {
      let target = t * trace.totalLen;
      const pts = trace.pts;
      for (let i = 0; i < trace.segLens.length; i++) {
        const seg = trace.segLens[i];
        if (target <= seg) {
          const a = pts[i];
          const b = pts[i + 1];
          const k = seg === 0 ? 0 : target / seg;
          return {
            p: { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k },
            angle: Math.atan2(b.y - a.y, b.x - a.x),
          };
        }
        target -= seg;
      }
      const last = pts[pts.length - 1];
      const prev = pts[pts.length - 2] ?? last;
      return {
        p: last,
        angle: Math.atan2(last.y - prev.y, last.x - prev.x),
      };
    };

    const updateAndDrawPulses = (dt: number) => {
      for (const trace of traces) {
        if (trace.nextLaunch <= 0 && trace.pulses.length < 2) {
          trace.pulses.push({ t: 0, speed: rand(0.14, 0.26) });
          trace.nextLaunch = Math.floor(rand(180, 900));
        } else {
          trace.nextLaunch -= dt;
        }

        for (let i = trace.pulses.length - 1; i >= 0; i--) {
          const pulse = trace.pulses[i];
          pulse.t += pulse.speed * dt * 0.016;

          if (pulse.t >= 1) {
            trace.pulses.splice(i, 1);
            continue;
          }

          const { p, angle } = pointAt(trace, pulse.t);
          const tailT = Math.max(0, pulse.t - 0.16);
          const { p: tailP } = pointAt(trace, tailT);

          const grad = ctx.createLinearGradient(tailP.x, tailP.y, p.x, p.y);
          grad.addColorStop(0, "rgba(230, 201, 162, 0)");
          grad.addColorStop(1, "rgba(230, 201, 162, 0.95)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = trace.width + 1.2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tailP.x, tailP.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          const bloom = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 12);
          bloom.addColorStop(0, "rgba(255, 240, 214, 0.9)");
          bloom.addColorStop(0.3, "rgba(230, 201, 162, 0.45)");
          bloom.addColorStop(1, "rgba(230, 201, 162, 0)");
          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#fff8ec";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(angle);
          const streak = ctx.createLinearGradient(-18, 0, 0, 0);
          streak.addColorStop(0, "rgba(230, 201, 162, 0)");
          streak.addColorStop(1, "rgba(230, 201, 162, 0.35)");
          ctx.fillStyle = streak;
          ctx.fillRect(-18, -0.6, 18, 1.2);
          ctx.restore();
        }
      }
    };

    /* ---------- frame ---------- */
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;

      drawBackground();
      drawCopper();
      drawPads();
      updateAndDrawPulses(dt);

      rafRef.current = requestAnimationFrame(frame);
    };

    /* ---------- go ---------- */
    resize();

    if (prefersReduced) {
      drawBackground();
      drawCopper();
      drawPads();
    } else {
      rafRef.current = requestAnimationFrame(frame);
    }

    let resizeRaf: number | null = null;
    const onResize = () => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        resize();
        if (prefersReduced) {
          drawBackground();
          drawCopper();
          drawPads();
        }
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}