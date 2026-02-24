"use client";
import React from "react";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer id="contact" style={{ padding: "160px 5% 60px", background: "#FFF", borderTop: "1px solid #EEE" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", marginBottom: "120px" }}>
                <div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", fontWeight: 400, textTransform: "uppercase", lineHeight: 0.9 }}>
                        START A<br />CONVERSATION
                    </h2>
                    <div style={{ marginTop: "40px", width: "40px", height: "1px", background: "#000" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
                    <div>
                        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#666", marginBottom: "20px" }}>CONTACT</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                            <a href="mailto:hello@kalaakars.in">HELLO@KALAAKARS.IN</a>
                            <a href="tel:+919999999999">+91 999 999 9999</a>
                        </div>
                    </div>

                    <div>
                        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#666", marginBottom: "20px" }}>SOCIAL</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                            <a href="#">INSTAGRAM</a>
                            <a href="#">LINKEDIN</a>
                            <a href="#">BEHANCE</a>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "60px", borderTop: "1px solid #F5F5F5" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#AAA" }}>© 2024 KALAAKARS ARCHITECTURE — ALL RIGHTS RESERVED.</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#AAA" }}>LOCATED IN MUMBAI, INDIA.</span>
            </div>
        </footer>
    );
};
