import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <p className="muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js
          &amp; Tailwind CSS.
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com"
            className="muted transition hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            className="muted transition hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="#top" className="muted transition hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
