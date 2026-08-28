"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
  AlertTriangle,
  AlertCircle,
  GripVertical,
  ArrowUpDown,
  Check,
} from "lucide-react";

const supabase = createClient();

const AUTH_ATTEMPT_KEY = "arch_auth_attempts";
const MAX_AUTH_ATTEMPTS = 10;
const AUTH_LOCKOUT_MS = 15 * 60 * 1000;

function getAuthAttempts(): { count: number; since: number } {
  try {
    const raw = sessionStorage.getItem(AUTH_ATTEMPT_KEY);
    return raw ? JSON.parse(raw) : { count: 0, since: Date.now() };
  } catch {
    return { count: 0, since: Date.now() };
  }
}
function recordAuthFailure() {
  const current = getAuthAttempts();
  const now = Date.now();
  const since = now - current.since > AUTH_LOCKOUT_MS ? now : current.since;
  sessionStorage.setItem(AUTH_ATTEMPT_KEY, JSON.stringify({ count: current.count + 1, since }));
}
function clearAuthAttempts() { sessionStorage.removeItem(AUTH_ATTEMPT_KEY); }
function isLockedOut(): boolean {
  const { count, since } = getAuthAttempts();
  if (Date.now() - since > AUTH_LOCKOUT_MS) return false;
  return count >= MAX_AUTH_ATTEMPTS;
}

async function compressImage(file: File, maxDimension = 1600, quality = 0.8): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);
  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
  if (!blob) return file;
  const newName = file.name.replace(/\.[^.]+$/, "") + ".webp";
  return new File([blob], newName, { type: "image/webp" });
}

interface ProjectImage { id?: string; storage_path: string; sort_order?: number; }
interface Project {
  id: string; slug: string; title: string; description: string | null;
  category: string; location: string; status: "ongoing" | "completed";
  cover_image: string; client: string | null; value: string | null;
  completion_date: string | null; project_images: ProjectImage[];
  created_at: string; position: number | null;
}

const C = {
  bg: "#0D0F12", card: "#15181D", sidebarFrom: "#111318", sidebarTo: "#0A0C0F",
  text: "#F5F6F7", textMuted: "#8B94A6", textDim: "#5C6478",
  gold: "#D4A537", goldLight: "#E8CC6B", goldDeep: "#9c7a1f",
  emerald: "#34D399", red: "#F87171",
  border: "rgba(255,255,255,0.1)", borderGoldSoft: "rgba(212,165,55,0.2)",
};
const goldGradient = "linear-gradient(155deg, #E8CC6B, #D4A537 55%, #C79B2E)";
const categories = ["Residential", "Commercial", "Infrastructure", "Interior"];

function getGreeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* ── Toast ── */
interface Toast { id: number; kind: "error" | "success"; message: string; }
function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (kind: Toast["kind"], message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, kind, message }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  };
  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));
  return { toasts, push, dismiss };
}

function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[min(92vw,360px)] flex-col gap-2" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm shadow-lg backdrop-blur-sm"
            style={t.kind === "error"
              ? { backgroundColor: "rgba(24,14,14,0.95)", border: "1px solid rgba(248,113,113,0.3)", color: "#fecaca" }
              : { backgroundColor: "rgba(9,20,16,0.95)", border: "1px solid rgba(52,211,153,0.3)", color: "#bbf7d0" }}>
            <span className="mt-0.5 flex-shrink-0">{t.kind === "error" ? <AlertCircle size={16} /> : <Check size={16} />}</span>
            <span className="flex-1">{t.message}</span>
            <button type="button" onClick={() => onDismiss(t.id)} className="flex-shrink-0 opacity-60 transition-opacity hover:opacity-100" aria-label="Dismiss"><X size={14} /></button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Confirm Dialog ── */
