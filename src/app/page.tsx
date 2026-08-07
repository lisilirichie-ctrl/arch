"use client";

import { useEffect, useState } from "react";
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

const socials = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@archstrucgroup",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#ffffff">
        <path d="M16.6 5.82c-.88-.96-1.36-2.22-1.36-3.52h-3.07v13.6c0 1.53-1.24 2.77-2.77 2.77a2.77 2.77 0 0 1-2.77-2.77 2.77 2.77 0 0 1 2.77-2.77c.26 0 .5.03.74.1v-3.14a5.86 5.86 0 0 0-.74-.05 5.85 5.85 0 0 0-5.85 5.86A5.85 5.85 0 0 0 9.4 21.8a5.85 5.85 0 0 0 5.85-5.86V9.01a8.9 8.9 0 0 0 5.18 1.66V7.6a5.6 5.6 0 0 1-3.83-1.78Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/archstrucgroup",
    color:
      "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#ffffff">
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.16 1.77.24.64.41 1.37.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.16 1.77 4.9 4.9 0 0 1-1.77 1.16c-.64.24-1.37.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.24-.64-.41-1.37-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.97.04-1.5.2-1.85.34-.46.18-.8.39-1.15.74-.35.35-.56.69-.74 1.15-.14.35-.3.88-.34 1.85-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.97.2 1.5.34 1.85.18.46.39.8.74 1.15.35.35.69.56 1.15.74.35.14.88.3 1.85.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.97-.04 1.5-.2 1.85-.34.46-.18.8-.39 1.15-.74.35-.35.56-.69.74-1.15.14-.35.3-.88.34-1.85.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.97-.2-1.5-.34-1.85a3.1 3.1 0 0 0-.74-1.15 3.1 3.1 0 0 0-1.15-.74c-.35-.14-.88-.3-1.85-.34-1.05-.05-1.37-.06-4.04-.06Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.88-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/archstrucgroup",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#ffffff">
        <path d="M13.6 10.6 20.9 2h-1.73l-6.34 7.46L7.77 2H2l7.66 11.15L2 22h1.74l6.7-7.87L15.98 22h5.77l-8.15-11.4Zm-2.37 2.79-.78-1.1L4.3 3.3h2.67l4.98 7.13.78 1.1 6.47 9.26h-2.67l-5.3-7.9Z" />
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
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

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
              className={`h-full w-full object-cover transition-transform duration-[7000ms] ${
                active === index ? "scale-110" : "scale-100"
              }`}
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
  <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

    <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
      <h1 className="text-2xl font-semibold tracking-tight">ARCHSTRUC</h1>
      <span className="text-xs uppercase tracking-[0.35em] text-[#D4A537]">Group</span>
    </Link>

    <div className="hidden items-center gap-10 lg:flex">
      {["Home", "About", "Services", "Projects", "Careers", "Contact"].map((item) => (
        <Link
          key={item}
          href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
          className="relative text-sm text-white/80 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#D4A537] after:transition-all hover:after:w-full"
        >
          {item}
        </Link>
      ))}
    </div>

    <button className="liquid-glass liquid-glass-gold hidden rounded-full px-6 py-3 font-medium text-[#D4A537] transition hover:scale-105 lg:block">
      Get A Quote
    </button>

    {/* Mobile hamburger */}
    <button
      onClick={() => setMobileOpen((prev) => !prev)}
      aria-label="Toggle menu"
      aria-expanded={mobileOpen}
      className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
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

  {/* Mobile menu panel */}
  <div
    className={`overflow-hidden transition-all duration-300 lg:hidden ${
      mobileOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
    }`}
  >
    <div className="flex flex-col gap-1 px-6 py-6">
      {["Home", "About", "Services", "Projects", "Careers", "Contact"].map((item) => (
        <Link
          key={item}
          href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
          onClick={() => setMobileOpen(false)}
          className="rounded-lg px-3 py-3 text-white/80 transition hover:bg-white/5 hover:text-white"
        >
          {item}
        </Link>
      ))}
      <button className="liquid-glass liquid-glass-gold mt-3 rounded-full px-6 py-3 font-medium text-[#D4A537]">
        Get A Quote
      </button>
    </div>
  </div>
</nav>
      {/* ================= HERO ================= */}

      <section className="relative flex min-h-screen items-center pt-24">

        {/* Content only — no img tags here, background is the fixed layer above */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">

            <p className="mb-6 uppercase tracking-[0.4em] text-[#D4A537]">
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
                className="liquid-glass liquid-glass-gold rounded-xl px-8 py-4 font-medium text-[#D4A537] transition hover:scale-[1.02]"
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
          <span className="mx-2 text-[#D4A537]">/</span>
          0{slides.length}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-8 z-20 hidden lg:flex flex-col items-center">
          <span className="rotate-90 text-xs uppercase tracking-[0.4em] text-white/50">Scroll</span>
          <div className="mt-8 h-16 w-px bg-gradient-to-b from-[#D4A537] to-transparent"></div>
        </div>

      </section>

      {/* ================= WHY CHOOSE US (glass panel, slides visible behind) ================= */}

      <section className="liquid-glass !rounded-none border-x-0 py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:px-8">

          <div>
            <p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">WHY ARCHSTRUC</p>
            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl leading-tight font-medium tracking-tight">
              Built With Precision.
              <br />
              Delivered With Integrity.
            </h2>
            <p className="mt-10 text-lg leading-9 text-white/65">
              Every project reflects our commitment to engineering excellence, innovation and long-term value.
            </p>
          </div>

          <div className="space-y-10">
            {[
              "Experienced Engineering Team",
              "Modern Construction Technology",
              "Strict Quality Control",
              "Timely Project Delivery",
            ].map((item) => (
              <div key={item} className="flex items-start gap-6 border-b border-white/10 pb-8">
                <div className="liquid-glass liquid-glass-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#D4A537]">
                  ✓
                </div>
                <div>
                  <h3 className="text-2xl font-medium">{item}</h3>
                  <p className="mt-3 text-white/60">Professional execution with uncompromising standards.</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= PROCESS (glass panel, slides visible behind) ================= */}

      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">OUR PROCESS</p>
          <h2 className="mt-4 text-5xl font-medium">From Vision To Reality</h2>

          <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["Consultation", "Planning", "Construction", "Completion"].map((step, index) => (
              <div key={step} className="liquid-glass rounded-2xl p-8">
                <div className="mb-6 text-5xl font-bold text-white/10">0{index + 1}</div>
                <h3 className="text-2xl font-semibold">{step}</h3>
                <p className="mt-4 leading-8 text-white/60">Every stage is managed with precision and attention to detail.</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= STATS (glass cards, slides visible behind) ================= */}

      <section className="py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 lg:grid-cols-4">
          {[
            ["120+", "Projects"],
            ["15+", "Years"],
            ["98%", "Client Satisfaction"],
            ["50+", "Experts"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="liquid-glass flex flex-col items-center gap-3 rounded-2xl px-4 py-10 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-medium text-[#D4A537]">{number}</h2>
              <p className="uppercase tracking-[0.3em] text-white/50 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}