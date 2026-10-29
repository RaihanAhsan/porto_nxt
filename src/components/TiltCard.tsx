"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 10,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Gunakan MotionValue agar tidak memicu React re-render saat kursor bergerak
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const rotateX = useSpring(rawRotateX, { stiffness: 260, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 260, damping: 22 });
  const scale = useSpring(rawScale, { stiffness: 260, damping: 22 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Abaikan sentuhan jari saat scroll di HP agar ringan & tetap aktif untuk mouse
    if (e.pointerType === "touch" || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rawRotateX.set(((y - centerY) / centerY) * -intensity);
    rawRotateY.set(((x - centerX) / centerX) * intensity);

    if (glowRef.current) {
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background = `radial-gradient(280px circle at ${gx}% ${gy}%, rgba(108, 99, 255, 0.16), rgba(0, 212, 255, 0.05) 40%, transparent 80%)`;
    }
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    rawScale.set(1.02);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawScale.set(1);
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1000,
      }}
    >
      {/* Interactive spotlight overlay inside card (DOM-direct, zero React re-render) */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.25s ease",
          borderRadius: "inherit",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
