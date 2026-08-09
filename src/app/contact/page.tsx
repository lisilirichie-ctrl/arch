"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const WHATSAPP_NUMBER = "254795853879";
const WHATSAPP_MESSAGE = "Hi Archstruc Group, I'm interested in your services.";

interface ContactMethod {
  label: string;
  href: string;
  value: string;
  icon: React.ReactNode;
  external?: boolean;
}

const contactMethods: ContactMethod[] = [
  // ...unchanged, keep your existing array here
];

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

function QuoteModal({ open, onClose }: QuoteModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    location: "",
    budget: "",
    details: "",
  });

  // lock body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const lines = [
      "Hi Archstruc Group, I'd like a quote for my project.",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.service && `Service: ${form.service}`,
      form.location && `Location: ${form.location}`,
      form.budget && `Budget: ${form.budget}`,
      form.details && `Details: ${form.details}`,
    ].filter(Boolean);

    const message = lines.join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div className="liquid-glass liquid-glass-gold relative z-10 w-full max-w-lg rounded-3xl p-8 sm:p-10">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>

        <p className="uppercase tracking-[0.35em] text-[#D4A537] text-xs">
          REQUEST A QUOTE
        </p>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
          Tell Us About Your Project.
        </h2>
        <p className="mt-3 text-sm text-white/60">
          We'll open WhatsApp with your details pre-filled so you can send it straight to our team.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#D4A537]"
            />
            <input
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#D4A537]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="service"
              value={form.service}
              onChange={handleChange}
              placeholder="Service (e.g. Residential build)"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#D4A537]"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Project location"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#D4A537]"
            />
          </div>

          <input
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="Estimated budget (optional)"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#D4A537]"
          />

          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="Tell us a bit more about the project..."
            rows={4}
            className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#D4A537]"
          />

          <button
            type="submit"
            className="liquid-glass liquid-glass-gold mt-2 w-full rounded-full px-6 py-4 font-medium text-[#D4A537] transition hover:scale-[1.02]"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

function ContactPageInner() {
  const searchParams = useSearchParams();
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("quote") === "true") {
      setQuoteOpen(true);
    }
  }, [searchParams]);

  return (
    <main className="relative bg-[#0D0F12] text-white overflow-hidden">
      {/* ================= BACKGROUND IMAGE + AURORA ================= */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1778424446970-e7dad8209d9b?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0D0F12]/85 to-[#0D0F12]" />
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>

      {/* ================= HEADER ================= */}
      <section className="relative z-10 pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.4em] text-[#D4A537] text-sm">GET IN TOUCH</p>
          <h1 className="mt-5 text-5xl md:text-6xl font-semibold tracking-tight">
            Let&apos;s Build Something Great.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/65">
            Reach out for consultations, project quotes, or partnership opportunities. Our team responds fast.
          </p>

          <button
            onClick={() => setQuoteOpen(true)}
            className="liquid-glass liquid-glass-gold mt-10 rounded-full px-8 py-4 font-medium text-[#D4A537] transition hover:scale-105"
          >
            Request A Quote
          </button>
        </div>
      </section>

      {/* ================= CONTACT ICONS ================= */}
      <section className="relative z-10 pb-32">
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
      <section className="relative z-10 pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="liquid-glass liquid-glass-gold flex flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium">Prefer chatting on WhatsApp?</h2>
              <p className="mt-3 text-white/60">Message us directly and get a response within minutes.</p>
            </div>
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
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

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />

      <style jsx global>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(-6deg) scale(1.03); }
          40% { transform: rotate(5deg) scale(1.02); }
          60% { transform: rotate(-3deg) scale(1.01); }
          80% { transform: rotate(2deg) scale(1); }
        }
        .wobble-icon { animation: wobble 4.5s ease-in-out infinite; }
        .group:hover .wobble-icon { animation-duration: 1.2s; }

        .aurora {
          position: absolute;
          border-radius: 9999px;
          filter: blur(110px);
          opacity: 0.35;
          mix-blend-mode: screen;
        }
        .aurora-1 {
          top: -10%; left: -10%; width: 45vw; height: 45vw;
          background: radial-gradient(circle, #d4a537 0%, transparent 70%);
          animation: aurora-drift-1 18s ease-in-out infinite;
        }
        .aurora-2 {
          top: 20%; right: -15%; width: 40vw; height: 40vw;
          background: radial-gradient(circle, #8a6d1f 0%, transparent 70%);
          animation: aurora-drift-2 22s ease-in-out infinite;
        }
        .aurora-3 {
          bottom: -15%; left: 30%; width: 35vw; height: 35vw;
          background: radial-gradient(circle, #f5d76e 0%, transparent 70%);
          animation: aurora-drift-3 26s ease-in-out infinite;
        }

        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6vw, 8vh) scale(1.15); }
        }
        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-8vw, 6vh) scale(1.1); }
        }
        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5vw, -6vh) scale(1.2); }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora { animation: none !important; }
          .wobble-icon { animation: none !important; }
        }
      `}</style>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}