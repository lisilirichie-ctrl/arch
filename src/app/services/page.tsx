"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const metadata = {
  alternates: {
    canonical: 'https://www.archstrucgroup.com',
  },
}

const values = [
  { title: "Precision", description: "No room for guesswork." },
  { title: "Integrity", description: "Honest timelines, honest budgets." },
  { title: "Innovation", description: "Modern methods, better outcomes." },
  { title: "Sustainability", description: "Built for the next fifty years." },
];

const services = [
  "Architectural Design",
  "Interior Design",
  "Masterplanning",
  "Acoustic Design",
  "BIM Consultancy (ISO 19650)",
  "Graphic Design & Wayfinding",
  "Technical Due Diligence & Feasibility Studies",
  "Environmental Design (LEED & EDGE)",
  "Façade Design",
  "Project Management",
];

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(ease * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutServices() {
  const router = useRouter();
  const servicesRef = useRef<HTMLDivElement>(null);

  // stagger service rows on scroll
  useEffect(() => {
    const rows = servicesRef.current?.querySelectorAll("[data-row]");
    if (!rows) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    rows.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-white">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes ctaFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.22s; }
        .delay-3 { animation-delay: 0.34s; }
        .service-row {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .cta-float { animation: ctaFloat 4s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .line-accent {
          transform-origin: left;
          animation: lineGrow 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }
      `}</style>

      {/* ── BACK BUTTON ───────────────────────────────────────────────────── */}
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        className="liquid-glass fixed left-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full text-white/80 backdrop-blur-md transition hover:scale-105 hover:text-white sm:left-8 sm:top-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── BACKGROUND ─────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://archstrucgroup.co.ke/archstruc_admin/uploads/1746876863_63.5.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <img
          src="https://archstrucgroup.co.ke/archstruc_admin/uploads/1750828417_IMG_4292.JPG"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 75%)" }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#144B60]/40 to-[#0D0F12]" />
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[65vh] items-end pb-20 pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="fade-up mb-5 text-xs uppercase tracking-[0.5em] text-[#358CB8]">
            Who We Are · What We Do
          </p>
          {/* Accent line */}
          <div className="mb-8 h-px w-16 bg-[#358CB8] line-accent" />
          <h1 className="fade-up delay-1 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
            Engineering Excellence.
            <br />
            <span className="text-[#9CCBDA]">Built On Trust.</span>
          </h1>
          <p className="fade-up delay-2 mt-8 max-w-lg text-base leading-8 text-white/60 md:text-lg">
            Delivering premium construction and design solutions across East
            Africa — with precision, integrity, and a commitment to lasting
            impact.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="liquid-glass rounded-2xl px-8 py-8 md:px-14">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: 120, suffix: "+", label: "Projects Delivered" },
                { value: 12, suffix: "+", label: "Years Experience" },
                { value: 6, suffix: "", label: "Countries" },
                { value: 98, suffix: "%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <p className="text-3xl font-medium text-[#358CB8] md:text-4xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE + VALUES ────────────────────────────────────────────── */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="liquid-glass rounded-3xl p-10 md:p-16">
            <p className="text-xs uppercase tracking-[0.4em] text-[#358CB8]">About Us</p>
            <p className="mt-6 max-w-3xl text-base leading-9 text-white/70 md:text-lg">
              ArchStruc Group is a multidisciplinary engineering and construction
              company delivering residential, commercial and infrastructure
              projects across East Africa — with the goal of becoming the
              region&apos;s most trusted name in the industry.
            </p>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <div key={v.title} className="group">
                  <p className="mb-1 text-xs uppercase tracking-[0.3em] text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-medium text-[#358CB8] transition-colors group-hover:text-[#9CCBDA]">
                    {v.title}
                  </h3>
                  <div className="mt-2 h-px w-8 bg-[#358CB8]/40 transition-all duration-300 group-hover:w-full group-hover:bg-[#358CB8]/60" />
                  <p className="mt-3 text-sm leading-6 text-white/50">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.5em] text-[#358CB8]">Our Services</p>
              <h2 className="text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                What We Do
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/50 md:text-right">
              From first sketch to final handover — every discipline under one roof.
            </p>
          </div>

          <div ref={servicesRef} className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
            {services.map((service, index) => (
              <div
                key={service}
                data-row
                className="service-row group flex items-center justify-between py-8 transition-colors duration-300 md:py-10"
              >
                <div className="flex items-center gap-5">
                  <span className="w-6 text-xs text-white/20 transition-colors duration-300 group-hover:text-[#358CB8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-normal tracking-wide text-white/75 transition-colors duration-300 group-hover:text-white md:text-lg">
                    {service}
                  </span>
                </div>
                {/* Arrow that slides in on hover */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 translate-x-2 text-[#358CB8] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-36">
        {/* Ambient glow behind CTA */}
        <div
          className="glow-pulse pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(53,140,184,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center lg:px-8">
          {/* Eyebrow */}
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-[#358CB8]/70">
            Start A Conversation
          </p>

          {/* Headline — editorial scale */}
          <h2 className="text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
            Let&apos;s Build
            <br />
            <span className="text-[#9CCBDA]">Something Lasting.</span>
          </h2>

          <p className="mt-8 max-w-md text-base leading-7 text-white/50">
            Have a project in mind? Let&apos;s talk about what it will take to build it right.
          </p>

          {/* CTA button — floating, glowing */}
          <div className="cta-float mt-14 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 rounded-full px-10 py-5 text-base font-medium text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #358CB8 0%, #144B60 100%)",
                boxShadow: "0 0 40px rgba(53,140,184,0.35), 0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              Get A Quote
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-5 text-base text-white/70 transition-all duration-300 hover:border-[#358CB8]/50 hover:text-white"
            >
              View Projects
            </Link>
          </div>

          {/* Bottom divider */}
          <div className="mt-24 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#358CB8]/30 to-transparent" />
        </div>
      </section>
    </main>
  );
}