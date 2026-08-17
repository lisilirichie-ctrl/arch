import Link from "next/link";

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

export default function AboutServices() {
  return (
    <main className="relative min-h-screen text-white">

      {/* ── BACKGROUND ─────────────────────────────────────────────────────── */}
      {/*
        Two-image parallax trick: the about image fades into the services image
        via a gradient midpoint. Both are fixed so scroll feels cinematic.
        Swap either src for a real Archstruc project photo whenever you like.
      */}
      <div className="fixed inset-0 -z-10">
        {/* Base layer — services image */}
        <img
          src="https://archstrucgroup.co.ke/archstruc_admin/uploads/1746876863_63.5.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* About image bleeds in at the top via mask */}
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

      <section className="relative flex min-h-[60vh] items-end pb-16 pt-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-[#358CB8]">
            Who We Are · What We Do
          </p>
          <h1 className="max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Engineering Excellence.
            <br />
            Built On Trust.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/65">
            Delivering premium construction and design solutions across East
            Africa — with precision, integrity, and a commitment to lasting
            impact.
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE + VALUES ────────────────────────────────────────────── */}

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="liquid-glass rounded-3xl p-10 md:p-16">
            <p className="text-sm uppercase tracking-[0.35em] text-[#358CB8]">
              About Us
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-white/75">
              ArchStruc Group is a multidisciplinary engineering and
              construction company delivering residential, commercial and
              infrastructure projects across East Africa — with the goal
              of becoming the region&apos;s most trusted name in the industry.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <div key={v.title}>
                  <h3 className="text-lg font-medium text-[#358CB8]">{v.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{v.description}</p>
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
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#358CB8]">
                Our Services
              </p>
              <h2 className="text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                What We Do
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-white/55 md:text-right">
              From first sketch to final handover — every discipline under
              one roof.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-t border-white/10">
            {services.map((service, index) => (
              <div
                key={service}
                className="group flex items-center justify-between py-9 transition-colors duration-300 md:py-11"
              >
                <span className="text-base font-normal tracking-wide text-white/80 transition-colors duration-300 group-hover:text-[#9CCDDA] md:text-lg">
                  {service}
                </span>
                <span className="hidden text-sm text-white/35 transition-colors duration-300 group-hover:text-[#358CB8] md:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}

      <section className="relative pb-32 pt-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center lg:px-8">
          <h2 className="text-3xl font-medium md:text-4xl">
            Let&apos;s Build Something Lasting
          </h2>
          <p className="max-w-md text-base leading-7 text-white/55">
            Have a project in mind? Let&apos;s talk about what it will take
            to build it right.
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