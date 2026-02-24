"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
            <Link href="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{ position: "relative", width: "30px", height: "30px" }}>
                    {/* Fallback to a styled div if the logo image isn't found, but we want to use the actual logo */}
                    <div style={{
                        width: "100%",
                        height: "100%",
                        background: "var(--accent-primary)",
                        clipPath: "polygon(20% 0%, 80% 0%, 50% 100%)", // Minimal geometric shape as placeholder
                        display: "none"
                    }} />
                    <img
                        src="/logo.png"
                        alt="Kalaakars"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.children[0].style.display = 'block';
                        }}
                    />
                </div>
                <span style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "1rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase"
                }}>KALAAKARS</span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "60px" }}>
                <nav style={{ display: "flex", gap: "40px", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.2em", fontFamily: "var(--font-mono)" }}>
                    <Link href="/#projects" className="nav-link">PROJECTS</Link>
                    <Link href="/studio" className="nav-link">STUDIO</Link>
                    <Link href="/index" className="nav-link">INDEX</Link>
                </nav>

                <div style={{ width: "24px", height: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
                    <div style={{ height: "1.5px", background: "#000", width: "100%" }} />
                    <div style={{ height: "1.5px", background: "#000", width: "100%" }} />
                </div>
            </div>

            <style jsx>{`
        .nav-link {
          text-decoration: none;
          color: #666;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: #000;
        }
      `}</style>
        </motion.header>
    );
};
