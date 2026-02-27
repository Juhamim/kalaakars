"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */
interface GalleryImage { src: string; span: "full" | "half"; }
interface Spec { label: string; value: string; }
interface Project {
    id?: string;
    slug: string;
    num: string;
    title: string;
    subtitle: string;
    category: string;
    location: string;
    year: string;
    hero_img: string;
    story: string;
    pull_quote?: string;
    gallery?: GalleryImage[];
    gallery_images?: GalleryImage[];
    specs?: Spec[];
}

const EMPTY_PROJECT: Project = {
    slug: "", num: "", title: "", subtitle: "", category: "", location: "",
    year: new Date().getFullYear().toString(), hero_img: "", story: "", pull_quote: "",
    gallery: [], specs: [],
};

const CATEGORIES = ["RESIDENTIAL", "COMMERCIAL", "CULTURAL", "LANDSCAPE", "HOSPITALITY"];

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function Toast({ msg, type, onDone }: { msg: string; type: "ok" | "err"; onDone: () => void }) {
    useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
            style={{
                position: "fixed", bottom: "32px", right: "32px", zIndex: 99999,
                background: type === "ok" ? "#1a1a1a" : "#3d0f0f",
                border: `1px solid ${type === "ok" ? "rgba(212,165,32,0.5)" : "rgba(220,50,50,0.5)"}`,
                borderLeft: `3px solid ${type === "ok" ? "#D4A520" : "#dc3232"}`,
                color: "#fff", padding: "14px 22px",
                fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.08em",
                display: "flex", alignItems: "center", gap: "12px", maxWidth: "380px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
        >
            <span style={{ fontSize: "1rem" }}>{type === "ok" ? "✓" : "✕"}</span>
            {msg}
        </motion.div>
    );
}

/* ═══════════════════════════════════════
   DELETE CONFIRM MODAL
═══════════════════════════════════════ */
function DeleteModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
            onClick={onCancel}
        >
            <motion.div
                initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92 }}
                onClick={e => e.stopPropagation()}
                style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.1)", padding: "40px", maxWidth: "420px", width: "100%" }}
            >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#D4A520", marginBottom: "16px" }}>CONFIRM DELETE</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "#fff", marginBottom: "32px", lineHeight: 1.4 }}>
                    Delete <strong>&ldquo;{title}&rdquo;</strong>? This cannot be undone.
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={onCancel} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", cursor: "pointer" }}>CANCEL</button>
                    <button onClick={onConfirm} style={{ flex: 1, padding: "12px", background: "#dc3232", border: "none", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", cursor: "pointer", fontWeight: 700 }}>DELETE</button>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════
   PROJECT FORM (Add / Edit)
═══════════════════════════════════════ */
function ProjectForm({
    initial, onSave, onCancel,
}: {
    initial: Project;
    onSave: (p: Project) => Promise<void>;
    onCancel: () => void;
}) {
    const [form, setForm] = useState<Project>({
        ...initial,
        gallery: initial.gallery_images ?? initial.gallery ?? [],
        specs: initial.specs ?? [],
    });
    const [saving, setSaving] = useState(false);

    const set = (k: keyof Project, v: unknown) => setForm(f => ({ ...f, [k]: v }));

    const setGallery = (val: GalleryImage[]) => set("gallery", val);
    const setSpecs = (val: Spec[]) => set("specs", val);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await onSave(form);
        setSaving(false);
    };

    const inputStyle: React.CSSProperties = {
        width: "100%", background: "#111", border: "1px solid rgba(255,255,255,0.12)",
        color: "#fff", padding: "11px 14px", fontFamily: "var(--font-sans)", fontSize: "0.85rem",
        outline: "none", boxSizing: "border-box",
    };
    const labelStyle: React.CSSProperties = {
        display: "block", fontFamily: "var(--font-mono)", fontSize: "0.5rem",
        letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", marginBottom: "6px",
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0", height: "100%", overflow: "hidden" }}>
            {/* Form header */}
            <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "#D4A520", marginBottom: "4px" }}>
                        {initial.slug ? "EDIT PROJECT" : "NEW PROJECT"}
                    </p>
                    <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.3rem", color: "#fff", letterSpacing: "-0.02em" }}>
                        {initial.title || "Untitled Project"}
                    </h2>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                    <button type="button" onClick={onCancel} style={{ padding: "10px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", cursor: "pointer" }}>CANCEL</button>
                    <button type="submit" disabled={saving} style={{ padding: "10px 24px", background: saving ? "#333" : "#D4A520", border: "none", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>
                        {saving ? "SAVING..." : "SAVE PROJECT"}
                    </button>
                </div>
            </div>

            {/* Scrollable form body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
                {/* ── Core fields ── */}
                <section style={{ marginBottom: "40px" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>BASIC INFO</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        {[
                            { key: "title", label: "TITLE", placeholder: "BEACH HOUSE CALICUT" },
                            { key: "slug", label: "SLUG (URL)", placeholder: "beach-house-calicut" },
                            { key: "num", label: "NUMBER", placeholder: "00" },
                            { key: "subtitle", label: "SUBTITLE", placeholder: "Residential" },
                        ].map(({ key, label, placeholder }) => (
                            <div key={key}>
                                <label style={labelStyle}>{label}</label>
                                <input
                                    required={key === "title" || key === "slug"}
                                    value={String(form[key as keyof Project] ?? "")}
                                    onChange={e => set(key as keyof Project, e.target.value)}
                                    placeholder={placeholder}
                                    style={inputStyle}
                                />
                            </div>
                        ))}
                        <div>
                            <label style={labelStyle}>CATEGORY</label>
                            <select value={form.category} onChange={e => set("category", e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
                                <option value="">Select…</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>YEAR</label>
                            <input value={form.year} onChange={e => set("year", e.target.value)} placeholder="2024" style={inputStyle} />
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}>
                            <label style={labelStyle}>LOCATION</label>
                            <input value={form.location} onChange={e => set("location", e.target.value)} placeholder="CALICUT, KL" style={inputStyle} />
                        </div>
                    </div>
                </section>

                {/* ── Hero image ── */}
                <section style={{ marginBottom: "40px" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>HERO IMAGE</p>
                    <div>
                        <label style={labelStyle}>IMAGE URL</label>
                        <input value={form.hero_img} onChange={e => set("hero_img", e.target.value)} placeholder="https://images.unsplash.com/…" style={inputStyle} />
                    </div>
                    {form.hero_img && (
                        <div style={{ marginTop: "12px", height: "180px", borderRadius: "2px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={form.hero_img} alt="Hero preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                    )}
                </section>

                {/* ── Story & Quote ── */}
                <section style={{ marginBottom: "40px" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>NARRATIVE</p>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={labelStyle}>PROJECT STORY</label>
                        <textarea
                            value={form.story}
                            onChange={e => set("story", e.target.value)}
                            rows={5}
                            placeholder="Describe the project…"
                            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>PULL QUOTE (optional)</label>
                        <input value={form.pull_quote ?? ""} onChange={e => set("pull_quote", e.target.value)} placeholder="Every good building begins by listening to the land." style={inputStyle} />
                    </div>
                </section>

                {/* ── Gallery ── */}
                <section style={{ marginBottom: "40px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" }}>GALLERY IMAGES ({(form.gallery ?? []).length})</p>
                        <button type="button" onClick={() => setGallery([...(form.gallery ?? []), { src: "", span: "half" }])}
                            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", padding: "5px 12px", cursor: "pointer" }}>
                            + ADD IMAGE
                        </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {(form.gallery ?? []).map((img, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "10px", alignItems: "center", background: "rgba(255,255,255,0.03)", padding: "12px", border: "1px solid rgba(255,255,255,0.07)" }}>
                                <input
                                    value={img.src}
                                    onChange={e => { const g = [...(form.gallery ?? [])]; g[i] = { ...g[i], src: e.target.value }; setGallery(g); }}
                                    placeholder="https://images.unsplash.com/…"
                                    style={{ ...inputStyle, fontSize: "0.75rem" }}
                                />
                                <select
                                    value={img.span}
                                    onChange={e => { const g = [...(form.gallery ?? [])]; g[i] = { ...g[i], span: e.target.value as "full" | "half" }; setGallery(g); }}
                                    style={{ ...inputStyle, width: "80px", fontSize: "0.7rem" }}
                                >
                                    <option value="half">Half</option>
                                    <option value="full">Full</option>
                                </select>
                                <button type="button" onClick={() => setGallery((form.gallery ?? []).filter((_, j) => j !== i))}
                                    style={{ background: "transparent", border: "1px solid rgba(220,50,50,0.3)", color: "rgba(220,50,50,0.7)", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Specs ── */}
                <section style={{ marginBottom: "40px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" }}>PROJECT SPECS ({(form.specs ?? []).length})</p>
                        <button type="button" onClick={() => setSpecs([...(form.specs ?? []), { label: "", value: "" }])}
                            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", padding: "5px 12px", cursor: "pointer" }}>
                            + ADD SPEC
                        </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {(form.specs ?? []).map((spec, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "10px", alignItems: "center" }}>
                                <input value={spec.label} onChange={e => { const s = [...(form.specs ?? [])]; s[i] = { ...s[i], label: e.target.value }; setSpecs(s); }} placeholder="Label (e.g. Area)" style={{ ...inputStyle, fontSize: "0.75rem" }} />
                                <input value={spec.value} onChange={e => { const s = [...(form.specs ?? [])]; s[i] = { ...s[i], value: e.target.value }; setSpecs(s); }} placeholder="Value (e.g. 4,200 sq.ft)" style={{ ...inputStyle, fontSize: "0.75rem" }} />
                                <button type="button" onClick={() => setSpecs((form.specs ?? []).filter((_, j) => j !== i))}
                                    style={{ background: "transparent", border: "1px solid rgba(220,50,50,0.3)", color: "rgba(220,50,50,0.7)", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </form>
    );
}

/* ═══════════════════════════════════════
   STAT CARD
═══════════════════════════════════════ */
function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
    return (
        <div style={{ background: "#111", border: `1px solid ${accent ? "rgba(212,165,32,0.3)" : "rgba(255,255,255,0.08)"}`, padding: "24px", flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: accent ? "#D4A520" : "rgba(255,255,255,0.35)", marginBottom: "10px" }}>{label}</p>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "2rem", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>{value}</p>
        </div>
    );
}

/* ═══════════════════════════════════════
   MAIN ADMIN PAGE
═══════════════════════════════════════ */
export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [pw, setPw] = useState("");
    const [pwError, setPwError] = useState(false);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<"list" | "form">("list");
    const [editing, setEditing] = useState<Project | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
    const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
    const [search, setSearch] = useState("");
    const [filterCat, setFilterCat] = useState("ALL");

    const showToast = (msg: string, type: "ok" | "err" = "ok") => setToast({ msg, type });

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/projects");
        if (res.ok) setProjects(await res.json());
        setLoading(false);
    }, []);

    useEffect(() => { if (authed) fetchProjects(); }, [authed, fetchProjects]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pw === "kalaakars-admin-2024") { setAuthed(true); setPwError(false); }
        else { setPwError(true); setPw(""); }
    };

    const handleSave = async (p: Project) => {
        const isEdit = !!editing?.slug;
        const url = isEdit ? `/api/projects/${editing?.slug}` : "/api/projects";
        const method = isEdit ? "PUT" : "POST";
        const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
        if (res.ok) {
            showToast(isEdit ? "Project updated ✓" : "Project created ✓");
            setView("list");
            fetchProjects();
        } else {
            const err = await res.json();
            showToast(err.error ?? "Save failed", "err");
        }
    };

    const handleDelete = async (p: Project) => {
        const res = await fetch(`/api/projects/${p.slug}`, { method: "DELETE" });
        if (res.ok) { showToast("Project deleted"); fetchProjects(); }
        else showToast("Delete failed", "err");
        setDeleteTarget(null);
    };

    const filtered = projects.filter(p => {
        const q = search.toLowerCase();
        const matchSearch = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
        const matchCat = filterCat === "ALL" || p.category === filterCat;
        return matchSearch && matchCat;
    });

    /* ── Login Screen ── */
    if (!authed) {
        return (
            <div style={{ minHeight: "100vh", background: "#090909", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: "380px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.svg" alt="K" style={{ width: "28px", height: "32px", filter: "brightness(0) invert(1)", objectFit: "contain" }} />
                        <div>
                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</p>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>ADMIN CMS</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin}>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.6rem", letterSpacing: "-0.03em", color: "#fff", marginBottom: "32px", lineHeight: 1.2 }}>
                            Studio<br />Control Panel
                        </p>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>ADMIN PASSWORD</label>
                            <input
                                type="password"
                                value={pw}
                                onChange={e => { setPw(e.target.value); setPwError(false); }}
                                placeholder="Enter password"
                                autoFocus
                                style={{
                                    width: "100%", background: "#111",
                                    border: `1px solid ${pwError ? "rgba(220,50,50,0.6)" : "rgba(255,255,255,0.14)"}`,
                                    color: "#fff", padding: "14px 16px",
                                    fontFamily: "var(--font-sans)", fontSize: "0.9rem",
                                    outline: "none", boxSizing: "border-box",
                                }}
                            />
                            {pwError && <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#dc3232", marginTop: "6px", letterSpacing: "0.1em" }}>Incorrect password</p>}
                        </div>
                        <button type="submit" style={{ width: "100%", padding: "14px", background: "#D4A520", border: "none", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", fontWeight: 700, cursor: "pointer" }}>
                            ENTER STUDIO
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    /* ── Dashboard ── */
    return (
        <div style={{ minHeight: "100vh", background: "#090909", color: "#fff", display: "flex", flexDirection: "column" }}>

            {/* ── Top Nav ── */}
            <header style={{ height: "60px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", flexShrink: 0, background: "#0c0c0c" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.svg" alt="K" style={{ width: "18px", height: "22px", filter: "brightness(0) invert(1)", objectFit: "contain" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", color: "#fff" }}>KALAAKARS</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em" }}>/ ADMIN CMS</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <a href="/" target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", padding: "5px 12px" }}>VIEW SITE ↗</a>
                    <button onClick={() => setAuthed(false)} style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer" }}>SIGN OUT</button>
                </div>
            </header>

            <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

                {/* ── Sidebar ── */}
                <aside style={{ width: "220px", borderRight: "1px solid rgba(255,255,255,0.07)", padding: "28px 0", display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0, background: "#0c0c0c" }}>
                    {[
                        { label: "Projects", icon: "◈", id: "projects" },
                    ].map(item => (
                        <button key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 28px", background: "rgba(212,165,32,0.08)", border: "none", borderLeft: "2px solid #D4A520", cursor: "pointer", width: "100%" }}>
                            <span style={{ color: "#D4A520", fontSize: "1rem" }}>{item.icon}</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#fff" }}>{item.label}</span>
                        </button>
                    ))}

                    <div style={{ marginTop: "auto", padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", lineHeight: 1.8 }}>
                            KALAAKARS CMS<br />
                            CALICUT · KERALA<br />
                            EST. 2019
                        </p>
                    </div>
                </aside>

                {/* ── Main content ── */}
                <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>

                    <AnimatePresence mode="wait">
                        {view === "form" ? (
                            <motion.div key="form" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                                <ProjectForm
                                    initial={editing ?? EMPTY_PROJECT}
                                    onSave={handleSave}
                                    onCancel={() => { setView("list"); setEditing(null); }}
                                />
                            </motion.div>
                        ) : (
                            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                                {/* List header */}
                                <div style={{ padding: "28px 32px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                                        <div>
                                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "#D4A520", marginBottom: "6px" }}>PROJECTS MANAGER</p>
                                            <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.8rem", letterSpacing: "-0.04em", color: "#fff" }}>All Projects</h1>
                                        </div>
                                        <button
                                            onClick={() => { setEditing(null); setView("form"); }}
                                            style={{ padding: "12px 24px", background: "#D4A520", border: "none", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", marginTop: "4px" }}
                                        >+ NEW PROJECT</button>
                                    </div>

                                    {/* Stats row */}
                                    <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                                        <StatCard label="TOTAL PROJECTS" value={projects.length} accent />
                                        <StatCard label="RESIDENTIAL" value={projects.filter(p => p.category === "RESIDENTIAL").length} />
                                        <StatCard label="COMMERCIAL" value={projects.filter(p => p.category === "COMMERCIAL").length} />
                                        <StatCard label="CULTURAL" value={projects.filter(p => p.category === "CULTURAL").length} />
                                    </div>

                                    {/* Search + filter */}
                                    <div style={{ display: "flex", gap: "12px" }}>
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            placeholder="Search projects…"
                                            style={{ flex: 1, background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "10px 14px", fontFamily: "var(--font-sans)", fontSize: "0.8rem", outline: "none" }}
                                        />
                                        <select
                                            value={filterCat}
                                            onChange={e => setFilterCat(e.target.value)}
                                            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "10px 14px", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", outline: "none", appearance: "none" }}
                                        >
                                            <option value="ALL">ALL CATEGORIES</option>
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Project table */}
                                <div style={{ flex: 1, overflowY: "auto" }}>
                                    {loading ? (
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
                                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>LOADING…</p>
                                        </div>
                                    ) : filtered.length === 0 ? (
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", flexDirection: "column", gap: "12px" }}>
                                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", color: "rgba(255,255,255,0.3)" }}>No projects found</p>
                                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>Try adjusting your search or create a new project</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Table header */}
                                            <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 120px 100px 80px 120px", gap: "0", padding: "12px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                                {["#", "TITLE", "CATEGORY", "LOCATION", "YEAR", "ACTIONS"].map(h => (
                                                    <span key={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.25)" }}>{h}</span>
                                                ))}
                                            </div>

                                            {filtered.map((p, i) => (
                                                <motion.div
                                                    key={p.id ?? p.slug}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.04 }}
                                                    style={{ display: "grid", gridTemplateColumns: "48px 1fr 120px 100px 80px 120px", gap: "0", padding: "18px 32px", borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "center" }}
                                                >
                                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{p.num}</span>

                                                    <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
                                                        {p.hero_img && (
                                                            <div style={{ width: "48px", height: "36px", borderRadius: "2px", overflow: "hidden", flexShrink: 0 }}>
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img src={p.hero_img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                            </div>
                                                        )}
                                                        <div style={{ minWidth: 0 }}>
                                                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.9rem", color: "#fff", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                                {p.title.split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                                                            </p>
                                                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", marginTop: "2px" }}>/{p.slug}</p>
                                                        </div>
                                                    </div>

                                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>{p.category}</span>
                                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.07em", color: "rgba(255,255,255,0.35)" }}>{p.location}</span>
                                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.5)" }}>{p.year}</span>

                                                    <div style={{ display: "flex", gap: "8px" }}>
                                                        <button onClick={() => { setEditing(p); setView("form"); }}
                                                            style={{ padding: "6px 12px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.1em", cursor: "pointer" }}>EDIT</button>
                                                        <button onClick={() => setDeleteTarget(p)}
                                                            style={{ padding: "6px 12px", background: "transparent", border: "1px solid rgba(220,50,50,0.3)", color: "rgba(220,50,50,0.7)", fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.1em", cursor: "pointer" }}>DEL</button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Delete confirm modal */}
            <AnimatePresence>
                {deleteTarget && (
                    <DeleteModal
                        title={deleteTarget.title}
                        onConfirm={() => handleDelete(deleteTarget)}
                        onCancel={() => setDeleteTarget(null)}
                    />
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {toast && <Toast key="toast" msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
            </AnimatePresence>
        </div>
    );
}
