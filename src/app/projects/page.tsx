"use client";

import { useState, useEffect } from "react";
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

const categories = ["All", "Residential", "Commercial", "Infrastructure"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

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

  const filtered =
    active === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category.toLowerCase() === active.toLowerCase()
        );

  return (
    <main className="relative min-h-screen text-white">

      {/* FULL-PAGE BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://archstrucgroup.co.ke/archstruc_admin/uploads/683193499f5d6_17q copy (1).jpg"
          alt="Archstruc Group project"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#0D0F12]"></div>
      </div>

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-[55vh] items-end pb-16 pt-32">

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">

          <p className="mb-6 uppercase tracking-[0.4em] text-[#D4A537]">
            OUR PROJECTS
          </p>

          <h1 className="max-w-2xl text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Work That Speaks
            <br />
            For Itself
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">
            A selection of residential, commercial and infrastructure
            projects delivered across East Africa.
          </p>

        </div>

      </section>

      {/* ================= FILTERS ================= */}

      <section className="relative pb-4">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`liquid-glass rounded-full px-6 py-3 text-sm font-medium transition ${
                  active === category
                    ? "liquid-glass-gold text-[#D4A537]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

        </div>

      </section>

      {/* ================= PROJECTS GRID ================= */}

      <section className="relative py-16">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {loading && (
            <div className="flex justify-center py-24">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4A537] border-t-transparent" />
            </div>
          )}

          {!loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="liquid-glass group relative flex flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                    <span className="absolute left-4 top-4 rounded-full bg-black/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#D4A537]">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="text-xl font-medium text-white transition-colors duration-300 group-hover:text-[#D4A537]">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/50">
                        {project.location}
                      </p>
                      {project.description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/60">
                          {project.description}
                        </p>
                      )}
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm text-[#D4A537] transition group-hover:gap-4">
                      View Project →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className="py-20 text-center text-white/50">
              No projects in this category yet.
            </p>
          )}

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="relative pb-32 pt-8">

        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center lg:px-8">

          <h2 className="text-3xl font-medium md:text-4xl">
            Have A Project In Mind?
          </h2>

          <p className="text-lg leading-8 text-white/60">
            Let&apos;s talk about what it will take to build it right.
          </p>

          <Link
            href="/contact"
            className="rounded-full bg-[#D4A537] px-8 py-4 font-medium text-black transition hover:bg-[#c99722]"
          >
            Get A Quote
          </Link>

        </div>

      </section>

    </main>
  );
}