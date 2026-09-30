import { experience, profile, projects, skills } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import BrandIcon, { brandLabel, type BrandName } from "@/components/BrandIcon";
import Reveal from "@/components/Reveal";
import ParallaxLayer from "@/components/ParallaxLayer";
import ScrollProgress from "@/components/ScrollProgress";
import HeroPhoto from "@/components/HeroPhoto";

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export default function Home() {
  return (
    <main id="top" className="relative">
      <ScrollProgress />

      {/* background decor */}
      <ParallaxLayer>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid" />
          {/* `data-parallax` values are read by ParallaxLayer. */}
          <div
            data-parallax="0.06"
            className="glow animate-float left-[-12%] top-[-14%] h-[30rem] w-[30rem] bg-[#7c5cff] opacity-40 sm:h-[36rem] sm:w-[36rem]"
          />
          <div
            data-parallax="0.1"
            className="glow animate-float right-[-16%] top-[12%] h-[28rem] w-[28rem] bg-[#22d3ee] opacity-30 [animation-delay:-3s] sm:h-[34rem] sm:w-[34rem]"
          />
          <div
            data-parallax="0.04"
            className="glow animate-float bottom-[-10%] left-[35%] h-[26rem] w-[26rem] bg-[#ff4d94] opacity-25 [animation-delay:-6s] sm:h-[30rem] sm:w-[30rem]"
          />
          {/* conic sheen for extra depth */}
          <div className="animate-aurora absolute left-1/2 top-[-20%] h-[45rem] w-[45rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(124,92,255,0.16),transparent_35%,rgba(34,211,238,0.14)_60%,transparent_80%)] blur-3xl" />
        </div>
      </ParallaxLayer>

      {/* ---------------- HERO ---------------- */}
      {/* Single column on phones; text + portrait side by side from lg up.
          The gap is generous because the portrait's aura and orbiting rings
          deliberately bleed outside its own box. */}
      <section className="container-page grid min-h-[92vh] items-center gap-y-0 py-28 sm:min-h-[92dvh] sm:pt-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-12 xl:gap-x-16">
        {/* Text column */}
        <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl">
          <p className="animate-fade-up chip">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {profile.location}
          </p>

          <h1
            className="animate-fade-up mt-6 font-semibold leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 1.35rem + 3.6vw, 4.5rem)", animationDelay: "80ms" }}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">{profile.name}</span>
            <br />
            <span
              className="muted"
              style={{ fontSize: "clamp(1.5rem, 1.05rem + 1.9vw, 3.5rem)" }}
            >
              {profile.role}
            </span>
          </h1>

          <p
            className="animate-fade-up muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg xl:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            {profile.tagline}
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <a href="#work" className="btn-primary w-full xs:w-auto">
              View my work
            </a>
            <a href={`mailto:${profile.email}`} className="btn-ghost w-full xs:w-auto">
              Get in touch
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="muted inline-flex items-center justify-center gap-1 py-2 text-sm underline-offset-4 transition hover:text-white hover:underline"
            >
              Résumé <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-1 text-sm sm:mt-12"
            style={{ animationDelay: "320ms" }}
          >
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="muted py-2 transition hover:text-white"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Portrait column: below the text on phones, beside it from lg up.
            The cutout's aura/rings extend past the image box, so this wrapper
            carries negative margins to give the glow room and the extra
            padding below keeps the orbiting rings off the next section. */}
        <div className="mt-12 sm:mt-14 lg:mt-0">
          <HeroPhoto
            src="/hadi.png"
            alt={`${profile.name}, ${profile.role}`}
            name={profile.name}
            role={profile.role}
          />
        </div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="container-page scroll-mt-24 py-20">
        <SectionHeading title="About" />
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <Reveal variant="up" className="space-y-4 text-lg leading-relaxed">
            {profile.bio.map((p) => (
              <p key={p} className="muted">
                {p}
              </p>
            ))}
            <p className="muted">
              When I&apos;m not shipping, you&apos;ll find me reading, cycling, or
              tinkering with something that has no business being that fun.
            </p>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="card h-fit">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-300">
                At a glance
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Role", profile.role],
                  ["Focus", "Product engineering & design systems"],
                  ["Experience", "1+ years"],
                  ["Work style", "Remote, async-friendly"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-4 border-b pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="muted">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SKILLS ---------------- */}
      <section id="skills" className="container-page scroll-mt-24 py-20">
        <SectionHeading title="Skills" subtitle="Tools I reach for most often." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.title} variant="up" delay={i * 90}>
              <div className="card h-full">
                <h3 className="font-semibold">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.label}
                      className="chip gap-2 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                    >
                      {item.icon ? (
                        <BrandIcon
                          name={item.icon as BrandName}
                          size={15}
                          aria-label={brandLabel(item.icon as BrandName)}
                        />
                      ) : null}
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <section id="work" className="container-page scroll-mt-24 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionHeading title="Selected work" subtitle="A few things I've built recently." />
          </div>
          <a href="#contact" className="muted text-sm transition hover:text-white">
            More on request →
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => {
            // Live projects point at a real site, so they open in a new tab.
            // Without rel="noopener" the opened page gets a handle on
            // window.opener, and can navigate this tab to a phishing clone.
            const isExternal = p.href.startsWith("http");

            return (
              <Reveal key={p.title} variant="up" delay={(i % 2) * 110}>
                <a
                  href={p.href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="card group flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold transition group-hover:text-violet-300">
                          {p.title}
                        </h3>
                        {p.subtitle ? (
                          <p className="mt-1 bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-sm font-medium text-transparent">
                            {p.subtitle}
                          </p>
                        ) : null}
                      </div>
                      <span className="text-violet-400 opacity-0 transition group-hover:opacity-100">
                        <Arrow />
                      </span>
                    </div>
                    <p className="muted mt-3 leading-relaxed">{p.description}</p>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t.label}
                        className="chip gap-2 transition duration-300 hover:border-white/25 hover:text-white"
                      >
                        {t.icon ? (
                          <BrandIcon
                            name={t.icon as BrandName}
                            size={14}
                            aria-label={brandLabel(t.icon as BrandName)}
                          />
                        ) : null}
                        {t.label}
                      </li>
                    ))}
                  </ul>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- EXPERIENCE ---------------- */}
      <section id="experience" className="container-page scroll-mt-24 py-20">
        <SectionHeading title="Experience" />
        <ol className="mt-10 space-y-6">
          {experience.map((e, i) => (
            <Reveal key={e.role} as="li" variant="up" delay={i * 70}>
              <div className="card h-full">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">{e.role}</h3>
                  <span className="muted text-sm">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-violet-300">{e.company}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {e.points.map((point) => (
                    <li key={point} className="muted flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="container-page scroll-mt-24 py-24">
        <Reveal variant="zoom-in">
          <div className="card relative overflow-hidden text-center">
            <div
              aria-hidden="true"
              className="glow left-1/2 top-0 h-72 w-72 -translate-x-1/2 bg-[#7c5cff] opacity-40"
            />
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Let&apos;s build something together
              </h2>
              <p className="muted mx-auto mt-4 max-w-lg">
                Have a project, a role, or just an idea? I&apos;m always happy to
                talk.
              </p>
              {/* min-w-0 lets these flex items shrink below their content
                  width so the long email can wrap instead of overflowing. */}
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 xs:flex-row xs:flex-wrap xs:items-center">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-primary min-w-0 px-5 sm:px-6"
                >
                  <span className="break-all">{profile.email}</span>
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  View résumé
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
