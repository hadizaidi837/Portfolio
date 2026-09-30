"use client";

import { useEffect, useRef } from "react";

/**
 * Thin gradient bar at the very top of the viewport showing scroll progress.
 *
 * Implemented with a single `requestAnimationFrame` loop that only writes
 * a CSS custom property consumed by `.scroll-progress { transform: scaleX() }`.
 * Writing one custom property avoids React re-renders on every scroll frame.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Skip the style write if the value barely moved.
      if (Math.abs(p - last) > 0.001) {
        bar.style.setProperty("--scroll-progress", p.toFixed(4));
        last = p;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      aria-hidden="true"
    />
  );
}
