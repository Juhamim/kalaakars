"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

export const Hero = () => {
    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 800], [0, 300]);
    const featured = PROJECTS[0];

    return (
        <section id="hero" style={{ height: "100vh", position: "relative", overflow: "hidden", background: "#FFF" }}>
            <Link href={`/projects/${featured.id}`} style={{ textDecoration: "none" }}>
                <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
                    <motion.div
                        style={{
                            height: "130%",
                            width: "100%",
                            y: yParallax,
                            backgroundImage: `url(${featured.heroImg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,255,255,0.3), transparent)" }} />
                </div>

                <div style={{ position: "absolute", bottom: "10%", left: "5%", zIndex: 2 }}>
                    <span style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.3em",
                        color: "#000",
                        marginBottom: "15px"
                    }}>
                        FEATURED — {featured.year}
                    </span>
                    <h1 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(3.5rem, 10vw, 8rem)",
                        lineHeight: 0.85,
                        letterSpacing: "-0.04em",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        color: "#000"
                    }}>
                        {featured.title}
                    </h1>
                </div>
            </Link>

            {/* Scroll Explore */}
            <div style={{ position: "absolute", right: "5%", bottom: "40px", display: "flex", alignItems: "center", gap: "20px", color: "#000" }}>
                <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.3em" }}>EXPLORE</span>
                <div style={{ height: "1px", width: "30px", background: "#000" }} />
            </div>
        </section>
    );
};
