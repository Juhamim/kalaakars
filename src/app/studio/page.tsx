"use client";
import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";

export default function StudioPage() {
    return (
        <main style={{ background: "#FFF" }}>
            <Navbar />

            <section style={{ padding: "240px 5% 160px" }}>
                <div style={{ maxWidth: "1200px" }}>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.5em", color: "#AAA", display: "block", marginBottom: "40px" }}
                    >
                        STUDIO PROFILE
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.04em", textTransform: "uppercase" }}
                    >
                        WE ARE<br />ARCHITECTS OF<br /><span style={{ color: "#AAA" }}>THE FUTURE.</span>
                    </motion.h1>
                </div>
            </section>

            <section style={{ padding: "0 5% 160px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "120px" }}>
                <div style={{ height: "100vh", overflow: "hidden" }}>
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
                        alt="Studio"
                        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", letterSpacing: "0.5em", color: "#666", marginBottom: "40px" }}>PHILOSOPHY</h2>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", lineHeight: 1.6, color: "#121212", maxWidth: "600px" }}>
                        Kalaakars is a multidisciplinary architecture studio committed to structural innovation and spatial transcendence. Our practice is rooted in the belief that space has the power to elevate the human spirit.
                        <br /><br />
                        We don't just build structures; we design environments that challenge the persistence of gravity and the constraints of traditional geometry.
                    </p>

                    <div style={{ marginTop: "80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                        <div>
                            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#AAA", marginBottom: "15px" }}>ESTABLISHED</h4>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>2024</div>
                        </div>
                        <div>
                            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#AAA", marginBottom: "15px" }}>LOCATION</h4>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>MUMBAI, IN</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
