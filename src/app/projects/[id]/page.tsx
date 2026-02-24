"use client";
import React, { useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PROJECTS } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* ===== NAVBAR ===== */
function Navbar({ dark = false }: { dark?: boolean }) {
    const c = "#fff";
    return (
        <header style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
            padding: "28px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "28px", height: "28px", filter: "brightness(0) invert(1)" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.15em", color: c, textTransform: "uppercase" }}>
                    Kalaakars
                </span>
            </Link>
            <nav style={{ display: "flex", gap: "36px" }}>
                {[["PROJECTS", "/"], ["STUDIO", "/studio"], ["INDEX", "/index"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: c, opacity: 0.7 }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

/* ===== FOOTER ===== */
function Footer() {
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
            <div style={{ marginTop: "60px", paddingTop: "30px", borderTop: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between" }}>
                <span className="u-label">© 2024 Kalaakars Architecture Studio</span>
                <span className="u-label">Mumbai, India</span>
            </div>
        </footer>
    );
}

/* ===== PROJECT DETAIL PAGE ===== */
export default function ProjectPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const project = PROJECTS.find(p => p.slug === id);
    const projectIdx = PROJECTS.findIndex(p => p.slug === id);
    const nextProject = PROJECTS[(projectIdx + 1) % PROJECTS.length];

    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 900], [0, 280]);
    const heroOpacity = useTransform(scrollY, [0, 700], [1, 0.2]);

    if (!project) return <div style={{ padding: "200px 40px" }}>Project not found.</div>;

    return (
        <main style={{ background: "#fff" }}>
            {/* 1. FULL-SCREEN HERO */}
            <section ref={heroRef} style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
                <Navbar dark />
                <motion.div
                    style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url(${project.heroImg})`,
                        backgroundSize: "cover", backgroundPosition: "center",
                        y: heroY, opacity: heroOpacity,
                        willChange: "transform",
                    }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: "60px", left: "40px", right: "40px", color: "#fff" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", opacity: 0.7, marginBottom: "16px" }}>
                        {project.category} — {project.location} — {project.year}
                    </p>
                    <h1 style={{
                        fontFamily: "var(--font-sans)", fontWeight: 400,
                        fontSize: "clamp(3rem, 8vw, 7rem)",
                        letterSpacing: "-0.04em", lineHeight: 0.88,
                    }}>
                        {project.title}
                    </h1>
                </div>
            </section>

            {/* 2. INTRO TEXT */}
            <section style={{ padding: "120px 40px", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "80px", borderBottom: "1px solid #EBEBEB" }}>
                <div>
                    <Reveal>
                        <p className="u-label" style={{ marginBottom: "28px" }}>The Concept</p>
                        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "#111" }}>
                            {project.subtitle}
                        </h2>
                    </Reveal>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <Reveal delay={0.15}>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.25rem", lineHeight: 1.65, color: "#444" }}>
                            {project.story}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* 3. GALLERY */}
            <section style={{ padding: "0" }}>
                {(() => {
                    const rows: React.ReactNode[] = [];
                    let i = 0;
                    while (i < project.gallery.length) {
                        const img = project.gallery[i];
                        if (img.span === "full") {
                            rows.push(
                                <GalleryImg key={i} src={img.src} height="90vh" />
                            );
                            i++;
                        } else {
                            // pair halves
                            const next = project.gallery[i + 1];
                            rows.push(
                                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                                    <GalleryImg src={img.src} height="80vh" />
                                    {next ? <GalleryImg src={next.src} height="80vh" /> : <div />}
                                </div>
                            );
                            i += 2;
                        }
                    }
                    return rows;
                })()}
            </section>

            {/* 4. PULL QUOTE */}
            {project.pullQuote && (
                <section style={{ padding: "120px 40px", borderTop: "1px solid #EBEBEB" }}>
                    <Reveal>
                        <blockquote style={{
                            fontFamily: "var(--font-sans)", fontWeight: 300,
                            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                            letterSpacing: "-0.04em", lineHeight: 1.15,
                            color: "#111", maxWidth: "900px"
                        }}>
                            "{project.pullQuote}"
                        </blockquote>
                    </Reveal>
                </section>
            )}

            {/* 5. TECHNICAL SPECS */}
            <section style={{ padding: "80px 40px 120px", borderTop: "1px solid #EBEBEB" }}>
                <p className="u-label" style={{ marginBottom: "60px" }}>Technical Specifications</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px 60px" }}>
                    {project.specs.map((spec) => (
                        <div key={spec.label} style={{ borderTop: "1px solid #EBEBEB", paddingTop: "20px" }}>
                            <p className="u-label" style={{ marginBottom: "10px" }}>{spec.label}</p>
                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1rem", color: "#111" }}>{spec.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. NEXT PROJECT PORTAL */}
            <section
                onClick={() => router.push(`/projects/${nextProject.slug}`)}
                style={{ position: "relative", height: "85vh", cursor: "pointer", overflow: "hidden" }}
            >
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url(${nextProject.heroImg})`,
                        backgroundSize: "cover", backgroundPosition: "center",
                    }}
                />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(0,0,0,0.42)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    color: "#fff"
                }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.3em", marginBottom: "24px", opacity: 0.7 }}>NEXT PROJECT</p>
                    <h2 style={{
                        fontFamily: "var(--font-sans)", fontWeight: 400,
                        fontSize: "clamp(2.4rem, 7vw, 6rem)",
                        letterSpacing: "-0.04em",
                    }}>
                        {nextProject.title}
                    </h2>
                </div>
            </section>

            <Footer />
        </main>
    );
}

/* ===== HELPERS ===== */
function GalleryImg({ src, height }: { src: string; height: string }) {
    return (
        <div style={{ height, overflow: "hidden" }}>
            <motion.img
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                src={src}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        </div>
    );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}