function ConfirmDialog({ open, title, description, confirmLabel = "Delete", onConfirm, onCancel, busy }: {
  open: boolean; title: string; description: string; confirmLabel?: string;
  onConfirm: () => void; onCancel: () => void; busy?: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          <motion.button aria-label="Cancel" onClick={onCancel} className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-sm rounded-2xl p-5 sm:p-6" style={{ border: `1px solid ${C.border}`, backgroundColor: C.card }}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(248,113,113,0.14)" }}>
              <AlertTriangle size={18} style={{ color: C.red }} />
            </div>
            <h3 className="mb-1.5 text-base font-medium">{title}</h3>
            <p className="mb-5 text-sm" style={{ color: C.textMuted }}>{description}</p>
            <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <button type="button" onClick={onCancel} disabled={busy} className="w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 sm:w-auto" style={{ border: `1px solid ${C.border}`, color: C.textMuted }}>Cancel</button>
              <button type="button" onClick={onConfirm} disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60 sm:w-auto" style={{ backgroundColor: "#DC2626" }}>
                {busy && <Loader2 size={14} className="animate-spin" />}{confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Session expiry warning ── */
function SessionExpiryWarning({ open, onExtend, onLogout }: { open: boolean; onExtend: () => void; onLogout: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} />
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            className="relative w-full max-w-sm rounded-2xl p-6" style={{ border: `1px solid rgba(212,165,55,0.3)`, backgroundColor: C.card }}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(212,165,55,0.12)" }}>
              <AlertTriangle size={18} style={{ color: C.gold }} />
            </div>
            <h3 className="mb-1.5 text-base font-medium">Session expiring soon</h3>
            <p className="mb-5 text-sm" style={{ color: C.textMuted }}>Your session will expire in 2 minutes. Stay logged in?</p>
            <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <button type="button" onClick={onLogout} className="w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto" style={{ border: `1px solid ${C.border}`, color: C.textMuted }}>Log out</button>
              <button type="button" onClick={onExtend} className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold sm:w-auto" style={{ background: goldGradient, color: "#191305" }}>Stay logged in</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════
   REORDER VIEW — drag-and-drop project ordering
   ══════════════════════════════════════════════════════════ */
function ReorderView({ projects, onSaved, pushToast }: {
  projects: Project[];
  onSaved: () => void;
  pushToast: (kind: "error" | "success", msg: string) => void;
}) {
  // Sort by current position, fallback to index
  const [items, setItems] = useState<Project[]>(() =>
    [...projects].sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
  );
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Drag state
  const dragIndexRef = useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  // Touch drag state
  const touchStartY = useRef<number>(0);
  const touchItemIndex = useRef<number | null>(null);

  const onDragStart = (index: number) => {
    dragIndexRef.current = index;
    setDraggingIndex(index);
    setOverIndex(null);
  };
  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndexRef.current === null || dragIndexRef.current === index) return;
    setOverIndex(index);
  };
  const onDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const from = dragIndexRef.current;
    if (from === null || from === index) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setIsDirty(true);
    setOverIndex(null);
  };
  const onDragEnd = () => {
    dragIndexRef.current = null;
    setDraggingIndex(null);
    setOverIndex(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Batch update: update each project's position
      const updates = items.map((p, i) =>
        supabase.from("projects").update({ position: i + 1 }).eq("id", p.id)
      );
      const results = await Promise.all(updates);
      const failed = results.find((r) => r.error);
      if (failed?.error) throw failed.error;
      pushToast("success", "Order saved successfully.");
      setIsDirty(false);
      onSaved();
    } catch (err: any) {
      pushToast("error", err?.message || "Couldn't save order. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.section key="reorder" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm" style={{ color: C.textMuted }}>
          Drag <GripVertical size={13} className="inline -mt-0.5" /> to reorder. Changes apply after saving.
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !isDirty}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          style={{ background: goldGradient, color: "#191305" }}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {saving ? "Saving…" : "Save order"}
        </button>
      </div>

      {/* Dirty banner */}
      <AnimatePresence>
        {isDirty && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm"
            style={{ backgroundColor: "rgba(212,165,55,0.08)", border: `1px solid rgba(212,165,55,0.2)`, color: C.gold }}
          >
            <AlertTriangle size={14} />
            Unsaved changes — press "Save order" to apply.
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="flex flex-col gap-2">
        {items.map((project, i) => {
          const isDragging = draggingIndex === i;
          const isOver = overIndex === i && draggingIndex !== i;
          return (
            <div
              key={project.id}
              draggable
              onDragStart={() => onDragStart(i)}
              onDragOver={(e) => onDragOver(e, i)}
              onDrop={(e) => onDrop(e, i)}
              onDragEnd={onDragEnd}
              className="flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-150 select-none"
              style={{
                border: `1px solid ${isOver ? C.gold : C.border}`,
                backgroundColor: isDragging ? "rgba(212,165,55,0.06)" : isOver ? "rgba(212,165,55,0.04)" : C.card,
                opacity: isDragging ? 0.4 : 1,
                cursor: isDragging ? "grabbing" : "grab",
                transform: isOver ? "scale(1.01)" : "scale(1)",
                boxShadow: isOver ? `0 0 0 1.5px ${C.gold}` : "none",
              }}
            >
              {/* Position badge */}
              <div
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: C.textDim }}
              >
                {i + 1}
              </div>

              {/* Grip */}
              <GripVertical size={16} className="flex-shrink-0" style={{ color: C.textDim }} />

              {/* Cover thumbnail */}
              {project.cover_image ? (
                <img
                  src={project.cover_image}
                  alt=""
                  className="h-10 w-14 flex-shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="h-10 w-14 flex-shrink-0 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
              )}

              {/* Title + meta */}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{project.title}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs" style={{ color: C.textDim }}>{project.category}</span>
                  <span style={{ color: C.textDim, fontSize: 10 }}>·</span>
                  <span className="text-xs" style={{ color: C.textDim }}>{project.location}</span>
                </div>
              </div>

              {/* Status pill */}
              <span
                className="hidden flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium sm:inline-flex items-center gap-1.5"
                style={project.status === "completed"
                  ? { border: "1px solid rgba(52,211,153,0.3)", backgroundColor: "rgba(52,211,153,0.1)", color: C.emerald }
                  : { border: "1px solid rgba(148,163,184,0.2)", backgroundColor: "rgba(148,163,184,0.08)", color: "#94a3b8" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {project.status === "completed" ? "Completed" : "Ongoing"}
              </span>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ══════════════════════════════════════════════════════════ */
export default function AdminDashboardPage() {
  const router = useRouter();
  const [view, setView] = useState<"dashboard" | "projects" | "add" | "edit" | "reorder">("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [authState, setAuthState] = useState<"checking" | "forbidden" | "granted">("checking");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);
  const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toasts, push: pushToast, dismiss: dismissToast } = useToasts();

  const verifyAdminAccess = useCallback(async (): Promise<boolean> => {
    if (isLockedOut()) return false;
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) { recordAuthFailure(); return false; }
    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at < now) { recordAuthFailure(); return false; }
    const { data: adminRow, error: adminError } = await supabase.from("admin_users").select("user_id").eq("user_id", session.user.id).maybeSingle();
    if (adminError || !adminRow) { recordAuthFailure(); return false; }
    clearAuthAttempts();
    return true;
  }, []);

  const scheduleExpiryWarning = useCallback(async () => {
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.expires_at) return;
    const msUntilExpiry = session.expires_at * 1000 - Date.now();
    const warnAt = msUntilExpiry - 2 * 60 * 1000;
    if (warnAt > 0) expiryTimerRef.current = setTimeout(() => setShowExpiryWarning(true), warnAt);
  }, []);

  const handleExtendSession = useCallback(async () => {
    setShowExpiryWarning(false);
    const { error } = await supabase.auth.refreshSession();
    if (error) { router.replace("/admin/login"); return; }
    scheduleExpiryWarning();
    pushToast("success", "Session extended.");
  }, [router, scheduleExpiryWarning, pushToast]);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const granted = await verifyAdminAccess();
      if (!mounted) return;
      if (!granted) { setAuthState("forbidden"); router.replace("/admin/login"); return; }
      setAuthState("granted");
      scheduleExpiryWarning();
    };
    init();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      if (event === "SIGNED_OUT" || !session) { setAuthState("forbidden"); router.replace("/admin/login"); return; }
      if (event === "TOKEN_REFRESHED") {
        const stillAdmin = await verifyAdminAccess();
        if (!mounted) return;
        if (!stillAdmin) { setAuthState("forbidden"); router.replace("/admin/login"); return; }
        scheduleExpiryWarning();
      }
    });
    return () => { mounted = false; subscription.unsubscribe(); if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current); };
  }, [router, verifyAdminAccess, scheduleExpiryWarning]);

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select(`*, project_images ( id, storage_path, sort_order )`)
      .order("position", { ascending: true, nullsFirst: false });
    if (error) {
      console.error(error);
      pushToast("error", "Couldn't load projects. Check your connection and try again.");
    } else {
      setProjects((data as Project[]) || []);
    }
    setLoading(false);
  };

  const requestDelete = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    setPendingDelete(target);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const { id, title } = pendingDelete;
    setDeletingId(id);
    try {
      const { error: imagesError } = await supabase.from("project_images").delete().eq("project_id", id);
      if (imagesError) throw imagesError;
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      setProjects((prev) => prev.filter((p) => p.id !== id));
      pushToast("success", `"${title}" was deleted.`);
      setPendingDelete(null);
    } catch (err: any) {
      pushToast("error", err?.message || `Couldn't delete "${title}". Try again.`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    const newStatus = project.status === "completed" ? "ongoing" : "completed";
    setTogglingId(id);
    try {
      const { error } = await supabase.from("projects").update({ status: newStatus }).eq("id", id);
      if (error) throw error;
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
    } catch (err: any) {
      pushToast("error", err?.message || "Couldn't update project status. Try again.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleLogout = async () => {
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    clearAuthAttempts();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  useEffect(() => { if (authState === "granted") loadProjects(); }, [authState]);

  const now = new Date();
  const greeting = getGreeting(now.getHours());
  const dateLine = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) + " • Welcome back";
  const stats = { total: projects.length, completed: projects.filter((p) => p.status === "completed").length, ongoing: projects.filter((p) => p.status === "ongoing").length };
  const recentProjects = projects.slice(0, 6);

  function goTo(next: "dashboard" | "projects" | "add" | "edit" | "reorder") { setView(next); setDrawerOpen(false); }
  function openEdit(project: Project) { setSelectedProject(project); goTo("edit"); }

  if (authState === "checking" || authState === "forbidden") {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: C.bg }}>
        <Loader2 className="animate-spin" style={{ color: C.gold }} size={28} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full" style={{ backgroundColor: C.bg, color: C.text }}>
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
      <SessionExpiryWarning open={showExpiryWarning} onExtend={handleExtendSession} onLogout={handleLogout} />
      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this project?"
        description={pendingDelete ? `Una uhakika unataka kufuta "${pendingDelete.title}"? Hatua hii haiwezi kurudishwa.` : ""}
        confirmLabel="Delete project"
        busy={!!deletingId}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col p-4 pt-6 transition-transform duration-300 ease-out md:translate-x-0 ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: `linear-gradient(180deg, ${C.sidebarFrom}, ${C.sidebarTo})`, borderRight: `1px solid ${C.border}` }}
      >
        <div className="mb-5 flex items-center justify-between gap-3 px-2 pb-6" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-semibold"
              style={{ background: `linear-gradient(155deg, ${C.goldLight}, ${C.gold} 60%, ${C.goldDeep})`, color: "#1a1508" }}>
              AS
            </div>
            <div>
              <div className="text-base font-medium leading-tight">Archstruc</div>
              <div className="mt-0.5 text-xs uppercase tracking-wide" style={{ color: C.textDim }}>Administrator</div>
            </div>
          </div>
          <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg md:hidden"
            style={{ color: C.textMuted, border: `1px solid ${C.border}` }}>
            <X size={16} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          <NavItem label="Dashboard" icon={Home} active={view === "dashboard"} onClick={() => goTo("dashboard")} />
          <NavItem label="Projects" icon={Briefcase} active={view === "projects"} onClick={() => goTo("projects")} />
          <NavItem label="Add project" icon={PlusCircle} active={view === "add"} onClick={() => { setSelectedProject(null); goTo("add"); }} />
          {/* ── Reorder nav item ── */}
          <NavItem label="Reorder projects" icon={ArrowUpDown} active={view === "reorder"} onClick={() => goTo("reorder")} />
          <div className="mx-1 my-3" style={{ borderTop: `1px solid ${C.border}` }} />
          <a href="/" target="_blank" rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            style={{ color: C.textMuted }}>
            <Globe size={17} strokeWidth={1.8} className="opacity-85" />
            View website
          </a>
        </nav>

        <button type="button" onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
          style={{ color: C.textMuted }}>
          <LogOut size={17} strokeWidth={1.8} className="opacity-85" />
          Logout
        </button>
      </aside>

      <AnimatePresence>
        {drawerOpen && (
          <motion.button aria-label="Close menu" onClick={() => setDrawerOpen(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 md:hidden" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col md:ml-64">
        <div
          className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 pb-4 pt-5 sm:px-6 sm:pt-7 lg:px-10 lg:pt-8"
          style={{ background: `linear-gradient(180deg, ${C.bg}e6, transparent)` }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Open menu"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg md:hidden"
              style={{ border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.textMuted }}>
              <Menu size={17} />
            </button>
            {view === "dashboard" && <div className="min-w-0"><div className="mb-1 truncate text-xs" style={{ color: C.textDim }}>{dateLine}</div><div className="flex items-center gap-2 text-xl font-normal sm:text-2xl lg:text-3xl">{greeting}</div></div>}
            {view === "projects" && <div className="min-w-0"><div className="mb-1 text-xs" style={{ color: C.textDim }}>{projects.length} {projects.length === 1 ? "project" : "projects"} total</div><div className="text-xl font-normal sm:text-2xl lg:text-3xl">Projects</div></div>}
            {view === "add" && <div className="min-w-0"><div className="mb-1 text-xs" style={{ color: C.textDim }}>New project</div><div className="text-xl font-normal sm:text-2xl lg:text-3xl">Add project</div></div>}
            {view === "edit" && <div className="min-w-0"><div className="mb-1 text-xs" style={{ color: C.textDim }}>Editing</div><div className="truncate text-xl font-normal sm:text-2xl lg:text-3xl">{selectedProject?.title}</div></div>}
            {view === "reorder" && <div className="min-w-0"><div className="mb-1 text-xs" style={{ color: C.textDim }}>{projects.length} projects</div><div className="text-xl font-normal sm:text-2xl lg:text-3xl">Reorder projects</div></div>}
          </div>

          {(view === "dashboard" || view === "projects") && (
            <button type="button" onClick={() => { setSelectedProject(null); goTo("add"); }}
              className="inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto sm:justify-start sm:px-5 sm:py-3"
              style={{ background: goldGradient, color: "#191305" }}>
              <Plus size={15} strokeWidth={2.4} />
              Add project
            </button>
          )}
        </div>

        <main className="px-4 pb-16 pt-2 sm:px-6 lg:px-10">
          <AnimatePresence mode="wait">
            {view === "dashboard" && (
              <motion.section key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <div className="my-5 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-3">
                  <StatCard label="Projects" value={stats.total} tone="gold" />
                  <StatCard label="Completed" value={stats.completed} tone="emerald" />
                  <StatCard label="Ongoing" value={stats.ongoing} tone="slate" />
                </div>
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="text-lg font-medium sm:text-xl">Recent projects</h2>
                  <button type="button" onClick={() => goTo("projects")} className="text-xs transition-colors sm:text-sm" style={{ color: C.textMuted }}>View all →</button>
                </div>
                {loading ? <LoadingGrid /> : recentProjects.length === 0 ? (
                  <EmptyState onAdd={() => { setSelectedProject(null); goTo("add"); }} />
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {recentProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} onToggleStatus={handleToggleStatus} onDelete={requestDelete} onEdit={() => openEdit(project)} isToggling={togglingId === project.id} isDeleting={deletingId === project.id} />
                    ))}
                  </div>
                )}
              </motion.section>
            )}

            {view === "projects" && (
              <motion.section key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                {loading ? <LoadingGrid /> : projects.length === 0 ? (
                  <EmptyState onAdd={() => { setSelectedProject(null); goTo("add"); }} />
                ) : (
                  <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} onToggleStatus={handleToggleStatus} onDelete={requestDelete} onEdit={() => openEdit(project)} isToggling={togglingId === project.id} isDeleting={deletingId === project.id} />
                    ))}
                  </div>
                )}
              </motion.section>
            )}

            {view === "add" && (
              <motion.section key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <ProjectForm mode="create" onCancel={() => goTo("dashboard")} onSaved={() => { loadProjects(); goTo("projects"); }} />
              </motion.section>
            )}

            {view === "edit" && selectedProject && (
              <motion.section key="edit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <ProjectForm mode="edit" existingProject={selectedProject} onCancel={() => goTo("projects")} onSaved={() => { loadProjects(); goTo("projects"); }} />
              </motion.section>
            )}

            {/* ── Reorder view ── */}
            {view === "reorder" && !loading && (
              <ReorderView
                projects={projects}
                onSaved={loadProjects}
                pushToast={pushToast}
              />
            )}
            {view === "reorder" && loading && <LoadingGrid />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function NavItem({ label, icon: Icon, active, onClick }: { label: string; icon: any; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors"
      style={active
        ? { backgroundColor: "rgba(212,165,55,0.14)", color: C.gold, border: `1px solid ${C.borderGoldSoft}` }
        : { color: C.textMuted, border: "1px solid transparent" }}>
      <Icon size={17} strokeWidth={1.8} className={active ? "opacity-100" : "opacity-85"} />
      {label}
    </button>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string | number; tone: string }) {
  const toneBg = tone === "gold" ? "rgba(212,165,55,0.14)" : tone === "emerald" ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.06)";
  return (
    <div className="flex h-44 flex-col justify-between rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.card }}>
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

function ProjectCard({ project, onToggleStatus, onDelete, onEdit, isToggling, isDeleting }: {
  project: Project; onToggleStatus: (id: string) => void; onDelete: (id: string) => void;
  onEdit: () => void; isToggling?: boolean; isDeleting?: boolean;
}) {
  const isCompleted = project.status === "completed";
  const busy = isToggling || isDeleting;
  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }} onClick={onEdit}
      className="cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.card, opacity: isDeleting ? 0.5 : 1, pointerEvents: isDeleting ? "none" : "auto" }}>
      <div className="relative flex h-36 items-end justify-between p-3"
        style={{ backgroundImage: project.cover_image ? `url(${project.cover_image})` : undefined, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#0E1116" }}>
        <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide"
          style={isCompleted
            ? { border: "1px solid rgba(52,211,153,0.3)", backgroundColor: "rgba(52,211,153,0.16)", color: C.emerald }
            : { border: "1px solid rgba(148,163,184,0.25)", backgroundColor: "rgba(148,163,184,0.16)", color: "#cbd5e1" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {isCompleted ? "Completed" : "Ongoing"}
        </span>
        <span className="relative z-10 rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: "rgba(212,165,55,0.2)", color: C.gold }}>{project.category}</span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-1 text-base font-medium sm:text-lg">{project.title}</div>
        <div className="mb-3 flex items-center gap-1.5 text-xs" style={{ color: C.textMuted }}><MapPin size={12} className="opacity-70" />{project.location}</div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <IconButton label="Edit" onClick={onEdit} disabled={busy}><Pencil size={14} /></IconButton>
          <IconButton label={isCompleted ? "Mark ongoing" : "Mark completed"} onClick={() => onToggleStatus(project.id)} disabled={busy}>
            {isToggling ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          </IconButton>
          <IconButton label="Delete" onClick={() => onDelete(project.id)} disabled={busy} danger>
            {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          </IconButton>
        </div>
      </div>
    </motion.div>
  );
}

function IconButton({ children, label, onClick, disabled, danger }: {
  children: React.ReactNode; label: string; onClick?: () => void; disabled?: boolean; danger?: boolean;
}) {
  return (
    <button type="button" title={label} aria-label={label} disabled={disabled}
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50"
      style={{ border: `1px solid ${danger ? "rgba(248,113,113,0.25)" : C.border}`, backgroundColor: danger ? "rgba(248,113,113,0.06)" : "rgba(255,255,255,0.03)", color: danger ? C.red : C.textMuted }}>
      {children}
    </button>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl px-5 py-16 text-center"
      style={{ border: `1px dashed ${C.border}`, backgroundColor: "rgba(255,255,255,0.012)" }}>
      <div className="mb-5 opacity-90"><Briefcase size={64} strokeWidth={1.3} style={{ color: C.gold }} /></div>
      <div className="mb-1.5 text-lg">No projects yet</div>
      <p className="mb-5 max-w-xs text-sm" style={{ color: C.textMuted }}>Once you add a project, it will appear here and on the public site.</p>
      <button type="button" onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
        style={{ background: goldGradient, color: "#191305" }}>
        <Plus size={15} strokeWidth={2.4} />Add first project
      </button>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder?: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg p-3 text-sm outline-none transition-colors"
        style={{ border: `1px solid ${C.border}`, backgroundColor: "#0E1116", color: C.text }} />
    </div>
  );
}

function DraggableThumb({ src, isNew, onRemove, index, onDragStart, onDragOver, onDrop, onDragEnd, isDragging, isOver }: {
  src: string; isNew?: boolean; onRemove: () => void; index: number;
  onDragStart: (i: number) => void; onDragOver: (i: number) => void;
  onDrop: (i: number) => void; onDragEnd: () => void;
  isDragging: boolean; isOver: boolean;
}) {
  return (
    <div draggable onDragStart={() => onDragStart(index)} onDragOver={(e) => { e.preventDefault(); onDragOver(index); }}
      onDrop={(e) => { e.preventDefault(); onDrop(index); }} onDragEnd={onDragEnd}
      className="group relative aspect-square overflow-hidden rounded-lg select-none"
      style={{ cursor: isDragging ? "grabbing" : "grab", opacity: isDragging ? 0.35 : 1, transition: "opacity 0.15s, transform 0.15s, outline 0.1s", outline: isOver ? `2px solid ${C.gold}` : "2px solid transparent", outlineOffset: "2px", transform: isOver ? "scale(1.06)" : "scale(1)" }}>
      <img src={src} alt="" className="h-full w-full object-cover pointer-events-none" />
      <div className="absolute left-1.5 top-1.5 rounded px-1.5 py-0.5 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
        style={{ backgroundColor: "rgba(0,0,0,0.72)", color: "#fff", fontSize: 9, letterSpacing: "0.04em" }}>⠿ drag</div>
      {isNew && <span className="absolute right-1.5 top-1.5 rounded bg-blue-500 px-1.5 py-0.5 text-[9px] font-bold text-white pointer-events-none">NEW</span>}
      <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity group-hover:opacity-100" title="Remove">
        <X size={16} color="#fff" />
      </button>
    </div>
  );
}

type GalleryItem = | { kind: "existing"; img: ProjectImage; preview: string } | { kind: "new"; file: File; preview: string };

function ProjectForm({ mode, existingProject, onCancel, onSaved }: {
  mode: "create" | "edit"; existingProject?: Project; onCancel: () => void; onSaved: () => void;
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
  const [coverDragging, setCoverDragging] = useState(false);
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    (existingProject?.project_images || []).slice().sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((img) => ({ kind: "existing" as const, img, preview: img.storage_path }))
  );
  const [galleryDropActive, setGalleryDropActive] = useState(false);
  const dragIndexRef = useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readFile = (file: File): Promise<string> => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => (typeof r.result === "string" ? res(r.result) : rej(new Error("bad result")));
    r.onerror = () => rej(r.error);
    r.readAsDataURL(file);
  });

  const handleCoverSelect = async (file: File) => { setCoverFile(file); setCoverPreview(await readFile(file)); };
  const handleGalleryAdd = async (files: File[]) => {
    if (!files.length) return;
    const items: GalleryItem[] = await Promise.all(files.map(async (file) => ({ kind: "new" as const, file, preview: await readFile(file) })));
    setGallery((prev) => [...prev, ...items]);
  };

  const onThumbDragStart = (index: number) => { dragIndexRef.current = index; setDraggingIndex(index); setOverIndex(null); };
  const onThumbDragOver = (index: number) => { if (dragIndexRef.current === null || dragIndexRef.current === index) return; setOverIndex(index); };
  const onThumbDrop = (index: number) => {
    const from = dragIndexRef.current;
    if (from === null || from === index) return;
    setGallery((prev) => { const next = [...prev]; [next[from], next[index]] = [next[index], next[from]]; return next; });
    setOverIndex(null);
  };
  const onThumbDragEnd = () => { dragIndexRef.current = null; setDraggingIndex(null); setOverIndex(null); };
  const onCoverDragOver = (e: React.DragEvent) => { e.preventDefault(); setCoverDragging(true); };
  const onCoverDragLeave = () => setCoverDragging(false);
  const onCoverDrop = async (e: React.DragEvent) => { e.preventDefault(); setCoverDragging(false); const file = e.dataTransfer.files?.[0]; if (file?.type.startsWith("image/")) await handleCoverSelect(file); };
  const onGalleryAddDragOver = (e: React.DragEvent) => { e.preventDefault(); setGalleryDropActive(true); };
  const onGalleryAddDragLeave = () => setGalleryDropActive(false);
  const onGalleryAddDrop = async (e: React.DragEvent) => { e.preventDefault(); setGalleryDropActive(false); const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/")); await handleGalleryAdd(files); };

  const uploadFile = async (file: File, folder: string) => {
    const compressed = await compressImage(file);
    const ext = compressed.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("project-images").upload(path, compressed, { cacheControl: "31536000", upsert: false });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const removeGalleryItem = async (index: number) => {
    const item = gallery[index];
    if (item.kind === "existing" && item.img.id) {
      const { error } = await supabase.from("project_images").delete().eq("id", item.img.id);
      if (error) { setError("Couldn't remove that photo. Try again."); return; }
    }
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !location.trim()) { setError("Jaza Title na Location kabla ya kusave."); return; }
    if (!coverFile && !coverPreview) { setError("Weka cover image."); return; }
    setError(null); setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Your session has expired. Please log in again.");
      let coverUrl = coverPreview;
      if (coverFile) coverUrl = await uploadFile(coverFile, "covers");
      const payload = { slug: slug.trim() || slugify(title), title: title.trim(), location: location.trim(), category, status, cover_image: coverUrl, description: description || null, value: value || null, client: client || null, completion_date: completionDate || null };
      let projectId = existingProject?.id;
      if (mode === "create") {
        // Get max position for new project
        const { data: maxData } = await supabase.from("projects").select("position").order("position", { ascending: false }).limit(1).single();
        const nextPosition = ((maxData?.position as number) ?? 0) + 1;
        const { data, error: insertError } = await supabase.from("projects").insert({ ...payload, position: nextPosition }).select("id").single();
        if (insertError) throw insertError;
        projectId = data.id;
      } else {
        if (!projectId) throw new Error("Missing project id");
        const { error: updateError } = await supabase.from("projects").update(payload).eq("id", projectId);
        if (updateError) throw updateError;
      }
      if (projectId) {
        for (let i = 0; i < gallery.length; i++) {
          const item = gallery[i];
          if (item.kind === "existing" && item.img.id) { await supabase.from("project_images").update({ sort_order: i }).eq("id", item.img.id); }
          else if (item.kind === "new") { const url = await uploadFile(item.file, projectId); await supabase.from("project_images").insert({ project_id: projectId, storage_path: url, sort_order: i }); }
        }
      }
      onSaved();
    } catch (err: any) {
      setError(err.message || "Kuna shida imetokea. Jaribu tena.");
    } finally {
      setSaving(false);
    }
  }

  const newCount = gallery.filter((g) => g.kind === "new").length;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded-2xl p-5 sm:p-8" style={{ border: `1px solid ${C.border}`, backgroundColor: C.card }}>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Project title" placeholder="e.g. Riverside Residences" value={title} onChange={setTitle} />
        <Field label="Slug (blank = auto)" placeholder="riverside-residences" value={slug} onChange={setSlug} />
        <Field label="Location" placeholder="e.g. Nairobi" value={location} onChange={setLocation} />
        <div>
          <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg p-3 text-sm outline-none transition-colors" style={{ border: `1px solid ${C.border}`, backgroundColor: "#0E1116", color: C.text }}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as "ongoing" | "completed")} className="w-full rounded-lg p-3 text-sm outline-none transition-colors" style={{ border: `1px solid ${C.border}`, backgroundColor: "#0E1116", color: C.text }}>
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
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What makes this project stand out..." className="min-h-[84px] w-full rounded-lg p-3 text-sm outline-none transition-colors" style={{ border: `1px solid ${C.border}`, backgroundColor: "#0E1116", color: C.text }} />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium" style={{ color: C.textMuted }}>Cover image</label>
        <div onDragOver={onCoverDragOver} onDragLeave={onCoverDragLeave} onDrop={onCoverDrop} onClick={() => coverInputRef.current?.click()}
          className="relative cursor-pointer overflow-hidden rounded-xl transition-all duration-200"
          style={{ border: `1.5px dashed ${coverDragging ? C.gold : C.border}`, backgroundColor: coverDragging ? "rgba(212,165,55,0.06)" : "rgba(255,255,255,0.02)" }}>
          {coverPreview ? (
            <div className="relative"><img src={coverPreview} alt="Cover" className="h-40 w-full object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100"><p className="text-xs text-white">Click or drop to replace</p></div></div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-10"><Upload size={20} style={{ color: C.textDim }} /><p className="text-xs" style={{ color: C.textDim }}>{coverDragging ? "Drop to set as cover" : "Drag & drop or click to upload cover"}</p></div>
          )}
        </div>
        <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) handleCoverSelect(f); }} />
      </div>
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium" style={{ color: C.textMuted }}>Gallery photos</label>
            {gallery.length > 1 && <span className="text-xs" style={{ color: C.textDim }}>· drag to swap</span>}
          </div>
          {gallery.length > 0 && <span className="text-xs" style={{ color: C.textDim }}>{gallery.length} photo{gallery.length !== 1 ? "s" : ""}{newCount > 0 && <> · <span style={{ color: "#60a5fa" }}>{newCount} new</span></>}</span>}
        </div>
        {gallery.length > 0 && (
          <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {gallery.map((item, i) => (
              <DraggableThumb key={item.kind === "existing" ? (item.img.id ?? `ex-${i}`) : `new-${i}-${(item as any).file?.name}`}
                index={i} src={item.preview} isNew={item.kind === "new"} onRemove={() => removeGalleryItem(i)}
                onDragStart={onThumbDragStart} onDragOver={onThumbDragOver} onDrop={onThumbDrop} onDragEnd={onThumbDragEnd}
                isDragging={draggingIndex === i} isOver={overIndex === i && draggingIndex !== i} />
            ))}
          </div>
        )}
        <div onDragOver={onGalleryAddDragOver} onDragLeave={onGalleryAddDragLeave} onDrop={onGalleryAddDrop} onClick={() => galleryInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl py-8 transition-all duration-200"
          style={{ border: `1.5px dashed ${galleryDropActive ? C.gold : C.border}`, backgroundColor: galleryDropActive ? "rgba(212,165,55,0.06)" : "rgba(255,255,255,0.02)" }}>
          <Upload size={18} style={{ color: galleryDropActive ? C.gold : C.textDim }} />
          <p className="text-xs" style={{ color: galleryDropActive ? C.gold : C.textDim }}>{galleryDropActive ? "Drop to add to gallery" : "Drag & drop images here, or click to browse"}</p>
        </div>
        <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { const files = Array.from(e.target.files || []); e.target.value = ""; handleGalleryAdd(files); }} />
      </div>
      {error && <p className="mb-4 rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: C.red }}>{error}</p>}
      <div className="mt-6 flex flex-col-reverse justify-end gap-2.5 pt-5 sm:flex-row" style={{ borderTop: `1px solid ${C.border}` }}>
        <button type="button" onClick={onCancel} className="w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto" style={{ border: `1px solid ${C.border}`, color: C.textMuted }}>Cancel</button>
        <button type="submit" disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto" style={{ background: goldGradient, color: "#191305" }}>
          {saving && <Loader2 size={14} className="animate-spin" />}
          {mode === "create" ? "Save project" : "Save changes"}
        </button>
      </div>
    </form>
  );
}