"use client";

import Link from "next/link";

const WHATSAPP_NUMBER = "254795853879"; // no + or spaces, required by wa.me
const WHATSAPP_MESSAGE = "Hi Archstruc Group, I'm interested in your services.";

const contactMethods = [
  {
    label: "WhatsApp",
    value: "+254 795 853 879",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE
    )}`,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.12-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.72-2.08.98-2.37c.26-.29.56-.36.75-.36h.53c.17 0 .4-.03.62.47.24.56.81 1.94.88 2.08.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    value: "+254 795 853 879",
    href: "tel:+254795853879",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5.5C3 4.67 3.67 4 4.5 4H7.4c.66 0 1.24.44 1.42 1.08l1.06 3.75a1.5 1.5 0 0 1-.4 1.5l-1.66 1.6a12.3 12.3 0 0 0 5.75 5.75l1.6-1.66a1.5 1.5 0 0 1 1.5-.4l3.75 1.06c.64.18 1.08.76 1.08 1.42v2.9c0 .83-.67 1.5-1.5 1.5H19c-8.84 0-16-7.16-16-16v-.99Z"
        />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "info@archstrucgroup.co.ke",
    href: "mailto:info@archstrucgroup.co.ke",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.5h18v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.5 7 8.5 6.5L20.5 7" />
      </svg>
    ),
  },
  {
    label: "Visit Us",
    value: "Nairobi, Kenya",
    href: "https://maps.google.com/?q=Nairobi,Kenya",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#0D0F12] text-white">
      {/* ================= HEADER ================= */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0D0F12] to-[#0D0F12]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.4em] text-[#D4A537] text-sm">
            GET IN TOUCH
          </p>
          <h1 className="mt-5 text-5xl md:text-6xl font-semibold tracking-tight">
            Let&apos;s Build Something Great.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/65">
            Reach out for consultations, project quotes, or partnership
            opportunities. Our team responds fast.
          </p>
        </div>
      </section>

      {/* ================= CONTACT ICONS ================= */}
      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, i) => (
              <Link
                key={method.label}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="liquid-glass liquid-glass-gold group flex flex-col items-center gap-5 rounded-3xl px-6 py-10 text-center transition-transform duration-300 hover:scale-[1.04]"
              >
                <div
                  className="wobble-icon flex h-16 w-16 items-center justify-center rounded-full bg-[#D4A537]/10 text-[#D4A537]"
                  style={{ animationDelay: `${i * 0.35}s` }}
                >
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{method.label}</h3>
                  <p className="mt-2 text-sm text-white/60">{method.value}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHATSAPP CTA STRIP ================= */}
      <section className="pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="liquid-glass liquid-glass-gold flex flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium">
                Prefer chatting on WhatsApp?
              </h2>
              <p className="mt-3 text-white/60">
                Message us directly and get a response within minutes.
              </p>
            </div>
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                WHATSAPP_MESSAGE
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass liquid-glass-gold flex shrink-0 items-center gap-3 rounded-full px-8 py-4 font-medium text-[#D4A537] transition hover:scale-105"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.12-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.72-2.08.98-2.37c.26-.29.56-.36.75-.36h.53c.17 0 .4-.03.62.47.24.56.81 1.94.88 2.08.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
              </svg>
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* wobble keyframes — move to globals.css if you prefer it centralized */}
      <style jsx global>{`
        @keyframes wobble {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          20% {
            transform: rotate(-6deg) scale(1.03);
          }
          40% {
            transform: rotate(5deg) scale(1.02);
          }
          60% {
            transform: rotate(-3deg) scale(1.01);
          }
          80% {
            transform: rotate(2deg) scale(1);
          }
        }
        .wobble-icon {
          animation: wobble 4.5s ease-in-out infinite;
        }
        .group:hover .wobble-icon {
          animation-duration: 1.2s;
        }
      `}</style>
    </main>
  );
}