"use client";
import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PROJECTS } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";

export default function IndexPage() {
    return (
        <main style={{ background: "#FFF" }}>
            <Navbar />

            <section style={{ padding: "240px 5% 160px" }}>
                <div style={{ maxWidth: "1200px", marginBottom: "80px" }}>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.5em", color: "#AAA", display: "block", marginBottom: "40px" }}
                    >
                        PROJECT ARCHIVE
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.04em", textTransform: "uppercase" }}
                    >
                        CHRONOLOGICAL<br /><span style={{ color: "#AAA" }}>INDEX.</span>
                    </motion.h1>
                </div>

                <div style={{ borderTop: "1px solid #000" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 200px 200px 150px", padding: "20px 0", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#AAA", letterSpacing: "0.1em" }}>
                        <div>ID</div>
                        <div>PROJECT NAME</div>
                        <div>LOCATION</div>
                        <div>PROGRAM</div>
                        <div>YEAR</div>
                    </div>

                    {PROJECTS.map((project, i) => (
                        <Link key={project.id} href={`/projects/${project.id}`}>
                            <motion.div
                                whileHover={{ background: "#F9F9F9" }}
                                style={{ display: "grid", gridTemplateColumns: "100px 1fr 200px 200px 150px", padding: "30px 0", borderTop: "1px solid #EEE", alignItems: "center", color: "#000", textDecoration: "none" }}
                            >
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>{String(i + 1).padStart(2, '0')}</div>
                                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "-0.02em" }}>{project.title}</div>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666" }}>{project.location}</div>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666" }}>{project.category}</div>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666" }}>{project.year}</div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
