"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

/* ═══════════════════════════════════════════
   FULL-SCREEN NAVIGATION OVERLAY
═══════════════════════════════════════════ */
function NavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const links = [
    { label: "Projects", href: "/", num: "01" },
    { label: "Studio", href: "/studio", num: "02" },
    { label: "Index", href: "/index", num: "03" },
    { label: "Contact", href: "/studio#contact", num: "04" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "#0c0c0c",
            display: "flex", flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
            <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</span>
            </Link>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", lineHeight: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div style={{ flex: 1, padding: "40px 24px", display: "flex", flexDirection: "column" }}>
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <Link href={link.href} onClick={onClose} style={{ display: "flex", alignItems: "baseline", gap: "20px", padding: "20px 0" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", width: "28px", flexShrink: 0 }}>{link.num}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(2rem, 10vw, 5rem)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* Contact info */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: "48px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", marginBottom: "14px" }}>GET IN TOUCH</p>
              <a href="mailto:hello@kalaakars.in" style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#fff", display: "block", marginBottom: "8px" }}>hello@kalaakars.in</a>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", lineHeight: 1.6 }}>
                S.M. Street, Kozhikode — 673001<br />Kerala, India
              </p>
              <div style={{ display: "flex", gap: "24px", marginTop: "32px" }}>
                {["Instagram", "LinkedIn", "Behance"].map(s => (
                  <a key={s} href="#" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>{s}</a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>© 2024 KALAAKARS</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>CALICUT · KERALA</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════ */
function Marquee({ items }: { items: string[] }) {
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid #EEE", borderBottom: "1px solid #EEE", padding: "16px 0", background: "#fff" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", color: "#AAA", paddingRight: "64px" }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   AWARDS STRIP
═══════════════════════════════════════════ */
function AwardsStrip({ isMobile }: { isMobile: boolean }) {
  const awards = [
    { year: "2024", title: "Kerala Architecture Award", cat: "Residential" },
    { year: "2024", title: "Malabar Design Prize", cat: "Shortlisted" },
    { year: "2023", title: "South India Architecture", cat: "Commercial" },
    { year: "2023", title: "JK Cement Architectural Award", cat: "Cultural" },
  ];

  return (
    <section style={{ padding: isMobile ? "72px 20px" : "100px 40px", borderTop: "1px solid #EBEBEB" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", flexDirection: isMobile ? "column" : "row", gap: "12px", marginBottom: "48px" }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(1.8rem, 5vw, 3rem)", letterSpacing: "-0.04em" }}>Recognition</h2>
        <span className="u-label">AWARDS & PRESS</span>
      </div>
      {awards.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", borderTop: "1px solid #EBEBEB" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "20px" : "48px" }}>
            <span className="u-label" style={{ width: "36px", flexShrink: 0 }}>{a.year}</span>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: isMobile ? "0.95rem" : "1.1rem", letterSpacing: "-0.02em" }}>{a.title}</span>
          </div>
          {!isMobile && <span className="u-label">{a.cat}</span>}
        </motion.div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════
   CREDO (dark section)
═══════════════════════════════════════════ */
function Credo({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? "72px 20px" : "120px 40px", background: "#0c0c0c" }}>
      <motion.p
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "clamp(1.5rem, 4vw, 3.2rem)", letterSpacing: "-0.04em", lineHeight: 1.2, color: "#fff", maxWidth: "860px" }}
      >
        "We are architects of the Kerala coast — designing not for the moment, but for the monsoon, the light, and the centuries."
      </motion.p>
      <div style={{ marginTop: "48px", display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.3)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em" }}>
          AR. VISHAL SHARMA — FOUNDING PRINCIPAL
        </span>
      </div>
      <div style={{ marginTop: "60px" }}>
        <Link href="/studio" style={{
          display: "inline-flex", alignItems: "center", gap: "14px",
          fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em",
          color: "#fff", padding: "14px 28px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          THE STUDIO PROFILE
          <svg width="18" height="7" viewBox="0 0 20 8" fill="none"><path d="M0 4H18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
function Footer({ isMobile }: { isMobile: boolean }) {
  return (
    <footer id="contact" style={{ padding: isMobile ? "72px 20px 48px" : "100px 40px 60px", borderTop: "1px solid #EBEBEB" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? "48px" : "60px", marginBottom: "80px" }}>
        <div>
          <p className="u-label" style={{ marginBottom: "20px" }}>STUDIO</p>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1rem", lineHeight: 1.65 }}>
            S.M. Street<br />Kozhikode — 673001<br />Kerala, India
          </p>
        </div>
        <div>
          <p className="u-label" style={{ marginBottom: "20px" }}>CONTACT</p>
          <a href="mailto:hello@kalaakars.in" style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", display: "block", marginBottom: "8px" }}>hello@kalaakars.in</a>
          <a href="tel:+914952700000" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#666", letterSpacing: "0.05em" }}>+91 495 270 0000</a>
        </div>
        <div>
          <p className="u-label" style={{ marginBottom: "20px" }}>SOCIAL</p>
          {["Instagram", "LinkedIn", "Behance"].map(s => (
            <a key={s} href="#" style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", display: "block", marginBottom: "8px" }}>{s}</a>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: "12px", paddingTop: "32px", borderTop: "1px solid #F0F0F0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.svg" alt="K" style={{ width: "18px", height: "22px", objectFit: "contain" }} />
          <span className="u-label">© 2024 KALAAKARS ARCHITECTURE STUDIO</span>
        </div>
        <span className="u-label">CALICUT · KERALA · INDIA</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE COMPONENT
═══════════════════════════════════════════ */
export default function HomePage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = useIsMobile();
  const active = PROJECTS[activeIdx];

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const tickerItems = [
    "GRAND RIDGE DRIVE · CALICUT",
    "VOID ATRIUM · KOZHIKODE",
    "MALABAR HOUSE · CALICUT",
    "KOCHI WATERFRONT · KOCHI",
    "AWARD-WINNING ARCHITECTURE",
    "DESIGN DRIVEN STUDIO",
    "EST. 2019 · KERALA",
  ];

  return (
    <>
      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />

      <div style={{ background: "#fff" }}>

        {/* ══════════════════════════════════════
            HERO — Split-screen (desktop) / Stacked (mobile)
        ══════════════════════════════════════ */}
        {isMobile ? (
          /* ── PREMIUM MOBILE LAYOUT ── */
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a" }}>

            {/* Mobile: Full-bleed hero — tall, cinematic */}
            <div style={{ position: "relative", height: "78vh", flexShrink: 0, overflow: "hidden" }}>
              {/* BG crossfade */}
              <AnimatePresence mode="sync">
                <motion.div
                  key={active.heroImg}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0, backgroundImage: `url(${active.heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
              </AnimatePresence>

              {/* Deep gradient — dark bottom for text legibility */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.35) 100%)" }} />

              {/* ── TOP BAR ── */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 20 }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</span>
                </Link>
                {/* Hamburger */}
                <button
                  onClick={() => setNavOpen(true)}
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50px", cursor: "pointer", padding: "9px 14px", display: "flex", flexDirection: "column", gap: "4px" }}
                >
                  <div style={{ width: "18px", height: "1.5px", background: "#fff" }} />
                  <div style={{ width: "14px", height: "1.5px", background: "rgba(255,255,255,0.6)" }} />
                </button>
              </div>

              {/* ── BOTTOM CONTENT BLOCK ── */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 22px 28px", zIndex: 10 }}>
                {/* Category pill */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx + "-cat"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "5px 12px", marginBottom: "14px" }}
                  >
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#D4A520" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.9)", letterSpacing: "0.15em" }}>{active.category} · {active.year}</span>
                  </motion.div>
                </AnimatePresence>

                {/* Big studio name */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx + "-name"}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(3rem, 14vw, 5.5rem)", letterSpacing: "-0.05em", lineHeight: 0.85, color: "#fff", textTransform: "uppercase" }}>
                      KALAAKARS
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 200, fontSize: "clamp(0.75rem, 3.5vw, 1rem)", letterSpacing: "0.42em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginTop: "8px" }}>
                      ARCHITECTURE
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* ── CTA PILLS — directly on image ── */}
                <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
                  <Link href="/studio" style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "13px 16px",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(12px)",
                    color: "#111",
                    fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600,
                    letterSpacing: "0.02em",
                    borderRadius: "6px",
                    gap: "6px",
                  }}>
                    Studio Profile
                  </Link>
                  <Link href="/studio#contact" style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "13px 16px",
                    background: "rgba(20,20,20,0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                    fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
                    letterSpacing: "0.02em",
                    borderRadius: "6px",
                  }}>
                    Free Consultation
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile: Project list — premium dark style */}
            <div style={{ flex: 1, background: "#0a0a0a" }}>

              {/* Section header */}
              <div style={{ padding: "22px 22px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.22em" }}>SELECTED WORKS — {PROJECTS.length} PROJECTS</p>
              </div>

              {/* Project rows */}
              <nav>
                {PROJECTS.map((p, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <motion.div
                      key={p.id}
                      onClick={() => setActiveIdx(i)}
                      whileTap={{ scale: 0.985 }}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "16px 22px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        borderLeft: isActive ? "3px solid #D4A520" : "3px solid transparent",
                        cursor: "pointer",
                        background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                        transition: "background 0.2s, border-color 0.2s",
                        gap: "14px",
                      }}
                    >
                      {/* Left: number + title + location */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: isActive ? "#D4A520" : "rgba(255,255,255,0.25)", marginBottom: "5px", letterSpacing: "0.12em", transition: "color 0.25s" }}>{p.num}</p>
                        <Link
                          href={`/projects/${p.slug}`}
                          style={{
                            fontFamily: "var(--font-sans)", fontWeight: 400,
                            fontSize: "1.2rem", letterSpacing: "-0.03em",
                            color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                            display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            transition: "color 0.3s",
                          }}
                        >
                          {p.title.split(" ").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                        </Link>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.25)", marginTop: "4px", letterSpacing: "0.1em" }}>{p.location} · {p.year}</p>
                      </div>
                      {/* Right: thumbnail */}
                      <div style={{ width: "60px", height: "60px", borderRadius: "4px", overflow: "hidden", flexShrink: 0, opacity: isActive ? 1 : 0.45, transition: "opacity 0.3s" }}>
                        <motion.img
                          src={p.heroImg}
                          alt={p.title}
                          animate={{ scale: isActive ? 1 : 1.05 }}
                          transition={{ duration: 0.5 }}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Browse all link */}
              <div style={{ padding: "24px 22px" }}>
                <Link href="/index" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", display: "inline-flex", alignItems: "center", gap: "10px" }}>
                  VIEW ALL PROJECTS
                  <svg width="16" height="6" viewBox="0 0 20 8" fill="none"><path d="M0 4H18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
                </Link>
              </div>
            </div>
          </div>

        ) : (
          /* ── DESKTOP: Original Split-Screen ── */
          <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {/* LEFT PANEL */}
            <aside style={{ width: "320px", minWidth: "260px", maxWidth: "340px", flexShrink: 0, background: "#fff", display: "flex", flexDirection: "column", overflowY: "auto", zIndex: 10 }}>
              <div style={{ padding: "28px 32px 0" }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <img src="/logo.svg" alt="K" style={{ width: "24px", height: "28px", objectFit: "contain" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: "#111", textTransform: "uppercase" }}>Kalaakars</span>
                </Link>
              </div>
              <nav style={{ flex: 1, paddingTop: "60px" }}>
                {PROJECTS.map((p, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <div key={p.id} onMouseEnter={() => setActiveIdx(i)} onClick={() => setActiveIdx(i)} style={{ padding: "22px 32px", cursor: "pointer", borderLeft: isActive ? "2px solid #111" : "2px solid transparent", transition: "border-color 0.3s" }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: isActive ? "#111" : "#bbb", marginBottom: "6px", transition: "color 0.3s" }}>{p.num}</p>
                      <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none" }}>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(1.3rem, 2vw, 1.7rem)", letterSpacing: "-0.03em", color: isActive ? "#111" : "#888", lineHeight: 1.15, transition: "color 0.35s" }}>
                          {p.title.split(" ").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </nav>
              <div style={{ padding: "24px 32px" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#ccc" }}>CALICUT · KERALA</p>
              </div>
            </aside>

            {/* RIGHT PANEL */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={active.heroImg}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.65 }}
                  style={{ position: "absolute", inset: 0, backgroundImage: `url(${active.heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
              </AnimatePresence>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.45))" }} />

              {/* Top-right: CTAs + Hamburger */}
              <div style={{ position: "absolute", top: "28px", right: "28px", display: "flex", alignItems: "center", gap: "12px", zIndex: 20 }}>
                <Link href="/studio" style={{ padding: "10px 18px", background: "rgba(20,20,20,0.75)", backdropFilter: "blur(8px)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, borderRadius: "4px", border: "1px solid rgba(255,255,255,0.15)", whiteSpace: "nowrap" as const }}>Studio Profile</Link>
                <Link href="/studio#contact" style={{ padding: "10px 18px", background: "rgba(20,20,20,0.75)", backdropFilter: "blur(8px)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, borderRadius: "4px", border: "1px solid rgba(255,255,255,0.15)", whiteSpace: "nowrap" as const }}>Free Consultation</Link>
                <button onClick={() => setNavOpen(true)} style={{ background: "rgba(20,20,20,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", cursor: "pointer", padding: "10px 12px", display: "flex", flexDirection: "column", gap: "5px" }}>
                  <div style={{ width: "20px", height: "2px", background: "#fff" }} />
                  <div style={{ width: "20px", height: "2px", background: "#fff" }} />
                  <div style={{ width: "14px", height: "2px", background: "#fff" }} />
                </button>
              </div>

              {/* Studio name overlay */}
              <div style={{ position: "absolute", bottom: "80px", right: "0", left: "0", display: "flex", flexDirection: "column", alignItems: "flex-end", paddingRight: "32px", zIndex: 10, pointerEvents: "none" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(4rem, 10vw, 9rem)", letterSpacing: "-0.04em", lineHeight: 0.85, color: "#fff", textTransform: "uppercase" }}>KALAAKARS</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "clamp(1rem, 3vw, 2.4rem)", letterSpacing: "0.35em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase", marginTop: "6px" }}>ARCHITECTURE</div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom-left badge */}
              <div style={{ position: "absolute", bottom: "28px", left: "28px", zIndex: 20, display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}>
                  <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>kalaakars</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}>ARCHITECTURE STUDIO</p>
                </div>
              </div>

              {/* Bottom-right tagline */}
              <div style={{ position: "absolute", bottom: "32px", right: "32px", zIndex: 20, display: "flex", alignItems: "center", gap: "16px" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>DESIGN DRIVEN STUDIO</p>
                <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.6)" }} />
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>{active.location}</p>
              </div>

              {/* Top-left project info */}
              <div style={{ position: "absolute", top: "32px", left: "32px", zIndex: 20 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>{active.category} · {active.year}</p>
                    <Link href={`/projects/${active.slug}`} style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.9rem", color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: "2px" }}>View Project →</Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* ── MARQUEE ── */}
        <Marquee items={tickerItems} />

        {/* ── AWARDS ── */}
        <AwardsStrip isMobile={isMobile} />

        {/* ── CREDO ── */}
        <Credo isMobile={isMobile} />

        {/* ── FOOTER ── */}
        <Footer isMobile={isMobile} />
      </div>
    </>
  );
}
