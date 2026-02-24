"use client";
import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
    text: string;
    reverse?: boolean;
}

export const Marquee = ({ text, reverse = false }: MarqueeProps) => {
    return (
        <div style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            padding: "20px 0",
            background: "#050505",
            position: "relative",
            zIndex: 5
        }}>
            <motion.div
                animate={{ x: reverse ? [0, 1000] : [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ display: "inline-block" }}
            >
                <div style={{ display: "flex", gap: "60px", alignItems: "center" }}>
                    {[...Array(6)].map((_, i) => (
                        <React.Fragment key={i}>
                            <span
                                className="glitch-text"
                                data-text={text}
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "3rem",
                                    color: "var(--text-primary)",
                                    fontWeight: 700
                                }}
                            >
                                {text}
                            </span>
                            <span style={{ color: "var(--accent-gold)", fontSize: "2rem" }}>✦</span>
                        </React.Fragment>
                    ))}
                </div>
            </motion.div>
            <motion.div
                animate={{ x: reverse ? [-1000, 0] : [1000, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ display: "inline-block", position: "absolute", top: "20px", left: reverse ? "-1000px" : "1000px" }}
            >
                <div style={{ display: "flex", gap: "60px", alignItems: "center" }}>
                    {[...Array(6)].map((_, i) => (
                        <React.Fragment key={i}>
                            <span
                                className="glitch-text"
                                data-text={text}
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "3rem",
                                    color: "var(--text-primary)",
                                    fontWeight: 700
                                }}
                            >
                                {text}
                            </span>
                            <span style={{ color: "var(--accent-gold)", fontSize: "2rem" }}>✦</span>
                        </React.Fragment>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
