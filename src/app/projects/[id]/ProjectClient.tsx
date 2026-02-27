"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/lib/useIsMobile";

function Navbar() {
    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", filter: "brightness(0) invert(1)", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" as const }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "24px" }}>
                {[["PROJECTS", "/"], ["STUDIO", "/studio"], ["INDEX", "/index"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

function Footer() {
    return (
        <footer style={{ padding: "60px 24px 40px", borderTop: "1px solid #EBEBEB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "12px" }}>
                <span className="u-label">© 2024 Kalaakars Architecture Studio</span>
                <div style={{ display: "flex", gap: "28px" }}>
                    {["Instagram", "LinkedIn"].map(s => (
                        <a key={s} href="#" className="u-mono" style={{ color: "#AAA" }}>{s}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function ProjectClient({ project, nextProject }: { project: any, nextProject: any }) {
    const router = useRouter();
    const isMobile = useIsMobile();

    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 900], [0, isMobile ? 120 : 280]);
    const heroOpacity = useTransform(scrollY, [0, 700], [1, 0.2]);

    if (!project) return <div style={{ padding: "200px 24px", fontFamily: "var(--font-sans)" }}>Project not found.</div>;

    const pad = isMobile ? "64px 20px" : "120px 40px";

    return (
        <main style={{ background: "#fff" }}>
            {/* 1. HERO */}
            <section ref={heroRef} style={{ height: isMobile ? "70vh" : "100vh", position: "relative", overflow: "hidden" }}>
                <Navbar />
                <motion.div
                    style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url(${project.heroImg})`,
                        backgroundSize: "cover", backgroundPosition: "center",
                        y: heroY, opacity: heroOpacity, willChange: "transform",
                    }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: isMobile ? "28px" : "52px", left: isMobile ? "20px" : "40px", right: isMobile ? "20px" : "40px", color: "#fff" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", opacity: 0.7, marginBottom: "12px" }}>
                        {project.category} — {project.location} — {project.year}
                    </p>
                    <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(2.2rem, 8vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
                        {project.title}
                    </h1>
                </div>
            </section>

            {/* 2. INTRO */}
            <section style={{ padding: pad, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr", gap: isMobile ? "32px" : "80px", borderBottom: "1px solid #EBEBEB" }}>
                <div>
                    <Reveal>
                        <p className="u-label" style={{ marginBottom: "20px" }}>The Concept</p>
                        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: isMobile ? "1.5rem" : "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
                            {project.subtitle}
                        </h2>
                    </Reveal>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <Reveal delay={0.12}>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: isMobile ? "1rem" : "1.2rem", lineHeight: 1.65, color: "#444" }}>
                            {project.story}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* 3. GALLERY */}
            <section>
                {(() => {
                    const rows: React.ReactNode[] = [];
                    let i = 0;
                    while (i < project.gallery.length) {
                        const img = project.gallery[i];
                        if (img.span === "full" || isMobile) {
                            rows.push(<GalleryImg key={i} src={img.src} height={isMobile ? "56vw" : "90vh"} />);
                            i++;
                        } else {
                            const next = project.gallery[i + 1];
                            rows.push(
                                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
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
                <section style={{ padding: pad, borderTop: "1px solid #EBEBEB" }}>
                    <Reveal>
                        <blockquote style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: isMobile ? "1.4rem" : "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.15, maxWidth: "860px" }}>
                            "{project.pullQuote}"
                        </blockquote>
                    </Reveal>
                </section>
            )}

            {/* 5. SPECS */}
            <section style={{ padding: pad, borderTop: "1px solid #EBEBEB" }}>
                <p className="u-label" style={{ marginBottom: "48px" }}>Technical Specifications</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: isMobile ? "24px 16px" : "40px 60px" }}>
                    {project.specs.map((spec: any) => (
                        <div key={spec.label} style={{ borderTop: "1px solid #EBEBEB", paddingTop: "16px" }}>
                            <p className="u-label" style={{ marginBottom: "8px" }}>{spec.label}</p>
                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: isMobile ? "0.9rem" : "1rem" }}>{spec.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. NEXT PROJECT */}
            <section
                onClick={() => router.push(`/projects/${nextProject.slug}`)}
                style={{ position: "relative", height: isMobile ? "55vh" : "80vh", cursor: "pointer", overflow: "hidden" }}
            >
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: "absolute", inset: 0, backgroundImage: `url(${nextProject.heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", padding: "20px" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.3em", marginBottom: "20px", opacity: 0.7 }}>NEXT PROJECT</p>
                    <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(1.8rem, 7vw, 6rem)", letterSpacing: "-0.04em", textAlign: "center" as const }}>
                        {nextProject.title}
                    </h2>
                </div>
            </section>

            <Footer />
        </main>
    );
}
