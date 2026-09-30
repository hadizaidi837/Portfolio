"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

type HeroPhotoProps = {
  /** Path relative to /public */
  src?: string;
  alt: string;
  name: string;
  role?: string;
};

/**
 * Hero portrait.
 *
 * The source is a background-removed cutout (433x577, RGBA), so there is no
 * frame, no crop and no opaque backdrop here — the photo is composited
 * straight onto the page, and the depth comes from layered CSS: a rotating
 * conic aura behind it, two counter-rotating orbit rings with dots, and a
 * coloured drop shadow that separates the dark suit from the near-black page.
 *
 * Deliberately not using `next/image`: this project has no `sharp` installed
 * and the optimizer hard-fails in production without it. A plain <img> is the
 * right call for a single decorative portrait.
 *
 * If the file is missing or fails to decode, it falls back to an initials
 * monogram, so the layout never shows a broken image icon.
 */
export default function HeroPhoto({
  src = "/hadi.png",
  alt,
  name,
  role,
}: HeroPhotoProps) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Reveal
      variant="zoom-in"
      duration={900}
      /* Explicit widths rather than `w-full max-w-*`: the hero grid track is
         `auto`, and this element's only child is absolutely positioned, so
         nothing contributes an intrinsic width and a percentage width would
         collapse the whole column to 0. Breakpoint widths make the track
         resolvable, and the values stay fluid enough to read as a scale. */
      className="relative mx-auto w-[15rem] xs:w-[16.5rem] sm:w-[21rem] lg:w-[22rem] xl:w-[26rem]"
    >
      {/* ---------- backdrop stack (decorative only) ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Far soft glow — pulls the whole figure out of the background */}
        <div className="glow left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 bg-[#7c5cff] opacity-45" />
        {/* Cool rim light, offset to the right */}
        <div className="glow left-[68%] top-[42%] h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 bg-[#22d3ee] opacity-30" />
        {/* Warm kicker, low-left */}
        <div className="glow left-[30%] top-[72%] h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 bg-[#ff4d94] opacity-20" />

        {/* Rotating conic aura: gives the silhouette a halo of colour */}
        <div className="animate-aurora absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_140deg_at_50%_50%,rgba(124,92,255,0.55),rgba(34,211,238,0.35)_35%,transparent_58%,rgba(255,77,148,0.32)_80%,rgba(124,92,255,0.55))] opacity-90 blur-xl" />

        {/* Dashed orbit rings */}
        <div className="absolute -inset-[7%] rounded-full border border-dashed border-white/12" />
        <div className="absolute -inset-[3%] rounded-full border border-white/8" />

        {/* Orbiting dots. Counter-rotating and at different speeds, so the
            motion reads as two rings rather than one rigid loop. */}
        <div className="animate-spin-slow absolute -inset-[7%]">
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#22d3ee] shadow-[0_0_16px_4px_rgba(34,211,238,0.75)]" />
        </div>
        <div
          className="animate-spin-slow absolute -inset-[3%]"
          style={{ animationDirection: "reverse", animationDuration: "20s" }}
        >
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ff4d94] shadow-[0_0_12px_3px_rgba(255,77,148,0.7)]" />
        </div>
      </div>

      {/* ---------- portrait ---------- */}
      {/* Aspect ratio matches the source exactly (433x577) so the browser
          reserves the right space and nothing shifts on load. */}
      <div className="relative aspect-[433/577] w-full">
        {failed ? (
          <div className="grid h-full w-full place-items-center rounded-[2rem] bg-[conic-gradient(from_210deg_at_50%_50%,#7c5cff,#22d3ee,#ff4d94,#7c5cff)]">
            <span className="text-5xl font-semibold tracking-tight text-white/95 sm:text-6xl">
              {initials}
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            width={433}
            height={577}
            // Above the fold and the page's focal point: do not lazy-load,
            // and hint the browser to decode early.
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={() => setFailed(true)}
            /* No frame and no crop: the cutout keeps its own edges. The
               coloured shadow is what separates the black suit from the
               near-black page, and the violet rim echoes the aura behind. */
            className="animate-float-soft absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_28px_45px_rgba(6,8,20,0.85)] drop-shadow-[0_0_38px_rgba(124,92,255,0.42)]"
          />
        )}

        {/* Grounding shadow at the feet so the cutout doesn't look pasted on */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[14%] bottom-0 h-10 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.35),transparent_70%)] blur-md"
        />
      </div>

      {/* ---------- floating status chip ---------- */}
      <div className="animate-float absolute -bottom-3 left-0 flex items-center gap-2 rounded-full border border-white/12 bg-[#0b0e1f]/80 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-xl sm:-bottom-4 sm:left-2">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" />
        Open to work
      </div>

      {/* ---------- glass name plate ----------
          Hidden on phones on purpose: at that size the plate is wide enough
          to sit across the top of the head, and the h1 directly above it
          already states the name. It earns its space from `sm` up, where the
          portrait is large enough for the plate to sit beside the silhouette. */}
      <div className="absolute -right-3 top-8 hidden max-w-[12rem] rounded-2xl border border-white/12 bg-[#0b0e1f]/70 px-4 py-2.5 shadow-lg backdrop-blur-xl sm:block">
        <p className="truncate text-sm font-semibold text-white">{name}</p>
        {role ? (
          <p className="mt-0.5 truncate bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-xs font-medium text-transparent">
            {role}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
