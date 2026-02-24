"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Navbar() {
    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/logo.svg" alt="Kalaakars" style={{ width: "28px", height: "32px", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.15em", color: "#fff", textTransform: "uppercase" as const }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "36px" }}>
                {[["PROJECTS", "/"], ["STUDIO", "/studio"], ["INDEX", "/index"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#fff", opacity: 0.7 }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

function NavbarLight() {
    return (
        <header style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 9000, padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderBottom: "1px solid #EBEBEB" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/logo.svg" alt="Kalaakars" style={{ width: "28px", height: "32px", objectFit: "contain" }} />
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

export default function StudioPage() {
    return (
        <main style={{ background: "#fff" }}>
            {/* Hero */}
            <section style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
                <Navbar />
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2400&auto=format&fit=crop')",
                    backgroundSize: "cover", backgroundPosition: "center"
                }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)" }} />
                <div style={{ position: "absolute", bottom: "60px", left: "40px", color: "#fff" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", opacity: 0.7, marginBottom: "16px" }}>
                        Calicut (Kozhikode), Kerala — Est. 2019
                    </p>
                    <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 0.88 }}>
                        KALAAKARS<br />ARCHITECTURE
                    </h1>
                </div>
            </section>

            {/* Manifesto */}
            <section style={{ padding: "140px 40px", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "100px", borderBottom: "1px solid #EBEBEB" }}>
                <div>
                    <p className="u-label" style={{ marginBottom: "24px" }}>Our Practice</p>
                </div>
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.8rem", lineHeight: 1.45, letterSpacing: "-0.03em", color: "#222" }}
                    >
                        Kalaakars is a Calicut-based studio working at the intersection of Kerala's spatial traditions and contemporary structural innovation.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.1rem", lineHeight: 1.7, color: "#555", marginTop: "40px", maxWidth: "580px" }}
                    >
                        From the nalukettu courtyards of the Malabar coast to the high-altitude tea estates of Wayanad, our work is shaped by Kerala.
                        We design homes, cultural buildings, and public spaces for clients who understand that restraint — practised with discipline — is the highest form of design intelligence.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.1rem", lineHeight: 1.7, color: "#555", marginTop: "24px", maxWidth: "580px" }}
                    >
                        We are based on S.M. Street, Kozhikode — the historic trading heart of the Malabar coast, where architecture has always been a conversation between sea, sky, and land.
                    </motion.p>
                </div>
            </section>

            {/* Studio Visual */}
            <section>
                <div style={{ height: "80vh", overflow: "hidden" }}>
                    <motion.img
                        initial={{ scale: 1.08 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop"
                        alt="Kalaakars Studio"
                        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(80%)" }}
                    />
                </div>
            </section>

            {/* Team */}
            <section style={{ padding: "120px 40px", borderTop: "1px solid #EBEBEB" }}>
                <p className="u-label" style={{ marginBottom: "80px" }}>The Team</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "60px" }}>
                    {[
                        { name: "Ar. Vishal Sharma", role: "Founding Principal", img: "https://images.unsplash.com/photo-1521117184087-a3c3f8ebf6e0?q=80&w=800" },
                        { name: "Ar. Ayaan Kapoor", role: "Design Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800" },
                        { name: "Ar. Priya Mehta", role: "Project Architect", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800" },
                    ].map((member) => (
                        <div key={member.name}>
                            <div style={{ height: "360px", overflow: "hidden", marginBottom: "24px" }}>
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src={member.img}
                                    alt={member.name}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                                />
                            </div>
                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "1rem" }}>{member.name}</p>
                            <p className="u-label" style={{ marginTop: "6px" }}>{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: "80px 40px 140px", borderTop: "1px solid #EBEBEB", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px" }}>
                {[
                    { num: "22+", label: "Projects Completed" },
                    { num: "2", label: "States" },
                    { num: "14", label: "Awards Won" },
                    { num: "2019", label: "Established" },
                ].map(stat => (
                    <div key={stat.label} style={{ borderTop: "1px solid #EBEBEB", paddingTop: "20px" }}>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "2.8rem", letterSpacing: "-0.04em" }}>{stat.num}</p>
                        <p className="u-label" style={{ marginTop: "8px" }}>{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* Footer */}
            <footer style={{ padding: "80px 40px 60px", borderTop: "1px solid #EBEBEB" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <p className="u-label" style={{ marginBottom: "20px" }}>Contact</p>
                        <a href="mailto:hello@kalaakars.in" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.4rem", letterSpacing: "-0.02em" }}>
                            hello@kalaakars.in
                        </a>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#999", marginTop: "14px", letterSpacing: "0.08em" }}>
                            S.M. Street, Kozhikode — 673001, Kerala, India
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "40px" }}>
                        {["Instagram", "LinkedIn", "Behance"].map(s => (
                            <a key={s} href="#" className="u-mono" style={{ color: "#999" }}>{s}</a>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: "60px", paddingTop: "30px", borderTop: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between" }}>
                    <span className="u-label">© 2024 Kalaakars Architecture Studio</span>
                    <span className="u-label">Calicut (Kozhikode), Kerala</span>
                </div>
            </footer>
        </main>
    );
}
