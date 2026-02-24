"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { motion } from "framer-motion";

function Navbar() {
    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.15em", color: "#111", textTransform: "uppercase" as const }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "36px" }}>
                {[["PROJECTS", "/"], ["STUDIO", "/studio"], ["INDEX", "/index"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#999" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

export default function IndexPage() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <main style={{ background: "#fff" }}>
            <Navbar />

            <section style={{ paddingTop: "140px", paddingBottom: "100px" }}>
                <div style={{ padding: "0 40px", marginBottom: "80px" }}>
                    <p className="u-label" style={{ marginBottom: "20px" }}>All Projects</p>
                    <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
                        Project Index
                    </h1>
                </div>

                {/* Table header */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 200px 180px 120px",
                    padding: "14px 40px",
                    borderTop: "1px solid #111",
                    borderBottom: "1px solid #EBEBEB",
                }}>
                    {["No.", "Project", "Location", "Type", "Year"].map(h => (
                        <span key={h} className="u-label">{h}</span>
                    ))}
                </div>

                {/* Rows */}
                {PROJECTS.map((p, i) => (
                    <Link key={p.id} href={`/projects/${p.slug}`}>
                        <motion.div
                            onMouseEnter={() => setHovered(p.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "80px 1fr 200px 180px 120px",
                                padding: "28px 40px",
                                borderBottom: "1px solid #EBEBEB",
                                alignItems: "center",
                                background: hovered === p.id ? "#F9F9F9" : "transparent",
                                transition: "background 0.2s",
                                cursor: "pointer",
                            }}
                        >
                            <span className="u-mono" style={{ color: "#ccc" }}>{p.num}</span>
                            <span style={{
                                fontFamily: "var(--font-sans)", fontWeight: 400,
                                fontSize: "1.4rem", letterSpacing: "-0.02em",
                                transform: hovered === p.id ? "translateX(8px)" : "none",
                                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)"
                            }}>
                                {p.title}
                            </span>
                            <span className="u-label">{p.location}</span>
                            <span className="u-label">{p.category}</span>
                            <span className="u-label">{p.year}</span>
                        </motion.div>
                    </Link>
                ))}
            </section>

            <footer style={{ padding: "60px 40px", borderTop: "1px solid #EBEBEB", display: "flex", justifyContent: "space-between" }}>
                <span className="u-label">© 2024 Kalaakars Architecture Studio</span>
                <span className="u-label">Mumbai, India</span>
            </footer>
        </main>
    );
}
