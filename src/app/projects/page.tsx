"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  status: string;
  cover_image: string;
  description: string | null;
};

/* ---------- Block reveal — card slides up from behind a clipping container ---------- */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    /* Outer clip — hides the card while it's below the fold */
    <div ref={ref} className="overflow-hidden">
      <div
        style={{
          transitionDelay: `${delay}ms`,
          transitionDuration: "800ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={`transition-transform ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- Simple fade reveal for text ---------- */
function FadeReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from("projects")
        .select(
          "id, slug, title, location, category, status, cover_image, description"
        )
        .order("created_at", { ascending: false });

      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="relative min-h-screen bg-[#0B0D10] text-white">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.7s ease-out both;
        }
      `}</style>

      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#358CB8]/8 blur-[120px]" />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="relative z-10 mx-auto max-w-[1600px] px-6 pb-10 pt-20 lg:px-10">
        <div className="flex items-end justify-between">
          <h1
            className="text-3xl font-light tracking-tight text-white animate-fade-up md:text-4xl"
            style={{ animationDelay: "80ms" }}
          >
            Our Projects
          </h1>
          <span
            className="text-sm tabular-nums text-white/30 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            {String(filtered.length).padStart(2, "0")}
          </span>
        </div>
      </header>

      {/* ── FILTER BAR ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 sticky top-0 border-b border-white/8 bg-[#0B0D10]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center gap-1 overflow-x-auto px-6 lg:px-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative whitespace-nowrap px-4 py-3.5 text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                activeCategory === cat
                  ? "text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {cat}
              <span
                className={`absolute inset-x-4 bottom-0 h-px bg-[#358CB8] transition-transform duration-400 ease-out origin-left ${
                  activeCategory === cat ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-10">
        {loading && (
          <div className="flex justify-center py-32">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#358CB8] border-t-transparent" />
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 lg:px-10 gap-3">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 120}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block overflow-hidden rounded-sm bg-[#111418]"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </div>

                  {/* Permanent bottom gradient so title is always readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Title — hidden until hover, slides up from bottom */}
                  <div className="absolute inset-x-0 bottom-0 overflow-hidden px-5 pb-5 pointer-events-none">
                    <p className="text-sm font-light tracking-wide text-white translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 md:text-base">
                      {project.title}
                    </p>
                  </div>

                  {/* Teal left-border accent that draws in on hover */}
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-[#358CB8] scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="py-32 text-center text-sm text-white/30">
            No projects yet.
          </p>
        )}
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-white/8 py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center">
          <FadeReveal>
            <h2 className="text-3xl font-light tracking-tight md:text-4xl">
              Have a project in mind?
            </h2>
          </FadeReveal>
          <FadeReveal delay={100}>
            <p className="text-sm leading-7 text-white/45">
              Let&apos;s talk about what it will take to build it right.
            </p>
          </FadeReveal>
          <FadeReveal delay={200}>
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full border border-[#358CB8] px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] text-white transition-colors duration-500"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#358CB8] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Get A Quote</span>
            </Link>
          </FadeReveal>
        </div>
      </section>
    </main>
  );
}