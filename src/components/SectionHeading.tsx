import Reveal, { type RevealVariant } from "@/components/Reveal";

export default function SectionHeading({
  title,
  subtitle,
  id,
  variant = "up",
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  id?: string;
  variant?: RevealVariant;
  delay?: number;
}) {
  return (
    <Reveal variant={variant} delay={delay}>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <div className="rule-gradient mt-4 w-24 rounded-full" />
      {subtitle ? <p className="muted mt-4">{subtitle}</p> : null}
    </Reveal>
  );
}
