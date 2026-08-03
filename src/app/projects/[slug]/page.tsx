"use client"

import { useState, useEffect } from "react"
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
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)

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

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#0D0F12]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4A537] border-t-transparent" />
    </div>
  )

  if (!project) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#0D0F12]">
      <p className="text-white/50">Project not found</p>
      <button onClick={() => router.push("/")} className="mt-4 text-[#D4A537] hover:underline">
        Back to Home
      </button>
    </div>
  )

  const allImages = images.length > 0 ? images.map(i => i.storage_path) : [project.cover_image]

  return (
    <main className="min-h-screen bg-[#0D0F12]">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-16 bg-[#0D0F12]/80 backdrop-blur-md border-b border-white/5">
        <button onClick={() => router.push("/")} className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-white">ARCHSTRUC</span>
          <span className="text-xs font-medium tracking-[0.3em] text-[#D4A537] uppercase">Group</span>
        </button>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Projects
        </button>
      </nav>

      {/* Hero image */}
      <div className="relative h-[70vh] w-full overflow-hidden pt-16">
        <img
          src={allImages[activeImage]}
          alt={project.title}
          className="h-full w-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent" />

        {/* Image counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-6 right-6 rounded-full bg-black/50 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
            {activeImage + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        {/* Title + meta */}
        <div className="py-10 border-b border-white/10" style={{ animation: "fadeUp 0.6s ease-out both" }}>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="rounded-full bg-[#D4A537]/20 px-3 py-1 text-xs font-medium capitalize text-[#D4A537]">
              {project.category}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
              project.status === "completed"
                ? "bg-green-500/10 text-green-400"
                : "bg-blue-500/10 text-blue-400"
            }`}>
              {project.status}
            </span>
          </div>
          <h1 className="text-4xl font-medium text-white md:text-5xl">{project.title}</h1>
          <p className="mt-3 text-lg text-white/50">{project.location}</p>

          {/* Meta grid */}
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {project.client && (
              <div>
                <p className="text-xs uppercase tracking-widest text-white/30">Client</p>
                <p className="mt-1 text-sm text-white">{project.client}</p>
              </div>
            )}
            {project.value && (
              <div>
                <p className="text-xs uppercase tracking-widest text-white/30">Project Value</p>
                <p className="mt-1 text-sm text-white">{project.value}</p>
              </div>
            )}
            {project.completion_date && (
              <div>
                <p className="text-xs uppercase tracking-widest text-white/30">Completed</p>
                <p className="mt-1 text-sm text-white">{new Date(project.completion_date).getFullYear()}</p>
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/30">Category</p>
              <p className="mt-1 text-sm capitalize text-white">{project.category}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <div className="py-10 border-b border-white/10 max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[#D4A537] mb-4">About this project</p>
            <p className="text-white/70 leading-relaxed">{project.description}</p>
          </div>
        )}

        {/* Gallery */}
        {allImages.length > 1 && (
          <div className="py-10">
            <p className="text-xs uppercase tracking-widest text-[#D4A537] mb-6">Gallery</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {allImages.map((src, i) => (
                <div
                  key={i}
                  onClick={() => { setActiveImage(i); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                  className={`aspect-square cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                    i === activeImage
                      ? "ring-2 ring-[#D4A537] opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt={`${project.title} ${i + 1}`} className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="py-16 border-t border-white/10 text-center">
          <p className="text-xs uppercase tracking-widest text-[#D4A537] mb-3">Interested in a similar project?</p>
          <h2 className="text-3xl font-medium text-white mb-8">Let's build something great together.</h2>
          <button className="h-12 rounded-lg bg-[#D4A537] px-8 text-base font-medium text-black transition hover:bg-[#B8891F]">
            Request a Quote
          </button>
        </div>
      </div>
    </main>
  )
}