import Link from "next/link";

const values = [
  { title: "Precision", description: "No room for guesswork." },
  { title: "Integrity", description: "Honest timelines, honest budgets." },
  { title: "Innovation", description: "Modern methods, better outcomes." },
  { title: "Sustainability", description: "Built for the next fifty years." },
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

      <section className="relative flex min-h-[55vh] items-end pb-16 pt-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="mb-6 uppercase tracking-[0.4em] text-[#358CB8]">
            ABOUT US
          </p>

          <h1 className="max-w-2xl text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Engineering Excellence.
            <br />
            Built On Trust.
          </h1>
        </div>
      </section>

      {/* ================= WHO WE ARE + VALUES (consolidated) ================= */}

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="liquid-glass rounded-3xl p-10 md:p-16">
            <p className="uppercase tracking-[0.35em] text-[#358CB8] text-sm">
              WHO WE ARE
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-white/75">
              ArchStruc Group is a multidisciplinary engineering and
              construction company delivering residential, commercial and
              infrastructure projects across East Africa — with the goal
              of becoming the region&apos;s most trusted name in the
              industry.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title}>
                  <h3 className="text-lg font-medium text-[#358CB8]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="liquid-glass grid grid-cols-2 gap-10 rounded-3xl p-10 text-center md:p-16 lg:grid-cols-4">
            {stats.map(([number, label]) => (
              <div key={label}>
                <h2 className="text-5xl font-medium text-[#358CB8] md:text-6xl">
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

          <Link
            href="/contact"
            className="rounded-full bg-[#358CB8] px-8 py-4 font-medium text-black transition hover:bg-[#2c7699]"
          >
            Get A Quote
          </Link>
        </div>
      </section>
    </main>
  );
}