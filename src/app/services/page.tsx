import Link from "next/link";

const services = [
  {
    title: "Architectural Design",
    description:
      "Concept to construction-ready drawings, balancing form, function and buildability.",
  },
  {
    title: "Interior Design",
    description:
      "Interiors that carry the same precision and character as the buildings that hold them.",
  },
  {
    title: "Masterplanning",
    description:
      "Land-use and site strategy that sets up every phase of a development for success.",
  },
  {
    title: "Acoustic Design",
    description:
      "Sound-conscious design for spaces where comfort and performance both matter.",
  },
  {
    title: "BIM Consultancy (ISO 19650)",
    description:
      "Coordinated, standards-compliant BIM workflows across the full project lifecycle.",
  },
  {
    title: "Graphic Design & Wayfinding",
    description:
      "Signage and environmental graphics that make large developments legible and premium.",
  },
  {
    title: "Technical Due Diligence & Feasibility Studies",
    description:
      "Independent technical assessment before capital is committed to a site.",
  },
  {
    title: "Environmental Design (LEED & EDGE)",
    description:
      "Sustainable design strategies aligned to internationally recognised certifications.",
  },
  {
    title: "Façade Design",
    description:
      "The building's first impression, engineered for climate, cost and character.",
  },
  {
    title: "Project Management",
    description:
      "End-to-end delivery oversight that keeps scope, budget and timeline aligned.",
  },
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#0D0F12]"></div>
      </div>

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-[60vh] items-end pb-16 pt-32">

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">

          <p className="mb-6 uppercase tracking-[0.4em] text-[#D4A537]">
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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="liquid-glass group flex flex-col rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-medium text-white transition-colors duration-300 group-hover:text-[#D4A537]">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {service.description}
                </p>
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
              className="rounded-full bg-[#D4A537] px-8 py-4 font-medium text-black transition hover:bg-[#c99722]"
            >
              Get A Quote
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}