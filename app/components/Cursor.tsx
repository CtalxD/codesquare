"use client";

import { useEffect, useRef } from "react";
import "../css/cursor.css";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!fine) return;

    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    const innerEl = innerRef.current;
    if (!ringEl || !dotEl || !innerEl) return;

    const ring: HTMLDivElement = ringEl;
    const dot: HTMLDivElement = dotEl;
    const inner: HTMLSpanElement = innerEl;

    document.documentElement.classList.add("cs-cursor-on");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    function updateThemeAt(x: number, y: number) {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return;

      const inDark = el.closest<HTMLElement>(".cs-section--dark");
      if (inDark) {
        ring.dataset.theme = "dark";
        dot.dataset.theme = "dark";
        return;
      }

      ring.dataset.theme = "light";
      dot.dataset.theme = "light";
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    function tick() {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      updateThemeAt(mouseX, mouseY);
      raf = requestAnimationFrame(tick);
    }

    function setState(variant: string, text: string) {
      ring.dataset.variant = variant;
      inner.textContent = text;
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const tagged = target.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        const kind = tagged.dataset.cursor || "default";
        if (kind === "row") setState("row", "view");
        else if (kind === "action") setState("action", "→");
        else if (kind === "email") setState("email", "@");
        else if (kind === "nav") setState("nav", "");
        else setState("default", "");
        return;
      }

      const link = target.closest<HTMLElement>("a, button");
      if (link) {
        setState("nav", "");
        return;
      }

      setState("default", "");
    }

    function onDown() {
      ring.dataset.pressed = "true";
    }
    function onUp() {
      ring.dataset.pressed = "false";
    }
    function onLeave() {
      ring.dataset.hidden = "true";
      dot.style.opacity = "0";
    }
    function onEnter() {
      ring.dataset.hidden = "false";
      dot.style.opacity = "1";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cs-cursor-on");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cs-cursor" aria-hidden="true">
      <div
        ref={ringRef}
        className="cs-cursor-ring"
        data-variant="default"
        data-theme="light"
        data-pressed="false"
        data-hidden="true"
      >
        <span ref={innerRef} className="cs-cursor-inner" />
      </div>
      <div ref={dotRef} className="cs-cursor-dot" data-theme="light" />
    </div>
  );
}