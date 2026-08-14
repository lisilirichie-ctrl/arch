import Link from "next/link";

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

export default function Services() {
  return (
    <main className="relative min-h-screen text-white">

      {/*
        FULL-PAGE BACKGROUND
        Fixed so it stays in place behind hero + grid while the
        page scrolls. Swap the image for another actual Archstruc
        project photo whenever you like.
      */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://archstrucgroup.co.ke/archstruc_admin/uploads/1746876863_63.5.jpg"
          alt="Archstruc Group building"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#144B60]/60 to-[#0D0F12]"></div>
      </div>

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-[60vh] items-end pb-16 pt-32">

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">

          <p className="mb-6 uppercase tracking-[0.4em] text-[#358CB8]">
            OUR SERVICES
          </p>

          <h1 className="max-w-2xl text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            What We Do
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">
            Delivering premium engineering and construction solutions with
            precision and excellence, from first sketch to final handover.
          </p>

        </div>

      </section>

      {/* ================= SERVICES GRID ================= */}

      <section className="relative py-28">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="divide-y divide-white/10 border-t border-white/10">
            {services.map((service, index) => (
              <div
                key={service}
                className="group flex items-center justify-between py-10 transition-colors duration-300 md:py-12"
              >
                <span className="text-3xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-[#9CCDDA] md:text-4xl">
                  {service}
                </span>

                <span className="hidden text-sm text-white/40 transition-colors duration-300 group-hover:text-[#358CB8] md:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center gap-6 text-center">

            <p className="max-w-xl text-lg leading-8 text-white/60">
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

        </div>

      </section>

    </main>
  );
}