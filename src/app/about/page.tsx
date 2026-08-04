import Link from "next/link";

const values = [
  {
    title: "Precision",
    description:
      "Every drawing, calculation and detail held to a standard that leaves no room for guesswork.",
  },
  {
    title: "Integrity",
    description:
      "Honest timelines, honest budgets, and a team that tells clients the truth before it's convenient.",
  },
  {
    title: "Innovation",
    description:
      "Modern construction technology and methods applied to deliver better outcomes, faster.",
  },
  {
    title: "Sustainability",
    description:
      "Design that considers the next fifty years, not just the ribbon-cutting day.",
  },
];

const whyChoose = [
  {
    title: "Experienced Engineering Team",
    description: "Professional execution with uncompromising standards.",
  },
  {
    title: "Modern Construction Technology",
    description: "Professional execution with uncompromising standards.",
  },
  {
    title: "Strict Quality Control",
    description: "Professional execution with uncompromising standards.",
  },
  {
    title: "Timely Project Delivery",
    description: "Professional execution with uncompromising standards.",
  },
];

const stats: [string, string][] = [
  ["120+", "Projects"],
  ["15+", "Years"],
  ["98%", "Client Satisfaction"],
  ["50+", "Experts"],
];

export default function About() {
  return (
    <main className="relative min-h-screen text-white">

      {/*
        FULL-PAGE BACKGROUND
        Fixed, same pattern as /services. Swap for another actual
        Archstruc project photo whenever you like.
      */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://archstrucgroup.co.ke/archstruc_admin/uploads/1750828417_IMG_4292.JPG"
          alt="Archstruc Group building"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#0D0F12]"></div>
      </div>

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-[60vh] items-end pb-16 pt-32">

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">

          <p className="mb-6 uppercase tracking-[0.4em] text-[#D4A537]">
            ABOUT US
          </p>

          <h1 className="max-w-2xl text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Engineering Excellence.
            <br />
            Built On Trust.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">
            ArchStruc Group is a multidisciplinary engineering and
            construction company committed to delivering innovative,
            sustainable and high-quality developments.
          </p>

        </div>

      </section>

      {/* ================= WHO WE ARE ================= */}

      <section className="relative py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="liquid-glass rounded-3xl p-10 md:p-16">

            <p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">
              WHO WE ARE
            </p>

            <div className="mt-8 grid gap-10 lg:grid-cols-2">

              <p className="text-lg leading-9 text-white/75">
                From residential homes and commercial buildings to
                infrastructure projects, we combine technical precision,
                creativity and decades of practical experience.
              </p>

              <p className="text-lg leading-9 text-white/75">
                Every engagement is handled by a team that treats client
                budgets, timelines and reputations as if they were our own —
                because in every project, they are.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= MISSION / VISION ================= */}

      <section className="relative py-24">

        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:px-8">

          <div className="liquid-glass rounded-3xl p-10">
            <p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">
              OUR MISSION
            </p>
            <p className="mt-6 text-2xl font-medium leading-tight">
              To deliver engineering and construction solutions that
              stand the test of time.
            </p>
          </div>

          <div className="liquid-glass rounded-3xl p-10">
            <p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">
              OUR VISION
            </p>
            <p className="mt-6 text-2xl font-medium leading-tight">
              To be East Africa&apos;s most trusted name in engineering
              and construction.
            </p>
          </div>

        </div>

      </section>

      {/* ================= VALUES ================= */}

      <section className="relative py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">
            OUR VALUES
          </p>

          <h2 className="mt-4 text-4xl font-medium md:text-5xl">
            What We Stand On
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="liquid-glass group flex flex-col rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-medium text-white transition-colors duration-300 group-hover:text-[#D4A537]">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="relative py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <p className="uppercase tracking-[0.35em] text-[#D4A537] text-sm">
            WHY ARCHSTRUC
          </p>

          <h2 className="mt-4 text-4xl font-medium md:text-5xl">
            Built With Precision.
            <br />
            Delivered With Integrity.
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="liquid-glass flex items-start gap-6 rounded-2xl p-8"
              >
                <div className="liquid-glass liquid-glass-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#D4A537]">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="relative py-24">

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="liquid-glass grid grid-cols-2 gap-10 rounded-3xl p-10 text-center md:p-16 lg:grid-cols-4">
            {stats.map(([number, label]) => (
              <div key={label}>
                <h2 className="text-5xl font-medium text-[#D4A537] md:text-6xl">
                  {number}
                </h2>
                <p className="mt-3 uppercase tracking-[0.3em] text-white/50">
                  {label}
                </p>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="relative pb-32 pt-8">

        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center lg:px-8">

          <h2 className="text-3xl font-medium md:text-4xl">
            Let&apos;s Build Something Lasting
          </h2>

          <p className="text-lg leading-8 text-white/60">
            Tell us about your project and our team will get back to you
            with next steps.
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