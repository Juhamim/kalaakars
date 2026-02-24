"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

export const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    return (
        <section id="projects" style={{ position: "relative", minHeight: "100vh", background: "#FFF", padding: "160px 0" }}>
            {/* Centered Floating Image Reveal - Metrica Interaction */}
            <div style={{
                position: "fixed",
                top: "50%",
                left: "60%",
                transform: "translate(-50%, -50%)",
                width: "35vw",
                height: "25vw",
                zIndex: 5,
                pointerEvents: "none",
                overflow: "hidden"
            }}>
                <AnimatePresence mode="wait">
                    {hoveredProject && (
                        <motion.div
                            key={hoveredProject}
                            initial={{ opacity: 0, scale: 0.8, x: -30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 1.1, x: 30 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                backgroundImage: `url(${PROJECTS.find(p => p.id === hoveredProject)?.heroImg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                boxShadow: "0 40px 80px rgba(0,0,0,0.15)"
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>

            <div className="container" style={{ position: "relative", zIndex: 10 }}>
                <div style={{ marginBottom: "100px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em", color: "#666" }}>SELECTED ARCHIVE</span>
                </div>

                {PROJECTS.map((project, i) => (
                    <Link key={project.id} href={`/projects/${project.id}`} style={{ textDecoration: "none" }}>
                        <motion.div
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                            whileHover={{ x: 20 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "80px 0",
                                borderBottom: "1px solid #F0F0F0",
                                cursor: "pointer",
                                color: "#000",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "60px" }}>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#AAA", marginTop: "12px" }}>{String(i + 1).padStart(2, '0')}</span>
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <h3 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "clamp(2.5rem, 8vw, 6rem)",
                                        fontWeight: 400,
                                        margin: 0,
                                        textTransform: "uppercase",
                                        letterSpacing: "-0.04em",
                                        lineHeight: 0.85,
                                    }}>
                                        {project.title}
                                    </h3>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#AAA", letterSpacing: "0.2em" }}>{project.category}</span>
                                </div>
                            </div>

                            <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666", letterSpacing: "0.1em" }}>
                                {project.location} / {project.year}
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
