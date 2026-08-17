"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Project = {
  id: string
  slug: string
  title: string
  location: string
  category: string
  status: string
  cover_image: string
  description: string | null
  value: string | null
  client: string | null
  completion_date: string | null
  prev_slug?: string | null
  next_slug?: string | null
}

type ProjectImage = {
  id: string
  storage_path: string
  sort_order: number
}

export default function ProjectPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [images, setImages] = useState<ProjectImage[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const galleryRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    async function fetchProject() {
      const { data: proj } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single()

      if (!proj) { setLoading(false); return }
      setProject(proj)

      const { data: imgs } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", proj.id)
        .order("sort_order")

      if (imgs) setImages(imgs)
      setLoading(false)
    }
    fetchProject()
  }, [slug])

  const allImages = images.length > 0 ? images.map(i => i.storage_path) : project ? [project.cover_image] : []

  const scrollToIndex = useCallback((index: number) => {
    const el = galleryRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(index, allImages.length - 1))
    const card = el.querySelectorAll<HTMLElement>("[data-gallery-card]")[clamped]
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    setActiveIndex(clamped)
  }, [allImages.length])

  useEffect(() => {
    const el = galleryRef.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-gallery-card]"))
    if (cards.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const idx = cards.indexOf(visible.target as HTMLElement)
          if (idx !== -1) setActiveIndex(idx)
        }
      },
      { root: el, threshold: [0.6] }
    )
    cards.forEach(c => observer.observe(c))
    return () => observer.disconnect()
  }, [allImages.length])

  useEffect(() => {
    thumbRefs.current[activeIndex]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [activeIndex])

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#0D0F12]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#358CB8] border-t-transparent" />
    </div>
  )

  if (!project) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#0D0F12]">
      <p className="text-white/50">Project not found</p>
      <button onClick={() => router.push("/")} className="mt-4 text-[#358CB8] hover:underline">
        Back to Home
      </button>
    </div>
  )

  return (
    <main className="h-screen overflow-hidden bg-[#0D0F12]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,450;9..144,550&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes kenburns {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        .kenburns-active { animation: kenburns 20s ease-out forwards; }
        .gallery-scroll::-webkit-scrollbar { display: none; }
        .gallery-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .thumb-scroll::-webkit-scrollbar { height: 4px; }
        .thumb-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 999px; }
        .font-display { font-family: 'Fraunces', serif; }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-10">
        <button onClick={() => router.push("/")} className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-white">ARCHSTRUC</span>
          <span className="text-[10px] font-medium tracking-[0.3em] text-[#9CCDDA] uppercase">Group</span>
        </button>
        <button
          onClick={() => router.back()}
          aria-label="Close project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/70 backdrop-blur-md transition hover:border-white/30 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* 70 / 30 split */}
      <div className="flex h-full flex-col md:flex-row">

        {/* LEFT — image viewer (70%) */}
        <div className="relative h-[50vh] w-full flex-shrink-0 md:h-full md:w-[70%]">
          <div
            ref={galleryRef}
            className="gallery-scroll flex h-full w-full snap-x snap-mandatory gap-1 overflow-x-auto scroll-smooth"
          >
            {allImages.map((src, i) => (
              <div
                key={i}
                data-gallery-card
                className="relative h-full w-full flex-shrink-0 snap-center overflow-hidden"
              >
                <img
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  className={`h-full w-full object-cover ${i === activeIndex ? "kenburns-active" : ""}`}
                />
              </div>
            ))}
          </div>

          {allImages.length > 1 && (
            <>
              <button
                onClick={() => scrollToIndex(activeIndex - 1)}
                aria-label="Previous photo"
                disabled={activeIndex === 0}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-[#358CB8] disabled:opacity-30"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scrollToIndex(activeIndex + 1)}
                aria-label="Next photo"
                disabled={activeIndex === allImages.length - 1}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-[#358CB8] disabled:opacity-30"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          {/* Thumbnail rail */}
          {allImages.length > 1 && (
            <div className="absolute bottom-0 left-0 flex w-full items-end gap-2 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 pb-3 pt-10">
              <div className="thumb-scroll flex gap-2 overflow-x-auto">
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    ref={el => { thumbRefs.current[i] = el }}
                    onClick={() => scrollToIndex(i)}
                    className="group relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md"
                  >
                    <img
                      src={src}
                      alt=""
                      className={`h-full w-full object-cover transition ${i === activeIndex ? "opacity-100" : "opacity-45 group-hover:opacity-75"}`}
                    />
                    <span
                      className="absolute bottom-0 left-0 h-[2px] bg-[#358CB8] transition-all duration-300"
                      style={{ width: i === activeIndex ? "100%" : "0%" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — info panel (30%) */}
        <div className="flex h-[50vh] w-full flex-1 flex-col overflow-y-auto border-t border-white/5 bg-[#0D0F12] px-7 pb-8 pt-24 md:h-full md:w-[30%] md:border-l md:border-t-0 md:px-8">
          <div style={{ animation: "fadeUp 0.6s ease-out both" }}>

            {/* Badges */}
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#358CB8]/15 px-3 py-1 text-[11px] font-medium capitalize tracking-wide text-[#9CCDDA]">
                {project.category}
              </span>
              <span className={`rounded-full px-3 py-1 text-[11px] font-medium capitalize tracking-wide ${
                project.status === "completed"
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "bg-[#144B60]/40 text-[#9CCDDA]"
              }`}>
                {project.status}
              </span>
            </div>

            {/* Title + location */}
            <h1 className="font-display text-3xl font-light leading-[1.08] text-white md:text-[2.25rem]">
              {project.title}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.15em] text-white/40">
              {project.location}
            </p>

            {/* Meta grid */}
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-6">
              {project.client && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Client</p>
                  <p className="mt-1 text-sm text-white">{project.client}</p>
                </div>
              )}
              {project.value && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Project Value</p>
                  <p className="mt-1 text-sm text-white">{project.value}</p>
                </div>
              )}
              {project.completion_date && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Completed</p>
                  <p className="mt-1 text-sm text-white">{new Date(project.completion_date).getFullYear()}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30">Category</p>
                <p className="mt-1 text-sm capitalize text-white">{project.category}</p>
              </div>
            </div>

            {/* Description */}
            {project.description && (
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-3 text-[10px] uppercase tracking-widest text-[#358CB8]">About this project</p>
                <p className="text-[14px] leading-relaxed text-white/60">{project.description}</p>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="mt-auto flex flex-col gap-6 pt-10">
            <button
              onClick={() => router.push("/contact")}
              className="h-12 w-full rounded-lg bg-[#358CB8] text-sm font-medium text-white transition hover:bg-[#144B60]"
            >
              Request a Quote
            </button>

            {(project.prev_slug || project.next_slug) && (
              <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-widest text-white/50">
                <button
                  disabled={!project.prev_slug}
                  onClick={() => project.prev_slug && router.push(`/projects/${project.prev_slug}`)}
                  className="flex items-center gap-2 transition hover:text-white disabled:opacity-20"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Prev
                </button>
                <button
                  disabled={!project.next_slug}
                  onClick={() => project.next_slug && router.push(`/projects/${project.next_slug}`)}
                  className="flex items-center gap-2 transition hover:text-white disabled:opacity-20"
                >
                  Next
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}