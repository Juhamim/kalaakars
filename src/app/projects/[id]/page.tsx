"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { PROJECTS } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function ProjectDetail() {
    const { id } = useParams();
    const router = useRouter();
    const project = PROJECTS.find((p) => p.id === id);

    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);

    if (!project) return <div>Project not found</div>;

    return (
        <main style={{ background: "#FFF", minHeight: "100vh" }}>
            <Navbar />

            {/* 1. Hero Section - Metrica Style */}
            <section style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
                <motion.div
                    style={{
                        height: "140%",
                        width: "100%",
                        y: yHero,
                        backgroundImage: `url(${project.heroImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: opacityHero
                    }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,255,255,0.4), transparent 50%)" }} />
            </section>

            {/* 2. Massive Title Block */}
            <section style={{ padding: "100px 5% 60px", background: "#FFF" }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.5em", color: "#666", display: "block", marginBottom: "30px" }}>
                        {project.location} — {project.year}
                    </span>
                    <h1 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(3.5rem, 12vw, 10rem)",
                        lineHeight: 0.85,
                        letterSpacing: "-0.05em",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        margin: 0
                    }}>
                        {project.title}
                    </h1>
                </motion.div>
            </section>

            {/* 3. Narrative Section */}
            <section style={{ padding: "120px 5%", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "100px", borderTop: "1px solid #EEE" }}>
                <div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#666", textTransform: "uppercase" }}>THE PHILOSOPHY</span>
                </div>
                <div>
                    <p style={{ fontFamily: "var(--font-body)", color: "#121212", fontSize: "1.5rem", lineHeight: 1.5, letterSpacing: "-0.02em", maxWidth: "800px" }}>
                        {project.story}
                    </p>
                    {project.storySecondary && (
                        <p style={{ fontFamily: "var(--font-body)", color: "#666", fontSize: "1.1rem", lineHeight: 1.7, marginTop: "40px", maxWidth: "600px" }}>
                            {project.storySecondary}
                        </p>
                    )}
                </div>
            </section>

            {/* 4. Gallery Section - Metrica Staggered */}
            <section style={{ padding: "0 2.5%" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {project.gallery.map((img, i) => {
                        const isFull = img.type === "full";
                        return (
                            <div
                                key={i}
                                style={{
                                    flex: isFull ? "0 0 100%" : "0 0 calc(50% - 10px)",
                                    height: isFull ? "110vh" : "80vh",
                                    overflow: "hidden",
                                    marginBottom: "10px"
                                }}
                            >
                                <motion.img
                                    initial={{ scale: 1.1 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                    src={img.src}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 5. Specs Section - Metrica Style */}
            <section style={{ padding: "160px 5%", background: "#FFF" }}>
                <div style={{ borderTop: "1.5px solid #000", paddingTop: "40px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px" }}>
                        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", letterSpacing: "0.5em", color: "#121212", textTransform: "uppercase" }}>TECHNICAL SPECS</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "x: 40px", rowGap: "40px" }}>
                            {project.specs.map((spec, i) => (
                                <div key={i}>
                                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#AAA", marginBottom: "8px", textTransform: "uppercase" }}>{spec.label}</div>
                                    <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#121212" }}>{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Next Project Portal - Metrica Style */}
            <section
                onClick={() => {
                    const nextIdx = (PROJECTS.indexOf(project) + 1) % PROJECTS.length;
                    router.push(`/projects/${PROJECTS[nextIdx].id}`);
                }}
                className="interactive"
                style={{ height: "90vh", position: "relative", cursor: "pointer", overflow: "hidden", margin: "0 20px 20px" }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].heroImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.5em", color: "#FFF", marginBottom: "30px" }}>NEXT PROJECT</span>
                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(3rem, 8vw, 6rem)",
                        color: "#FFF",
                        textTransform: "uppercase",
                        letterSpacing: "-0.04em",
                        fontWeight: 400
                    }}>
                        {PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].title}
                    </h2>
                </div>
            </section>

            <Footer />

            <style jsx global>{`
        body { background: #FFF !important; }
      `}</style>
        </main>
    );
}
