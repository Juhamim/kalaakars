"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

function Navbar({ dark = false }: { dark?: boolean }) {
    const c = dark ? "#fff" : "#111";
    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: dark ? "brightness(0) invert(1)" : "none" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: c, textTransform: "uppercase" as const }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "28px" }}>
                {[["PROJECTS", "/"], ["STUDIO", "/studio"], ["INDEX", "/index"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: dark ? "rgba(255,255,255,0.7)" : "#999" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

export default function StudioPage() {
    const isMobile = useIsMobile();
    const pad = isMobile ? "72px 20px" : "140px 40px";
    const padS = isMobile ? "60px 20px" : "120px 40px";

    return (
        <main style={{ background: "#fff" }}>
            {/* Hero */}
            <section style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
                <Navbar dark />
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2400&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)" }} />
                <div style={{ position: "absolute", bottom: isMobile ? "40px" : "60px", left: isMobile ? "20px" : "40px", color: "#fff" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", opacity: 0.7, marginBottom: "14px" }}>
                        Calicut (Kozhikode), Kerala — Est. 2019
                    </p>
                    <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(2.5rem, 10vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
                        KALAAKARS<br />ARCHITECTURE
                    </h1>
                </div>
            </section>

            {/* Manifesto */}
            <section style={{ padding: pad, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? "32px" : "100px", borderBottom: "1px solid #EBEBEB" }}>
                <div>
                    <p className="u-label" style={{ marginBottom: "20px" }}>Our Practice</p>
                </div>
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: isMobile ? "1.4rem" : "1.8rem", lineHeight: 1.45, letterSpacing: "-0.03em", color: "#222" }}
                    >
                        Kalaakars is a Calicut-based studio working at the intersection of Kerala's spatial traditions and contemporary structural innovation.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.7, color: "#555", marginTop: "32px", maxWidth: "560px" }}
                    >
                        From the nalukettu courtyards of the Malabar coast to the high-altitude tea estates of Wayanad, our work is shaped by Kerala's monsoon landscape, materiality, and light.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.7, color: "#555", marginTop: "20px", maxWidth: "560px" }}
                    >
                        We are based on S.M. Street, Kozhikode — the historic trading heart of the Malabar coast.
                    </motion.p>
                </div>
            </section>

            {/* Studio image */}
            <div style={{ height: isMobile ? "60vw" : "80vh", overflow: "hidden" }}>
                <motion.img
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop"
                    alt="Studio"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(80%)" }}
                />
            </div>

            {/* Team */}
            <section style={{ padding: padS, borderTop: "1px solid #EBEBEB" }}>
                <p className="u-label" style={{ marginBottom: isMobile ? "40px" : "72px" }}>The Team</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: isMobile ? "24px" : "60px" }}>
                    {[
                        { name: "Ar. Vishal Sharma", role: "Founding Principal", img: "https://images.unsplash.com/photo-1521117184087-a3c3f8ebf6e0?q=80&w=800" },
                        { name: "Ar. Ayaan Kapoor", role: "Design Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800" },
                        { name: "Ar. Priya Mehta", role: "Project Architect", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800" },
                    ].map(m => (
                        <div key={m.name}>
                            <div style={{ height: isMobile ? "200px" : "360px", overflow: "hidden", marginBottom: isMobile ? "14px" : "22px" }}>
                                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
                            </div>
                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: isMobile ? "0.85rem" : "1rem" }}>{m.name}</p>
                            <p className="u-label" style={{ marginTop: "5px" }}>{m.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: padS, borderTop: "1px solid #EBEBEB", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? "24px" : "40px" }}>
                {[
                    { num: "22+", label: "Projects Completed" },
                    { num: "2", label: "States" },
                    { num: "14", label: "Awards Won" },
                    { num: "2019", label: "Established" },
                ].map(s => (
                    <div key={s.label} style={{ borderTop: "1px solid #EBEBEB", paddingTop: "16px" }}>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: isMobile ? "2rem" : "2.8rem", letterSpacing: "-0.04em" }}>{s.num}</p>
                        <p className="u-label" style={{ marginTop: "6px" }}>{s.label}</p>
                    </div>
                ))}
            </section>

            {/* Footer */}
            <footer id="contact" style={{ padding: isMobile ? "60px 20px 40px" : "80px 40px 60px", borderTop: "1px solid #EBEBEB" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "40px", marginBottom: "60px" }}>
                    <div>
                        <p className="u-label" style={{ marginBottom: "18px" }}>Contact</p>
                        <a href="mailto:hello@kalaakars.in" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.3rem", letterSpacing: "-0.02em", display: "block", marginBottom: "10px" }}>hello@kalaakars.in</a>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999", letterSpacing: "0.08em", lineHeight: 1.7 }}>
                            S.M. Street, Kozhikode — 673001<br />Kerala, India
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "32px", alignItems: "flex-end" }}>
                        {["Instagram", "LinkedIn", "Behance"].map(s => (
                            <a key={s} href="#" className="u-mono" style={{ color: "#999" }}>{s}</a>
                        ))}
                    </div>
                </div>
                <div style={{ paddingTop: "28px", borderTop: "1px solid #F0F0F0", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: "8px" }}>
                    <span className="u-label">© 2024 Kalaakars Architecture Studio</span>
                    <span className="u-label">Calicut (Kozhikode), Kerala</span>
                </div>
            </footer>
        </main>
    );
}
