"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 5000,
                padding: scrolled ? "20px 5%" : "40px 5%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.6s var(--ease-out-expo)",
                background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
                backdropFilter: scrolled ? "blur(10px)" : "none",
                borderBottom: scrolled ? "1px solid #EEE" : "1px solid transparent",
            }}
        >
            {/* LOGO */}
            <Link href="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                    src="/logo.svg"
                    alt="Kalaakars Logo"
                    width={36}
                    height={36}
                    style={{ objectFit: "contain", display: "block" }}
                />
                <span style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "1rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase" as const,
                }}>
                    KALAAKARS
                </span>
            </Link>

            {/* NAV LINKS */}
            <div style={{ display: "flex", alignItems: "center", gap: "60px" }}>
                <nav style={{
                    display: "flex",
                    gap: "40px",
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    letterSpacing: "0.2em",
                    fontFamily: "var(--font-mono)"
                }}>
                    <Link href="/#projects" style={{ textDecoration: "none", color: "#666" }}>PROJECTS</Link>
                    <Link href="/studio" style={{ textDecoration: "none", color: "#666" }}>STUDIO</Link>
                    <Link href="/index" style={{ textDecoration: "none", color: "#666" }}>INDEX</Link>
                </nav>

                {/* Hamburger */}
                <div style={{ width: "24px", height: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
                    <div style={{ height: "1.5px", background: "#000", width: "100%" }} />
                    <div style={{ height: "1.5px", background: "#000", width: "100%" }} />
                </div>
            </div>
        </motion.header>
    );
};
