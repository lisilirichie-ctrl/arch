"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const PROJECT_DURATION = 8000;

const projects = [
  { slug: "km-residence-tatu-city", title: "K.M Residence", image: "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/covers/1787905838471-hlk59kxkyfd.webp" },
  { slug: "lb-residence", title: "L.B Residence", image: "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/covers/1787906253182-m2axrc6bcel.webp" },
  { slug: "amani-residence", title: "Amani Residence", image: "https://mtmyqbymrcgjnjyjyfgp.supabase.co/storage/v1/object/public/project-images/covers/1787174436737-o1w27svfbyr.jpg" },
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

/** Detects touch/coarse-pointer devices so we can skip cursor & hover-only behavior on mobile. */
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouch(mq.matches);
    const listener = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return isTouch;
}

function CustomCursor({ disabled }: { disabled: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (disabled) return;
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
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[999] hidden h-20 w-20 items-center justify-center rounded-full border border-white/40 backdrop-blur-sm transition-[opacity,transform] duration-200 md:flex ${hovering ? "scale-100 opacity-100 bg-[#358CB8]/20" : "scale-0 opacity-0"}`}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white">View</span>
    </div>
  );
}

function usePreloadProjectImages() {
  useEffect(() => {
    projects.forEach((project) => {
      const img = new window.Image();
      img.src = project.image;
    });
  }, []);
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const [zoomKey, setZoomKey] = useState(0);
  const projectScrollerRef = useRef<HTMLDivElement>(null);
  const titleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouch = useIsTouchDevice();

  usePreloadProjectImages();

  // Auto-scroll featured projects
  useEffect(() => {
    const interval = setInterval(() => {
      if (userInteractingRef.current) return;
      const el = projectScrollerRef.current;
      if (!el) return;
      setProjectIndex((prev) => {
        const next = (prev + 1) % projects.length;
        el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
        return next;
      });
    }, PROJECT_DURATION);
    return () => clearInterval(interval);
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
    userInteractingRef.current = true;
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false;
    }, 8000);
    const el = projectScrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden text-white">
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
        html, body { overscroll-behavior: none; }
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
        /* iOS safe-area helpers for fixed bottom UI */
        .safe-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
      `}</style>

      <CustomCursor disabled={isTouch} />

      {/* ── Social icons — always vertical, docked to the right side (both mobile & desktop) ── */}
      <div className="fixed bottom-24 right-3 z-[60] flex flex-col items-center gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
        {socials.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex h-8 w-8 items-center justify-center rounded-full transition active:scale-95 hover:scale-110 sm:h-9 sm:w-9"
            style={{ background: s.color }}
          >
            {s.icon}
          </Link>
        ))}
      </div>

      {/* ── Navbar — true glassmorphism ── */}
      <nav
        className="fixed top-0 left-0 z-50 w-full border-b border-white/15 backdrop-blur-xl backdrop-saturate-150"
        style={{
          background: "linear-gradient(180deg, rgba(15,25,32,0.45) 0%, rgba(15,25,32,0.15) 100%)",
          boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.12)",
        }}
      >
        <div className="flex h-16 w-full items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={() => setMobileOpen(false)}>
            <img src="/archstruc-icon.png" alt="Archstruc Group" className="h-8 w-8 shrink-0 sm:h-12 sm:w-12" />
            <span className="flex min-w-0 flex-col justify-center leading-none pb-0.5">
              <span className="truncate text-sm font-semibold tracking-tight xs:text-base sm:text-xl">ARCHSTRUC</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#358CB8] sm:text-xs sm:tracking-[0.3em]">Group</span>
            </span>
          </Link>

          <div className="hidden items-start gap-10 pt-1 lg:flex">
            {["Home", "Projects", "Contacts", "Services"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="nav-link relative -translate-y-0.5 text-base font-medium text-[#358CB8] transition-all duration-200 hover:text-[#9CCBDA] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-[#358CB8] after:transition-all after:duration-300 hover:after:w-full"
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 transition active:scale-95 hover:scale-105 lg:hidden"
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
          <div className="safe-bottom flex h-full flex-col overflow-y-auto px-6 pt-24 sm:px-9 sm:pt-32">
            <nav className="flex flex-col gap-1">
              {["Home", "Projects", "Contacts", "Services"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/5 py-4 text-xl font-light text-white/90 transition-colors active:text-[#358CB8] hover:text-[#358CB8]"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <Link
              href="/contacts"
              onClick={() => setMobileOpen(false)}
              className="mt-8 w-full rounded-full border border-[#358CB8]/40 bg-[#358CB8]/10 px-8 py-4 text-center text-base text-[#358CB8] transition active:scale-[0.98] hover:bg-[#358CB8]/20"
            >
              Get A Quote
            </Link>
          </div>
        </div>
      )}

      {/* ── Featured Projects — full viewport ── */}
      <section className="relative h-[100dvh] w-full overflow-hidden">
        <div
          ref={projectScrollerRef}
          onScroll={handleProjectScroll}
          onTouchStart={() => {
            userInteractingRef.current = true;
            if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
          }}
          onTouchEnd={() => {
            interactionTimeoutRef.current = setTimeout(() => {
              userInteractingRef.current = false;
            }, 8000);
          }}
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

        {/* Eyebrow */}
        <div className="pointer-events-none absolute top-20 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 sm:top-24">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#358CB8]/80 font-medium sm:text-[11px] sm:tracking-[0.5em]">
            Featured Projects
          </p>
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-[#358CB8]/60 to-transparent" />
        </div>

        {/* Project title — raised well clear of the dot nav / social icons */}
        <div className="safe-bottom pointer-events-none absolute bottom-36 left-4 right-16 z-20 sm:bottom-40 sm:right-auto lg:left-10">
          <p
            key={projectIndex}
            className={`truncate text-sm font-light tracking-wide text-white xs:text-base sm:text-lg md:text-xl ${titleVisible ? "title-in" : "opacity-0"}`}
          >
            {projects[projectIndex]?.title}
          </p>
        </div>

        {/* Counter — raised to match the title */}
        <div className="safe-bottom pointer-events-none absolute bottom-36 right-4 z-10 text-[11px] tracking-[0.2em] text-white/50 sm:bottom-40 sm:right-8 sm:text-sm sm:tracking-[0.3em]">
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
        <div className="safe-bottom pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          <button
            onClick={() => goToProject(Math.max(projectIndex - 1, 0))}
            aria-label="Previous project"
            className="liquid-glass pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95"
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
            className="liquid-glass liquid-glass-gold pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full text-[#358CB8] transition active:scale-95"
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