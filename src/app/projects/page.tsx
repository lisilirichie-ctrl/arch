"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js"

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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#144B60]/60 to-[#0D0F12]"></div>
      </div>

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-[55vh] items-end pb-16 pt-32">

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">

          <p className="mb-6 uppercase tracking-[0.4em] text-[#358CB8]">
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

      {/* ================= PROJECTS GRID ================= */}

      <section className="relative py-16">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {loading && (
            <div className="flex justify-center py-24">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#358CB8] border-t-transparent" />
            </div>
          )}

          {!loading && projects.length > 0 && (
            <>
              {/* Mobile: single column, name always visible */}
              <div className="flex flex-col gap-3 md:hidden">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group relative block aspect-[16/11] w-full overflow-hidden rounded-xl"
                  >
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-serif text-2xl font-normal tracking-tight text-white">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#9CCDDA]">
                        {project.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Desktop: dense grid, name revealed on hover */}
              <div className="hidden md:grid md:grid-cols-3 md:gap-2">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden"
                  >
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 backdrop-blur-0 transition-all duration-500 ease-out group-hover:bg-black/50 group-hover:opacity-100 group-hover:backdrop-blur-[2px]">
                      <div className="translate-y-3 text-center transition-transform duration-500 ease-out group-hover:translate-y-0">
                        <h3 className="font-serif text-2xl font-normal tracking-tight text-white md:text-3xl">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#9CCDDA]">
                          {project.location}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {!loading && projects.length === 0 && (
            <p className="py-20 text-center text-white/50">
              No projects yet.
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
            className="rounded-full bg-[#358CB8] px-8 py-4 font-medium text-white transition hover:bg-[#144B60]"
          >
            Get A Quote
          </Link>

        </div>

      </section>

    </main>
  );
}