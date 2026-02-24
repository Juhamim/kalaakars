"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

function Navbar() {
    return (
        <header style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 9000, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderBottom: "1px solid #EBEBEB" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: "#111", textTransform: "uppercase" as const }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "28px" }}>
                {[["PROJECTS", "/"], ["STUDIO", "/studio"], ["INDEX", "/index"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#999" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

export default function IndexPage() {
    const [hovered, setHovered] = useState<string | null>(null);
    const isMobile = useIsMobile();

    return (
        <main style={{ background: "#fff" }}>
            <Navbar />

            <section style={{ padding: isMobile ? "48px 0 80px" : "80px 0 100px" }}>
                <div style={{ padding: isMobile ? "0 20px 48px" : "0 40px 64px" }}>
                    <p className="u-label" style={{ marginBottom: "16px" }}>All Projects</p>
                    <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(2.2rem, 8vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.92 }}>
                        Project Index
                    </h1>
                </div>

                {/* Table header — hidden on mobile */}
                {!isMobile && (
                    <div style={{ display: "grid", gridTemplateColumns: "72px 1fr 180px 160px 80px", padding: "12px 40px", borderTop: "1px solid #111", borderBottom: "1px solid #EBEBEB" }}>
                        {["No.", "Project", "Location", "Type", "Year"].map(h => (
                            <span key={h} className="u-label">{h}</span>
                        ))}
                    </div>
                )}

                {/* Row per project */}
                {PROJECTS.map((p) => (
                    <Link key={p.id} href={`/projects/${p.slug}`} style={{ display: "block" }}>
                        <motion.div
                            onMouseEnter={() => setHovered(p.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: isMobile ? "flex" : "grid",
                                gridTemplateColumns: isMobile ? undefined : "72px 1fr 180px 160px 80px",
                                flexDirection: isMobile ? "column" as const : undefined,
                                padding: isMobile ? "20px 20px" : "26px 40px",
                                borderBottom: "1px solid #EBEBEB",
                                borderLeft: isMobile ? `3px solid ${hovered === p.id ? "#111" : "transparent"}` : undefined,
                                background: hovered === p.id ? "#FAFAFA" : "transparent",
                                alignItems: "center",
                                transition: "background 0.2s",
                                cursor: "pointer",
                                gap: isMobile ? "6px" : undefined,
                            }}
                        >
                            {!isMobile && <span className="u-label" style={{ color: "#CCC" }}>{p.num}</span>}
                            <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                                {isMobile && <span className="u-label" style={{ color: "#CCC", flexShrink: 0 }}>{p.num}</span>}
                                <span style={{
                                    fontFamily: "var(--font-sans)", fontWeight: 400,
                                    fontSize: isMobile ? "1.2rem" : "1.4rem",
                                    letterSpacing: "-0.02em",
                                    transform: hovered === p.id ? "translateX(6px)" : "none",
                                    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)"
                                }}>
                                    {p.title.split(" ").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                                </span>
                            </div>
                            {isMobile ? (
                                <span className="u-label" style={{ paddingLeft: "36px" }}>{p.location} · {p.year}</span>
                            ) : (
                                <>
                                    <span className="u-label">{p.location}</span>
                                    <span className="u-label">{p.category}</span>
                                    <span className="u-label">{p.year}</span>
                                </>
                            )}
                        </motion.div>
                    </Link>
                ))}
            </section>

            <footer style={{ padding: "40px 24px", borderTop: "1px solid #EBEBEB", display: "flex", flexDirection: isMobile ? "column" : "row", gap: "8px", justifyContent: "space-between" }}>
                <span className="u-label">© 2024 Kalaakars Architecture Studio</span>
                <span className="u-label">Calicut (Kozhikode), Kerala</span>
            </footer>
        </main>
    );
}
