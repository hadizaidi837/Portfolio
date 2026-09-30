"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

/**
 * Sticky header that:
 *  - gains a blurred background once the page is scrolled,
 *  - highlights the section currently in view,
 *  - shows an animated full-width drawer on small screens.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  /* ---------- scrolled state + active section (rAF-throttled) ---------- */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);

      // Active section = the last section whose top has passed a probe line
      // a third of the way down the viewport. Cheap and stable.
      const probe = y + window.innerHeight * 0.35;
      let current = "";
      for (const { href } of links) {
        const el = document.querySelector<HTMLElement>(href);
        if (el && el.offsetTop <= probe) current = href;
      }

      // Sitting at the very bottom always lights up the last link.
      const atBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = links[links.length - 1].href;

      setActive((prev) => (prev === current ? prev : current));
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

  /* ---------- drawer: scroll lock, Escape, focus trap ---------- */
  useEffect(() => {
    if (!open) return;

    const { documentElement } = document;
    documentElement.classList.add("is-nav-locked");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      documentElement.classList.remove("is-nav-locked");
    };
  }, [open]);

  /* ---------- close the drawer if the viewport grows to desktop ---------- */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#060814]/70 backdrop-blur-2xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between gap-6"
      >
        <a
          href="#top"
          onClick={close}
          className="text-sm font-semibold tracking-tight md:hidden"
        >
          Portfolio
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={`relative rounded-full px-3 py-2 text-sm transition ${
                  active === l.href
                    ? "bg-white/[0.07] text-white"
                    : "text-[#8f97b3] hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-violet-400 to-cyan-300 transition-transform duration-300 ${
                    active === l.href ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden md:block">
          <a
            href="#contact"
            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:border-violet-400/50 hover:bg-violet-500/15"
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className={`ml-auto grid h-11 w-11 place-items-center rounded-lg border transition md:hidden ${
            open
              ? "rotate-90 border-white/20 bg-white/[0.05]"
              : "hover:border-white/20"
          }`}
        >
          <span className="relative block h-3.5 w-4" aria-hidden="true">
            <span
              className={`absolute left-0 block h-0.5 w-4 rounded bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-4 rounded bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer. `hidden` keeps it out of the tab order when closed. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-white/[0.07] bg-[#060814]/95 backdrop-blur-2xl md:hidden"
      >
        <ul className="container-page flex flex-col py-2">
          {links.map((l, i) => (
            <li
              key={l.href}
              className="animate-fade-up"
              style={{ animationDelay: `${60 + i * 45}ms` }}
            >
              <a
                href={l.href}
                onClick={close}
                aria-current={active === l.href ? "true" : undefined}
                className={`block rounded-lg px-2 py-3 text-sm transition ${
                  active === l.href
                    ? "bg-white/[0.07] text-white"
                    : "text-[#8b93a7] hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
