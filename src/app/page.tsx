"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

/* ==============================
   NAVBAR
============================== */
function Navbar({ dark = false }: { dark?: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > lastY && y > 120);
    setLastY(y);
  });

  const c = dark ? "#fff" : "#111";

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
        padding: "28px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        pointerEvents: "auto",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="/logo.svg" alt="K" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.15em", color: c, textTransform: "uppercase" }}>
          Kalaakars
        </span>
      </Link>

      <nav style={{ display: "flex", gap: "36px", alignItems: "center" }}>
        {[["PROJECTS", "/#projects"], ["STUDIO", "/studio"], ["INDEX", "/index"]].map(([label, href]) => (
          <Link key={label} href={href} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: c, opacity: 0.7 }}>
            {label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}

/* ==============================
   HERO — Metrica: vertical project list with bg reveal
============================== */
function HeroProjectList() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* BG Images */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <AnimatePresence mode="sync">
          {activeIdx !== null && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${PROJECTS[activeIdx].heroImg})`,
                backgroundSize: "cover", backgroundPosition: "center",
              }}
            />
          )}
        </AnimatePresence>
        {/* Always visible dim overlay when hovered */}
        <div style={{
          position: "absolute", inset: 0,
          background: activeIdx !== null ? "rgba(0,0,0,0.35)" : "transparent",
          transition: "background 0.7s"
        }} />
      </div>

      {/* Project rows */}
      <div style={{ position: "relative", zIndex: 10, paddingTop: "140px" }}>
        {PROJECTS.map((p, i) => {
          const isHovered = activeIdx === i;
          const isDimmed = activeIdx !== null && !isHovered;
          return (
            <Link key={p.id} href={`/projects/${p.slug}`}>
              <motion.div
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "36px 40px",
                  borderBottom: activeIdx !== null ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(17,17,17,0.08)",
                  cursor: "pointer",
                  color: activeIdx !== null ? "#fff" : "#111",
                  opacity: isDimmed ? 0.35 : 1,
                  transition: "opacity 0.4s, color 0.4s",
                }}
              >
                <div style={{ display: "flex", gap: "40px", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", opacity: 0.5 }}>{p.num}</span>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(2.4rem, 5vw, 5rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                      lineHeight: 0.9,
                      transform: isHovered ? "translateX(16px)" : "translateX(0)",
                      transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                      {p.title}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                      letterSpacing: "0.18em", opacity: 0.5, marginTop: "6px",
                      opacity: isHovered ? 0.7 : 0.4, transition: "opacity 0.4s"
                    }}>
                      {p.subtitle}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", opacity: 0.5 }}>{p.location}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", opacity: 0.4, marginTop: "3px" }}>{p.year}</div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ==============================
   STUDIO INTRO
============================== */
function StudioIntro() {
  return (
    <section style={{ padding: "160px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
      <div>
        <p className="u-label" style={{ marginBottom: "40px" }}>The Practice</p>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
          We believe in the<br />architecture of restraint.
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.15rem", lineHeight: 1.7, color: "#444", maxWidth: "520px" }}>
          Kalaakars is a Mumbai-based studio working at the intersection of material honesty and structural innovation. We design residences, cultural buildings, and landscapes for clients who understand that less, done precisely, is more.
        </p>
        <Link href="/studio" style={{ marginTop: "48px", display: "inline-flex", alignItems: "center", gap: "12px", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#111" }}>
          <span>STUDIO PROFILE</span>
          <svg width="20" height="8" viewBox="0 0 20 8" fill="none"><path d="M0 4H18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
        </Link>
      </div>
    </section>
  );
}

/* ==============================
   FOOTER
============================== */
function HomeFooter() {
  return (
    <footer style={{ padding: "80px 40px 60px", borderTop: "1px solid #EBEBEB" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p className="u-label" style={{ marginBottom: "20px" }}>Contact</p>
          <a href="mailto:hello@kalaakars.in" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.4rem", letterSpacing: "-0.02em" }}>
            hello@kalaakars.in
          </a>
        </div>
        <div style={{ display: "flex", gap: "40px" }}>
          {["Instagram", "LinkedIn", "Behance"].map(s => (
            <a key={s} href="#" className="u-mono" style={{ color: "#999" }}>{s}</a>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "80px", paddingTop: "30px", borderTop: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="u-label">© 2024 Kalaakars Architecture Studio</span>
        <span className="u-label">Mumbai, India</span>
      </div>
    </footer>
  );
}

/* ==============================
   HOME PAGE
============================== */
export default function HomePage() {
  return (
    <main style={{ background: "#fff" }}>
      <Navbar />
      <HeroProjectList />
      <StudioIntro />
      <HomeFooter />
    </main>
  );
}
