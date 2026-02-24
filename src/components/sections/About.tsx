"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const About = () => {
    return (
        <section id="about" style={{ padding: "160px 0", background: "#FFF", position: "relative" }}>
            <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "120px", borderTop: "1px solid #EEE", paddingTop: "80px" }}>
                <div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", letterSpacing: "0.5em", color: "#666", marginBottom: "40px", textTransform: "uppercase" }}>THE PHILOSOPHY</h2>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", fontWeight: 400, lineHeight: 1.1 }}>
                        WE BELIEVE IN<br />STRUCTURAL<br /><span style={{ color: "#AAA" }}>TRANSOM.</span>
                    </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <p style={{ fontFamily: "var(--font-body)", color: "#121212", fontSize: "1.4rem", lineHeight: 1.5, marginBottom: "60px", letterSpacing: "-0.02em" }}>
                        Kalaakars is a multidisciplinary studio focused on the intersection of light, material, and human experience. Our work is characterized by a commitment to structural innovation and spatial transcendence.
                        <br /><br />
                        Each project is an exploration of space, seeking to create environments that are both functional and sublime.
                    </p>

                    <Link href="/studio">
                        <button className="btn-minimal" style={{ alignSelf: "flex-start" }}>
                            THE STUDIO PROFILE
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ marginTop: "160px", padding: "0 2.5%" }}>
                <div style={{ height: "80vh", overflow: "hidden" }}>
                    <motion.img
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
                        alt="Studio Office"
                        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                    />
                </div>
            </div>
        </section>
    );
};
