"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════
   FULL-SCREEN NAVIGATION OVERLAY
═══════════════════════════════════════════════ */
function NavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navLinks = [
    { label: "Projects", href: "/#projects", num: "01" },
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
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "#0c0c0c",
            display: "flex", flexDirection: "column",
          }}
        >
          {/* Top bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "28px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.07)"
          }}>
            <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <img src="/logo.svg" alt="K" style={{ width: "24px", height: "28px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" }}>
                Kalaakars
              </span>
            </Link>
            {/* Close button */}
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "10px", display: "flex", flexDirection: "column", gap: "6px", transform: "rotate(0deg)" }}
            >
              {/* X mark */}
              <div style={{ width: "22px", height: "1.5px", background: "#fff", transform: "rotate(45deg) translateY(5px)" }} />
              <div style={{ width: "22px", height: "1.5px", background: "#fff", transform: "rotate(-45deg) translateY(-5px)" }} />
            </button>
          </div>

          {/* Main nav links */}
          <div style={{ flex: 1, display: "flex", padding: "60px 40px" }}>
            <div style={{ width: "100%", maxWidth: "900px" }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "28px", paddingBottom: "24px", marginBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex" }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{link.num}</span>
                    <span style={{
                      fontFamily: "var(--font-sans)", fontWeight: 400,
                      fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                      letterSpacing: "-0.04em", color: "#fff",
                      lineHeight: 1,
                      transition: "color 0.2s"
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#D4A520")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right column: contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ marginLeft: "auto", display: "flex", flexDirection: "column", justifyContent: "flex-end", minWidth: "280px" }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>GET IN TOUCH</p>
              <a href="mailto:hello@kalaakars.in" style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "#fff", textDecoration: "none", marginBottom: "8px" }}>
                hello@kalaakars.in
              </a>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginTop: "4px" }}>
                S.M. Street, Kozhikode — 673001<br />Kerala, India
              </p>
              <div style={{ display: "flex", gap: "24px", marginTop: "40px" }}>
                {["Instagram", "LinkedIn", "Behance"].map(s => (
                  <a key={s} href="#" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textDecoration: "none" }}>
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div style={{ padding: "20px 40px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em" }}>
              © 2024 KALAAKARS ARCHITECTURE STUDIO
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em" }}>
              CALICUT · KERALA
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════
   MARQUEE / SCROLLING TICKER
═══════════════════════════════════════════════ */
function Marquee({ items }: { items: string[] }) {
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid #EEE", borderBottom: "1px solid #EEE", padding: "18px 0", background: "#fff" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        style={{ display: "flex", gap: "0", whiteSpace: "nowrap" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#999", paddingRight: "80px" }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FEATURED AWARDS STRIP
═══════════════════════════════════════════════ */
function AwardsStrip() {
  const awards = [
    { year: "2024", title: "Kerala Architecture Award", cat: "Residential" },
    { year: "2024", title: "Malabar Design Prize", cat: "Shortlisted" },
    { year: "2023", title: "South India Architecture", cat: "Commercial" },
    { year: "2023", title: "JK Cement Architectural Award", cat: "Cultural" },
  ];

  return (
    <section style={{ padding: "100px 40px", background: "#fff", borderTop: "1px solid #EBEBEB" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px" }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.04em" }}>Recognition</h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999", letterSpacing: "0.15em" }}>AWARDS & PRESS</span>
      </div>
      {awards.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "28px 0", borderTop: "1px solid #EBEBEB",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999", width: "40px" }}>{a.year}</span>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>{a.title}</span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999", letterSpacing: "0.1em" }}>{a.cat}</span>
        </motion.div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════════
   STUDIO CREDO SECTION
═══════════════════════════════════════════════ */
function Credo() {
  return (
    <section style={{ padding: "120px 40px", background: "#0c0c0c" }}>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "var(--font-sans)", fontWeight: 300,
          fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
          letterSpacing: "-0.04em", lineHeight: 1.2,
          color: "#fff", maxWidth: "900px"
        }}
      >
        "We are architects of the Kerala coast — designing not for the moment, but for the monsoon, the light, and the centuries."
      </motion.p>
      <div style={{ marginTop: "60px", display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.3)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>
          AR. VISHAL SHARMA — FOUNDING PRINCIPAL
        </span>
      </div>
      <div style={{ marginTop: "80px" }}>
        <Link href="/studio" style={{
          display: "inline-flex", alignItems: "center", gap: "16px",
          fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em",
          color: "#fff", textDecoration: "none",
          padding: "16px 32px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          THE STUDIO PROFILE
          <svg width="20" height="8" viewBox="0 0 20 8" fill="none"><path d="M0 4H18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CONTACT FOOTER
═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer id="contact" style={{ padding: "100px 40px 60px", borderTop: "1px solid #EBEBEB", background: "#fff" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "60px", marginBottom: "100px" }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#AAA", marginBottom: "24px" }}>STUDIO</p>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.1rem", lineHeight: 1.6 }}>
            S.M. Street<br />Kozhikode — 673001<br />Kerala, India
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#AAA", marginBottom: "24px" }}>CONTACT</p>
          <a href="mailto:hello@kalaakars.in" style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", display: "block", marginBottom: "8px" }}>
            hello@kalaakars.in
          </a>
          <a href="tel:+914952700000" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666", letterSpacing: "0.05em" }}>
            +91 495 270 0000
          </a>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#AAA", marginBottom: "24px" }}>SOCIAL</p>
          {["Instagram", "LinkedIn", "Behance", "Archinect"].map(s => (
            <a key={s} href="#" style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", display: "block", marginBottom: "8px", color: "#111" }}>
              {s}
            </a>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "40px", borderTop: "1px solid #F0F0F0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/logo.svg" alt="K" style={{ width: "20px", height: "24px", objectFit: "contain" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#AAA" }}>© 2024 KALAAKARS ARCHITECTURE STUDIO</span>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#AAA" }}>CALICUT · KERALA · INDIA</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════ */
export default function HomePage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const active = PROJECTS[activeIdx];

  // Disable body scroll when nav is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const tickerItems = [
    "GRAND RIDGE DRIVE · CALICUT", "VOID ATRIUM · KOZHIKODE",
    "MALABAR HOUSE · CALICUT", "KOCHI WATERFRONT · KOCHI",
    "AWARD-WINNING ARCHITECTURE", "DESIGN DRIVEN STUDIO",
    "EST. 2019 · KERALA", "ARCHITECTURE OF RESTRAINT",
  ];

  return (
    <>
      {/* Full-screen nav overlay */}
      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />

      <div style={{ background: "#fff" }}>
        {/* ════════════════════════════════
            HERO: SPLIT-SCREEN (full-height)
        ════════════════════════════════ */}
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

          {/* LEFT PANEL */}
          <aside style={{
            width: "320px", minWidth: "260px", maxWidth: "340px",
            flexShrink: 0, background: "#fff",
            display: "flex", flexDirection: "column",
            overflowY: "auto", zIndex: 10,
          }}>
            {/* Logo */}
            <div style={{ padding: "28px 32px 0" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
                <img src="/logo.svg" alt="K" style={{ width: "24px", height: "28px", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: "#111", textTransform: "uppercase" }}>
                  Kalaakars
                </span>
              </Link>
            </div>

            {/* Project list */}
            <nav style={{ flex: 1, paddingTop: "60px" }}>
              {PROJECTS.map((p, i) => {
                const isActive = activeIdx === i;
                return (
                  <div
                    key={p.id}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => setActiveIdx(i)}
                    style={{
                      padding: "22px 32px", cursor: "pointer",
                      borderLeft: isActive ? "2px solid #111" : "2px solid transparent",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: isActive ? "#111" : "#bbb", marginBottom: "6px", transition: "color 0.3s" }}>
                      {p.num}
                    </p>
                    <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none" }}>
                      <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(1.3rem, 2vw, 1.7rem)", letterSpacing: "-0.03em", color: isActive ? "#111" : "#888", lineHeight: 1.15, transition: "color 0.35s" }}>
                        {p.title.split(" ").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Bottom */}
            <div style={{ padding: "24px 32px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#ccc" }}>CALICUT · KERALA</p>
            </div>
          </aside>

          {/* RIGHT PANEL */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {/* BG */}
            <AnimatePresence mode="sync">
              <motion.div
                key={active.heroImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65 }}
                style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${active.heroImg})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                }}
              />
            </AnimatePresence>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)" }} />

            {/* TOP RIGHT: CTAs + Hamburger */}
            <div style={{ position: "absolute", top: "28px", right: "28px", display: "flex", alignItems: "center", gap: "12px", zIndex: 20 }}>
              <Link href="/studio" style={{ padding: "10px 18px", background: "rgba(20,20,20,0.75)", backdropFilter: "blur(8px)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, borderRadius: "4px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", whiteSpace: "nowrap" as const }}>
                Studio Profile
              </Link>
              <Link href="/studio#contact" style={{ padding: "10px 18px", background: "rgba(20,20,20,0.75)", backdropFilter: "blur(8px)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, borderRadius: "4px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", whiteSpace: "nowrap" as const }}>
                Free Consultation
              </Link>
              {/* Hamburger button */}
              <button
                onClick={() => setNavOpen(true)}
                style={{ marginLeft: "4px", background: "rgba(20,20,20,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", cursor: "pointer", padding: "10px 12px", display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <div style={{ width: "20px", height: "2px", background: "#fff" }} />
                <div style={{ width: "20px", height: "2px", background: "#fff" }} />
                <div style={{ width: "14px", height: "2px", background: "#fff" }} />
              </button>
            </div>

            {/* BOTTOM-RIGHT: Studio Name */}
            <div style={{ position: "absolute", bottom: "80px", right: "0", left: "0", display: "flex", flexDirection: "column", alignItems: "flex-end", paddingRight: "32px", zIndex: 10, pointerEvents: "none" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: "right" }}
                >
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(4rem, 10vw, 9rem)", letterSpacing: "-0.04em", lineHeight: 0.85, color: "#fff", textTransform: "uppercase" }}>
                    KALAAKARS
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "clamp(1rem, 3vw, 2.4rem)", letterSpacing: "0.35em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase", marginTop: "6px" }}>
                    ARCHITECTURE
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* BOTTOM LEFT: Badge */}
            <div style={{ position: "absolute", bottom: "28px", left: "28px", zIndex: 20, display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}>
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>kalaakars</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}>ARCHITECTURE STUDIO</p>
              </div>
            </div>

            {/* BOTTOM RIGHT: Tagline */}
            <div style={{ position: "absolute", bottom: "32px", right: "32px", zIndex: 20, display: "flex", alignItems: "center", gap: "16px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>
                DESIGN DRIVEN STUDIO
              </p>
              <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.6)" }} />
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                {active.location}
              </p>
            </div>

            {/* TOP LEFT: Project info */}
            <div style={{ position: "absolute", top: "32px", left: "32px", zIndex: 20 }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
                    {active.category} · {active.year}
                  </p>
                  <Link href={`/projects/${active.slug}`} style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.9rem", color: "#fff", letterSpacing: "-0.01em", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: "2px" }}>
                    View Project →
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── MARQUEE TICKER ── */}
        <Marquee items={tickerItems} />

        {/* ── AWARDS STRIP ── */}
        <AwardsStrip />

        {/* ── CREDO (dark) ── */}
        <Credo />

        {/* ── FOOTER ── */}
        <Footer />
      </div>
    </>
  );
}
