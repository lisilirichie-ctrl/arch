"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image:
      "https://archstrucgroup.co.ke/archstruc_admin/uploads/1750828417_IMG_4292.JPG",
    title: "Building Kenya's Future.",
    subtitle:
      "Delivering world class engineering, architecture and construction solutions across East Africa.",
  },
  {
    image:
      "https://archstrucgroup.co.ke/archstruc_admin/uploads/1746876863_63.5.jpg",
    title: "Designed For Generations.",
    subtitle:
      "Creating spaces that combine innovation, precision and lasting value.",
  },
  {
    image:
      "https://archstrucgroup.co.ke/archstruc_admin/uploads/683193499f5d6_17q copy (1).jpg",
    title: "Engineering Tomorrow.",
    subtitle:
      "From concept to completion, we build with excellence.",
  },
];

const SLIDE_DURATION = 7000;

const projects = [
  {
    slug: "residential-maisonette-croton-ridge",
    title: "Residential Maisonette",
    location: "Croton Ridge, Kiambu",
    category: "Residential",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_05adb54d-535b-4d8c-8f39-9d5a519cdcbd.png",
  },
  {
    slug: "interior-westlands",
    title: "Interior Design",
    location: "Westlands, Nairobi County",
    category: "Interior",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_10d2e7a5-653b-4291-9337-db7d5a46fdcb.png",
  },
  {
    slug: "dg-residence",
    title: "DG Residence",
    location: "Kikuyu, Kiambu County",
    category: "Residential",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_3483c563-adde-4bb6-b8af-3f055af0f1a1.jpg",
  },
  {
    slug: "tm-apartments",
    title: "TM Apartments",
    location: "Kikuyu, Kiambu County",
    category: "Residential",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_429ebd5a-7acb-4123-9f6e-c100b5cebb71.jpg",
  },
  {
    slug: "cn-residence",
    title: "CN Residence",
    location: "Chuka, Tharaka Nithi County",
    category: "Residential",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_50053a99-a552-452a-8bf9-f2ca7b509488.jpg",
  },
  {
    slug: "dw-residence",
    title: "DW Residence",
    location: "Machakos, Machakos County",
    category: "Residential",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_6f86a9ff-bdca-4310-abe5-a953d9312ab4.jpg",
  },
  {
    slug: "interior-juba-1",
    title: "Interior Design",
    location: "Juba, South Sudan",
    category: "Interior",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_78e94d1f-02a5-481c-b2b8-2b8e4b8c2be9.png",
  },
  {
    slug: "residential-maisonette-tatu-city",
    title: "Residential Maisonette",
    location: "Tatu City, Kiambu County",
    category: "Residential",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_7911cc4d-7d7d-4298-9636-7ebeab12c071.jpg",
  },
  {
    slug: "interior-tatu-city",
    title: "Interior Design",
    location: "Tatu City, Kiambu County",
    category: "Interior",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_892828c7-a1d3-4fbd-afff-b92bc46e007c.png",
  },
  {
    slug: "twiga-greens",
    title: "Twiga Greens",
    location: "Tatu City, Kiambu County",
    category: "Residential",
    description:
      "20 residential blocks, each rising 12 floors, offering a blend of 2 and 3-bedroom units designed for modern urban living.",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_8fcedcf2-4cbd-4251-bb87-34dcc851c54f.jpg",
  },
  {
    slug: "kn-residence",
    title: "KN Residence",
    location: "Utawala, Nairobi County",
    category: "Residential",
    image:
      "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/cover_9a63a5d4-1bf6-47ff-896d-e01057987833.jpg",
  },
];

