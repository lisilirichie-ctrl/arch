
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    image: "https://archstrucgroup.co.ke/archstruc_admin/uploads/1750828417_IMG_4292.JPG",
    title: "Building Kenya's Future.",
    subtitle: "Delivering world class engineering, architecture and construction solutions across East Africa.",
  },
  {
    image: "https://archstrucgroup.co.ke/archstruc_admin/uploads/1746876863_63.5.jpg",
    title: "Designed For Generations.",
    subtitle: "Creating spaces that combine innovation, precision and lasting value.",
  },
  {
    image: "https://archstrucgroup.co.ke/archstruc_admin/uploads/683193499f5d6_17q copy (1).jpg",
    title: "Engineering Tomorrow.",
    subtitle: "From concept to completion, we build with excellence.",
  },
];

const SLIDE_DURATION = 7000;

const projects = [
  // ── moved from last 3
  { slug: "km-residence-tatu-city", title: "K.M Residence", image: "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/covers/1787910671207-ffs28zt2gjm.webp" },
  { slug: "lb-residence", title: "L.B Residence", image: "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/covers/1787171110460-p545yep2fxh.png" },
  { slug: "amani-residence", title: "Amani Residence", image: "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/covers/1787174436737-o1w27svfbyr.jpg" },
  // ── original order ──
  { slug: "m.l residence", title: "M.L Residence", image: "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/covers/1787171786491-v3ptlzjkfnd.png" },
  { slug: "mugutha residence", title: "Mugutha Residence", image: "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/covers/1787175311168-2kyywjpnvff.png" },
  { slug: "apex-residence", title: "Apex Residence", image: "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/covers/1787909055534-8qqfzss5q48.webp" },
  
];

const socials = [
  {
    label: "TikTok", href: "https://www.tiktok.com/@archstruc_group_ltd", color: "#000000",
    icon: (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ffffff"><path d="M16.6 5.82c-.88-.96-1.36-2.22-1.36-3.52h-3.07v13.6c0 1.53-1.24 2.77-2.77 2.77a2.77 2.77 0 0 1-2.77-2.77 2.77 2.77 0 0 1 2.77-2.77c.26 0 .5.03.74.1v-3.14a5.86 5.86 0 0 0-.74-.05 5.85 5.85 0 0 0-5.85 5.86A5.85 5.85 0 0 0 9.4 21.8a5.85 5.85 0 0 0 5.85-5.86V9.01a8.9 8.9 0 0 0 5.18 1.66V7.6a5.6 5.6 0 0 1-3.83-1.78Z" /></svg>),
  },
  {
    label: "Instagram", href: "https://www.instagram.com/archstruc_group/", color: "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    icon: (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ffffff"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.16 1.77.24.64.41 1.37.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.16 1.77 4.9 4.9 0 0 1-1.77 1.16c-.64.24-1.37.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.24-.64-.41-1.37-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.97.04-1.5.2-1.85.34-.46.18-.8.39-1.15.74-.35.35-.56.69-.74 1.15-.14.35-.3.88-.34 1.85-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.97.2 1.5.34 1.85.18.46.39.8.74 1.15.35.35.69.56 1.15.74.35.14.88.3 1.85.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.97-.04 1.5-.2 1.85-.34.46-.18.8-.39 1.15-.74.35-.35.56-.69.74-1.15.14-.35.3-.88.34-1.85.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.97-.2-1.5-.34-1.85a3.1 3.1 0 0 0-.74-1.15 3.1 3.1 0 0 0-1.15-.74c-.35-.14-.88-.3-1.85-.34-1.05-.05-1.37-.06-4.04-.06Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.88-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" /></svg>),
  },
  {
    label: "Facebook", href: "https://www.facebook.com/61575856977760/", color: "#1877F2",
    icon: (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ffffff"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" /></svg>),
  },
  {
    label: "LinkedIn", href: "https://www.linkedin.com/company/archstrucgroup", color: "#0A66C2",
    icon: (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ffffff"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.98 1.83-2.02 3.77-2.02 4.03 0 4.78 2.5 4.78 5.76V21H18v-5.6c0-1.33-.02-3.05-1.86-3.05-1.87 0-2.15 1.44-2.15 2.95V21H10V9Z" /></svg>),
  },
  {
    label: "WhatsApp", href: "https://wa.me/254795853879?text=" + encodeURIComponent("Hi Archstruc Group, I'm interested in your services."), color: "#25D366",
    icon: (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ffffff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.12-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.72-2.08.98-2.37c.26-.29.56-.36.75-.36h.53c.17 0 .4-.03.62.47.24.56.81 1.94.88 2.08.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" /></svg>),
  },
];

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 40}px, ${e.clientY - 40}px)`;
      }
    };
    const on = () => setHovering(true);
    const off = () => setHovering(false);
    window.addEventListener("mousemove", move, { passive: true });
    const attach = () => {
      document.querySelectorAll("[data-cursor='view']").forEach((el) => {
        el.addEventListener("mouseenter", on);
        el.addEventListener("mouseleave", off);
      });
    };
    attach();
    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("[data-cursor='view']").forEach((el) => {
        el.removeEventListener("mouseenter", on);
        el.removeEventListener("mouseleave", off);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[999] flex h-20 w-20 items-center justify-center rounded-full border border-white/40 backdrop-blur-sm transition-[opacity,transform] duration-200 ${hovering ? "scale-100 opacity-100 bg-[#358CB8]/20" : "scale-0 opacity-0"}`}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white">View</span>
    </div>
  );
}

