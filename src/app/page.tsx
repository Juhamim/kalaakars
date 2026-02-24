"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   METRICA EXACT REPLICA — Split-Screen Homepage
   LEFT: white project list  /  RIGHT: full-bleed image panel
───────────────────────────────────────────────────────── */

export default function HomePage() {
  // Index 0 is active by default (like Metrica: "Clyde Hill")
  const [activeIdx, setActiveIdx] = useState(0);

  const active = PROJECTS[activeIdx];

  return (
    <main style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#fff" }}>

      {/* ════════════════════════════════
          LEFT PANEL — Project List
      ════════════════════════════════ */}
      <aside style={{
        width: "320px",
        minWidth: "260px",
        maxWidth: "340px",
        flexShrink: 0,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        zIndex: 10,
      }}>
        {/* Logo top-left */}
        <div style={{ padding: "28px 32px 0" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
            <img src="/logo.svg" alt="K" style={{ width: "24px", height: "28px", objectFit: "contain" }} />
            <span style={{
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem",
              letterSpacing: "0.18em", color: "#111", textTransform: "uppercase",
            }}>
              Kalaakars
            </span>
          </Link>
        </div>

        {/* Project List */}
        <nav style={{ flex: 1, paddingTop: "60px" }}>
          {PROJECTS.map((p, i) => {
            const isActive = activeIdx === i;
            return (
              <div
                key={p.id}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                style={{
                  padding: "22px 32px",
                  cursor: "pointer",
                  borderLeft: isActive ? "2px solid #111" : "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
              >
                {/* Number */}
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: isActive ? "#111" : "#bbb",
                  marginBottom: "6px",
                  transition: "color 0.3s"
                }}>
                  {p.num}
                </p>
                {/* Project Name */}
                <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none" }}>
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                    letterSpacing: "-0.03em",
                    color: isActive ? "#111" : "#888",
                    lineHeight: 1.15,
                    transition: "color 0.35s"
                  }}>
                    {p.title.split(" ").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                  </p>
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Bottom label */}
        <div style={{ padding: "24px 32px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#ccc" }}>
            CALICUT · KERALA
          </p>
        </div>
      </aside>

      {/* ════════════════════════════════
          RIGHT PANEL — Full-bleed Image
      ════════════════════════════════ */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* Background images with crossfade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={active.heroImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${active.heroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)",
        }} />

        {/* ── TOP RIGHT: CTA Buttons + Hamburger ── */}
        <div style={{
          position: "absolute", top: "28px", right: "28px",
          display: "flex", alignItems: "center", gap: "12px", zIndex: 20
        }}>
          <Link href="/studio" style={{
            padding: "10px 18px",
            background: "rgba(20,20,20,0.75)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            borderRadius: "4px",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            whiteSpace: "nowrap" as const,
            transition: "background 0.25s"
          }}>
            Studio Profile
          </Link>
          <Link href="/#contact" style={{
            padding: "10px 18px",
            background: "rgba(20,20,20,0.75)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            borderRadius: "4px",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            whiteSpace: "nowrap" as const,
          }}>
            Free Consultation
          </Link>
          {/* Hamburger */}
          <div style={{ marginLeft: "4px", display: "flex", flexDirection: "column", gap: "5px", cursor: "pointer", padding: "10px" }}>
            <div style={{ width: "22px", height: "2px", background: "#fff" }} />
            <div style={{ width: "22px", height: "2px", background: "#fff" }} />
            <div style={{ width: "22px", height: "2px", background: "#fff" }} />
          </div>
        </div>

        {/* ── CENTER: Large Studio Name Overlay ── */}
        <div style={{
          position: "absolute",
          bottom: "80px",
          right: "0",
          left: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: "32px",
          zIndex: 10,
          pointerEvents: "none",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "right" }}
            >
              <div style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(4rem, 10vw, 9rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.85,
                color: "#fff",
                textTransform: "uppercase",
              }}>
                KALAAKARS
              </div>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "clamp(1rem, 3vw, 2.4rem)",
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.85)",
                textTransform: "uppercase",
                marginTop: "6px",
              }}>
                ARCHITECTURE
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── BOTTOM LEFT: Badge (Phius-style) ── */}
        <div style={{
          position: "absolute", bottom: "28px", left: "28px", zIndex: 20,
          display: "flex", alignItems: "center", gap: "12px"
        }}>
          {/* Circular badge */}
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(4px)",
          }}>
            <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>kalaakars</p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>ARCHITECTURE STUDIO</p>
          </div>
        </div>

        {/* ── BOTTOM RIGHT: Tagline ── */}
        <div style={{
          position: "absolute", bottom: "32px", right: "32px", zIndex: 20,
          display: "flex", alignItems: "center", gap: "16px"
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>
            DESIGN DRIVEN STUDIO
          </p>
          <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.6)" }} />
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
            {active.location}
          </p>
        </div>

        {/* ── Active project label top-left of image ── */}
        <div style={{
          position: "absolute", top: "32px", left: "32px", zIndex: 20
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
                {active.category} · {active.year}
              </p>
              <Link href={`/projects/${active.slug}`} style={{
                fontFamily: "var(--font-sans)", fontWeight: 400,
                fontSize: "0.9rem", color: "#fff",
                letterSpacing: "-0.01em", textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.4)",
                paddingBottom: "2px"
              }}>
                View Project →
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}