const socials = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@archstruc_group_ltd",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#ffffff">
        <path d="M16.6 5.82c-.88-.96-1.36-2.22-1.36-3.52h-3.07v13.6c0 1.53-1.24 2.77-2.77 2.77a2.77 2.77 0 0 1-2.77-2.77 2.77 2.77 0 0 1 2.77-2.77c.26 0 .5.03.74.1v-3.14a5.86 5.86 0 0 0-.74-.05 5.85 5.85 0 0 0-5.85 5.86A5.85 5.85 0 0 0 9.4 21.8a5.85 5.85 0 0 0 5.85-5.86V9.01a8.9 8.9 0 0 0 5.18 1.66V7.6a5.6 5.6 0 0 1-3.83-1.78Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/archstruc_group/",
    color:
      "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#ffffff">
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.16 1.77.24.64.41 1.37.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.16 1.77 4.9 4.9 0 0 1-1.77 1.16c-.64.24-1.37.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.24-.64-.41-1.37-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.97.04-1.5.2-1.85.34-.46.18-.8.39-1.15.74-.35.35-.56.69-.74 1.15-.14.35-.3.88-.34 1.85-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.97.2 1.5.34 1.85.18.46.39.8.74 1.15.35.35.69.56 1.15.74.35.14.88.3 1.85.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.97-.04 1.5-.2 1.85-.34.46-.18.8-.39 1.15-.74.35-.35.56-.69.74-1.15.14-.35.3-.88.34-1.85.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.97-.2-1.5-.34-1.85a3.1 3.1 0 0 0-.74-1.15 3.1 3.1 0 0 0-1.15-.74c-.35-.14-.88-.3-1.85-.34-1.05-.05-1.37-.06-4.04-.06Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.88-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/61575856977760/",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#ffffff">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/archstrucgroup",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#ffffff">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.98 1.83-2.02 3.77-2.02 4.03 0 4.78 2.5 4.78 5.76V21H18v-5.6c0-1.33-.02-3.05-1.86-3.05-1.87 0-2.15 1.44-2.15 2.95V21H10V9Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href:
      "https://wa.me/254795853879?text=" +
      encodeURIComponent("Hi Archstruc Group, I'm interested in your services."),
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#ffffff">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.12-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.72-2.08.98-2.37c.26-.29.56-.36.75-.36h.53c.17 0 .4-.03.62.47.24.56.81 1.94.88 2.08.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const projectScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const handleProjectScroll = () => {
    const el = projectScrollerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setProjectIndex(index);
  };

  const goToProject = (index: number) => {
    const el = projectScrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen text-white">
      {/* ================= FIXED SLIDESHOW BACKGROUND (covers entire page, stays while scrolling) ================= */}

      <div className="fixed inset-0 -z-10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${
              active === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        {/* dark overlay so everything stays readable over any slide */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      </div>

      {/* ================= SOCIAL SIDEBAR ================= */}

      <div className="fixed right-4 top-1/2 z-[60] flex -translate-y-1/2 flex-col items-center gap-4 sm:right-6">
        {socials.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-110"
            style={{ background: social.color }}
          >
            {social.icon}
          </Link>
        ))}
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="liquid-glass fixed top-0 left-0 z-50 w-full !rounded-none border-x-0 border-t-0">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-4"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src="/archstruc-icon.png"
              alt="Archstruc Group"
              className="h-16 w-16 shrink-0"
            />
            <span className="flex flex-col leading-none">
              <span className="text-3xl font-semibold tracking-tight">
                ARCHSTRUC
              </span>
              <span className="text-sm uppercase tracking-[0.35em] text-[#358CB8]">
                Group
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {["Home", "About", "Services", "Projects", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="relative text-sm text-white/80 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#358CB8] after:transition-all hover:after:w-full"
                >
                  {item}
                </Link>
              )
            )}
          </div>

          <Link
            href="/contact"
            className="liquid-glass liquid-glass-gold hidden rounded-full px-6 py-3 font-medium text-[#358CB8] transition hover:scale-105 lg:block"
          >
            Get A Quote
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-105 lg:hidden"
          >
            <div className="flex h-4 w-5 flex-col justify-between">
              <span
                className={`h-px w-full bg-white transition-all duration-300 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-white transition-all duration-300 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel — SIBLING of <nav>, not nested inside it */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md  lg">
          <div className="flex h-full flex-col px-9 pt-32">
            {/* Mobile navigation */}
            <nav className="flex flex-col gap-7">
              {["Home", "About", "Services", "Projects", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-light text-white/90 transition-colors hover:text-[#358CB8]"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>

            {/* Get A Quote */}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-10 w-fit rounded-full border border-[#358CB8]/40 bg-[#358CB8]/10 px-8 py-3 text-lg text-[#358CB8] transition hover:bg-[#358CB8]/20"
            >
              Get A Quote
            </Link>
          </div>
        </div>
      )}

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-screen items-center pt-24">
        {/* Content only — no img tags here, background is the fixed layer above */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-6 uppercase tracking-[0.4em] text-[#358CB8]">
              ENGINEERING EXCELLENCE
            </p>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-semibold leading-[0.95] tracking-tight">
              {slides[active].title}
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">
              {slides[active].subtitle}
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <Link
                href="/projects"
                className="liquid-glass liquid-glass-gold rounded-xl px-8 py-4 font-medium text-[#358CB8] transition hover:scale-[1.02]"
              >
                Explore Projects
              </Link>
              <Link
                href="/contact"
                className="liquid-glass rounded-full px-8 py-4 transition hover:scale-[1.02]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-10 left-6 z-20 text-sm tracking-[0.3em] text-white/60 lg:left-8">
          0{active + 1}
          <span className="mx-2 text-[#358CB8]">/</span>
          0{slides.length}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-8 z-20 hidden lg:flex flex-col items-center">
          <span className="rotate-90 text-xs uppercase tracking-[0.4em] text-white/50">
            Scroll
          </span>
          <div className="mt-8 h-16 w-px bg-gradient-to-b from-[#358CB8] to-transparent"></div>
        </div>
      </section>

      {/* ================= PROJECTS (full-screen horizontal slides) ================= */}

      <section className="relative h-screen w-full overflow-hidden">
        <div
          ref={projectScrollerRef}
          onScroll={handleProjectScroll}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="relative flex h-full w-screen shrink-0 snap-start items-end"
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

              <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 lg:px-8">
                <p className="uppercase tracking-[0.4em] text-[#358CB8] text-sm">
                  {project.category} · {project.location}
                </p>
                <h3 className="mt-5 max-w-3xl text-4xl md:text-6xl font-medium leading-[1.02] tracking-tight">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="mt-6 max-w-xl text-white/70 leading-7">
                    {project.description}
                  </p>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="liquid-glass mt-8 inline-block rounded-full px-7 py-3 text-sm transition hover:scale-[1.02]"
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* eyebrow + index counter */}
        <p className="pointer-events-none absolute top-10 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.35em] text-white/50">
          Featured Projects
        </p>
        <div className="pointer-events-none absolute bottom-28 right-6 z-10 text-sm tracking-[0.3em] text-white/60 lg:right-8">
          {String(projectIndex + 1).padStart(2, "0")}
          <span className="mx-2 text-[#358CB8]">/</span>
          {String(projects.length).padStart(2, "0")}
        </div>

        {/* left / right arrows */}
        <button
          onClick={() => goToProject(Math.max(projectIndex - 1, 0))}
          aria-label="Previous project"
          className="liquid-glass absolute left-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition hover:scale-105 md:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => goToProject(Math.min(projectIndex + 1, projects.length - 1))}
          aria-label="Next project"
          className="liquid-glass liquid-glass-gold absolute right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-[#358CB8] transition hover:scale-105 md:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* dot progress, bottom center, with mobile prev/next buttons */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
          <button
            onClick={() => goToProject(Math.max(projectIndex - 1, 0))}
            aria-label="Previous project"
           className="liquid-glass pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                onClick={() => goToProject(index)}
                aria-label={`Go to ${project.title}`}
                className={`pointer-events-auto h-2 rounded-full transition-all ${
                  projectIndex === index
                    ? "w-6 bg-[#358CB8]"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goToProject(Math.min(projectIndex + 1, projects.length - 1))}
            aria-label="Next project"
            className="liquid-glass liquid-glass-gold pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full text-[#358CB8] transition hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}