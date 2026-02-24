"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const followerX = useSpring(cursorX, { stiffness: 300, damping: 30 });
    const followerY = useSpring(cursorY, { stiffness: 300, damping: 30 });

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#000",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 10000,
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            <motion.div
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: isHovering ? "40px" : "20px",
                    height: isHovering ? "40px" : "20px",
                    border: "1px solid #000",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 9999,
                    x: followerX,
                    y: followerY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: 0.3,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        </>
    );
};