// Preload all project images as soon as the component mounts so
// the browser has them cached before the user scrolls to them.
// This eliminates the hang on L.B and Amani Residence.
function usePreloadProjectImages() {
  useEffect(() => {
    projects.forEach((project) => {
      const img = new window.Image();
      img.src = project.image;
    });
  }, []);
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const [zoomKey, setZoomKey] = useState(0);
  const projectScrollerRef = useRef<HTMLDivElement>(null);
  const titleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Kick off preloading immediately on mount
  usePreloadProjectImages();

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(t);
  }, []);

  const handleProjectScroll = () => {
    const el = projectScrollerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== projectIndex) {
      setTitleVisible(false);
      if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
      titleTimeoutRef.current = setTimeout(() => {
        setProjectIndex(index);
        setZoomKey((k) => k + 1);
        setTitleVisible(true);
      }, 120);
    }
  };

  const goToProject = (index: number) => {
    const el = projectScrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-[100dvh] text-white">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .title-in { animation: slideUp 0.25s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-link { animation: navFadeIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        .nav-link:nth-child(1) { animation-delay: 0.05s; }
        .nav-link:nth-child(2) { animation-delay: 0.1s; }
        .nav-link:nth-child(3) { animation-delay: 0.15s; }
        .nav-link:nth-child(4) { animation-delay: 0.2s; }
        @keyframes pulseRing {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.18); opacity: 0; }
          100% { transform: scale(1.18); opacity: 0; }
        }
        .quote-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 1.5px solid #358CB8;
          animation: pulseRing 2s ease-out infinite;
        }
        /* FIX: Prevent iOS rubber-band scroll from revealing white gaps */
        html, body { overscroll-behavior: none; }

        /* Ken Burns zoom-in for the currently viewed featured project image */
        @keyframes kenBurnsZoom {
          0%   { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .project-zoom {
          animation: kenBurnsZoom 13s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .project-zoom { animation: none; }
        }
      `}</style>

      <CustomCursor />

      {/* ── Fixed slideshow background ── */}
      <div className="fixed inset-0 -z-10 h-[100dvh] w-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${active === i ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              unoptimized={process.env.NODE_ENV !== "production"}
              className="object-cover object-center"
              style={{ willChange: "opacity" }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      </div>

      {/* ── Social icons ── */}
      <div className="fixed bottom-20 right-3 z-[60] flex flex-col items-center gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
        {socials.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:scale-110 sm:h-8 sm:w-8"
            style={{ background: s.color }}
          >
            {s.icon}
          </Link>
        ))}
      </div>

      {/* ── Navbar ── */}
      <nav
        className="liquid-glass fixed top-0 left-0 z-50 w-full border-b border-white/10 backdrop-blur-md"
        style={{ background: "linear-gradient(180deg, rgba(8,15,20,0.55) 0%, rgba(8,15,20,0.25) 100%)" }}
      >
        <div className="flex h-16 w-full items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-2 sm:gap-3" onClick={() => setMobileOpen(false)}>
            <img src="/archstruc-icon.png" alt="Archstruc Group" className="h-9 w-9 shrink-0 sm:h-12 sm:w-12" />
            <span className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-tight sm:text-xl">ARCHSTRUC</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#358CB8] sm:text-xs">Group</span>
            </span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {["Home", "Projects", "Contacts", "Services"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="nav-link relative text-base font-medium text-[#358CB8] transition-all duration-200 hover:text-[#9CCBDA] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-[#358CB8] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>

          <Link
            href="/contacts"
            className="quote-ring liquid-glass liquid-glass-gold relative hidden rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#358CB8]/30 lg:block"
            style={{ background: "linear-gradient(135deg, rgba(53,140,184,0.25) 0%, rgba(20,75,96,0.35) 100%)", border: "1.5px solid rgba(53,140,184,0.6)" }}
          >
            Get A Quote
          </Link>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:scale-105 lg:hidden"
          >
            <div className="flex h-4 w-5 flex-col justify-between">
              <span className={`h-px w-full bg-white transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-white transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md">
          <div className="flex h-full flex-col px-9 pt-28 sm:pt-32">
            <nav className="flex flex-col gap-7">
              {["Home", "Projects", "Contacts", "Services"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-light text-white/90 transition-colors hover:text-[#358CB8]"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <Link
              href="/contacts"
              onClick={() => setMobileOpen(false)}
              className="mt-10 w-fit rounded-full border border-[#358CB8]/40 bg-[#358CB8]/10 px-8 py-3 text-base text-[#358CB8] transition hover:bg-[#358CB8]/20"
            >
              Get A Quote
            </Link>
          </div>
        </div>
      )}

      {/* ── Projects scroller ── */}
      <section className="relative h-[100dvh] w-full overflow-hidden">
        <div
          ref={projectScrollerRef}
          onScroll={handleProjectScroll}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, i) => {
            const isActive = i === projectIndex;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                data-cursor="view"
                className="relative flex h-full w-screen shrink-0 snap-start items-end overflow-hidden"
              >
                <Image
                  // priority={true} on all slides ensures the browser fetches
                  // every project image eagerly on mount — no cold-fetch stutter
                  // when scrolling to L.B or Amani Residence.
                  key={isActive ? `zoom-${zoomKey}` : `static-${i}`}
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={true}
                  sizes="100vw"
                  unoptimized={process.env.NODE_ENV !== "production"}
                  className={`object-cover object-center ${isActive ? "project-zoom" : ""}`}
                  style={{ willChange: "transform" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
              </Link>
            );
          })}
        </div>

        {/* Title */}
        <div className="pointer-events-none absolute bottom-20 left-4 z-20 sm:bottom-24 lg:left-10">
          <p
            key={projectIndex}
            className={`text-base font-light tracking-wide text-white sm:text-lg md:text-xl ${titleVisible ? "title-in" : "opacity-0"}`}
          >
            {projects[projectIndex]?.title}
          </p>
        </div>

        {/* Eyebrow */}
        <div className="pointer-events-none absolute top-20 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 sm:top-24">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#358CB8]/80 font-medium sm:text-[11px] sm:tracking-[0.5em]">
            Featured Projects
          </p>
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-[#358CB8]/60 to-transparent" />
        </div>

        {/* Counter */}
        <div className="pointer-events-none absolute bottom-20 right-4 z-10 text-xs tracking-[0.25em] text-white/50 sm:bottom-24 sm:right-8 sm:text-sm sm:tracking-[0.3em]">
          {String(projectIndex + 1).padStart(2, "0")}
          <span className="mx-1.5 text-[#358CB8] sm:mx-2">/</span>
          {String(projects.length).padStart(2, "0")}
        </div>

        {/* Desktop arrows */}
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

        {/* Mobile dots + arrows */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          <button
            onClick={() => goToProject(Math.max(projectIndex - 1, 0))}
            aria-label="Previous project"
            className="liquid-glass pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full transition active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => goToProject(i)}
                aria-label={`Go to ${p.title}`}
                className={`pointer-events-auto h-1.5 rounded-full transition-all duration-200 ${
                  projectIndex === i ? "w-5 bg-[#358CB8]" : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goToProject(Math.min(projectIndex + 1, projects.length - 1))}
            aria-label="Next project"
            className="liquid-glass liquid-glass-gold pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full text-[#358CB8] transition active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── Hero ── */}
      <section className="relative flex min-h-[100dvh] items-end pb-10 pt-16 sm:pt-20">
        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#358CB8] sm:mb-4 sm:text-sm">
              Engineering Excellence
            </p>
            <h1 className="text-2xl font-medium leading-[1.05] tracking-tight sm:text-3xl xl:text-4xl">
              {slides[active].title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:mt-6 sm:text-base">
              {slides[active].subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-4 sm:mt-9 sm:gap-5">
              <Link
                href="/projects"
                className="liquid-glass liquid-glass-gold rounded-xl px-6 py-3 text-sm font-medium text-[#358CB8] transition hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Projects
              </Link>
              <Link
                href="/contact"
                className="liquid-glass rounded-full px-6 py-3 text-sm transition hover:scale-[1.02] active:scale-[0.98]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-4 z-20 text-sm tracking-[0.3em] text-white/60 lg:left-8">
          0{active + 1}<span className="mx-2 text-[#358CB8]">/</span>0{slides.length}
        </div>
      </section>
    </main>
  );
}