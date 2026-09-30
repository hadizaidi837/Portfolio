"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "zoom-in"
  | "blur";

type RevealProps = {
  children: ReactNode;
  /** Element or component to render as. */
  as?: ElementType;
  /** Direction the element travels *from*. */
  variant?: RevealVariant;
  /** Stagger delay in ms. */
  delay?: number;
  /** Override the CSS default (0.75s). */
  duration?: number;
  className?: string;
  style?: CSSProperties;
  /** Reveal only once, or every time it re-enters the viewport. */
  repeat?: boolean;
  /** Fraction of the viewport the element must cross to trigger. */
  amount?: number;
  [key: string]: unknown;
};

/* ------------------------------------------------------------------ *
 * Shared scroll bus
 *
 * A single passive scroll listener + one rAF loop drives every Reveal on
 * the page. We check rectangles directly rather than using
 * IntersectionObserver because IO reports "not intersecting" both for
 * elements below the viewport *and* for elements already scrolled past.
 * When a user flings the page (fast wheel, anchor jump, restored scroll
 * position) an element can go from below to above without ever
 * intersecting, so IO would never fire and the element would stay stuck
 * at opacity 0. A rect check has no such blind spot.
 * ------------------------------------------------------------------ */
type Check = () => void;

const subscribers = new Set<Check>();
let ticking = false;

function flush() {
  ticking = false;
  // Array.from rather than for..of: the TS target here is below ES2015, so
  // iterating a Set directly is a compile error without downlevelIteration.
  for (const fn of Array.from(subscribers)) fn();
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(flush);
}

function subscribe(fn: Check) {
  subscribers.add(fn);
  if (subscribers.size === 1) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("orientationchange", onScroll, {
      passive: true,
    });
  }
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
    }
  };
}

/**
 * Reveals its children when they scroll into view.
 *
 * Design notes:
 *  - One shared rAF loop, no per-element observers, no React state churn
 *    per scroll frame (only elements that actually change fire a render).
 *  - Stops checking an element once it has been revealed, unless
 *    `repeat` is set.
 *  - Honours `prefers-reduced-motion` via CSS: `.reveal` becomes visible
 *    and transitionless, so no JS special-casing is needed.
 *  - The <noscript> style in the layout forces `.reveal` visible when JS
 *    is unavailable, so content is never trapped at opacity 0.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration,
  className = "",
  style,
  repeat = false,
  amount = 0.15,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      if (done.current && !repeat) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Trigger once the element's top edge has crossed `amount` up the
      // viewport, OR immediately if it is already above the fold (fast
      // scroll / anchor jump straight past it).
      const entered = rect.top <= vh * (1 - amount) && rect.bottom >= 0;
      const overscrolled = rect.bottom < 0;

      if (entered || overscrolled) {
        setShown(true);
        done.current = true;
        if (!repeat) subscribers.delete(check);
      } else if (repeat && rect.top > vh) {
        setShown(false);
        done.current = false;
      }
    };

    // Check immediately so anything already in view reveals without
    // waiting for the first scroll.
    check();
    return subscribe(check);
  }, [repeat, amount]);

  const vars: CSSProperties = {
    ...style,
    "--reveal-delay": `${delay}ms`,
    ...(duration ? { "--reveal-duration": `${duration}ms` } : {}),
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={`reveal${shown ? " is-revealed" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={vars}
      {...rest}
    >
      {children}
    </Tag>
  );
}
