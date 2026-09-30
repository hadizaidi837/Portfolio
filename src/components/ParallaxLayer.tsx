"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle scroll-linked depth for the background decor.
 *
 * Elements with a `data-parallax="<speed>"` attribute are translated
 * vertically by `scrollY * speed` inside a rAF loop. Speeds are tiny
 * (0.02-0.08) so the effect is felt, not seen.
 *
 * Deliberately transform-only, and it bails out entirely when the user
 * prefers reduced motion or the viewport is small/low-powered enough
 * that the compositor would struggle.
 */
export default function ParallaxLayer({
  children,
}: {
  children?: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Phones get a smaller, cheaper effect (or none) to protect frame rate.
    const pointerQuery = window.matchMedia("(min-width: 768px)");

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-parallax]")
    ).map((el) => ({ el, speed: Number(el.dataset.parallax ?? 0.05) }));

    if (items.length === 0) return;

    let frame = 0;

    const apply = (y: number) => {
      for (const { el, speed } of items) {
        el.style.transform = `translate3d(0, ${(y * speed).toFixed(2)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (motionQuery.matches) {
          apply(0);
        } else if (!pointerQuery.matches) {
          // Small screens: keep it very subtle to avoid jank.
          apply(y * 0.4);
        } else {
          apply(y);
        }
      });
    };

    const onChange = () => onScroll();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onChange, { passive: true });
    motionQuery.addEventListener("change", onChange);
    pointerQuery.addEventListener("change", onChange);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onChange);
      motionQuery.removeEventListener("change", onChange);
      pointerQuery.removeEventListener("change", onChange);
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
