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

export default function Home() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-[#0D0F12] text-white">

      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#0D0F12]/40 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          <Link href="/" className="flex items-center gap-2">

            <h1 className="text-2xl font-semibold tracking-tight">
              ARCHSTRUC
            </h1>

            <span className="text-xs uppercase tracking-[0.35em] text-[#D4A537]">
              Group
            </span>

          </Link>

          <div className="hidden items-center gap-10 lg:flex">

           <Link
  href="/"
  className="relative text-sm text-white/80 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#D4A537] after:transition-all hover:after:w-full"
>
  Home
</Link>

            <Link
              href="/about"
              className="relative text-sm text-white/80 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#D4A537] after:transition-all hover:after:w-full"
            >
              About
            </Link>

            <Link
              href="/services"
              className="relative text-sm text-white/80 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#D4A537] after:transition-all hover:after:w-full"
            >
              Services
            </Link>

            <Link
              href="/projects"
              className="relative text-sm text-white/80 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#D4A537] after:transition-all hover:after:w-full"
            >
              Projects
            </Link>

            <Link
              href="/careers"
              className="relative text-sm text-white/80 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#D4A537] after:transition-all hover:after:w-full"
            >
              Careers
            </Link>

            <Link
              href="/contact"
              className="relative text-sm text-white/80 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#D4A537] after:transition-all hover:after:w-full"
            >
              Contact
            </Link>

          </div>

          <button className="rounded-full bg-[#D4A537] px-6 py-3 font-medium text-black transition hover:scale-105 hover:bg-[#c99722]">

            Get A Quote

          </button>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-screen items-center pt-24 overflow-hidden">

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

        {/* Overlays */}

        <div className="absolute inset-0 bg-black/45"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-black/30"></div>

        {/* Content */}

        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="mb-6 uppercase tracking-[0.4em] text-[#D4A537]">

              ENGINEERING EXCELLENCE

            </p>

           <h1 className="text-5xl
md:text-6xl
xl:text-7xlfont-semibold leading-[0.95] tracking-tight">

              {slides[active].title}

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">

              {slides[active].subtitle}

            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <Link
                href="/projects"
                className="rounded-xl bg-[#D4A537] px-8 py-4 font-medium text-black transition hover:bg-[#c99722]"
              >
                Explore Projects
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-8 py-4 transition hover:bg-white/10"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom Left */}

        <div className="absolute bottom-10 left-6 z-20 text-sm tracking-[0.3em] text-white/60 lg:left-8">

          0{active + 1}
          <span className="mx-2 text-[#D4A537]">/</span>
          0{slides.length}

        </div>

        {/* Bottom Right */}

        <div className="absolute bottom-10 right-8 z-20 hidden lg:flex flex-col items-center">

          <span className="rotate-90 text-xs uppercase tracking-[0.4em] text-white/50">

            Scroll

          </span>

          <div className="mt-8 h-16 w-px bg-gradient-to-b from-[#D4A537] to-transparent"></div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

<section className="bg-[#0D0F12] py-28">

  <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:px-8">

    <div>

      <p className="mb-4 uppercase tracking-[0.35em] text-[#D4A537] text-sm">

        WHO WE ARE

      </p>

      <h2 className="text-[2rem] md:text-[2.7rem] lg:text-[3.2rem] font-medium leading-[1.08] tracking-tight">

        Engineering Excellence.
        <br />
        Built On Trust.

      </h2>

    </div>

    <div>

      <p className="text-base
leading-8
max-w-xl text-white/70">

        ArchStruc Group is a multidisciplinary engineering and
        construction company committed to delivering innovative,
        sustainable and high-quality developments.

      </p>

      <p className="mt-8 text-lg leading-9 text-white/70">

        From residential homes and commercial buildings to
        infrastructure projects, we combine technical precision,
        creativity and decades of practical experience.

      </p>

      <Link
        href="/about"
        className="mt-12 inline-flex items-center gap-3 text-[#D4A537] transition hover:gap-5"
      >

        Learn More

        →

      </Link>

    </div>

  </div>

</section>

{/* ================= SERVICES ================= */}

<section className="bg-black py-28">

<div className="mx-auto max-w-7xl px-6 lg:px-8">

<p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">

OUR SERVICES

</p>

<h2 className="mt-4 text-5xl font-medium">

What We Do

</h2>

<div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

{[
"Construction",
"Architecture",
"Project Management",
"Civil Engineering",
"Interior Design",
"Renovation"
].map((service)=>(
<div
key={service}
className="group rounded-3xl border border-white/10 bg-white/5 p-10 transition duration-700 hover:-translate-y-3 hover:border-[#D4A537]/50 hover:bg-white/10"
>

<div className="mb-10 h-12 w-12 rounded-full bg-[#D4A537]/20"></div>

<h3 className="text-2xl font-semibold">

{service}

</h3>

<p className="mt-6 leading-8 text-white/60">

Delivering premium engineering and construction
solutions with precision and excellence.

</p>

<div className="mt-10 text-[#D4A537] transition group-hover:translate-x-2">

Learn More →

</div>

</div>
))}

</div>

</div>

</section>


{/* ================= WHY CHOOSE US ================= */}

<section className="bg-[#0D0F12] py-32">

  <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:px-8">

    <div>

      <p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">

        WHY ARCHSTRUC

      </p>

      <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl
leading-tight
font-medium
tracking-tight">

        Built With Precision.
        <br />
        Delivered With Integrity.

      </h2>

      <p className="mt-10 text-lg leading-9 text-white/65">

        Every project reflects our commitment to engineering
        excellence, innovation and long-term value.

      </p>

    </div>

    <div className="space-y-10">

      {[
        "Experienced Engineering Team",
        "Modern Construction Technology",
        "Strict Quality Control",
        "Timely Project Delivery"
      ].map((item) => (

        <div
          key={item}
          className="flex items-start gap-6 border-b border-white/10 pb-8"
        >

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4A537]/15 text-[#D4A537]">

            ✓

          </div>

          <div>

            <h3 className="text-2xl font-medium">

              {item}

            </h3>

            <p className="mt-3 text-white/60">

              Professional execution with uncompromising standards.

            </p>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>

{/* ================= PROCESS ================= */}

<section className="bg-black py-32">

<div className="mx-auto max-w-7xl px-6 lg:px-8">

<p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">

OUR PROCESS

</p>

<h2 className="mt-4 text-5xl font-medium">

From Vision To Reality

</h2>

<div className="mt-24 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

{[
"Consultation",
"Planning",
"Construction",
"Completion"
].map((step,index)=>(

<div key={step}>

<div className="mb-8 text-5xl font-bold text-white/10">

0{index+1}

</div>

<h3 className="text-2xl font-semibold">

{step}

</h3>

<p className="mt-5 leading-8 text-white/60">

Every stage is managed with precision and attention to detail.

</p>

</div>

))}

</div>

</div>

</section>

{/* ================= STATS ================= */}

<section className="bg-[#111418] py-28">

<div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 text-center lg:grid-cols-4">

{[
["120+","Projects"],
["15+","Years"],
["98%","Client Satisfaction"],
["50+","Experts"]
].map(([number,label])=>(

<div key={label}>

<h2 className="text-6xl font-medium text-[#D4A537]">

{number}

</h2>

<p className="mt-3 uppercase tracking-[0.3em] text-white/50">

{label}

</p>

</div>

))}

</div>

</section>



    </main>
  );
}