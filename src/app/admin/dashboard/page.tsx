"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  PlusCircle,
  Globe,
  LogOut,
  Menu,
  X,
  Plus,
  MapPin,
  Pencil,
  RefreshCw,
  Trash2,
  Upload,
  Loader2,
} from "lucide-react";

const supabase = createClient();

interface ProjectImage {
  id?: string;
  storage_path: string;
  sort_order?: number;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  location: string;
  status: "ongoing" | "completed";
  cover_image: string;
  client: string | null;
  value: string | null;
  completion_date: string | null;
  project_images: ProjectImage[];
  created_at: string;
}

const C = {
  bg: "#0D0F12",
  card: "#15181D",
  sidebarFrom: "#111318",
  sidebarTo: "#0A0C0F",
  text: "#F5F6F7",
  textMuted: "#8B94A6",
  textDim: "#5C6478",
  gold: "#D4A537",
  goldLight: "#E8CC6B",
  goldDeep: "#9c7a1f",
  emerald: "#34D399",
  red: "#F87171",
  border: "rgba(255,255,255,0.1)",
  borderGoldSoft: "rgba(212,165,55,0.2)",
};

const goldGradient = "linear-gradient(155deg, #E8CC6B, #D4A537 55%, #C79B2E)";

const categories = ["Residential", "Commercial", "Infrastructure"];

function getGreeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [view, setView] = useState<"dashboard" | "projects" | "add" | "edit">("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [router]);

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select(`*, project_images ( id, storage_path, sort_order )`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setProjects((data as Project[]) || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const target = projects.find((p) => p.id === id);
    const confirmed = window.confirm(
      `Una uhakika unataka kufuta "${target?.title}"? Hatua hii haiwezi kurudishwa.`
    );
    if (!confirmed) return;

    await supabase.from("project_images").delete().eq("project_id", id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.error(error);
      return;
    }
    loadProjects();
  };

  const handleToggleStatus = async (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    const newStatus = project.status === "completed" ? "ongoing" : "completed";

    const { error } = await supabase
      .from("projects")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }
    loadProjects();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  useEffect(() => {
    if (!checkingAuth) loadProjects();
  }, [checkingAuth]);

  const now = new Date();
  const greeting = getGreeting(now.getHours());
  const dateLine =
    now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }) + " • Welcome back";

  const stats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === "completed").length,
    ongoing: projects.filter((p) => p.status === "ongoing").length,
  };

  const recentProjects = projects.slice(0, 6);

  function goTo(next: "dashboard" | "projects" | "add" | "edit") {
    setView(next);
    setDrawerOpen(false);
  }

  function openEdit(project: Project) {
    setSelectedProject(project);
    goTo("edit");
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: C.bg }}>
        <Loader2 className="animate-spin" style={{ color: C.gold }} size={28} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full" style={{ backgroundColor: C.bg, color: C.text }}>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col p-4 pt-6 transition-transform duration-300 ease-out md:translate-x-0 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: `linear-gradient(180deg, ${C.sidebarFrom}, ${C.sidebarTo})`,
          borderRight: `1px solid ${C.border}`,
        }}
      >
        <div
          className="mb-5 flex items-center justify-between gap-3 px-2 pb-6"
          style={{ borderBottom: `1px solid ${C.border}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-semibold"
              style={{
                background: `linear-gradient(155deg, ${C.goldLight}, ${C.gold} 60%, ${C.goldDeep})`,
                color: "#1a1508",
              }}
            >
              AS
            </div>
            <div>
              <div className="text-base font-medium leading-tight">Archstruc</div>
              <div className="mt-0.5 text-xs uppercase tracking-wide" style={{ color: C.textDim }}>
                Administrator
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg md:hidden"
            style={{ color: C.textMuted, border: `1px solid ${C.border}` }}
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          <NavItem label="Dashboard" icon={Home} active={view === "dashboard"} onClick={() => goTo("dashboard")} />
          <NavItem
            label="Projects"
            icon={Briefcase}
            active={view === "projects"}
            onClick={() => goTo("projects")}
          />
          <NavItem
            label="Add project"
            icon={PlusCircle}
            active={view === "add"}
            onClick={() => { setSelectedProject(null); goTo("add"); }}
          />

          <div className="mx-1 my-3" style={{ borderTop: `1px solid ${C.border}` }} />

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            style={{ color: C.textMuted }}
          >
            <Globe size={17} strokeWidth={1.8} className="opacity-85" />
            View website
          </a>
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
          style={{ color: C.textMuted }}
        >
          <LogOut size={17} strokeWidth={1.8} className="opacity-85" />
          Logout
        </button>
      </aside>

      <AnimatePresence>
        {drawerOpen && (
          <motion.button
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 md:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          />
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col md:ml-64">
        <div
          className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 pb-4 pt-5 sm:px-6 sm:pt-7 lg:px-10 lg:pt-8"
          style={{ background: `linear-gradient(180deg, ${C.bg}e6, transparent)` }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg md:hidden"
              style={{ border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.textMuted }}
            >
              <Menu size={17} />
            </button>

            {view === "dashboard" && (
              <div className="min-w-0">
                <div className="mb-1 truncate text-xs" style={{ color: C.textDim }}>
                  {dateLine}
                </div>
                <div className="flex items-center gap-2 text-xl font-normal sm:text-2xl lg:text-3xl">
                  <span>{greeting}</span>
                </div>
              </div>
            )}
            {view === "projects" && (
              <div className="min-w-0">
                <div className="mb-1 text-xs" style={{ color: C.textDim }}>
                  {projects.length} {projects.length === 1 ? "project" : "projects"} total
                </div>
                <div className="text-xl font-normal sm:text-2xl lg:text-3xl">Projects</div>
              </div>
            )}
            {view === "add" && (
              <div className="min-w-0">
                <div className="mb-1 text-xs" style={{ color: C.textDim }}>New project</div>
                <div className="text-xl font-normal sm:text-2xl lg:text-3xl">Add project</div>
              </div>
            )}
            {view === "edit" && (
              <div className="min-w-0">
                <div className="mb-1 text-xs" style={{ color: C.textDim }}>Editing</div>
                <div className="text-xl font-normal sm:text-2xl lg:text-3xl truncate">
                  {selectedProject?.title}
                </div>
              </div>
            )}
          </div>

          {(view === "dashboard" || view === "projects") && (
            <button
              type="button"
              onClick={() => { setSelectedProject(null); goTo("add"); }}
              className="inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto sm:justify-start sm:px-5 sm:py-3"
              style={{ background: goldGradient, color: "#191305" }}
            >
              <Plus size={15} strokeWidth={2.4} />
              Add project
            </button>
          )}
        </div>

        <main className="px-4 pb-16 pt-2 sm:px-6 lg:px-10">
          <AnimatePresence mode="wait">
            {view === "dashboard" && (
              <motion.section
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="my-5 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-3">
                  <StatCard label="Projects" value={stats.total} tone="gold" />
                  <StatCard label="Completed" value={stats.completed} tone="emerald" />
                  <StatCard label="Ongoing" value={stats.ongoing} tone="slate" />
                </div>

                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="text-lg font-medium sm:text-xl">Recent projects</h2>
                  <button
                    type="button"
                    onClick={() => goTo("projects")}
                    className="text-xs transition-colors sm:text-sm"
                    style={{ color: C.textMuted }}
                  >
                    View all →
                  </button>
                </div>

                {loading ? (
                  <LoadingGrid />
                ) : recentProjects.length === 0 ? (
                  <EmptyState onAdd={() => { setSelectedProject(null); goTo("add"); }} />
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {recentProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDelete}
                        onEdit={() => openEdit(project)}
                      />
                    ))}
                  </div>
                )}
              </motion.section>
            )}

            {view === "projects" && (
              <motion.section
                key="projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {loading ? (
                  <LoadingGrid />
                ) : projects.length === 0 ? (
                  <EmptyState onAdd={() => { setSelectedProject(null); goTo("add"); }} />
                ) : (
                  <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDelete}
                        onEdit={() => openEdit(project)}
                      />
                    ))}
                  </div>
                )}
              </motion.section>
            )}

            {view === "add" && (
              <motion.section
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectForm
                  mode="create"
                  onCancel={() => goTo("dashboard")}
                  onSaved={() => { loadProjects(); goTo("projects"); }}
                />
              </motion.section>
            )}

            {view === "edit" && selectedProject && (
              <motion.section
                key="edit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectForm
                  mode="edit"
                  existingProject={selectedProject}
                  onCancel={() => goTo("projects")}
                  onSaved={() => { loadProjects(); goTo("projects"); }}
                />
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

function NavItem({ label, icon: Icon, active, onClick }: { label: string; icon: any; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors"
      style={
        active
          ? { backgroundColor: "rgba(212,165,55,0.14)", color: C.gold, border: `1px solid ${C.borderGoldSoft}` }
          : { color: C.textMuted, border: "1px solid transparent" }
      }
    >
      <Icon size={17} strokeWidth={1.8} className={active ? "opacity-100" : "opacity-85"} />
      {label}
    </button>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string | number; tone: string }) {
  const toneBg =
    tone === "gold"
      ? "rgba(212,165,55,0.14)"
      : tone === "emerald"
      ? "rgba(52,211,153,0.12)"
      : "rgba(255,255,255,0.06)";

  return (
    <div
      className="flex h-44 flex-col justify-between rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.card }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: toneBg }} />
      <div>
        <h2 className="text-3xl font-bold">{value}</h2>
        <p className="mt-1 text-sm" style={{ color: C.textMuted }}>{label}</p>
      </div>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${C.border}`, backgroundColor: C.card }}>
          <div className="h-36" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
          <div className="space-y-2 p-4 sm:p-5">
            <div className="h-4 w-3/4 rounded" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
            <div className="h-3 w-1/2 rounded" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  onToggleStatus,
  onDelete,
  onEdit,
}: {
  project: Project;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
}) {
  const isCompleted = project.status === "completed";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onEdit}
      className="cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.card }}
    >
      <div
        className="relative flex h-36 items-end justify-between p-3"
        style={{
          backgroundImage: project.cover_image ? `url(${project.cover_image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0E1116",
        }}
      >
        <span
          className="relative z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide"
          style={
            isCompleted
              ? { border: "1px solid rgba(52,211,153,0.3)", backgroundColor: "rgba(52,211,153,0.16)", color: C.emerald }
              : { border: "1px solid rgba(148,163,184,0.25)", backgroundColor: "rgba(148,163,184,0.16)", color: "#cbd5e1" }
          }
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {isCompleted ? "Completed" : "Ongoing"}
        </span>

        <span
          className="relative z-10 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: "rgba(212,165,55,0.2)", color: C.gold }}
        >
          {project.category}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-1 text-base font-medium sm:text-lg">{project.title}</div>
        <div className="mb-3 flex items-center gap-1.5 text-xs" style={{ color: C.textMuted }}>
          <MapPin size={12} className="opacity-70" />
          {project.location}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <IconButton label="Edit" onClick={onEdit}>
            <Pencil size={14} />
          </IconButton>
          <IconButton label={isCompleted ? "Mark ongoing" : "Mark completed"} onClick={() => onToggleStatus(project.id)}>
            <RefreshCw size={14} />
          </IconButton>
          <IconButton label="Delete" onClick={() => onDelete(project.id)}>
            <Trash2 size={14} />
          </IconButton>
        </div>
      </div>
    </motion.div>
  );
}

function IconButton({ children, label, onClick }: { children: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:brightness-125"
      style={{ border: `1px solid ${C.border}`, backgroundColor: "rgba(255,255,255,0.03)", color: C.textMuted }}
    >
      {children}
    </button>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl px-5 py-16 text-center"
      style={{ border: `1px dashed ${C.border}`, backgroundColor: "rgba(255,255,255,0.012)" }}
    >
      <div className="mb-5 opacity-90">
        <Briefcase size={64} strokeWidth={1.3} style={{ color: C.gold }} />
      </div>
      <div className="mb-1.5 text-lg">No projects yet</div>
      <p className="mb-5 max-w-xs text-sm" style={{ color: C.textMuted }}>
        Once you add a project, it will appear here and on the public site.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
        style={{ background: goldGradient, color: "#191305" }}
      >
        <Plus size={15} strokeWidth={2.4} />
        Add first project
      </button>
    </div>
  );
}

/* ============================================================
   PROJECT FORM — used for both Add and Edit
   ============================================================ */

function Field({
  label, placeholder, value, onChange, type = "text",
}: {
  label: string; placeholder?: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg p-3 text-sm outline-none transition-colors"
        style={{ border: `1px solid ${C.border}`, backgroundColor: "#0E1116", color: C.text }}
      />
    </div>
  );
}

function ProjectForm({
  mode,
  existingProject,
  onCancel,
  onSaved,
}: {
  mode: "create" | "edit";
  existingProject?: Project;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(existingProject?.title || "");
  const [slug, setSlug] = useState(existingProject?.slug || "");
  const [description, setDescription] = useState(existingProject?.description || "");
  const [category, setCategory] = useState(existingProject?.category || "Residential");
  const [status, setStatus] = useState<"ongoing" | "completed">(existingProject?.status || "ongoing");
  const [location, setLocation] = useState(existingProject?.location || "");
  const [client, setClient] = useState(existingProject?.client || "");
  const [value, setValue] = useState(existingProject?.value || "");
  const [completionDate, setCompletionDate] = useState(existingProject?.completion_date || "");

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(existingProject?.cover_image || null);

  const [existingGallery, setExistingGallery] = useState<ProjectImage[]>(existingProject?.project_images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("Unexpected file reader result"));
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const handleCoverSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(await readFileAsDataURL(file));
  };

  const handleGallerySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length === 0) return;

    const previews = await Promise.all(files.map(readFileAsDataURL));
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  const removeNewGalleryFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = async (img: ProjectImage) => {
    if (!img.id) return;
    await supabase.from("project_images").delete().eq("id", img.id);
    setExistingGallery((prev) => prev.filter((i) => i.id !== img.id));
  };

  const uploadFile = async (file: File, folder: string) => {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("project-images").upload(path, file);
    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const uploadGalleryImages = async (projectId: string, startOrder: number) => {
    for (let i = 0; i < newFiles.length; i++) {
      const url = await uploadFile(newFiles[i], projectId);
      await supabase.from("project_images").insert({
        project_id: projectId,
        storage_path: url,
        sort_order: startOrder + i,
      });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !location.trim()) {
      setError("Jaza Title na Location kabla ya kusave.");
      return;
    }
    if (!coverFile && !coverPreview) {
      setError("Weka cover image.");
      return;
    }
    setError(null);
    setSaving(true);

    try {
      let coverUrl = coverPreview;
      if (coverFile) {
        coverUrl = await uploadFile(coverFile, "covers");
      }

      const payload = {
        slug: slug.trim() || slugify(title),
        title: title.trim(),
        location: location.trim(),
        category,
        status,
        cover_image: coverUrl,
        description: description || null,
        value: value || null,
        client: client || null,
        completion_date: completionDate || null,
      };

      let projectId = existingProject?.id;

      if (mode === "create") {
        const { data, error: insertError } = await supabase
          .from("projects")
          .insert(payload)
          .select("id")
          .single();

        if (insertError) throw insertError;
        projectId = data.id;
      } else {
        if (!projectId) throw new Error("Missing project id");
        const { error: updateError } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", projectId);
        if (updateError) throw updateError;
      }

      if (newFiles.length > 0 && projectId) {
        await uploadGalleryImages(projectId, existingGallery.length);
      }

      onSaved();
    } catch (err: any) {
      setError(err.message || "Kuna shida imetokea. Jaribu tena.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl rounded-2xl p-5 sm:p-8"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.card }}
    >
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Project title" placeholder="e.g. Riverside Residences" value={title} onChange={setTitle} />
        <Field label="Slug (blank = auto)" placeholder="riverside-residences" value={slug} onChange={setSlug} />
        <Field label="Location" placeholder="e.g. Nairobi" value={location} onChange={setLocation} />

        <div>
          <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg p-3 text-sm outline-none transition-colors"
            style={{ border: `1px solid ${C.border}`, backgroundColor: "#0E1116", color: C.text }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "ongoing" | "completed")}
            className="w-full rounded-lg p-3 text-sm outline-none transition-colors"
            style={{ border: `1px solid ${C.border}`, backgroundColor: "#0E1116", color: C.text }}
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <Field label="Client" placeholder="e.g. Acme Holdings" value={client} onChange={setClient} />
        <Field label="Project value" placeholder="e.g. KES 45M" value={value} onChange={setValue} />
        <Field label="Completion date" type="date" value={completionDate} onChange={setCompletionDate} />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What makes this project stand out..."
          className="min-h-[84px] w-full rounded-lg p-3 text-sm outline-none transition-colors"
          style={{ border: `1px solid ${C.border}`, backgroundColor: "#0E1116", color: C.text }}
        />
      </div>

      {/* Cover image */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>Cover image</label>
        <div className="flex items-center gap-4">
          {coverPreview && (
            <img src={coverPreview} alt="" className="h-20 w-32 rounded-lg object-cover" />
          )}
          <label
            onClick={() => coverInputRef.current?.click()}
            className="cursor-pointer rounded-xl px-4 py-3 text-center text-xs transition-colors flex items-center justify-center gap-2"
            style={{ border: `1px dashed ${C.border}`, color: C.textDim }}
          >
            <Upload size={14} />
            {coverPreview ? "Replace cover" : "Upload cover"}
            <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverSelect} />
          </label>
        </div>
      </div>

      {/* Gallery */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>Gallery photos</label>

        {existingGallery.length > 0 && (
          <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {existingGallery.map((img) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg">
                <img src={img.storage_path} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExistingGalleryImage(img)}
                  className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity group-hover:opacity-100"
                  title="Remove"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {newPreviews.length > 0 && (
          <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {newPreviews.map((preview, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg">
                <img src={preview} alt="" className="h-full w-full object-cover" />
                <span className="absolute left-1 top-1 rounded bg-blue-500 px-1.5 py-0.5 text-[9px] font-bold text-white">NEW</span>
                <button
                  type="button"
                  onClick={() => removeNewGalleryFile(i)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          onClick={() => galleryInputRef.current?.click()}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-5 text-center text-xs transition-colors"
          style={{ border: `1px dashed ${C.border}`, color: C.textDim }}
        >
          <Upload size={14} />
          Drop images here, or click to upload
          <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGallerySelect} />
        </label>
      </div>

      {error && (
        <p className="mb-4 rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: C.red }}>
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse justify-end gap-2.5 pt-5 sm:flex-row" style={{ borderTop: `1px solid ${C.border}` }}>
        <button
          type="button"
          onClick={onCancel}
          className="w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto"
          style={{ border: `1px solid ${C.border}`, color: C.textMuted }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
          style={{ background: goldGradient, color: "#191305" }}
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          {mode === "create" ? "Save project" : "Save changes"}
        </button>
      </div>
    </form>
  );
}